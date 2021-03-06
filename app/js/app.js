'use strict';

/**
 * Main module of the application.
 */
angular.module('EventApp', [
    'ui.router',
    'firebase',
    'ngMaterial',
    'ngMaterialDatePicker'
])
.constant('firebaseUrl', 'https://nwhacks2016.firebaseio.com/')
.constant('eventfulKey', 'wKZhJ3S2hDDLHtD5')
.factory('rootRef', function(firebaseUrl) {
    return new Firebase(firebaseUrl);
});