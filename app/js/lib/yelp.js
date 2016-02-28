randomString = function(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

/* Function for generating yelp parameters
 * params: object with params to search
 */
yelpGenParams = function (params) {
  var url = 'http://api.yelp.com/v2/search';
  var method = 'GET';
  parameters = params;
  parameters['oauth_consumer_key'] = 'WBzMfCbIvJwNVkmo1t5U9w';
  parameters['oauth_token'] = 'A6Lg6U4EhOsYspzFFusS9SaBFmeH8b_H';
  parameters['oauth_signature_method'] = "HMAC-SHA1";
  parameters['oauth_nonce'] = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  parameters['oauth_timestamp'] = new Date().getTime();

  var consumerSecret = 'vRzfZJr48KGSjbzsGiibVBD3Uw4';
  var tokenSecret = 'nPzk0xbRgKf9ljaVceS2s16jmyk';
  var signature = oauthSignature.generate(method, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  parameters['oauth_signature'] = signature;

  return parameters;
}