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
        $scope.mainCategories = [];
        $scope.dropDownCategories = [];
        $scope.selectedCategories = [];

        $scope.add = function(category) {
            $scope.selectedCategories.push(category);
        };

        $scope.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
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

        var parameters = yelpParams({location: 'San+Francisc', term: 'food'});

        $http({
            method: 'GET',
            url: 'http://api.yelp.com/v2/search',
            params: parameters
        }).then(function(res) {
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
            for (var i = 0; i < 10; i++) {
                $scope.mainCategories.push(res.data.category[i]);
            }
            for (i = 10; i < res.data.category.length; i++) {
                $scope.dropDownCategories.push(res.data.category[i]);
            }
        });
    });
