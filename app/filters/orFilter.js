'use strict';

angular.module('app').filter('orFilter', [function() {
  return function (items, filter) {
    // copy all items in the list to a new array
    var results = items.slice(0);

    // function to return only those items that have a status equal to the passed in status item
    function _orFilter(i) {
      temp = temp.concat(
        results.filter(function(j) {
          // return only those items that have a status equal to the passed in status item
          return i === j[key];
        })
      );
    }

    // for each property in the filter object
    for (var key in filter) {
      // assign the property value (status array) to value variable
      var value = filter[key];

      // check if value is an array
      if (value instanceof Array) {
        // create an empty array
        var temp = [];
        // pass each item in the status array to the _orFilter
        value.forEach(_orFilter, this);
        // assign results of filtered list items to results
        results = temp;
      }
    }

    return results;
  };
}]);
