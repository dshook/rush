import sql from 'mssql';

export default class SqlServer{
  constructor(config){
    this._config = config;
  } 

  init(){
    this._config.requestTimeout = 60000;
    this._client = new sql.Connection(this._config);
  }

  read(query){
    this.init();
    var client = this._client;
    return client.connect().then(function(err) {
        var request = new sql.Request(client);
        request.stream = true;

        return request.query(query);
    });
  }

  testRead(){
    return this.read('SELECT * FROM Employees');
  }

}