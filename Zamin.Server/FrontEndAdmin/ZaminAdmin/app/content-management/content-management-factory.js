(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name contentManagement.factory:ContentManagement
   *
   * @description
   *
   */
  angular
    .module('contentManagement')
    .factory('ContentManagement', ContentManagement);

  function ContentManagement() {
    var ContentManagementBase = {};
    ContentManagementBase.someValue = 'ContentManagement';
    ContentManagementBase.someMethod = function () {
      return 'ContentManagement';
    };
    return ContentManagementBase;
  }
}());
