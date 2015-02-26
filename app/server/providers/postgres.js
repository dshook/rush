var pg = Promise.promisifyAll(require('pg'));

export default class PostgresDriver{
  constructor(conString){
    this._conString = conString;
  }

  connect(){
    this._client = new pg.Client(this._conString);
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
      client.end();
    })
    .catch(function(err){
        return res.write(err.toString());
    });
  }

  testRead(res){
    return this.read(res, 'SELECT NOW() AS "theTime"');
  }
}