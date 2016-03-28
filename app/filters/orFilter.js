'use strict';

angular.module('app').filter('orFilter', [function() {
  return function (items, filter) {
    var results = items.slice(0);

    function _orFilter(i) {
      temp = temp.concat(
        results.filter(function(j) {
          return i === j[key];
        })
      );
    }

    function _andFilter(j) {
      return (value === j[key]);
    }

    for (var key in filter) {
      var value = filter[key];

      if (value instanceof Array) {
        var temp = [];
        value.forEach(_orFilter, this);
        results = temp;
      } else {
        results = results.filter(_andFilter, this);
      }
    }

    return results;
  };
}]);
