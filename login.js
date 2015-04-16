var loginApp = angular.module('loginApp', []);

loginApp.controller('mainController', function($scope, $http) {

  $scope.submit_login = function(login_data, result_var) {
    var config = {};

    var authdata = $.base64.encode(login_data.login + ':' + login_data.password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
    $http.get("http://localhost:3000/api/auth", null, config)
      .success(function (data, status, headers, config)
      {
        $scope['response_data'] = data;
        $scope['auth_token'] = data["auth_token"];
      })
      .error(function (data, status, headers)
      {
        $scope['response_data'] = "SUBMIT ERROR";
      });
  };

  $scope.submit_services = function() {
    delete $http.defaults.headers.common['Authorization']
    $http.defaults.headers.common['X-Auth-Token'] = $scope['auth_token']
    $http.get("http://localhost:3000/api/services?expand=resources", null)
      .success(function (data, status, headers)
      {
        $scope['response_data'] = data;
        $scope['services'] = data['resources'];
      })
  }
});
