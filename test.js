var LinodeApi = require('./linode.api');

var api = new LinodeApi(process.env.LINODE_API_KEY);

api.domain_list({}, function (ret) {
  console.log(ret);
});
