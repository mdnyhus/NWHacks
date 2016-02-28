'use strict';

/**
 * # MainCtrl
 */
angular.module('EventApp')
    .controller('MainCtrl', function ($scope, $http, eventfulKey) {
        $scope.chosenDate = new Date();
        $scope.chosenStartTime = moment();
        $scope.twoHoursFromNow = moment().add(2, 'hour');
        $scope.locationCity = 'Vancouver';
        $scope.allCategories = [];

        $scope.add = function(category) {
            $scope.allCategories.splice($scope.allCategories.indexOf(category), 1);
            $scope.selectedCategories.push(category);
        };

        $scope.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        $http({
            method: 'GET',
            url: 'http://api.eventful.com/json/events/search',
            params: {
                app_key: eventfulKey,
                q: 'music',
                where: 'San Diego',
                date: '2015061000-2016062000'
            }
        }).then(function(res) {
            $scope.data = res;
        });

        $http({
            method: 'GET',
            url: 'http://api.eventful.com/json/categories/list',
            params: {
                app_key: eventfulKey,
                where: $scope.locationCity,
                date: $scope.chosenDate,
                sort_order: 'popularity'
            }
        }).then(function(res) {
            $scope.allCategories = res.data.category;
        });
    });
