var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  //make an api call using AJAX in here
  fetchBenches: function() {
    var that = this;
    $.ajax({
     method: 'GET',
     url: 'api/benches',
     dataType: 'json',
     success: function(resp) {
        ApiActions.receiveAll(resp);
     }
   });
  },

  fetchBoundBenches: function(bounds) {
    var that = this;
    $.ajax({
     method: 'GET',
     url: 'api/benches',
     dataType: 'json',
     data: {bounds: bounds},
     success: function(resp) {
        ApiActions.receiveAll(resp);
     }
   });
 },

  createBench: function(bench) {
    var that = this;
    $.ajax({
      method: 'POST',
      url: 'api/benches',
      dataType: 'json',
      data: {"bench": bench},
      success: function(resp) {
        ApiActions.benchCreated();
      }
    });
  },
};

module.exports = ApiUtil;
