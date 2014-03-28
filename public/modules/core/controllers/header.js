'use strict';

angular.module('mean.core').controller('HeaderController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.authentication = Authentication;

        //$scope.displayName = $scope.authentication.user.displayName;

        $scope.menu = [{
            title: 'Miners',
            link: 'miners',
            uiRoute: '/miners'
        },{
            title: 'Add Miner',
            link: 'miners/create',
            uiRoute: '/miners/create'
        },{
            title: 'GPIOs',
            link: 'gpios',
            uiRoute: '/gpios'
        }];

        $scope.isCollapsed = false;

    }
]);