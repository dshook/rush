import TransformWidgetBody from './widgets/TransformWidgetBody.jsx';
import SqlServer from './widgets/SqlServer.jsx';
import Postgres from './widgets/Postgres.jsx';
import CSV from './widgets/CSV.jsx';

module.exports.getView = function(view){
  var bodies = {
    TransformWidgetBody,
    SqlServer,
    Postgres,
    CSV
  };

  return bodies[view] || TransformWidgetBody;
};
