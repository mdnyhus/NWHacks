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
        $scope.selectedCategories = [];

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

        var yelpSearchParams = {
            location: $scope.locationCity,
            term: 'food',
            limit: 10,
            sort: 2, 
        }
        var yelpParams = yelpGenParams(yelpSearchParams);

        $http({
            method: 'GET',
            url: 'http://api.yelp.com/v2/search',
            params: parameters
        }).then(function(res) {
            console.log(res.data);
            $scope.yelpRet = res;
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
