var pg = Promise.promisifyAll(require('pg'));
module.exports = PostgresDriver;

function PostgresDriver(conString){
  this._conString = conString;
}

PostgresDriver.prototype.connect = function(){
  this._client = new pg.Client(this._conString);
};

PostgresDriver.prototype.testRead = function(res){
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
};
