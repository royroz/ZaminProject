/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('CategoriesCtrl', function () {
  var ctrl;

  beforeEach(module('categories'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('CategoriesCtrl');
  }));

  it('should have ctrlName as CategoriesCtrl', function () {
    expect(ctrl.ctrlName).toEqual('CategoriesCtrl');
  });
});
