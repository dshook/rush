var pg = promise.promisifyAll(require('pg'));
import QueryStream from 'pg-query-stream';
import stream from 'stream';
import sqlBricks from 'sql-bricks';
import debugLib from 'debug';
var debug = debugLib('rush:PostgresDriver');

export default class PostgresDriver{
  constructor(config){
    this._config = config;
  }

  formatConfig(c){
    return `postgres://${c.user}:${c.password}@${c.server}/${c.database}`;
  }

  init(){
    this._client = new pg.Client(this.formatConfig(this._config));
  }

  read(){
    this.init();
    var client = this._client;
    var query = this._config.query;
    return {
      action: 'pipe',
      data: client.connectAsync()
        .then(function() {
          var queryStream = new QueryStream(query);
          return client.query(queryStream);
        })
    };
  }

  write(){
    this.init();
    var client = this._client;
    var destTable = this._config.destTable;
    if(!destTable) throw new Error('Must Specifiy Destination Table');

    var insert = sqlBricks.insert;
    var writeStream = new stream.Writable({objectMode: true});
    writeStream._write = function(chunk, encoding, done){
      var insString = insert(destTable, chunk).toString();
      debug(insString);
      client.query(insString, function(err, result){
        if(err) writeStream.emit('error', new Error(err));
        debug('query result %j', result);
      });
      done();
    };

    return [
      client.connectAsync()
        .then(function() {
          return writeStream;
        })
      ,
      function doneWriting(outputStream){
        return new promise(function(resolve, reject){
          outputStream.on('finish', () => {
            debug('write finished');
            resolve('write finished');
          });
          outputStream.on('error', e => {
            debug('Error Writing to postgres ' + e.toString());
            reject(e);
          });
        });
      }
    ];
  }

  testRead(){
    this._config.query = 'SELECT CURRENT_TIMESTAMP as t';
    return this.read();
  }
}
