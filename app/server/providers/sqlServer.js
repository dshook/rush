import sql from 'mssql';

export default class SqlServer{
  constructor(config){
    this._config = config;
  } 

  init(){
    this._config.requestTimeout = 60000;
    this._client = new sql.Connection(this._config);
  }

  read(){
    this.init();
    var query = this._config.query;
    var client = this._client;
    return client.connect().then(function(err) {
        var request = new sql.Request(client);
        request.stream = true;

        return request.query(query);
    });
  }

  testRead(){
    this._config.query = 'SELECT * FROM Employees';
    return this.read();
  }

}