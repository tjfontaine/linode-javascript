/*
Copyright (c) 2010 Timothy J Fontaine <tjfontaine@gmail.com>

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

function passthrough(value, source, target) {
  $(target).val(value)
}

var linode_boolean = {
  convert: function(value) {
    return value.checked
  },
  convertBack: function(value, source, target){
    target.checked = value == 1 ? true : false;
  },
}

var linode_string = {
  convert: function(value) {
    return value
  },
  convertBack: passthrough,
}

var linode_select = {
  convertBack: function(value, source, target) {
    $(target).val(value.toString().toLowerCase())
  }
}

var LINODE_OBJ_CONVERSION = {
  LINODEID: {
    LABEL: {
      convertBack: passthrough,
    },
    STATUS: {
      convertBack: function(value, source, target)
      {
        var cache = new LinodeCache([])
        $(target).val(cache.status_map[value.toString()])
      },
    },
    TOTALRAM: linode_string,
    TOTALHD: linode_string,
    TOTALXFER: linode_string,
    BACKUPSENABLED: linode_boolean,
    WATCHDOG: linode_boolean,
    ALERT_BWIN_ENABLED: linode_boolean,
    ALERT_BWOUT_ENABLED: linode_boolean,
    ALERT_BWQUOTA_ENABLED: linode_boolean,
    ALERT_DISKIO_ENABLED: linode_boolean,
    ALERT_CPU_ENABLED: linode_boolean,
    ALERT_CPU_THRESHOLD: linode_string,
    ALERT_DISKIO_THRESHOLD: linode_string,
    ALERT_BWIN_THRESHOLD: linode_string,
    ALERT_BWOUT_THRESHOLD: linode_string,
    ALERT_BWQUOTA_THRESHOLD: linode_string,
    LPM_DISPLAYGROUP: linode_string,
    DATACENTERID: {
      convertBack: function(value, source, target)
      {
        $(target).val(value.LOCATION)
      },
    },
  },
  DOMAINID: {
    DOMAIN: linode_string,
    DESCRIPTION: linode_string,
    TYPE: linode_select,
    STATUS: linode_select,
    EXPIRE_SEC: linode_select,
    TTL_SEC: linode_select,
    RETRY_SEC: linode_select,
  },
}
