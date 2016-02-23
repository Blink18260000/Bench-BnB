var _markers = [];

var React = require('react'),
    BenchStore = require('../stores/benches'),
    ApiUtil = require('../util/apiUtil');

var Map = React.createClass({
  idle: function() {
    var curBounds = this.map.getBounds();
    var northEast = curBounds.getNorthEast();
    var southWest = curBounds.getSouthWest();
    var bounds = {"northEast": {"lat": northEast.lat(), "lng": northEast.lng()},
                  "southWest": {"lat": southWest.lat(), "lng": southWest.lng()}};
    ApiUtil.fetchBoundBenches(bounds);
  },

  _onChange: function() {
    _markers.map(function(marker) { marker.setMap(null); }, this);
    _markers.length = 0;
    BenchStore.all().map(function(bench) {
      var myLtLng = new google.maps.LatLng(bench.lat, bench.long);
      var marker = new google.maps.Marker({
        position: myLtLng,
        title: bench.description
      });
      _markers = _markers.concat(marker);
    }, this);
    _markers.map(function(marker) {
      marker.setMap(this.map);
    }, this);
  },

  componentDidMount: function(){
      var mapDOMNode = this.refs.map;
      var mapOptions = {
        center: {lat: 37.7758, lng: -122.435},
        zoom: 12
      };
      this.map = new google.maps.Map(mapDOMNode, mapOptions);
      this.listenerToken = BenchStore.addListener(this._onChange);
      this.map.addListener("idle", this.idle);
      this.map.addListener("click", this.click);
    },

  componentWillUnmount: function () {
    this.listenerToken.remove();
    google.maps.event.clearInstanceListeners(this.map);
  },

  click: function(e) {
    var clickedLat = e.latLng.lat();
    var clickedLng = e.latLng.lng();
    this.props.clickMapHandler(clickedLat, clickedLng);
  },

  render: function () {
    return (
      <div className="map" ref="map">

      </div>
    );
  }
});

module.exports = Map;
