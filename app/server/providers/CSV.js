var fs = Promise.promisifyAll(require('fs'));
import csv from 'csv';

export default class CSVDriver{
  constructor(config){
    this._config = config;
    //hard set columns to true to get objects with properties back
    this._config.columns = true;
  }

  read(){
    var filePath = './public/config/example.csv';
    var readStream = fs.createReadStream(filePath);

    return Promise.resolve(
      readStream.pipe(csv.parse(this._config))
    );
  }

}