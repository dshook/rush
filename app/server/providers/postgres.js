var pg = Promise.promisifyAll(require('pg'));
var QueryStream = require('pg-query-stream');

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
    return client
      .connectAsync()
      .then(function() {
        var queryStream = new QueryStream(query);
        return client.query(queryStream);
      });
  }

  testRead(){
    this._config.query = 'SELECT CURRENT_TIMESTAMP as t';
    return this.read();
  }
}
