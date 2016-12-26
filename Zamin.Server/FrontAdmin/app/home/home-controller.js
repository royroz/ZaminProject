(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($scope) {
    var vm = this;
    vm.ctrlName = 'HomeCtrl';
    $scope.incomeByDate = {
      barData: [{
  "label": "Sales",
  "color": "#9cd159",
  "data": [
    ["Jan", 27],
    ["Feb", 82],
    ["Mar", 56],
    ["Apr", 14],
    ["May", 28],
    ["Jun", 77],
    ["Jul", 23],
    ["Aug", 49],
    ["Sep", 81],
    ["Oct", 20]
  ]
}],
      barOptions: {
          series: {
              bars: {
                  align: 'center',
                  lineWidth: 0,
                  show: true,
                  barWidth: 0.6,
                  fill: 0.9
              }
          },
          grid: {
              borderColor: '#eee',
              borderWidth: 1,
              hoverable: true,
              backgroundColor: '#fcfcfc'
          },
          tooltip: true,
          tooltipOpts: {
              content: function (label, x, y) { return x + ' : ' + y; }
          },
          xaxis: {
              tickColor: '#fcfcfc',
              mode: 'categories'
          },
          yaxis: {
              position: ($scope.app.layout.isRTL ? 'right' : 'left'),
              tickColor: '#eee'
          },
          shadowSize: 0
      }
    }


    $scope.incomeByBusiness = {
      barData:[{
  "label": "תלמידים",
  "color": "#51bff2",
  "data": [
    ["Jan", 56],
    ["Feb", 81],
    ["Mar", 97],
    ["Apr", 44],
    ["May", 24],
    ["Jun", 85],
    ["Jul", 94],
    ["Aug", 78],
    ["Sep", 52],
    ["Oct", 17],
    ["Nov", 90],
    ["Dec", 62]
  ]
}, {
  "label": "הורים",
  "color": "#4a8ef1",
  "data": [
    ["Jan", 69],
    ["Feb", 135],
    ["Mar", 14],
    ["Apr", 100],
    ["May", 100],
    ["Jun", 62],
    ["Jul", 115],
    ["Aug", 22],
    ["Sep", 104],
    ["Oct", 132],
    ["Nov", 72],
    ["Dec", 61]
  ]
}, {
  "label": "מחנכים",
  "color": "#f0693a",
  "data": [
    ["Jan", 29],
    ["Feb", 36],
    ["Mar", 47],
    ["Apr", 21],
    ["May", 5],
    ["Jun", 49],
    ["Jul", 37],
    ["Aug", 44],
    ["Sep", 28],
    ["Oct", 9],
    ["Nov", 12],
    ["Dec", 35]
  ]
}],
      barOptions:{
          series: {
              stack: true,
              bars: {
                  align: 'center',
                  lineWidth: 0,
                  show: true,
                  barWidth: 0.6,
                  fill: 0.9
              }
          },
          grid: {
              borderColor: '#eee',
              borderWidth: 1,
              hoverable: true,
              backgroundColor: '#fcfcfc'
          },
          tooltip: true,
          tooltipOpts: {
              content: function (label, x, y) { return x + ' : ' + y; }
          },
          xaxis: {
              tickColor: '#fcfcfc',
              mode: 'categories'
          },
          yaxis: {
              min: 0,
              max: 200, // optional: use it for a clear represetation
              position: ($scope.app.layout.isRTL ? 'right' : 'left'),
              tickColor: '#eee'
          },
          shadowSize: 0
      }
    }


    $scope.incomeByCashCredit = {
      pieData: [{
        label: "מחנכים",
        color: "#4acab4",
        data: 13545
      }, {
        label: "הורים",
        color: "#878bb6",
        data: 5548
      }],
      pieOptions: {
        series: {
          pie: {
            show: true,
            radius: 1
          }
        }
      }
    };
  }
}());
