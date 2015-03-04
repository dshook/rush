var fs = Promise.promisifyAll(require('fs'));
import csv from 'csv';
import JSONStringify from 'streaming-json-stringify';

export default class CSVDriver{
  constructor(config){
    this._config = config || {};
    //hard set columns to true to get objects with properties back
    this._config.columns = true;

    this._config.header = true;
  }

  read(){
    if(!this._config.file){
      return Promise.reject('No CSV File to read from');
    }
    var filePath = this._config.file.path;
    var readStream = fs.createReadStream(filePath);

    if(this._config.rowDelimiter === 'auto'){
      delete this._config.rowDelimiter;
    }
    return Promise.resolve(
      readStream.pipe(csv.parse(this._config))
    );
  }

  write(){
    var generator = csv.generate({objectMode: true, seed: 1, headers: 2, length: 10});
    var filePath = './public/config/example-write.csv';
    var writeStream = fs.createWriteStream(filePath);

    return Promise.resolve(
        generator
        //.pipe(new JSONStringify())
        .pipe(csv.stringify())
        .pipe(writeStream)
    );
  }

}