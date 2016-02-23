var Dispatcher = require('../dispatcher'),
    Store = require('flux/utils').Store,
    BenchConstants = require('../constants/bench_constants');

var _benches = [];

var BenchStore = new Store(Dispatcher);

BenchStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case BenchConstants.BENCHES_RECEIVED:
      this.resetBenchs(payload.benches);
      this.__emitChange();
      break;
    case BenchConstants.BENCH_CREATED:
      this.__emitChange();
      break;
  }
};

BenchStore.resetBenchs = function(benches) {
  _benches = benches;
};

BenchStore.all = function () {
  return _benches.slice(0);
};

BenchStore.find = function (id) {
  return _benches[id];
};

module.exports = BenchStore;
