import {Router} from 'express';

export default function widgetProviders()
{
  var router = new Router();

  router.get('/', function(req, res) {
    var providerIndex = require('../providers/');
    var providers = [];
    for(let key in providerIndex){
      let provider = new providerIndex[key]();
      providers.push({
        name: key,
        isSource: !!provider.read,
        isTransform: !!provider.transform,
        isDest: !!provider.write
      });
    }

    res.json(providers);
  });

  return router;
}
