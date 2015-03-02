var pg = Promise.promisifyAll(require('pg'));
var QueryStream = require('pg-query-stream');

export default class PostgresDriver{
  constructor(config){
    this._config = config;
  }

  formatConfig(c){
    return `postgres://${c.user}:${c.password}@${c.server}/${c.database}`;
  }

  connect(){
    this._client = new pg.Client(this.formatConfig(this._config));
  }

  read(query){
    var client = this._client;
    return client
      .connectAsync()
      .then(function() {
        var queryStream = new QueryStream(query);
        return client.query(queryStream);
      });
  }

  testRead(){
    return this.read('SELECT CURRENT_TIMESTAMP as t');
  }
}