var pg = Promise.promisifyAll(require('pg'));

export default class PostgresDriver{
  constructor(conString){
    this._conString = conString;
  }

  connect(){
    this._client = new pg.Client(this._conString);
  }

  testRead(res){
    var client = this._client;
    return client
    .connectAsync()
    .then(function() {
      return client.queryAsync('SELECT NOW() AS "theTime"');
    })
    .then(function(result) {
      res.write(result.rows[0].theTime.toString());
      client.end();
    })
    .catch(function(err){
        return res.write(err.toString());
    });
  }
}