var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    hashHistory = ReactRouter.hashHistory,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    root = document.getElementById('root'),

    ApiUtil = require('./util/apiUtil'),
    BenchStore = require('./stores/benches'),
    BenchForm = require('./components/bench_form'),

    Search = require('./components/search');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <header><h1>Bench BnB</h1></header>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Search} />
    <Route path="benches/new" component={BenchForm} >

    </Route>
  </Route>
);

$(document).on('DOMContentLoaded', function() {
  ReactDOM.render(<Router history={hashHistory} >{routes}</Router>,
    document.getElementById('root'));
});
