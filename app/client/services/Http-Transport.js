module.exports = HttpTransport;

var Promise    = require('bluebird');
var httpInvoke = require('httpinvoke');
var debug      = require('debug')('HttpTransport');

/**
 * Implement the HTTP verbs via a simple interface
 *
 * Currently doesn't handle cookies explicitly, relying on the browser to deal
 * with them, and thus would require some sort of cookie-jar handling via
 * checking the set-cookie header (only visible on the server)
 * @constructor
 */
function HttpTransport()
{

}

/**
 * @private
 */
function wrapResponse(thenable)
{
  return Promise.resolve(thenable);
}

/**
 * @private
 */
function deserialize(resp)
{
  if (!resp || !resp.headers) return resp;
  var type = resp.headers['content-type'];
  if(type && ~type.indexOf('application/json')){
    try{
      resp.body = JSON.parse(resp.body);
    }catch(e){
      debug('Unable to parse JSON response');
    }
  }
  return resp;
}

/**
 * @private
 */
function serialize(data)
{
  return JSON.stringify(data);
}

/**
 * Execute a `GET` request.
 *
 * Will parse JSON data if the `content-type: application/json` response header
 * is set
 * @param {string} url
 * @param {object.<string,any>=} params
 * @return {Promise}
 */
HttpTransport.prototype.get = function(url, params)
{
  params = params || {};
  debug('GET %s', url);
  var abort = httpInvoke(url, 'GET', { input: serialize(params) })
    .then(deserialize);

  return wrapResponse(abort);
};

/**
 * Execute a `POST` request
 *
 * @param {string} url
 * @param {object.<string,any>=} data
 * @return {Promise}
 */
HttpTransport.prototype.post = function(url, data)
{
  debug('POST %s', url);
  var abort = httpInvoke(url, 'POST', {
    input: serialize(data),
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  }).then(deserialize);

  return wrapResponse(abort);
};

/**
 * Execute a `POST` request with just a file
 *
 * @return {Promise}
 */
HttpTransport.prototype.postFile = function(url, file)
{
  debug('POST file %s', url);

  //$5 to whoever can get httpInvoke working with an upload
  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    var fd = new FormData();

    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var headers = {};
          headers['content-type'] = this.getResponseHeader('content-type');
          var resp = {
            headers: headers,
            body: xhr.responseText
          };
          resolve(deserialize(resp)); // handle response.
        }
    };
    fd.append('file', file);

    //xhr.addEventListener("load", transferComplete, false);
    xhr.addEventListener("error", function(e){
      reject('Upload Failed ' + e.toString());
    }, false);
    xhr.addEventListener("abort", function(e){
      reject('Upload Cancelled ' + e.toString());
    }, false);
    // Initiate a multipart/form-data upload
    xhr.send(fd);

  });

};

/**
 * Execute a `PUT` request
 *
 * Sends data as `content-type: application/x-www-form-urlencoded`.
 * @param {string} url
 * @param {object.<string,any>=} data
 * @return {Promise}
 */
HttpTransport.prototype.put = function(url, data)
{
  debug('PUT %s', url);
  var abort = httpInvoke(url, 'PUT', {
    input: serialize(data),
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });

  return wrapResponse(abort);
};

/**
 * Execute a `DELETE` request
 * @param {string} url
 * @param {object.<string,any>=} params
 * @return {Promise}
 */
HttpTransport.prototype.del = function(url, params)
{
  params = params || {};

  debug('DELETE %s', url);
  var abort = httpInvoke(url, 'DELETE', { input: serialize(params) });

  return wrapResponse(abort);
};

