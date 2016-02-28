'use strict';

/**
 * Angular ui.router file
 */
angular.module('EventApp')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            });

        $urlRouterProvider.otherwise('/');
    });