'use strict';

angular.module('mean.miners').controller('MinersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Miners','GPIOS','WatcherService',
    function($scope, $stateParams, $location, Authentication, Miners, GPIOS, WatcherSrv) {
        $scope.authentication = Authentication;

        $scope.$on('gpioUpdate',function(e,gpio){
            console.log('GPIOS:',gpio);
            for (var i in $scope.miners) {
                var miner = $scope.miners[i];

                if (typeof miner.gpio !== 'undefined' && miner.gpio !== null && miner.gpio._id === gpio._id) {

                    $scope.$apply(function(){
                        $scope.miners[i].gpio = gpio;
                    });
                    break;
                }
            }
        });

        $scope.IOReset = function(miner) {

            GPIOS.reset(miner.gpio, function(response) {

            });

        };

        $scope.IOPowerOn = function(miner) {

            GPIOS.poweroff(miner.gpio, function(response) {

            });


        };

        $scope.IOPowerOff = function(miner) {

            GPIOS.poweron(miner.gpio, function(response) {

            });


        };

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