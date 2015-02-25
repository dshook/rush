import TransformWidgetBody from './widgets/TransformWidgetBody.jsx';
import SqlServer from './widgets/SqlServer.jsx';
import Postgres from './widgets/Postgres.jsx';

module.exports.getView = function(view){
  var bodies = {
    TransformWidgetBody,
    SqlServer,
    Postgres
  };

  return bodies[view] || TransformWidgetBody;
};
