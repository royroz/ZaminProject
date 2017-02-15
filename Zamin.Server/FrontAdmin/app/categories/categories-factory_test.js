/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Categories', function () {
  var factory;

  beforeEach(module('categories'));

  beforeEach(inject(function (Categories) {
    factory = Categories;
  }));

  it('should have someValue be Categories', function () {
    expect(factory.someValue).toEqual('Categories');
  });

  it('should have someMethod return Categories', function () {
    expect(factory.someMethod()).toEqual('Categories');
  });
});
