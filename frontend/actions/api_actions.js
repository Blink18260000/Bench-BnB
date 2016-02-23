var Dispatcher = require('../dispatcher'),
    BenchConstants = require('../constants/bench_constants');

var ApiActions = {
  receiveAll: function (benches) {
    Dispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      benches: benches
    });
  },

  benchCreated: function () {
    Dispatcher.dispatch({
      actionType: BenchConstants.BENCH_CREATED
    });
  }
};

module.exports = ApiActions;
