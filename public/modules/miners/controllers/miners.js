'use strict';

angular.module('mean.miners').controller('MinersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Miners',
    function($scope, $stateParams, $location, Authentication, Miners) {
        $scope.authentication = Authentication;

        $scope.create = function() {
            var miner = new Miners({
                name:this.name,
                pcname:this.pcname,
                ip: this.ip,
                port: this.port,
                gpio:this.gpio
            });
            miner.$save(function(response) {
                $location.path('miners/' + response._id);
            });

            this.name = '';
            this.pcname = '';
            this.ip = '';
            this.port = '';
        };

        $scope.remove = function(miner) {
            if (miner) {
                miner.$remove();

                for (var i in $scope.miners) {
                    if ($scope.miners[i] === miner) {
                        $scope.miners.splice(i, 1);
                    }
                }
            } else {
                $scope.miner.$remove(function() {
                    $location.path('miners');
                });
            }
        };

        $scope.update = function() {
            var miner = $scope.miner;

            miner.$update(function() {
                $location.path('miners/' + miner._id);
            });
        };

        $scope.find = function() {
            Miners.query(function(miners) {
                $scope.miners = miners;
            });
        };

        $scope.findOne = function() {
            Miners.get({
                minerId: $stateParams.minerId
            }, function(miner) {
                $scope.miner = miner;
            });
        };

    }
]);