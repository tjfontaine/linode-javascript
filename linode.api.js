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

var LINODE_API_HOST = "api.linode.com";
var LINODE_API_BASE = "https://" + LINODE_API_HOST + "/";

var LinodeApi = function (key) {
  if (!(this instanceof LinodeApi)) return new LinodeApi(key);

  this._formRequest = function (obj) {
    obj.api_key = key;
    obj.api_responseFormat = "json";
    return obj;
  };
  this.jQuery = function (obj, cb) {
    return jQuery.post(LINODE_API_BASE, obj, cb, "json");
  };
  this.node = function (obj, cb) {
    var querystring = require("querystring");
    var data = querystring.stringify(this._formRequest(obj));
    var opts = {
      host: LINODE_API_HOST,
      path: "/",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": data.length,
      },
    };
    var req = require("https").request(opts, function (res) {
      var response = "";
      res.on("data", function (d) { response += d; } );
      res.on("end", function () { cb(JSON.parse(response)); });
    });
    req.write(data);
    req.end()
  };
  if (typeof module !== "undefined" && module.exports && require("https"))
    this.send = this.node;
  else
    this.send = this.jQuery;
};

LinodeApi.prototype.account_info = function (obj, cb) {
  obj.api_action = "account.info";
  return this.send(obj, cb);
};


LinodeApi.prototype.api_spec = function (obj, cb) {
  if (obj["newerthan"]) {
    obj["newerthan"] = new Number(obj["newerthan"]);
    if (isNaN(obj["newerthan"])) throw new Error("newerthan Must be a valid number");
    obj["newerthan"] = obj["newerthan"].toString();
  }
  
  obj.api_action = "api.spec";
  return this.send(obj, cb);
};


LinodeApi.prototype.avail_datacenters = function (obj, cb) {
  obj.api_action = "avail.datacenters";
  return this.send(obj, cb);
};


LinodeApi.prototype.avail_distributions = function (obj, cb) {
  if (obj["distributionid"]) {
    obj["distributionid"] = new Number(obj["distributionid"]);
    if (isNaN(obj["distributionid"])) throw new Error("distributionid Must be a valid number");
    obj["distributionid"] = obj["distributionid"].toString();
  }
  
  obj.api_action = "avail.distributions";
  return this.send(obj, cb);
};


LinodeApi.prototype.avail_kernels = function (obj, cb) {
  if (obj["isxen"]) {
    obj["isxen"] = new Boolean(obj["isxen"]);
    obj["isxen"] = obj["isxen"].toString();
  }
  
  if (obj["kernelid"]) {
    obj["kernelid"] = new Number(obj["kernelid"]);
    if (isNaN(obj["kernelid"])) throw new Error("kernelid Must be a valid number");
    obj["kernelid"] = obj["kernelid"].toString();
  }
  
  obj.api_action = "avail.kernels";
  return this.send(obj, cb);
};


LinodeApi.prototype.avail_linodeplans = function (obj, cb) {
  if (!obj["planid"])
    throw new Error("planid Is a required argument");
  else {
    obj["planid"] = new Number(obj["planid"]);
    if (isNaN(obj["planid"])) throw new Error("planid Must be a valid number");
    obj["planid"] = obj["planid"].toString();
  }
  
  obj.api_action = "avail.linodeplans";
  return this.send(obj, cb);
};


LinodeApi.prototype.avail_stackscripts = function (obj, cb) {
  if (obj["keywords"]) {
    obj["keywords"] = new String(obj["keywords"]);
    obj["keywords"] = obj["keywords"].toString();
  }
  
  if (obj["distributionid"]) {
    obj["distributionid"] = new Number(obj["distributionid"]);
    if (isNaN(obj["distributionid"])) throw new Error("distributionid Must be a valid number");
    obj["distributionid"] = obj["distributionid"].toString();
  }
  
  if (obj["distributionvendor"]) {
    obj["distributionvendor"] = new String(obj["distributionvendor"]);
    obj["distributionvendor"] = obj["distributionvendor"].toString();
  }
  
  obj.api_action = "avail.stackscripts";
  return this.send(obj, cb);
};


LinodeApi.prototype.domain_create = function (obj, cb) {
  if (obj["soa_email"]) {
    obj["soa_email"] = new String(obj["soa_email"]);
    obj["soa_email"] = obj["soa_email"].toString();
  }
  
  if (obj["description"]) {
    obj["description"] = new String(obj["description"]);
    obj["description"] = obj["description"].toString();
  }
  
  if (obj["ttl_sec"]) {
    obj["ttl_sec"] = new Number(obj["ttl_sec"]);
    if (isNaN(obj["ttl_sec"])) throw new Error("ttl_sec Must be a valid number");
    obj["ttl_sec"] = obj["ttl_sec"].toString();
  }
  
  if (obj["expire_sec"]) {
    obj["expire_sec"] = new Number(obj["expire_sec"]);
    if (isNaN(obj["expire_sec"])) throw new Error("expire_sec Must be a valid number");
    obj["expire_sec"] = obj["expire_sec"].toString();
  }
  
  if (obj["retry_sec"]) {
    obj["retry_sec"] = new Number(obj["retry_sec"]);
    if (isNaN(obj["retry_sec"])) throw new Error("retry_sec Must be a valid number");
    obj["retry_sec"] = obj["retry_sec"].toString();
  }
  
  if (!obj["domain"])
    throw new Error("domain Is a required argument");
  else {
    obj["domain"] = new String(obj["domain"]);
    obj["domain"] = obj["domain"].toString();
  }
  
  if (obj["status"]) {
    obj["status"] = new Number(obj["status"]);
    if (isNaN(obj["status"])) throw new Error("status Must be a valid number");
    obj["status"] = obj["status"].toString();
  }
  
  if (!obj["type"])
    throw new Error("type Is a required argument");
  else {
    obj["type"] = new String(obj["type"]);
    obj["type"] = obj["type"].toString();
  }
  
  if (obj["axfr_ips"]) {
    obj["axfr_ips"] = new String(obj["axfr_ips"]);
    obj["axfr_ips"] = obj["axfr_ips"].toString();
  }
  
  if (obj["master_ips"]) {
    obj["master_ips"] = new String(obj["master_ips"]);
    obj["master_ips"] = obj["master_ips"].toString();
  }
  
  if (obj["refresh_sec"]) {
    obj["refresh_sec"] = new Number(obj["refresh_sec"]);
    if (isNaN(obj["refresh_sec"])) throw new Error("refresh_sec Must be a valid number");
    obj["refresh_sec"] = obj["refresh_sec"].toString();
  }
  
  obj.api_action = "domain.create";
  return this.send(obj, cb);
};


LinodeApi.prototype.domain_delete = function (obj, cb) {
  if (!obj["domainid"])
    throw new Error("domainid Is a required argument");
  else {
    obj["domainid"] = new Number(obj["domainid"]);
    if (isNaN(obj["domainid"])) throw new Error("domainid Must be a valid number");
    obj["domainid"] = obj["domainid"].toString();
  }
  
  obj.api_action = "domain.delete";
  return this.send(obj, cb);
};


LinodeApi.prototype.domain_list = function (obj, cb) {
  if (obj["domainid"]) {
    obj["domainid"] = new Number(obj["domainid"]);
    if (isNaN(obj["domainid"])) throw new Error("domainid Must be a valid number");
    obj["domainid"] = obj["domainid"].toString();
  }
  
  obj.api_action = "domain.list";
  return this.send(obj, cb);
};


LinodeApi.prototype.domain_resource_create = function (obj, cb) {
  if (obj["port"]) {
    obj["port"] = new Number(obj["port"]);
    if (isNaN(obj["port"])) throw new Error("port Must be a valid number");
    obj["port"] = obj["port"].toString();
  }
  
  if (obj["name"]) {
    obj["name"] = new String(obj["name"]);
    obj["name"] = obj["name"].toString();
  }
  
  if (obj["weight"]) {
    obj["weight"] = new Number(obj["weight"]);
    if (isNaN(obj["weight"])) throw new Error("weight Must be a valid number");
    obj["weight"] = obj["weight"].toString();
  }
  
  if (obj["ttl_sec"]) {
    obj["ttl_sec"] = new Number(obj["ttl_sec"]);
    if (isNaN(obj["ttl_sec"])) throw new Error("ttl_sec Must be a valid number");
    obj["ttl_sec"] = obj["ttl_sec"].toString();
  }
  
  if (obj["priority"]) {
    obj["priority"] = new Number(obj["priority"]);
    if (isNaN(obj["priority"])) throw new Error("priority Must be a valid number");
    obj["priority"] = obj["priority"].toString();
  }
  
  if (obj["target"]) {
    obj["target"] = new String(obj["target"]);
    obj["target"] = obj["target"].toString();
  }
  
  if (obj["protocol"]) {
    obj["protocol"] = new String(obj["protocol"]);
    obj["protocol"] = obj["protocol"].toString();
  }
  
  obj.api_action = "domain.resource.create";
  return this.send(obj, cb);
};


LinodeApi.prototype.domain_resource_delete = function (obj, cb) {
  if (!obj["domainid"])
    throw new Error("domainid Is a required argument");
  else {
    obj["domainid"] = new Number(obj["domainid"]);
    if (isNaN(obj["domainid"])) throw new Error("domainid Must be a valid number");
    obj["domainid"] = obj["domainid"].toString();
  }
  
  if (!obj["resourceid"])
    throw new Error("resourceid Is a required argument");
  else {
    obj["resourceid"] = new Number(obj["resourceid"]);
    if (isNaN(obj["resourceid"])) throw new Error("resourceid Must be a valid number");
    obj["resourceid"] = obj["resourceid"].toString();
  }
  
  obj.api_action = "domain.resource.delete";
  return this.send(obj, cb);
};


LinodeApi.prototype.domain_resource_list = function (obj, cb) {
  if (!obj["domainid"])
    throw new Error("domainid Is a required argument");
  else {
    obj["domainid"] = new Number(obj["domainid"]);
    if (isNaN(obj["domainid"])) throw new Error("domainid Must be a valid number");
    obj["domainid"] = obj["domainid"].toString();
  }
  
  if (obj["resourceid"]) {
    obj["resourceid"] = new Number(obj["resourceid"]);
    if (isNaN(obj["resourceid"])) throw new Error("resourceid Must be a valid number");
    obj["resourceid"] = obj["resourceid"].toString();
  }
  
  obj.api_action = "domain.resource.list";
  return this.send(obj, cb);
};


LinodeApi.prototype.domain_resource_update = function (obj, cb) {
  if (!obj["domainid"])
    throw new Error("domainid Is a required argument");
  else {
    obj["domainid"] = new Number(obj["domainid"]);
    if (isNaN(obj["domainid"])) throw new Error("domainid Must be a valid number");
    obj["domainid"] = obj["domainid"].toString();
  }
  
  if (obj["port"]) {
    obj["port"] = new Number(obj["port"]);
    if (isNaN(obj["port"])) throw new Error("port Must be a valid number");
    obj["port"] = obj["port"].toString();
  }
  
  if (obj["name"]) {
    obj["name"] = new String(obj["name"]);
    obj["name"] = obj["name"].toString();
  }
  
  if (!obj["resourceid"])
    throw new Error("resourceid Is a required argument");
  else {
    obj["resourceid"] = new Number(obj["resourceid"]);
    if (isNaN(obj["resourceid"])) throw new Error("resourceid Must be a valid number");
    obj["resourceid"] = obj["resourceid"].toString();
  }
  
  if (obj["weight"]) {
    obj["weight"] = new Number(obj["weight"]);
    if (isNaN(obj["weight"])) throw new Error("weight Must be a valid number");
    obj["weight"] = obj["weight"].toString();
  }
  
  if (obj["ttl_sec"]) {
    obj["ttl_sec"] = new Number(obj["ttl_sec"]);
    if (isNaN(obj["ttl_sec"])) throw new Error("ttl_sec Must be a valid number");
    obj["ttl_sec"] = obj["ttl_sec"].toString();
  }
  
  if (obj["priority"]) {
    obj["priority"] = new Number(obj["priority"]);
    if (isNaN(obj["priority"])) throw new Error("priority Must be a valid number");
    obj["priority"] = obj["priority"].toString();
  }
  
  if (obj["target"]) {
    obj["target"] = new String(obj["target"]);
    obj["target"] = obj["target"].toString();
  }
  
  if (obj["protocol"]) {
    obj["protocol"] = new String(obj["protocol"]);
    obj["protocol"] = obj["protocol"].toString();
  }
  
  obj.api_action = "domain.resource.update";
  return this.send(obj, cb);
};


LinodeApi.prototype.domain_update = function (obj, cb) {
  if (!obj["domainid"])
    throw new Error("domainid Is a required argument");
  else {
    obj["domainid"] = new Number(obj["domainid"]);
    if (isNaN(obj["domainid"])) throw new Error("domainid Must be a valid number");
    obj["domainid"] = obj["domainid"].toString();
  }
  
  if (obj["soa_email"]) {
    obj["soa_email"] = new String(obj["soa_email"]);
    obj["soa_email"] = obj["soa_email"].toString();
  }
  
  if (obj["description"]) {
    obj["description"] = new String(obj["description"]);
    obj["description"] = obj["description"].toString();
  }
  
  if (obj["ttl_sec"]) {
    obj["ttl_sec"] = new Number(obj["ttl_sec"]);
    if (isNaN(obj["ttl_sec"])) throw new Error("ttl_sec Must be a valid number");
    obj["ttl_sec"] = obj["ttl_sec"].toString();
  }
  
  if (obj["expire_sec"]) {
    obj["expire_sec"] = new Number(obj["expire_sec"]);
    if (isNaN(obj["expire_sec"])) throw new Error("expire_sec Must be a valid number");
    obj["expire_sec"] = obj["expire_sec"].toString();
  }
  
  if (obj["retry_sec"]) {
    obj["retry_sec"] = new Number(obj["retry_sec"]);
    if (isNaN(obj["retry_sec"])) throw new Error("retry_sec Must be a valid number");
    obj["retry_sec"] = obj["retry_sec"].toString();
  }
  
  if (obj["domain"]) {
    obj["domain"] = new String(obj["domain"]);
    obj["domain"] = obj["domain"].toString();
  }
  
  if (obj["status"]) {
    obj["status"] = new Number(obj["status"]);
    if (isNaN(obj["status"])) throw new Error("status Must be a valid number");
    obj["status"] = obj["status"].toString();
  }
  
  if (obj["type"]) {
    obj["type"] = new String(obj["type"]);
    obj["type"] = obj["type"].toString();
  }
  
  if (obj["axfr_ips"]) {
    obj["axfr_ips"] = new String(obj["axfr_ips"]);
    obj["axfr_ips"] = obj["axfr_ips"].toString();
  }
  
  if (obj["master_ips"]) {
    obj["master_ips"] = new String(obj["master_ips"]);
    obj["master_ips"] = obj["master_ips"].toString();
  }
  
  if (obj["refresh_sec"]) {
    obj["refresh_sec"] = new Number(obj["refresh_sec"]);
    if (isNaN(obj["refresh_sec"])) throw new Error("refresh_sec Must be a valid number");
    obj["refresh_sec"] = obj["refresh_sec"].toString();
  }
  
  obj.api_action = "domain.update";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_boot = function (obj, cb) {
  if (obj["configid"]) {
    obj["configid"] = new Number(obj["configid"]);
    if (isNaN(obj["configid"])) throw new Error("configid Must be a valid number");
    obj["configid"] = obj["configid"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  obj.api_action = "linode.boot";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_config_create = function (obj, cb) {
  if (obj["rootdevicecustom"]) {
    obj["rootdevicecustom"] = new String(obj["rootdevicecustom"]);
    obj["rootdevicecustom"] = obj["rootdevicecustom"].toString();
  }
  
  if (obj["comments"]) {
    obj["comments"] = new String(obj["comments"]);
    obj["comments"] = obj["comments"].toString();
  }
  
  if (obj["devtmpfs_automount"]) {
    obj["devtmpfs_automount"] = new Boolean(obj["devtmpfs_automount"]);
    obj["devtmpfs_automount"] = obj["devtmpfs_automount"].toString();
  }
  
  if (!obj["label"])
    throw new Error("label Is a required argument");
  else {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (obj["helper_disableupdatedb"]) {
    obj["helper_disableupdatedb"] = new Boolean(obj["helper_disableupdatedb"]);
    obj["helper_disableupdatedb"] = obj["helper_disableupdatedb"].toString();
  }
  
  if (obj["disklist"]) {
    obj["disklist"] = new String(obj["disklist"]);
    obj["disklist"] = obj["disklist"].toString();
  }
  
  if (obj["runlevel"]) {
    obj["runlevel"] = new String(obj["runlevel"]);
    obj["runlevel"] = obj["runlevel"].toString();
  }
  
  if (obj["rootdevicero"]) {
    obj["rootdevicero"] = new Boolean(obj["rootdevicero"]);
    obj["rootdevicero"] = obj["rootdevicero"].toString();
  }
  
  if (obj["rootdevicenum"]) {
    obj["rootdevicenum"] = new Number(obj["rootdevicenum"]);
    if (isNaN(obj["rootdevicenum"])) throw new Error("rootdevicenum Must be a valid number");
    obj["rootdevicenum"] = obj["rootdevicenum"].toString();
  }
  
  if (obj["helper_xen"]) {
    obj["helper_xen"] = new Boolean(obj["helper_xen"]);
    obj["helper_xen"] = obj["helper_xen"].toString();
  }
  
  if (obj["ramlimit"]) {
    obj["ramlimit"] = new Number(obj["ramlimit"]);
    if (isNaN(obj["ramlimit"])) throw new Error("ramlimit Must be a valid number");
    obj["ramlimit"] = obj["ramlimit"].toString();
  }
  
  if (!obj["kernelid"])
    throw new Error("kernelid Is a required argument");
  else {
    obj["kernelid"] = new Number(obj["kernelid"]);
    if (isNaN(obj["kernelid"])) throw new Error("kernelid Must be a valid number");
    obj["kernelid"] = obj["kernelid"].toString();
  }
  
  if (obj["helper_depmod"]) {
    obj["helper_depmod"] = new Boolean(obj["helper_depmod"]);
    obj["helper_depmod"] = obj["helper_depmod"].toString();
  }
  
  obj.api_action = "linode.config.create";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_config_delete = function (obj, cb) {
  if (!obj["configid"])
    throw new Error("configid Is a required argument");
  else {
    obj["configid"] = new Number(obj["configid"]);
    if (isNaN(obj["configid"])) throw new Error("configid Must be a valid number");
    obj["configid"] = obj["configid"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  obj.api_action = "linode.config.delete";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_config_list = function (obj, cb) {
  if (obj["configid"]) {
    obj["configid"] = new Number(obj["configid"]);
    if (isNaN(obj["configid"])) throw new Error("configid Must be a valid number");
    obj["configid"] = obj["configid"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  obj.api_action = "linode.config.list";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_config_update = function (obj, cb) {
  if (obj["rootdevicecustom"]) {
    obj["rootdevicecustom"] = new String(obj["rootdevicecustom"]);
    obj["rootdevicecustom"] = obj["rootdevicecustom"].toString();
  }
  
  if (obj["comments"]) {
    obj["comments"] = new String(obj["comments"]);
    obj["comments"] = obj["comments"].toString();
  }
  
  if (obj["devtmpfs_automount"]) {
    obj["devtmpfs_automount"] = new Boolean(obj["devtmpfs_automount"]);
    obj["devtmpfs_automount"] = obj["devtmpfs_automount"].toString();
  }
  
  if (obj["label"]) {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (obj["helper_disableupdatedb"]) {
    obj["helper_disableupdatedb"] = new Boolean(obj["helper_disableupdatedb"]);
    obj["helper_disableupdatedb"] = obj["helper_disableupdatedb"].toString();
  }
  
  if (!obj["configid"])
    throw new Error("configid Is a required argument");
  else {
    obj["configid"] = new Number(obj["configid"]);
    if (isNaN(obj["configid"])) throw new Error("configid Must be a valid number");
    obj["configid"] = obj["configid"].toString();
  }
  
  if (obj["disklist"]) {
    obj["disklist"] = new String(obj["disklist"]);
    obj["disklist"] = obj["disklist"].toString();
  }
  
  if (obj["runlevel"]) {
    obj["runlevel"] = new String(obj["runlevel"]);
    obj["runlevel"] = obj["runlevel"].toString();
  }
  
  if (obj["rootdevicero"]) {
    obj["rootdevicero"] = new Boolean(obj["rootdevicero"]);
    obj["rootdevicero"] = obj["rootdevicero"].toString();
  }
  
  if (obj["rootdevicenum"]) {
    obj["rootdevicenum"] = new Number(obj["rootdevicenum"]);
    if (isNaN(obj["rootdevicenum"])) throw new Error("rootdevicenum Must be a valid number");
    obj["rootdevicenum"] = obj["rootdevicenum"].toString();
  }
  
  if (obj["helper_xen"]) {
    obj["helper_xen"] = new Boolean(obj["helper_xen"]);
    obj["helper_xen"] = obj["helper_xen"].toString();
  }
  
  if (obj["ramlimit"]) {
    obj["ramlimit"] = new Number(obj["ramlimit"]);
    if (isNaN(obj["ramlimit"])) throw new Error("ramlimit Must be a valid number");
    obj["ramlimit"] = obj["ramlimit"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  if (obj["helper_depmod"]) {
    obj["helper_depmod"] = new Boolean(obj["helper_depmod"]);
    obj["helper_depmod"] = obj["helper_depmod"].toString();
  }
  
  if (obj["kernelid"]) {
    obj["kernelid"] = new Number(obj["kernelid"]);
    if (isNaN(obj["kernelid"])) throw new Error("kernelid Must be a valid number");
    obj["kernelid"] = obj["kernelid"].toString();
  }
  
  obj.api_action = "linode.config.update";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_create = function (obj, cb) {
  if (obj["alert_cpu_enabled"]) {
    obj["alert_cpu_enabled"] = new Boolean(obj["alert_cpu_enabled"]);
    obj["alert_cpu_enabled"] = obj["alert_cpu_enabled"].toString();
  }
  
  if (obj["alert_bwin_enabled"]) {
    obj["alert_bwin_enabled"] = new Boolean(obj["alert_bwin_enabled"]);
    obj["alert_bwin_enabled"] = obj["alert_bwin_enabled"].toString();
  }
  
  if (obj["alert_cpu_threshold"]) {
    obj["alert_cpu_threshold"] = new Number(obj["alert_cpu_threshold"]);
    if (isNaN(obj["alert_cpu_threshold"])) throw new Error("alert_cpu_threshold Must be a valid number");
    obj["alert_cpu_threshold"] = obj["alert_cpu_threshold"].toString();
  }
  
  if (!obj["planid"])
    throw new Error("planid Is a required argument");
  else {
    obj["planid"] = new Number(obj["planid"]);
    if (isNaN(obj["planid"])) throw new Error("planid Must be a valid number");
    obj["planid"] = obj["planid"].toString();
  }
  
  if (obj["alert_bwquota_enabled"]) {
    obj["alert_bwquota_enabled"] = new Boolean(obj["alert_bwquota_enabled"]);
    obj["alert_bwquota_enabled"] = obj["alert_bwquota_enabled"].toString();
  }
  
  if (obj["backupweeklyday"]) {
    obj["backupweeklyday"] = new Number(obj["backupweeklyday"]);
    if (isNaN(obj["backupweeklyday"])) throw new Error("backupweeklyday Must be a valid number");
    obj["backupweeklyday"] = obj["backupweeklyday"].toString();
  }
  
  if (!obj["label"])
    throw new Error("label Is a required argument");
  else {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (obj["alert_diskio_threshold"]) {
    obj["alert_diskio_threshold"] = new Number(obj["alert_diskio_threshold"]);
    if (isNaN(obj["alert_diskio_threshold"])) throw new Error("alert_diskio_threshold Must be a valid number");
    obj["alert_diskio_threshold"] = obj["alert_diskio_threshold"].toString();
  }
  
  if (obj["backupwindow"]) {
    obj["backupwindow"] = new Number(obj["backupwindow"]);
    if (isNaN(obj["backupwindow"])) throw new Error("backupwindow Must be a valid number");
    obj["backupwindow"] = obj["backupwindow"].toString();
  }
  
  if (obj["watchdog"]) {
    obj["watchdog"] = new Boolean(obj["watchdog"]);
    obj["watchdog"] = obj["watchdog"].toString();
  }
  
  if (!obj["datacenterid"])
    throw new Error("datacenterid Is a required argument");
  else {
    obj["datacenterid"] = new Number(obj["datacenterid"]);
    if (isNaN(obj["datacenterid"])) throw new Error("datacenterid Must be a valid number");
    obj["datacenterid"] = obj["datacenterid"].toString();
  }
  
  if (obj["alert_diskio_enabled"]) {
    obj["alert_diskio_enabled"] = new Boolean(obj["alert_diskio_enabled"]);
    obj["alert_diskio_enabled"] = obj["alert_diskio_enabled"].toString();
  }
  
  if (obj["lpm_displaygroup"]) {
    obj["lpm_displaygroup"] = new String(obj["lpm_displaygroup"]);
    obj["lpm_displaygroup"] = obj["lpm_displaygroup"].toString();
  }
  
  if (obj["alert_bwquota_threshold"]) {
    obj["alert_bwquota_threshold"] = new Number(obj["alert_bwquota_threshold"]);
    if (isNaN(obj["alert_bwquota_threshold"])) throw new Error("alert_bwquota_threshold Must be a valid number");
    obj["alert_bwquota_threshold"] = obj["alert_bwquota_threshold"].toString();
  }
  
  if (!obj["paymentterm"])
    throw new Error("paymentterm Is a required argument");
  else {
    obj["paymentterm"] = new Number(obj["paymentterm"]);
    if (isNaN(obj["paymentterm"])) throw new Error("paymentterm Must be a valid number");
    obj["paymentterm"] = obj["paymentterm"].toString();
  }
  
  if (obj["alert_bwin_threshold"]) {
    obj["alert_bwin_threshold"] = new Number(obj["alert_bwin_threshold"]);
    if (isNaN(obj["alert_bwin_threshold"])) throw new Error("alert_bwin_threshold Must be a valid number");
    obj["alert_bwin_threshold"] = obj["alert_bwin_threshold"].toString();
  }
  
  if (obj["alert_bwout_threshold"]) {
    obj["alert_bwout_threshold"] = new Number(obj["alert_bwout_threshold"]);
    if (isNaN(obj["alert_bwout_threshold"])) throw new Error("alert_bwout_threshold Must be a valid number");
    obj["alert_bwout_threshold"] = obj["alert_bwout_threshold"].toString();
  }
  
  if (obj["alert_bwout_enabled"]) {
    obj["alert_bwout_enabled"] = new Boolean(obj["alert_bwout_enabled"]);
    obj["alert_bwout_enabled"] = obj["alert_bwout_enabled"].toString();
  }
  
  obj.api_action = "linode.create";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_delete = function (obj, cb) {
  if (obj["skipchecks"]) {
    obj["skipchecks"] = new Boolean(obj["skipchecks"]);
    obj["skipchecks"] = obj["skipchecks"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  obj.api_action = "linode.delete";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_disk_create = function (obj, cb) {
  if (obj["isreadonly"]) {
    obj["isreadonly"] = new Boolean(obj["isreadonly"]);
    obj["isreadonly"] = obj["isreadonly"].toString();
  }
  
  if (!obj["label"])
    throw new Error("label Is a required argument");
  else {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  obj.api_action = "linode.disk.create";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_disk_createfromdistribution = function (obj, cb) {
  if (!obj["distributionid"])
    throw new Error("distributionid Is a required argument");
  else {
    obj["distributionid"] = new Number(obj["distributionid"]);
    if (isNaN(obj["distributionid"])) throw new Error("distributionid Must be a valid number");
    obj["distributionid"] = obj["distributionid"].toString();
  }
  
  if (!obj["rootpass"])
    throw new Error("rootpass Is a required argument");
  else {
    obj["rootpass"] = new String(obj["rootpass"]);
    obj["rootpass"] = obj["rootpass"].toString();
  }
  
  if (obj["rootsshkey"]) {
    obj["rootsshkey"] = new String(obj["rootsshkey"]);
    obj["rootsshkey"] = obj["rootsshkey"].toString();
  }
  
  if (!obj["label"])
    throw new Error("label Is a required argument");
  else {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (!obj["size"])
    throw new Error("size Is a required argument");
  else {
    obj["size"] = new Number(obj["size"]);
    if (isNaN(obj["size"])) throw new Error("size Must be a valid number");
    obj["size"] = obj["size"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  obj.api_action = "linode.disk.createfromdistribution";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_disk_createfromstackscript = function (obj, cb) {
  if (!obj["stackscriptudfresponses"])
    throw new Error("stackscriptudfresponses Is a required argument");
  else {
    obj["stackscriptudfresponses"] = new String(obj["stackscriptudfresponses"]);
    obj["stackscriptudfresponses"] = obj["stackscriptudfresponses"].toString();
  }
  
  if (!obj["distributionid"])
    throw new Error("distributionid Is a required argument");
  else {
    obj["distributionid"] = new Number(obj["distributionid"]);
    if (isNaN(obj["distributionid"])) throw new Error("distributionid Must be a valid number");
    obj["distributionid"] = obj["distributionid"].toString();
  }
  
  if (!obj["rootpass"])
    throw new Error("rootpass Is a required argument");
  else {
    obj["rootpass"] = new String(obj["rootpass"]);
    obj["rootpass"] = obj["rootpass"].toString();
  }
  
  if (!obj["label"])
    throw new Error("label Is a required argument");
  else {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (!obj["size"])
    throw new Error("size Is a required argument");
  else {
    obj["size"] = new Number(obj["size"]);
    if (isNaN(obj["size"])) throw new Error("size Must be a valid number");
    obj["size"] = obj["size"].toString();
  }
  
  if (!obj["stackscriptid"])
    throw new Error("stackscriptid Is a required argument");
  else {
    obj["stackscriptid"] = new Number(obj["stackscriptid"]);
    if (isNaN(obj["stackscriptid"])) throw new Error("stackscriptid Must be a valid number");
    obj["stackscriptid"] = obj["stackscriptid"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  obj.api_action = "linode.disk.createfromstackscript";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_disk_delete = function (obj, cb) {
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  if (!obj["diskid"])
    throw new Error("diskid Is a required argument");
  else {
    obj["diskid"] = new Number(obj["diskid"]);
    if (isNaN(obj["diskid"])) throw new Error("diskid Must be a valid number");
    obj["diskid"] = obj["diskid"].toString();
  }
  
  obj.api_action = "linode.disk.delete";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_disk_duplicate = function (obj, cb) {
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  if (!obj["diskid"])
    throw new Error("diskid Is a required argument");
  else {
    obj["diskid"] = new Number(obj["diskid"]);
    if (isNaN(obj["diskid"])) throw new Error("diskid Must be a valid number");
    obj["diskid"] = obj["diskid"].toString();
  }
  
  obj.api_action = "linode.disk.duplicate";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_disk_list = function (obj, cb) {
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  if (obj["diskid"]) {
    obj["diskid"] = new Number(obj["diskid"]);
    if (isNaN(obj["diskid"])) throw new Error("diskid Must be a valid number");
    obj["diskid"] = obj["diskid"].toString();
  }
  
  obj.api_action = "linode.disk.list";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_disk_resize = function (obj, cb) {
  if (!obj["size"])
    throw new Error("size Is a required argument");
  else {
    obj["size"] = new Number(obj["size"]);
    if (isNaN(obj["size"])) throw new Error("size Must be a valid number");
    obj["size"] = obj["size"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  if (!obj["diskid"])
    throw new Error("diskid Is a required argument");
  else {
    obj["diskid"] = new Number(obj["diskid"]);
    if (isNaN(obj["diskid"])) throw new Error("diskid Must be a valid number");
    obj["diskid"] = obj["diskid"].toString();
  }
  
  obj.api_action = "linode.disk.resize";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_disk_update = function (obj, cb) {
  if (obj["isreadonly"]) {
    obj["isreadonly"] = new Boolean(obj["isreadonly"]);
    obj["isreadonly"] = obj["isreadonly"].toString();
  }
  
  if (obj["label"]) {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  if (!obj["diskid"])
    throw new Error("diskid Is a required argument");
  else {
    obj["diskid"] = new Number(obj["diskid"]);
    if (isNaN(obj["diskid"])) throw new Error("diskid Must be a valid number");
    obj["diskid"] = obj["diskid"].toString();
  }
  
  obj.api_action = "linode.disk.update";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_ip_addprivate = function (obj, cb) {
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  obj.api_action = "linode.ip.addprivate";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_ip_list = function (obj, cb) {
  if (obj["ipaddressid"]) {
    obj["ipaddressid"] = new Number(obj["ipaddressid"]);
    if (isNaN(obj["ipaddressid"])) throw new Error("ipaddressid Must be a valid number");
    obj["ipaddressid"] = obj["ipaddressid"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  obj.api_action = "linode.ip.list";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_job_list = function (obj, cb) {
  if (obj["jobid"]) {
    obj["jobid"] = new Number(obj["jobid"]);
    if (isNaN(obj["jobid"])) throw new Error("jobid Must be a valid number");
    obj["jobid"] = obj["jobid"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  if (obj["pendingonly"]) {
    obj["pendingonly"] = new Boolean(obj["pendingonly"]);
    obj["pendingonly"] = obj["pendingonly"].toString();
  }
  
  obj.api_action = "linode.job.list";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_list = function (obj, cb) {
  if (obj["linodeid"]) {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  obj.api_action = "linode.list";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_reboot = function (obj, cb) {
  if (obj["configid"]) {
    obj["configid"] = new Number(obj["configid"]);
    if (isNaN(obj["configid"])) throw new Error("configid Must be a valid number");
    obj["configid"] = obj["configid"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  obj.api_action = "linode.reboot";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_resize = function (obj, cb) {
  if (!obj["planid"])
    throw new Error("planid Is a required argument");
  else {
    obj["planid"] = new Number(obj["planid"]);
    if (isNaN(obj["planid"])) throw new Error("planid Must be a valid number");
    obj["planid"] = obj["planid"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  obj.api_action = "linode.resize";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_shutdown = function (obj, cb) {
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  obj.api_action = "linode.shutdown";
  return this.send(obj, cb);
};


LinodeApi.prototype.linode_update = function (obj, cb) {
  if (obj["alert_cpu_enabled"]) {
    obj["alert_cpu_enabled"] = new Boolean(obj["alert_cpu_enabled"]);
    obj["alert_cpu_enabled"] = obj["alert_cpu_enabled"].toString();
  }
  
  if (obj["alert_bwin_enabled"]) {
    obj["alert_bwin_enabled"] = new Boolean(obj["alert_bwin_enabled"]);
    obj["alert_bwin_enabled"] = obj["alert_bwin_enabled"].toString();
  }
  
  if (obj["alert_cpu_threshold"]) {
    obj["alert_cpu_threshold"] = new Number(obj["alert_cpu_threshold"]);
    if (isNaN(obj["alert_cpu_threshold"])) throw new Error("alert_cpu_threshold Must be a valid number");
    obj["alert_cpu_threshold"] = obj["alert_cpu_threshold"].toString();
  }
  
  if (obj["alert_bwquota_enabled"]) {
    obj["alert_bwquota_enabled"] = new Boolean(obj["alert_bwquota_enabled"]);
    obj["alert_bwquota_enabled"] = obj["alert_bwquota_enabled"].toString();
  }
  
  if (obj["backupweeklyday"]) {
    obj["backupweeklyday"] = new Number(obj["backupweeklyday"]);
    if (isNaN(obj["backupweeklyday"])) throw new Error("backupweeklyday Must be a valid number");
    obj["backupweeklyday"] = obj["backupweeklyday"].toString();
  }
  
  if (obj["label"]) {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (obj["alert_diskio_threshold"]) {
    obj["alert_diskio_threshold"] = new Number(obj["alert_diskio_threshold"]);
    if (isNaN(obj["alert_diskio_threshold"])) throw new Error("alert_diskio_threshold Must be a valid number");
    obj["alert_diskio_threshold"] = obj["alert_diskio_threshold"].toString();
  }
  
  if (obj["backupwindow"]) {
    obj["backupwindow"] = new Number(obj["backupwindow"]);
    if (isNaN(obj["backupwindow"])) throw new Error("backupwindow Must be a valid number");
    obj["backupwindow"] = obj["backupwindow"].toString();
  }
  
  if (obj["watchdog"]) {
    obj["watchdog"] = new Boolean(obj["watchdog"]);
    obj["watchdog"] = obj["watchdog"].toString();
  }
  
  if (obj["alert_diskio_enabled"]) {
    obj["alert_diskio_enabled"] = new Boolean(obj["alert_diskio_enabled"]);
    obj["alert_diskio_enabled"] = obj["alert_diskio_enabled"].toString();
  }
  
  if (obj["lpm_displaygroup"]) {
    obj["lpm_displaygroup"] = new String(obj["lpm_displaygroup"]);
    obj["lpm_displaygroup"] = obj["lpm_displaygroup"].toString();
  }
  
  if (obj["alert_bwquota_threshold"]) {
    obj["alert_bwquota_threshold"] = new Number(obj["alert_bwquota_threshold"]);
    if (isNaN(obj["alert_bwquota_threshold"])) throw new Error("alert_bwquota_threshold Must be a valid number");
    obj["alert_bwquota_threshold"] = obj["alert_bwquota_threshold"].toString();
  }
  
  if (!obj["linodeid"])
    throw new Error("linodeid Is a required argument");
  else {
    obj["linodeid"] = new Number(obj["linodeid"]);
    if (isNaN(obj["linodeid"])) throw new Error("linodeid Must be a valid number");
    obj["linodeid"] = obj["linodeid"].toString();
  }
  
  if (obj["alert_bwin_threshold"]) {
    obj["alert_bwin_threshold"] = new Number(obj["alert_bwin_threshold"]);
    if (isNaN(obj["alert_bwin_threshold"])) throw new Error("alert_bwin_threshold Must be a valid number");
    obj["alert_bwin_threshold"] = obj["alert_bwin_threshold"].toString();
  }
  
  if (obj["alert_bwout_threshold"]) {
    obj["alert_bwout_threshold"] = new Number(obj["alert_bwout_threshold"]);
    if (isNaN(obj["alert_bwout_threshold"])) throw new Error("alert_bwout_threshold Must be a valid number");
    obj["alert_bwout_threshold"] = obj["alert_bwout_threshold"].toString();
  }
  
  if (obj["alert_bwout_enabled"]) {
    obj["alert_bwout_enabled"] = new Boolean(obj["alert_bwout_enabled"]);
    obj["alert_bwout_enabled"] = obj["alert_bwout_enabled"].toString();
  }
  
  obj.api_action = "linode.update";
  return this.send(obj, cb);
};


LinodeApi.prototype.nodebalancer_config_create = function (obj, cb) {
  if (obj["stickiness"]) {
    obj["stickiness"] = new String(obj["stickiness"]);
    obj["stickiness"] = obj["stickiness"].toString();
  }
  
  if (obj["check_path"]) {
    obj["check_path"] = new String(obj["check_path"]);
    obj["check_path"] = obj["check_path"].toString();
  }
  
  if (obj["port"]) {
    obj["port"] = new Number(obj["port"]);
    if (isNaN(obj["port"])) throw new Error("port Must be a valid number");
    obj["port"] = obj["port"].toString();
  }
  
  if (obj["check_body"]) {
    obj["check_body"] = new String(obj["check_body"]);
    obj["check_body"] = obj["check_body"].toString();
  }
  
  if (obj["check"]) {
    obj["check"] = new String(obj["check"]);
    obj["check"] = obj["check"].toString();
  }
  
  if (obj["check_interval"]) {
    obj["check_interval"] = new Number(obj["check_interval"]);
    if (isNaN(obj["check_interval"])) throw new Error("check_interval Must be a valid number");
    obj["check_interval"] = obj["check_interval"].toString();
  }
  
  if (obj["protocol"]) {
    obj["protocol"] = new String(obj["protocol"]);
    obj["protocol"] = obj["protocol"].toString();
  }
  
  if (obj["algorithm"]) {
    obj["algorithm"] = new String(obj["algorithm"]);
    obj["algorithm"] = obj["algorithm"].toString();
  }
  
  if (obj["check_timeout"]) {
    obj["check_timeout"] = new String(obj["check_timeout"]);
    obj["check_timeout"] = obj["check_timeout"].toString();
  }
  
  if (obj["check_attempts"]) {
    obj["check_attempts"] = new String(obj["check_attempts"]);
    obj["check_attempts"] = obj["check_attempts"].toString();
  }
  
  obj.api_action = "nodebalancer.config.create";
  return this.send(obj, cb);
};


LinodeApi.prototype.nodebalancer_config_delete = function (obj, cb) {
  if (!obj["configid"])
    throw new Error("configid Is a required argument");
  else {
    obj["configid"] = new Number(obj["configid"]);
    if (isNaN(obj["configid"])) throw new Error("configid Must be a valid number");
    obj["configid"] = obj["configid"].toString();
  }
  
  obj.api_action = "nodebalancer.config.delete";
  return this.send(obj, cb);
};


LinodeApi.prototype.nodebalancer_config_list = function (obj, cb) {
  if (obj["configid"]) {
    obj["configid"] = new Number(obj["configid"]);
    if (isNaN(obj["configid"])) throw new Error("configid Must be a valid number");
    obj["configid"] = obj["configid"].toString();
  }
  
  if (!obj["nodebalancerid"])
    throw new Error("nodebalancerid Is a required argument");
  else {
    obj["nodebalancerid"] = new Number(obj["nodebalancerid"]);
    if (isNaN(obj["nodebalancerid"])) throw new Error("nodebalancerid Must be a valid number");
    obj["nodebalancerid"] = obj["nodebalancerid"].toString();
  }
  
  obj.api_action = "nodebalancer.config.list";
  return this.send(obj, cb);
};


LinodeApi.prototype.nodebalancer_config_update = function (obj, cb) {
  if (obj["stickiness"]) {
    obj["stickiness"] = new String(obj["stickiness"]);
    obj["stickiness"] = obj["stickiness"].toString();
  }
  
  if (obj["check_path"]) {
    obj["check_path"] = new String(obj["check_path"]);
    obj["check_path"] = obj["check_path"].toString();
  }
  
  if (obj["port"]) {
    obj["port"] = new Number(obj["port"]);
    if (isNaN(obj["port"])) throw new Error("port Must be a valid number");
    obj["port"] = obj["port"].toString();
  }
  
  if (obj["check_body"]) {
    obj["check_body"] = new String(obj["check_body"]);
    obj["check_body"] = obj["check_body"].toString();
  }
  
  if (obj["check"]) {
    obj["check"] = new String(obj["check"]);
    obj["check"] = obj["check"].toString();
  }
  
  if (obj["check_interval"]) {
    obj["check_interval"] = new Number(obj["check_interval"]);
    if (isNaN(obj["check_interval"])) throw new Error("check_interval Must be a valid number");
    obj["check_interval"] = obj["check_interval"].toString();
  }
  
  if (obj["protocol"]) {
    obj["protocol"] = new String(obj["protocol"]);
    obj["protocol"] = obj["protocol"].toString();
  }
  
  if (obj["algorithm"]) {
    obj["algorithm"] = new String(obj["algorithm"]);
    obj["algorithm"] = obj["algorithm"].toString();
  }
  
  if (!obj["configid"])
    throw new Error("configid Is a required argument");
  else {
    obj["configid"] = new Number(obj["configid"]);
    if (isNaN(obj["configid"])) throw new Error("configid Must be a valid number");
    obj["configid"] = obj["configid"].toString();
  }
  
  if (obj["check_timeout"]) {
    obj["check_timeout"] = new String(obj["check_timeout"]);
    obj["check_timeout"] = obj["check_timeout"].toString();
  }
  
  if (obj["check_attempts"]) {
    obj["check_attempts"] = new String(obj["check_attempts"]);
    obj["check_attempts"] = obj["check_attempts"].toString();
  }
  
  obj.api_action = "nodebalancer.config.update";
  return this.send(obj, cb);
};


LinodeApi.prototype.nodebalancer_create = function (obj, cb) {
  if (obj["label"]) {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (obj["clientconnthrottle"]) {
    obj["clientconnthrottle"] = new Number(obj["clientconnthrottle"]);
    if (isNaN(obj["clientconnthrottle"])) throw new Error("clientconnthrottle Must be a valid number");
    obj["clientconnthrottle"] = obj["clientconnthrottle"].toString();
  }
  
  if (!obj["paymentterm"])
    throw new Error("paymentterm Is a required argument");
  else {
    obj["paymentterm"] = new Number(obj["paymentterm"]);
    if (isNaN(obj["paymentterm"])) throw new Error("paymentterm Must be a valid number");
    obj["paymentterm"] = obj["paymentterm"].toString();
  }
  
  if (!obj["datacenterid"])
    throw new Error("datacenterid Is a required argument");
  else {
    obj["datacenterid"] = new Number(obj["datacenterid"]);
    if (isNaN(obj["datacenterid"])) throw new Error("datacenterid Must be a valid number");
    obj["datacenterid"] = obj["datacenterid"].toString();
  }
  
  obj.api_action = "nodebalancer.create";
  return this.send(obj, cb);
};


LinodeApi.prototype.nodebalancer_delete = function (obj, cb) {
  if (!obj["nodebalancerid"])
    throw new Error("nodebalancerid Is a required argument");
  else {
    obj["nodebalancerid"] = new Number(obj["nodebalancerid"]);
    if (isNaN(obj["nodebalancerid"])) throw new Error("nodebalancerid Must be a valid number");
    obj["nodebalancerid"] = obj["nodebalancerid"].toString();
  }
  
  obj.api_action = "nodebalancer.delete";
  return this.send(obj, cb);
};


LinodeApi.prototype.nodebalancer_list = function (obj, cb) {
  if (obj["nodebalancerid"]) {
    obj["nodebalancerid"] = new Number(obj["nodebalancerid"]);
    if (isNaN(obj["nodebalancerid"])) throw new Error("nodebalancerid Must be a valid number");
    obj["nodebalancerid"] = obj["nodebalancerid"].toString();
  }
  
  obj.api_action = "nodebalancer.list";
  return this.send(obj, cb);
};


LinodeApi.prototype.nodebalancer_node_create = function (obj, cb) {
  if (obj["weight"]) {
    obj["weight"] = new Number(obj["weight"]);
    if (isNaN(obj["weight"])) throw new Error("weight Must be a valid number");
    obj["weight"] = obj["weight"].toString();
  }
  
  if (!obj["address"])
    throw new Error("address Is a required argument");
  else {
    obj["address"] = new String(obj["address"]);
    obj["address"] = obj["address"].toString();
  }
  
  if (!obj["label"])
    throw new Error("label Is a required argument");
  else {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (obj["mode"]) {
    obj["mode"] = new String(obj["mode"]);
    obj["mode"] = obj["mode"].toString();
  }
  
  obj.api_action = "nodebalancer.node.create";
  return this.send(obj, cb);
};


LinodeApi.prototype.nodebalancer_node_delete = function (obj, cb) {
  if (!obj["nodeid"])
    throw new Error("nodeid Is a required argument");
  else {
    obj["nodeid"] = new Number(obj["nodeid"]);
    if (isNaN(obj["nodeid"])) throw new Error("nodeid Must be a valid number");
    obj["nodeid"] = obj["nodeid"].toString();
  }
  
  obj.api_action = "nodebalancer.node.delete";
  return this.send(obj, cb);
};


LinodeApi.prototype.nodebalancer_node_list = function (obj, cb) {
  if (obj["nodeid"]) {
    obj["nodeid"] = new Number(obj["nodeid"]);
    if (isNaN(obj["nodeid"])) throw new Error("nodeid Must be a valid number");
    obj["nodeid"] = obj["nodeid"].toString();
  }
  
  if (!obj["configid"])
    throw new Error("configid Is a required argument");
  else {
    obj["configid"] = new Number(obj["configid"]);
    if (isNaN(obj["configid"])) throw new Error("configid Must be a valid number");
    obj["configid"] = obj["configid"].toString();
  }
  
  obj.api_action = "nodebalancer.node.list";
  return this.send(obj, cb);
};


LinodeApi.prototype.nodebalancer_node_update = function (obj, cb) {
  if (obj["weight"]) {
    obj["weight"] = new Number(obj["weight"]);
    if (isNaN(obj["weight"])) throw new Error("weight Must be a valid number");
    obj["weight"] = obj["weight"].toString();
  }
  
  if (obj["address"]) {
    obj["address"] = new String(obj["address"]);
    obj["address"] = obj["address"].toString();
  }
  
  if (obj["label"]) {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (!obj["nodeid"])
    throw new Error("nodeid Is a required argument");
  else {
    obj["nodeid"] = new Number(obj["nodeid"]);
    if (isNaN(obj["nodeid"])) throw new Error("nodeid Must be a valid number");
    obj["nodeid"] = obj["nodeid"].toString();
  }
  
  if (obj["mode"]) {
    obj["mode"] = new String(obj["mode"]);
    obj["mode"] = obj["mode"].toString();
  }
  
  obj.api_action = "nodebalancer.node.update";
  return this.send(obj, cb);
};


LinodeApi.prototype.nodebalancer_update = function (obj, cb) {
  if (obj["label"]) {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (obj["clientconnthrottle"]) {
    obj["clientconnthrottle"] = new Number(obj["clientconnthrottle"]);
    if (isNaN(obj["clientconnthrottle"])) throw new Error("clientconnthrottle Must be a valid number");
    obj["clientconnthrottle"] = obj["clientconnthrottle"].toString();
  }
  
  if (!obj["nodebalancerid"])
    throw new Error("nodebalancerid Is a required argument");
  else {
    obj["nodebalancerid"] = new Number(obj["nodebalancerid"]);
    if (isNaN(obj["nodebalancerid"])) throw new Error("nodebalancerid Must be a valid number");
    obj["nodebalancerid"] = obj["nodebalancerid"].toString();
  }
  
  obj.api_action = "nodebalancer.update";
  return this.send(obj, cb);
};


LinodeApi.prototype.stackscript_create = function (obj, cb) {
  if (obj["rev_note"]) {
    obj["rev_note"] = new String(obj["rev_note"]);
    obj["rev_note"] = obj["rev_note"].toString();
  }
  
  if (!obj["script"])
    throw new Error("script Is a required argument");
  else {
    obj["script"] = new String(obj["script"]);
    obj["script"] = obj["script"].toString();
  }
  
  if (!obj["distributionidlist"])
    throw new Error("distributionidlist Is a required argument");
  else {
    obj["distributionidlist"] = new String(obj["distributionidlist"]);
    obj["distributionidlist"] = obj["distributionidlist"].toString();
  }
  
  if (obj["description"]) {
    obj["description"] = new String(obj["description"]);
    obj["description"] = obj["description"].toString();
  }
  
  if (!obj["label"])
    throw new Error("label Is a required argument");
  else {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (obj["ispublic"]) {
    obj["ispublic"] = new Boolean(obj["ispublic"]);
    obj["ispublic"] = obj["ispublic"].toString();
  }
  
  obj.api_action = "stackscript.create";
  return this.send(obj, cb);
};


LinodeApi.prototype.stackscript_delete = function (obj, cb) {
  if (!obj["stackscriptid"])
    throw new Error("stackscriptid Is a required argument");
  else {
    obj["stackscriptid"] = new Number(obj["stackscriptid"]);
    if (isNaN(obj["stackscriptid"])) throw new Error("stackscriptid Must be a valid number");
    obj["stackscriptid"] = obj["stackscriptid"].toString();
  }
  
  obj.api_action = "stackscript.delete";
  return this.send(obj, cb);
};


LinodeApi.prototype.stackscript_list = function (obj, cb) {
  if (obj["stackscriptid"]) {
    obj["stackscriptid"] = new Number(obj["stackscriptid"]);
    if (isNaN(obj["stackscriptid"])) throw new Error("stackscriptid Must be a valid number");
    obj["stackscriptid"] = obj["stackscriptid"].toString();
  }
  
  obj.api_action = "stackscript.list";
  return this.send(obj, cb);
};


LinodeApi.prototype.stackscript_update = function (obj, cb) {
  if (obj["rev_note"]) {
    obj["rev_note"] = new String(obj["rev_note"]);
    obj["rev_note"] = obj["rev_note"].toString();
  }
  
  if (obj["script"]) {
    obj["script"] = new String(obj["script"]);
    obj["script"] = obj["script"].toString();
  }
  
  if (obj["distributionidlist"]) {
    obj["distributionidlist"] = new String(obj["distributionidlist"]);
    obj["distributionidlist"] = obj["distributionidlist"].toString();
  }
  
  if (obj["description"]) {
    obj["description"] = new String(obj["description"]);
    obj["description"] = obj["description"].toString();
  }
  
  if (obj["label"]) {
    obj["label"] = new String(obj["label"]);
    obj["label"] = obj["label"].toString();
  }
  
  if (obj["ispublic"]) {
    obj["ispublic"] = new Boolean(obj["ispublic"]);
    obj["ispublic"] = obj["ispublic"].toString();
  }
  
  if (!obj["stackscriptid"])
    throw new Error("stackscriptid Is a required argument");
  else {
    obj["stackscriptid"] = new Number(obj["stackscriptid"]);
    if (isNaN(obj["stackscriptid"])) throw new Error("stackscriptid Must be a valid number");
    obj["stackscriptid"] = obj["stackscriptid"].toString();
  }
  
  obj.api_action = "stackscript.update";
  return this.send(obj, cb);
};


LinodeApi.prototype.test_echo = function (obj, cb) {
  obj.api_action = "test.echo";
  return this.send(obj, cb);
};


LinodeApi.prototype.user_getapikey = function (obj, cb) {
  if (!obj["username"])
    throw new Error("username Is a required argument");
  else {
    obj["username"] = new String(obj["username"]);
    obj["username"] = obj["username"].toString();
  }
  
  if (!obj["password"])
    throw new Error("password Is a required argument");
  else {
    obj["password"] = new String(obj["password"]);
    obj["password"] = obj["password"].toString();
  }
  
  obj.api_action = "user.getapikey";
  return this.send(obj, cb);
};

if (typeof module !== "undefined" && module.exports) module.exports = LinodeApi;
