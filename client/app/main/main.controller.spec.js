'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('libraryApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/books')
      .respond([]);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of books to the scope', function () {
    $httpBackend.flush();
    expect(scope.books.length).toBe(5);
  });
});
