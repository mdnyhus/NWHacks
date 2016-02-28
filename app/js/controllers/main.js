'use strict';

/**
 * # MainCtrl
 */
angular.module('EventApp')
    .controller('MainCtrl', function ($scope, $http, eventfulKey) {
        //$http.get('http://api.eventful.com/rest/events/search?app_key=' + eventfulKey +
        //    '&q=music&where=San%20Diego' + '' +
        //    '&date=2015061000-2016062000&include=tags%2Ccategories&page_size=5&sort_order=popularity')
        //    .then(function(res) {
        //        $scope.data = res.data;
        //    });

        $http({
            method: 'GET',
            url: 'http://api.eventful.com/rest/events/search',
            params: {
                app_key: eventfulKey,
                q: 'music',
                where: 'San Diego',
                date: '2015061000-2016062000'
            }
        }).then(function(res) {
            $scope.data = res;
        });
    });