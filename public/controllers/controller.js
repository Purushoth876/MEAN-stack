var myApp = angular.module('myApp', []);


myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function() {
        $http.get('/contactList').then(function (response) {
            console.log(response.data);
            $scope.contactList = response.data;
            //$scope.contact = [];
        });
    }

    refresh();

    $scope.addContact = function () {
        console.log($scope.contact);
        $http.post('/addContact', $scope.contact).then(function(response) {
            console.log("Inserted....");
            refresh();
            $scope.contact = [];
        });
    };

    $scope.deleteContact = function (id) {
        console.log(id);
        $http.delete('/deleteContact/'+id, $scope.contact).then(function(response) {
            console.log("Deleted....");
            refresh();
        });
    }

    $scope.editContact = function (id) {
        console.log(id);
        $http.get('/editContact/'+id, $scope.contact).then(function(response) {
            console.log(response);
            $scope.contact = response.data;
        });
    }

    $scope.updateContact = function () {
        var id = $scope.contact._id;
        $http.put('/updateContact/' + id, $scope.contact).then(function (response) {
            console.log("Updated.....");
            refresh();
            $scope.contact = [];
        });
    }

}]);

