import DefaultWidgetBack from './widgets/DefaultWidgetBack.jsx';
import SqlServer from './widgets/SqlServer/back.jsx';
import Postgres from './widgets/Postgres/back.jsx';
import Limit from './widgets/Limit/back.jsx';
import CSV from './widgets/CSV/back.jsx';
import Filter from './widgets/Filter/back.jsx';

module.exports.getView = function(view){
  var bodies = {
    SqlServer,
    Postgres,
    Limit,
    Filter,
    CSV
  };

  return bodies[view] || DefaultWidgetBack;
};
