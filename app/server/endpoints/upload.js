var fs = Promise.promisifyAll(require('fs'));
import {Router} from 'express';

export default function upload()
{
  var router = new Router();

  router.post('/', function(req, res) {
    var files = req.files;
    console.log(files);
    res.json(files);
    res.end();
  });

  return router;
}
