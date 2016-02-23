var React = require('react'),
    Map = require('./map'),
    Index = require('./index'),
    ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory;

var Search = React.createClass({
  clickMapHandler: function(clickedLat, clickedLng) {

    hashHistory.push({pathname: "benches/new",
      query: {lat: clickedLat, lng: clickedLng} });
  },

  render: function () {
    return (
      <div className="search">
        <Map clickMapHandler={this.clickMapHandler} />
        <Index />
      </div>
    );
  }
});

module.exports = Search;
