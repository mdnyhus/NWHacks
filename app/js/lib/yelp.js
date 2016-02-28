/* require the modules needed */
var oauthSignature = require('oauth-signature');  
var n = require('nonce')();  
var request = require('request');  
var qs = require('querystring');  
var _ = require('lodash');

var base_url = 'http://api.yelp.com/v2/';

var yelpConsumerKey = 'WBzMfCbIvJwNVkmo1t5U9w';
var yelpConsumerSecret = 'vRzfZJr48KGSjbzsGiibVBD3Uw4';
var yelpToken = '-8WaTixDL_UVTuLvoVPYHujO6vrDbxfw';
var yelpTokenSecret = '4w4z_Uy9axpuzw9ObINTbj1vxdQ';

/* Function for yelp search call
 * ------------------------
 * params: object with params to search
 * callback: callback(error, response, body)
 */
module.exports.yelpSearch = function (params, callback) {
  var httpMethod = 'GET';
  var url = base_url + 'search';

  makeRequestToYelp(httpMethod, url, params, callback);
};

function makeRequestToYelp(method, apiUrl, params, callback) {
  var required_params = {
    oauth_consumer_key : yelpConsumerKey,
    oauth_token : yelpToken,
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };
  var parameters = _.assign(params, required_params);
  var consumerSecret = yelpConsumerSecret;
  var tokenSecret = yelpTokenSecret;
  var signature = oauthSignature.generate(method, apiUrl, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  /* We add the signature to the list of paramters */
  parameters.oauth_signature = signature;

  /* Then we turn the paramters object, to a query string */
  var paramURL = qs.stringify(parameters);
  var apiURL = apiUrl + '?' + paramURL;

  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
    return callback(error, response, body);
  });
}