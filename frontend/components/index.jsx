var React = require('react'),
    BenchStore = require('../stores/benches'),
    ApiUtil = require('../util/apiUtil');

var Index = React.createClass({
  getInitialState: function () {
    return {benches: BenchStore.all()};
  },

  _onChange: function () {
    this.setState({benches: BenchStore.all()});
  },

  componentDidMount: function (callback) {
    ApiUtil.fetchBenches();
    this.listenerToken = BenchStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  render: function () {
    return (
      <div>
        <ul>
          {
            this.state.benches.map( function (bench) {
              return <li key={bench.lat}>{bench.description}</li>;
            }, this)
          }
        </ul>
      </div>
    );
  }
});

module.exports = Index;
