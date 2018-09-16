
const MAGIC_NUMBER = 30;
const DEFAULTS = {
  relativeInput: false,
  clipRelativeInput: false,
  calibrationThreshold: 100,
  calibrationDelay: 500,
  supportDelay: 500,
  calibrateX: false,
  calibrateY: true,
  invertX: true,
  invertY: true,
  limitX: false,
  limitY: false,
  scalarX: 10.0,
  scalarY: 10.0,
  frictionX: 0.1,
  frictionY: 0.1,
  originX: 0.5,
  originY: 0.5
};

export class Parallax {

  readonly layers = Array.from(this.element.getElementsByClassName("S1__lay")) as HTMLElement[];
  // States
  calibrationTimer: number | undefined;
  calibrationFlag = true;
  enabled = false;
  depths: any[] = [];
  raf: number;

  // Element Bounds
  bounds: ClientRect | DOMRect;
  ex = 0;
  ey = 0;
  ew = 0;
  eh = 0;

  // Element Center
  ecx = 0;
  ecy = 0;

  // Element Range
  erx = 0;
  ery = 0;

  // Calibration
  cx = 0;
  cy = 0;

  // Input
  ix = 0;
  iy = 0;

  // Motion
  mx = 0;
  my = 0;

  // Velocity
  vx = 0;
  vy = 0;

  // Callbacks
  readonly onMouseMove = this._onMouseMove.bind(this);
  readonly onDeviceOrientation = this._onDeviceOrientation.bind(this);
  readonly onOrientationTimer = this._onOrientationTimer.bind(this);
  readonly onCalibrationTimer = this._onCalibrationTimer.bind(this);
  readonly onAnimationFrame = this._onAnimationFrame.bind(this);
  readonly onWindowResize = this._onWindowResize.bind(this);

  ww: number;
  wh: number;
  wcx: number;
  wcy: number;
  wrx: number;
  wry: number;
  portrait: boolean;
  readonly desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
  readonly vendors: any = [null, ["-webkit-", "webkit"], ["-moz-", "Moz"], ["-o-", "O"], ["-ms-", "ms"]];
  readonly motionSupport = !!(<any>window).DeviceMotionEvent;
  orientationSupport = !!(<any>window).DeviceOrientationEvent;
  orientationStatus = 0;
  readonly propertyCache: any = {};
  transform2DSupport: any;
  transform3DSupport: any;
  calibrationDelay: number;
  originX: number;
  originY: number;
  supportDelay: number;
  calibrateX: boolean;
  calibrateY: boolean;
  invertX: boolean;
  invertY: boolean;
  limitX: string;
  limitY: string;
  frictionX: number;
  frictionY: number;
  scalarX: number;
  scalarY: number;
  calibrationThreshold: number;
  relativeInput: boolean;
  clipRelativeInput: boolean;

  constructor(readonly element: HTMLElement, options?: any) {

    const data: any = {
      calibrateX: this._data(this.element, "calibrate-x"),
      calibrateY: this._data(this.element, "calibrate-y"),
      invertX: this._data(this.element, "invert-x"),
      invertY: this._data(this.element, "invert-y"),
      limitX: this._data(this.element, "limit-x"),
      limitY: this._data(this.element, "limit-y"),
      scalarX: this._data(this.element, "scalar-x"),
      scalarY: this._data(this.element, "scalar-y"),
      frictionX: this._data(this.element, "friction-x"),
      frictionY: this._data(this.element, "friction-y"),
      originX: this._data(this.element, "origin-x"),
      originY: this._data(this.element, "origin-y")
    };

    for (let key in data) {
      if (data[key] === null) delete data[key];
    }

    Object.assign(this, DEFAULTS, options, data);


    // Initialise
    this._init();

  }

  private _accelerate(element: any) {
    this._css(element, "transform", "translate3d(0,0,0)");
    this._css(element, "transform-style", "preserve-3d");
    this._css(element, "backface-visibility", "hidden");
  }


  private _init() {

    if (this.transform2DSupport === undefined) {
      this.transform2DSupport = this._transformSupport("2D");
      this.transform3DSupport = this._transformSupport("3D");
    }

    // Configure Context Styles
    if (this.transform3DSupport) this._accelerate(this.element);
    let style = window.getComputedStyle(this.element);
    if (style.getPropertyValue("position") === "static") {
      this.element.style.position = "relative";
    }

    // Setup
    this._updateLayers();
    this._updateDimensions();
    this.enable();
    this._queueCalibration(this.calibrationDelay);

  }

  disable() {
    if (this.enabled) {
      this.enabled = false;
      if (this.orientationSupport) {
        window.removeEventListener("deviceorientation", this.onDeviceOrientation);
      } else {
        window.removeEventListener("mousemove", this.onMouseMove);
      }
      window.removeEventListener("resize", this.onWindowResize);
      cancelAnimationFrame(this.raf);
    }
  }

  enable() {
    if (!this.enabled) {
      this.enabled = true;
      if (this.orientationSupport) {
        this.portrait = false;
        window.addEventListener("deviceorientation", this.onDeviceOrientation);
        setTimeout(this.onOrientationTimer, this.supportDelay);
      } else {
        this.cx = 0;
        this.cy = 0;
        this.portrait = false;
        window.addEventListener("mousemove", this.onMouseMove);
      }
      window.addEventListener("resize", this.onWindowResize);
      this.raf = requestAnimationFrame(this.onAnimationFrame);
    }
  }

  private _queueCalibration(delay: number) {
    clearTimeout(this.calibrationTimer);
    this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay);
  }

  private _updateDimensions() {

    this.ww = window.innerWidth;
    this.wh = window.innerHeight;
    this.wcx = this.ww * this.originX;
    this.wcy = this.wh * this.originY;
    this.wrx = Math.max(this.wcx, this.ww - this.wcx);
    this.wry = Math.max(this.wcy, this.wh - this.wcy);

  }

  private _updateLayers() {

    this.depths = [];

    // Configure Layer Styles
    for (let i = 0, l = this.layers.length; i < l; i++) {
      let layer = this.layers[i];
      if (this.transform3DSupport) this._accelerate(layer);
      layer.style.position = i ? "absolute" : "relative";
      layer.style.display = "block";
      layer.style.left = "0";
      layer.style.top = "0";

      // Cache Layer Depth
      this.depths.push(this._data(layer, "depth") || 0);
    }
  }

  private _css(element: any, property: any, value: any) {

    let jsProperty: any = this.propertyCache[property];
    if (!jsProperty) {
      for (let i = 0, l = this.vendors.length; i < l; i++) {
        if (this.vendors[i] !== null) {
          jsProperty = this._camelCase(this.vendors[i][1] + "-" + property);
        } else {
          jsProperty = property;
        }
        if (element.style[jsProperty] !== undefined) {
          this.propertyCache[property] = jsProperty;
          break;
        }
      }
    }
    element.style[jsProperty] = value;

  }

  private _camelCase(value: any) {
    return value.replace(/-+(.)?/g, function (match: any, character: any) {
      match;
      return character ? character.toUpperCase() : "";
    });
  }

  private _data(element: any, name: string) {
    return this._deserialize(element.getAttribute("data-" + name));
  }

  private _deserialize(value: any) {
    if (value === "true") {
      return true;
    } else if (value === "false") {
      return false;
    } else if (value === "null") {
      return null;
    } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
      return parseFloat(value);
    } else {
      return value;
    }
  }

  private _transformSupport(value: any) {
    let element = document.createElement("div");
    let propertySupport = false;
    let propertyValue: any = null;
    let featureSupport = false;
    let cssProperty: any = null;
    let jsProperty: any = null;
    for (let i = 0, l = this.vendors.length; i < l; i++) {
      if (this.vendors[i] !== null) {
        cssProperty = this.vendors[i][0] + "transform";
        jsProperty = this.vendors[i][1] + "Transform";
      } else {
        cssProperty = "transform";
        jsProperty = "transform";
      }
      if (element.style[jsProperty] !== undefined) {
        propertySupport = true;
        break;
      }
    }
    switch (value) {
      case "2D":
        featureSupport = propertySupport;
        break;
      case "3D":
        if (propertySupport) {
          let body = document.body || document.createElement("body");
          let documentElement = document.documentElement;
          let documentOverflow = documentElement.style.overflow;
          if (!document.body) {
            documentElement.style.overflow = "hidden";
            documentElement.appendChild(body);
            body.style.overflow = "hidden";
            body.style.background = "";
          }
          body.appendChild(element);
          element.style[jsProperty] = "translate3d(1px,1px,1px)";
          propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
          featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== "none";
          documentElement.style.overflow = documentOverflow;
          body.removeChild(element);
        }
        break;
    }
    return featureSupport;
  }

  private _updateBounds() {

    this.bounds = this.element.getBoundingClientRect();
    this.ex = this.bounds.left;
    this.ey = this.bounds.top;
    this.ew = this.bounds.width;
    this.eh = this.bounds.height;
    this.ecx = this.ew * this.originX;
    this.ecy = this.eh * this.originY;
    this.erx = Math.max(this.ecx, this.ew - this.ecx);
    this.ery = Math.max(this.ecy, this.eh - this.ecy);

  }

  /*calibrate(x, y) {
    this.calibrateX = x === undefined ? this.calibrateX : x;
    this.calibrateY = y === undefined ? this.calibrateY : y;
  }

  invert(x, y) {
    this.invertX = x === undefined ? this.invertX : x;
    this.invertY = y === undefined ? this.invertY : y;
  }

  friction(x, y) {
    this.frictionX = x === undefined ? this.frictionX : x;
    this.frictionY = y === undefined ? this.frictionY : y;
  }

  scalar(x, y) {
    this.scalarX = x === undefined ? this.scalarX : x;
    this.scalarY = y === undefined ? this.scalarY : y;
  }

  limit(x, y) {
    this.limitX = x === undefined ? this.limitX : x;
    this.limitY = y === undefined ? this.limitY : y;
  }

  origin(x, y) {
    this.originX = x === undefined ? this.originX : x;
    this.originY = y === undefined ? this.originY : y;
  }*/

  private _clamp(value: any, min: any, max: any) {
    value = Math.max(value, min);
    value = Math.min(value, max);
    return value;
  }

  private _setPosition(element: any, x: any, y: any) {
    x += "px";
    y += "px";
    if (this.transform3DSupport) {
      this._css(element, "transform", "translate3d(" + x + "," + y + ",0)");
    } else if (this.transform2DSupport) {
      this._css(element, "transform", "translate(" + x + "," + y + ")");
    } else {
      element.style.left = x;
      element.style.top = y;
    }
  }

  private _onOrientationTimer() {
    if (this.orientationSupport && this.orientationStatus === 0) {
      this.disable();
      this.orientationSupport = false;
      this.enable();
    }
  }

  private _onCalibrationTimer() {
    this.calibrationFlag = true;
  }

  private _onWindowResize() {
    this._updateDimensions();
  }

  private _onAnimationFrame() {
    this._updateBounds();
    let dx = this.ix - this.cx;
    let dy = this.iy - this.cy;
    if ((Math.abs(dx) > this.calibrationThreshold) || (Math.abs(dy) > this.calibrationThreshold)) {
      this._queueCalibration(0);
    }
    if (this.portrait) {
      this.mx = this.calibrateX ? dy : this.iy;
      this.my = this.calibrateY ? dx : this.ix;
    } else {
      this.mx = this.calibrateX ? dx : this.ix;
      this.my = this.calibrateY ? dy : this.iy;
    }
    this.mx *= this.ew * (this.scalarX / 100);
    this.my *= this.eh * (this.scalarY / 100);
    if (!isNaN(parseFloat(this.limitX))) {
      this.mx = this._clamp(this.mx, -this.limitX, this.limitX);
    }
    if (!isNaN(parseFloat(this.limitY))) {
      this.my = this._clamp(this.my, -this.limitY, this.limitY);
    }
    this.vx += (this.mx - this.vx) * this.frictionX;
    this.vy += (this.my - this.vy) * this.frictionY;
    for (let i = 0, l = this.layers.length; i < l; i++) {
      let layer = this.layers[i];
      let depth = this.depths[i];
      let xOffset = this.vx * depth * (this.invertX ? -1 : 1);
      let yOffset = this.vy * depth * (this.invertY ? -1 : 1);
      this._setPosition(layer, xOffset, yOffset);
    }
    this.raf = requestAnimationFrame(this.onAnimationFrame);
  }

  private _onDeviceOrientation(event: any) {

    // Validate environment and event properties.
    if (!this.desktop && event.beta !== null && event.gamma !== null) {

      // Set orientation status.
      this.orientationStatus = 1;

      // Extract Rotation
      let x = (event.beta || 0) / MAGIC_NUMBER; //  -90 :: 90
      let y = (event.gamma || 0) / MAGIC_NUMBER; // -180 :: 180

      // Detect Orientation Change
      let portrait = this.wh > this.ww;
      if (this.portrait !== portrait) {
        this.portrait = portrait;
        this.calibrationFlag = true;
      }

      // Set Calibration
      if (this.calibrationFlag) {
        this.calibrationFlag = false;
        this.cx = x;
        this.cy = y;
      }

      // Set Input
      this.ix = x;
      this.iy = y;
    }
  }

  private _onMouseMove(event: any) {

    // Cache mouse coordinates.
    let clientX = event.clientX;
    let clientY = event.clientY;

    // Calculate Mouse Input
    if (!this.orientationSupport && this.relativeInput) {

      // Clip mouse coordinates inside element bounds.
      if (this.clipRelativeInput) {
        clientX = Math.max(clientX, this.ex);
        clientX = Math.min(clientX, this.ex + this.ew);
        clientY = Math.max(clientY, this.ey);
        clientY = Math.min(clientY, this.ey + this.eh);
      }

      // Calculate input relative to the element.
      this.ix = (clientX - this.ex - this.ecx) / this.erx;
      this.iy = (clientY - this.ey - this.ecy) / this.ery;

    } else {

      // Calculate input relative to the window.
      this.ix = (clientX - this.wcx) / this.wrx;
      this.iy = (clientY - this.wcy) / this.wry;
    }

  }
}

export function RequestAnimFrame() {

  let lastTime = 0;
  let vendors = ["ms", "moz", "webkit", "o"];

  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      const win: any = window;
      window.requestAnimationFrame = win[vendors[x] + "RequestAnimationFrame"];
      window.cancelAnimationFrame = win[vendors[x] + "CancelAnimationFrame"] || win[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback: any) {
          let currTime = new Date().getTime();
          let timeToCall = Math.max(0, 16 - (currTime - lastTime));
          let id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };
  }

  if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
  }

};
