/*
Copyright (c) 2012 Timothy J Fontaine <tjfontaine@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var https = require('https'),
    util = require('util');

"use strict";

var options = {
  host: 'api.linode.com',
  port: 443,
  path: '/?api_action=api.spec',
  method: 'GET',
};

var data;

var req = https.request(options, function(res) {
  res.setEncoding('utf8');
  
  res.on('data', function (chunk) {
    if (!data) {
      data = chunk;
    } else {
      data += chunk
    }
  });

  res.on('end', function () {
    var s = JSON.parse(data);
    parseMethods(s.DATA.METHODS);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();

var parseMethods = function (methods) {
  var api = [];
  
  api.push('var LINODE_API_HOST = "api.linode.com";');
  api.push('var LINODE_API_BASE = "https://" + LINODE_API_HOST + "/";');
  api.push('');
  api.push('var LinodeApi = function (key) {');
  api.push('  if (!(this instanceof LinodeApi)) return new LinodeApi(key);');
  api.push('');
  api.push('  this._formRequest = function (obj) {');
  api.push('    obj.api_key = key;');
  api.push('    obj.api_responseFormat = "json";');
  api.push('    return obj;');
  api.push('  };');
  api.push('  this.jQuery = function (obj, cb) {');
  api.push('    return jQuery.post(LINODE_API_BASE, obj, cb, "json");');
  api.push('  };');
  api.push('  this.node = function (obj, cb) {');
  api.push('    var querystring = require("querystring");');
  api.push('    var data = querystring.stringify(this._formRequest(obj));');
  api.push('    var opts = {');
  api.push('      host: LINODE_API_HOST,');
  api.push('      path: "/",');
  api.push('      method: "POST",');
  api.push('      headers: {');
  api.push('        "Content-Type": "application/x-www-form-urlencoded",');
  api.push('        "Content-Length": data.length,');
  api.push('      },');
  api.push('    };');
  api.push('    var req = require("https").request(opts, function (res) {');
  api.push('      var response = "";');
  api.push('      res.on("data", function (d) { response += d; } );');
  api.push('      res.on("end", function () { cb(JSON.parse(response)); });');
  api.push('    });');
  api.push('    req.write(data);');
  api.push('    req.end()');
  api.push('  };');
  api.push('  if (typeof module !== "undefined" && module.exports && require("https"))');
  api.push('    this.send = this.node;');
  api.push('  else');
  api.push('    this.send = this.jQuery;');
  api.push('};');

  Object.keys(methods).sort().forEach(function (m) {
    var method, body, func, mname;

    mname = m.replace(/\./g, '_');
    method = methods[m];
    body = [];

    api.push('');

    Object.keys(method.PARAMETERS).forEach(function (p) {
      var parameter = method.PARAMETERS[p];
      p = p.toLowerCase();
      if (parameter.REQUIRED) {
        body.push('  if (!obj["'+ p + '"])');
        body.push('    throw new Error("'+ p +' Is a required argument");');
        body.push('  else {');
      } else {
        body.push('  if (obj["'+ p + '"]) {');
      }

      switch (parameter.TYPE) {
        case 'numeric':
          body.push('    obj["'+ p + '"] = new Number(obj["'+ p +'"]);');
          body.push('    if (isNaN(obj["'+ p + '"])) throw new Error("'+ p +' Must be a valid number");');
          break;
        case 'boolean':
          body.push('    obj["'+ p + '"] = new Boolean(obj["' + p + '"]);');
          break;
        case 'string':
          body.push('    obj["' + p + '"] = new String(obj["' + p + '"]);');
          break;
      }

      body.push('    obj["' + p + '"] = obj["' + p + '"].toString();');
      body.push('  }');
      body.push('  ');
    });

    body.push('  obj.api_action = "' + m + '";');
    body.push('  return this.send(obj, cb);');

    api.push('LinodeApi.prototype.' + mname + ' = function (obj, cb) {');
    //func = new Function('obj', 'cb', body.join('\n'));
    //api.prototype[mname] = func;
    api = api.concat(body);
    api.push('};');
    api.push('');
  });
  api.push('if (typeof module !== "undefined" && module.exports) module.exports = LinodeApi;');
  console.log(api.join('\n'));
};
