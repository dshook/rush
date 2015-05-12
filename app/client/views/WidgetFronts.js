var bulk = require('bulk-require');

module.exports.getView = function(view){
  var includes = bulk(__dirname, ['widgets/**/*.jsx']);
  var widgets = includes.widgets;

  //try to return the most appropriate thing from the very specific widget role
  //to the very generic default
  var widget = widgets[view];
  if(!widget) return widgets.DefaultWidgetFront;

  return widget.front ? widget.front : widgets.DefaultWidgetFront;
};
