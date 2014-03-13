'use strict';

angular.module('mean.core').controller('HeaderController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.authentication = Authentication;

        $scope.menu = [{
            title: 'Articles',
            link: 'articles',
            uiRoute: '/articles'
        }, {
            title: 'New Article',
            link: 'articles/create',
            uiRoute: '/articles/create'
        }, {
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