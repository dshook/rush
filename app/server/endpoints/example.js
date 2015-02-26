import {Router} from 'express';

export default function example()
{
  var router = new Router();

  router.get('/', function(req, res) {
    res.send({ hello: 'earf' });
  });

  return router;
}
