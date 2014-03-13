'use strict';

angular.module('mean.gpios').controller('GPIOSController', ['$scope', '$stateParams', '$location', 'Authentication', 'GPIOS',
    function($scope, $stateParams, $location, Authentication, GPIOS) {
        $scope.authentication = Authentication;

        $scope.create = function() {

            GPIOS.populate(function(response) {
                response.length--;
                $scope.gpios = response;
            });

            /*this.title = '';
            this.content = '';*/
        };

        $scope.update = function() {
            var gpio = $scope.gpio;

            gpio.$update(function() {
                $location.path('gpios/' + gpio._id);
            });
        };

        $scope.find = function() {
            GPIOS.query(function(gpios) {
                $scope.gpios = gpios;
            });
        };

        $scope.findOne = function() {
            GPIOS.get({
                gpioId: $stateParams.gpioId
            }, function(gpio) {
                $scope.gpio = gpio;
            });
        };
    }
]);