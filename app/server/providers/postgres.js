var pg = Promise.promisifyAll(require('pg'));

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

  read(res, query){
    var client = this._client;
    return client
    .connectAsync()
    .then(function() {
      return client.queryAsync(query);
    })
    .then(function(result) {
      res.write(result.rows[0].theTime.toString());
      return client.end();
    })
    .catch(function(err){
      return res.write(err.toString());
    });
  }

  testRead(res){
    return this.read(res, 'SELECT NOW() AS "theTime"');
  }
}