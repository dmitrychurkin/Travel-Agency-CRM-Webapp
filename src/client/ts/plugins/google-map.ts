
export default class {

  constructor(c: any= [ { lat: 7.214420, lng: 79.846657 }, { lat: 7.3119192, lng: 79.8459553 } ]) {

    window._initMap = this.initMap(c);

  }

  initMap(c: any) {
    return () => {

      const center = { lat: 7.277354, lng: 79.8615057 };
      const m: any = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
        scrollwheel: !1
      });

      for (const cord of c) {

        const w: any = new google.maps.InfoWindow({
          content: "We are here!"
        });
        w.open(m, new google.maps.Marker({
          position: cord,
          map: m
        }));

      }

      window.onresize = function(){
          m.setCenter(center);
      };

    };
  }
}
