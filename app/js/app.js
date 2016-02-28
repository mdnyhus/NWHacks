'use strict';

/**
 * Main module of the application.
 */
angular.module('EventApp', [
    'ui.router',
    'firebase',
    'ngMaterial'
])
.constant('firebaseUrl', 'https://nwhacks2016.firebaseio.com/')
.constant('eventfulApiKey', 'wKZhJ3S2hDDLHtD5')
.constant('yelpApiKey', 'SoLwK5jLDVspCB1x1wkKnA')
.factory('rootRef', function(firebaseUrl) {
    return new Firebase(firebaseUrl);
});