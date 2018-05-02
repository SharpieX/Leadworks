'use strict';

angular.module('libraryApp')
.controller('MainCtrl', function ($scope, $http, $mdDialog) {
  var allBooks = [];
  $scope.query = {
    text: ''
  }

  $http.get('/api/books').then(function (response) {
    $scope.books = response.data;
    allBooks = response.data;
  });

  $scope.getColor = function ($index) {
    var _d = ($index + 1) % 11;
    var bg = '';

    switch (_d) {
      case 1:
        bg = 'red';
        break;
      case 2:
        bg = 'green';
        break;
      case 3:
        bg = 'darkBlue';
        break;
      case 4:
        bg = 'blue';
        break;
      case 5:
        bg = 'yellow';
        break;
      case 6:
        bg = 'pink';
        break;
      case 7:
        bg = 'darkBlue';
        break;
      case 8:
        bg = 'purple';
        break;
      case 9:
        bg = 'deepBlue';
        break;
      case 10:
        bg = 'lightPurple';
        break;
      default:
        bg = 'yellow';
        break;
    }

    return bg;
  };


  $scope.deleteBook = function (book) {
    $http.delete('/api/books/' + book._id);
  };


  $scope.showAddDialog = function ($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      controller: function ($scope, $mdDialog) {
        $scope.cancel = function () {
          $mdDialog.cancel();
        };

        $scope.submit = function () {
          $mdDialog.hide();
          console.log($scope.book);
          $http.post('/api/books/add', $scope.book).then(function (response) {
            if(response.status){
              $scope.books.push(response.data)
              allBooks.push(response.data);
            } else {
              alert('Something bad happend');
            }
          });
        };
      },
      parent: parentEl,
      targetEvent: $event,
      clickOutsideToClose: true,
      templateUrl: 'components/shell/dialog/dialog.html'
    });
  };


  $scope.find = function () {

    if ($scope.query.text) {
      $http({
        method: 'GET',
        url: '/api/books/find',
        params: {text:$scope.query.text}
      }).then(function (response) {
        if (response.status === 200 && response.data && response.data.books && response.data.books.length) {
          $scope.books = response.data.books;

        }
      })
    } else {
      $scope.books = allBooks;
    }
  }

});
