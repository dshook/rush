import DefaultWidgetFront from './widgets/DefaultWidgetFront.jsx';
//import SqlServer from './widgets/SqlServer/front.jsx';
//import Postgres from './widgets/Postgres/front.jsx';
import Limit from './widgets/Limit/front.jsx';
import CSV from './widgets/CSV/front.jsx';
import Filter from './widgets/Filter/front.jsx';

module.exports.getView = function(view){
  var bodies = {
    //SqlServer,
    //Postgres,
    Limit,
    Filter,
    CSV
  };

  return bodies[view] || DefaultWidgetFront;
};
