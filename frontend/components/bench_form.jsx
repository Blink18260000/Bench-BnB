var React = require('react'),
    BenchStore = require('../stores/benches'),
    ApiUtil = require('../util/apiUtil');

var BenchForm = React.createClass({
  getInitialState: function () {
    return {
      description: "",
      lat: this.props.location.query.lat,
      long: this.props.location.query.lng,
      seating: ""
    };
  },

  componentDidMount: function (callback) {
    this.listenerToken = BenchStore.addListener(this.benchCreated);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  benchCreated: function() {
    this.props.history.push("/");
  },

  handleChange: function(e) {
    var curState = {};
    curState[e.target.getAttribute("label")] = e.target.value;
    this.setState(curState);
  },

  render: function () {
    return (
      <form onSubmit={this.onSubmit} >
        <label for="Bench Description">Bench description: </label>
        <input
          id="Bench Description"
          label="description"
          type="text"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <br />
        <label for="latitude">Bench latitude: </label>
        <input
          id="latitude"
          label="lat"
          type="text"
          value={this.state.lat}
          onChange={this.handleChange}
        />
        <br />
        <label for="longitude">Bench longitude: </label>
        <input
          id="longitude"
          label="long"
          type="text"
          value={this.state.long}
          onChange={this.handleChange}
        />
        <br />
        <label for="seating capacity">Bench seating capacity: </label>
        <input
          id="seating capacity"
          label="seating"
          type="text"
          value={this.state.seating}
          onChange={this.handleChange}
        />
      <br />
      <button type="submit">Submit</button>
      </form>
    );
  },

  onSubmit: function(e) {
    e.preventDefault();

    var bench = {};
    bench["description"] = this.state.description;
    bench["lat"] = parseFloat(this.state.lat);
    bench["long"] = parseFloat(this.state.long);
    bench["seating"] = parseInt(this.state.seating);

    ApiUtil.createBench(bench);
  }
});

module.exports = BenchForm;
