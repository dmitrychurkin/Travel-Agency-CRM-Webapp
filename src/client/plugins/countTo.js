var CountTo = (function () {
    function CountTo(element, opts) {
        this.$element = element;
        this.options = this._opts(opts);
        this._init();
    }
    CountTo.prototype._opts = function (opts) {
        var newObj = {};
        for (var o in CountTo.DEFAULTS) {
            newObj[o] = opts[o] || CountTo.DEFAULTS[o];
        }
        return newObj;
    };
    CountTo.prototype._init = function () {
        var _a = this.options, from = _a.from, to = _a.to, speed = _a.speed, refreshInterval = _a.refreshInterval;
        this.value = from;
        this.loops = Math.ceil(speed / refreshInterval);
        this.loopCount = 0;
        this.increment = (to - from) / this.loops;
    };
    CountTo.prototype._update = function () {
        var _a = this, increment = _a.increment, value = _a.value, loopCount = _a.loopCount, interval = _a.interval, loops = _a.loops, _b = _a.options, onComplete = _b.onComplete, to = _b.to;
        this.value = this.value + increment;
        this.loopCount++;
        this._render();
        if (loopCount >= loops) {
            clearInterval(interval);
            this.value = to;
            if (typeof onComplete === "function") {
                onComplete(value);
            }
        }
    };
    CountTo.prototype._render = function () {
        var _a = this, value = _a.value, options = _a.options, formatter = _a.options.formatter;
        var formattedValue = formatter(value, options);
        this.$element.innerHTML = formattedValue.toString();
    };
    CountTo.prototype._stop = function () {
        var interval = this.interval;
        if (interval) {
            clearInterval(interval);
        }
    };
    CountTo.prototype.start = function () {
        this._stop();
        this._render();
        this.interval = setInterval(this._update.bind(this), this.options.refreshInterval);
    };
    return CountTo;
}());
export default CountTo;
CountTo.DEFAULTS = {
    from: 0,
    to: 0,
    speed: 1000,
    refreshInterval: 100,
    decimals: 0,
    formatter: function (value, options) { return +value.toFixed(options.decimals); },
    onComplete: null
};
