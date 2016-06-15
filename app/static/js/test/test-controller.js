'use strict';

angular.module('flaskang')
  .controller('TestController', ['$scope', '$modal', 'resolvedTest', 'Test',
    function ($scope, $modal, resolvedTest, Test) {

      $scope.tests = resolvedTest;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.test = Test.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Test.delete({id: id},
          function () {
            $scope.tests = Test.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Test.update({id: id}, $scope.test,
            function () {
              $scope.tests = Test.query();
              $scope.clear();
            });
        } else {
          Test.save($scope.test,
            function () {
              $scope.tests = Test.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.test = {
          
          "toto": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var testSave = $modal.open({
          templateUrl: 'test-save.html',
          controller: 'TestSaveController',
          resolve: {
            test: function () {
              return $scope.test;
            }
          }
        });

        testSave.result.then(function (entity) {
          $scope.test = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('TestSaveController', ['$scope', '$modalInstance', 'test',
    function ($scope, $modalInstance, test) {
      $scope.test = test;

      

      $scope.ok = function () {
        $modalInstance.close($scope.test);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
