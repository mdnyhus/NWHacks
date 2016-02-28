'use strict';

/**
 * # MainCtrl
 */
angular.module('EventApp')
    .controller('MainCtrl', function ($scope, $http, eventfulKey) {
        $http.get('http://api.eventful.com/rest/events/search?app_key=' + eventfulKey + 'keywords=books&location=San+Diego&date=Future')
            .then(function(res) {
                console.log(res);
            });
    });