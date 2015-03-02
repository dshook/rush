var fs = Promise.promisifyAll(require('fs'));
import csv from 'csv-stream';

export default class CSVDriver{
  constructor(config){
    this._config = config;
  }

  read(){
    var filePath = './public/config/example.csv';
    var readStream = fs.createReadStream(filePath);
    var csvStream = csv.createStream(this._config);

    return Promise.resolve(
      readStream.pipe(csvStream)
    );
  }

}