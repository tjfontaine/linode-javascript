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

function LinodeCache(initial_apis)
{
  this.apis = initial_apis
  this.cache = {
  }
  this.phase = 0;
  this.status_map = {
    '-2': 'Boot Failed (not in use)',
    '-1': 'Being Created',
    '0': 'Brand New',
    '1': 'Running',
    '2': 'Powered Off',
    '3': 'Shutting Down (not in use)',
    '4': 'Saved to Disk (not in use)',
  }
  this.domain_status = {
    '1': 'Active',
    '2': 'Edit Mode',
    '3': 'Inactive',
  }
  this.cache_map = {
    common: {
      'avail.linodeplans': {
        key: 'PLANID',
      },
      'avail.datacenters': {
        key: 'DATACENTERID',
      },
      'avail.distributions': {
        key: 'DISTRIBUTIONID',
      },
      'avail.kernels': {
        key: 'KERNELID',
      },
      'avail.stackscripts': {
        key: 'STACKSCRIPTID',
      },
    },
    apifirst: {
      'linode.list': {
        key: 'LINODEID',
      },
      'domain.list': {
        key: 'DOMAINID',
      },
    },
    apisecond: {
      'domain.resource.list': {
        key: 'RESOURCEID',
        parent: 'DOMAINID',
      },
      'linode.config.list': {
        key: 'CONFIGID',
        parent: 'LINODEID',
      },
      'linode.ip.list': {
        key: 'IPADDRESSID',
        parent: 'LINODEID',
      },
      'linode.disk.list': {
        key: 'DISKID',
        parent: 'LINODEID',
      },
    },
  }
  this.actionToKey = function (action)
  {
    for(key in this.cache_map)
    {
      if(action in this.cache_map[key])
      {
        return this.cache_map[key][action].key
      }
    }
  }
  this.add = function (key, obj)
  {
    if(!this.cache[key])
    {
      this.cache[key] = {
      }
    }
    obj.key = key
    this.cache[key][obj[key]] = obj
  }
  this.get = function(key, id)
  {
    return this.resolve(this.cache[key][id])
  }
  this.getAll = function(key)
  {
    var objs = []
    for(k in this.cache[key])
    {
      objs.push(this.get(key, k))
    }
    return objs
  }
  this.resolve = function(item)
  {
    for(key in item)
    {
      if(key.toLowerCase() != item.key.toLowerCase() && this.cache[key])
      {
        item[key] = this.cache[key][item[key]]
      }
    }
    return item
  }
  this.iterateResults = function(api, action, data)
  {
    var cm = this.actionToKey(action)
    var p = this
    if(data)
    {
      $.each(data, function(i, item)
      {
        item.api = api.api_key
        p.add(cm, item)
      })
    }
  }
  this.handleBatch = function(api, results, cb)
  {
    var p = this
    $.each(results, function(idx, result)
    {
      p.iterateResults(api, result.ACTION, result.DATA)
    });
    if(cb)
    {
      cb();
    }
  }
  this.fillList = function(cache, allapi, cb)
  {
    var actions = [];
    for (action in cache)
    {
      actions.push({api_action:action
      })
    }
    var data = {
      api_requestArray: $.toJSON(actions),
    }
    var apis = []
    if (!allapi)
    {
      apis.push(this.apis[0])
    }
    else
    {
      apis = this.apis
    }
    var p = this;
    $.each(apis, function(i, api)
    {
      api.batch({
        args: data,
        callback: function(results)
        {
          p.handleBatch(api, results, function()
          {
            if(cb)
            {
              cb(api);
            }
          });
        },
      });
    })
  }
  this.fill = function(final)
  {
    var p = this;
    this.batch_finished = this.apis.length

    this.fillList(this.cache_map.common, false, function(api)
    {
      p.fillList(p.cache_map.apifirst, true, function(api)
      {
        p.fillSecond(api, final)
      });
    })
  }
  this.fillSecond = function(api, final)
  {
    this.phase = 2
    var actions = [];
    for(action in this.cache_map.apisecond)
    {
      var item = this.cache_map.apisecond[action]
      var objs = this.cache[item.parent]
      if(objs)
      {
        $.each(objs, function(i, v)
        {
          if(api.api_key == v.api)
          {
            var a = { api_action: action
            }
            a[item.parent] = v[item.parent]
            actions.push(a)
          }
        })
      }
      else
      {
        console.log('No '+item.parent+' for '+api.api_key)
      }
    }
    var data = {
      api_requestArray: $.toJSON(actions),
    }
    var p = this;
    api.batch({
      args: data,
      callback: function(results)
      {
        p.batch_finished -= 1;
        p.handleBatch(api, results);
        if(p.batch_finished <= 0)
        {
          final();
        }
      },
    })
  }
}
