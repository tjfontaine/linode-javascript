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

var API_BASE='https://api.linode.com/';
function LinodeApi(key)
{
  this.api_key = key
  this.methods = [
  'avail_linodeplans',
  'avail_datacenters',
  'avail_distributions',
  'avail_kernels',
  'avail_stackscripts',
  'domain_create',
  'domain_delete',
  'domain_list',
  'domain_udpate',
  'domain_resource_create',
  'domain_resource_delete',
  'domain_resource_list',
  'domain_resource_update',
  'linode_boot',
  'linode_create',
  'linode_delete',
  'linode_list',
  'linode_reboot',
  'linode_resize',
  'linode_shutdown',
  'linode_update',
  'linode_config_create',
  'linode_config_delete',
  'linode_config_list',
  'linode_config_update',
  'linode_disk_create',
  'linode_disk_createfromdistribution',
  'linode_disk_createfromstackscript',
  'linode_disk_delete',
  'linode_disk_duplicate',
  'linode_disk_list',
  'linode_disk_resize',
  'linode_disk_update',
  'linode_ip_list',
  'linode_job_list',
  'stackscript_create',
  'stackscript_delete',
  'stackscript_list',
  'stackscript_update',
  'user_getapikey',
  'test_echo',
  'batch',
  ];
  for(m in this.methods)
  {
    var item = this.methods[m]
    this[item] = function(options)
    {
      var data = {};
      if(options.args)
      data = options.args

      data['api_key'] = this.api_key;
      data['api_action'] = item.replace(/_/g, '.');
      data['api_responseFormat'] = 'json';
      $.post(API_BASE, data, options.callback, 'json')
    }
  }
}
