import fs from 'fs';
import path from 'path';

/**
 * Setup all HTTP routes in the application here
 */
export default function routes(app, http)
{
  //set up dynamic routes to the endpoints folder
  var endpointPath = './endpoints/'; 
  fs.readdir(path.resolve(__dirname, endpointPath), function(err, files){
    if(err){
      throw 'Could not find endpoint path';
    }

    files.forEach(function(item){
      item = item.replace('.js', '');
      http.use('/api/' + item, app.make(require(endpointPath + item + '.js')));
    });
  });
}
