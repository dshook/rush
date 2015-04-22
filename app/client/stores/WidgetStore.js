import _ from 'lodash';
import widgetActions from '../actions/WidgetActions';
import messenger from '../messenger/AppMessenger';
import BaseStore from './BaseStore';
import Widget from '../../shared/models/widget.js';
import Mapper from '../../shared/lib/mapper/';

export const change = 'WidgetStore: Change';

export class WidgetStore extends BaseStore{
	constructor(transport){
    super();

    this.change = change;
    this.messenger = messenger;
    this.transport = transport;

    this.dataSource = '/api/widgets';
    this._widgets = [];

    let widgetMapper = new Mapper(Widget);
    this.transport
      .get(this.dataSource)
      .then(result => {
        this._widgets = widgetMapper.toMany(result.body);
        this.emitChange();
      });
  }

  get widgets() {
    return this._widgets;
  }

  get maxKey() {
    if(this._widgets.length === 0) return 0;
    return _(this._widgets).map(x => x.key).max();
  }

  save(){
    var fileUploadWidgets = _(this.widgets).filter(w => w.config.fileUpload);
    var fileUploads = [];

    //upload any files necessary and then update the config with returned info
    if(fileUploadWidgets.any()){
      fileUploadWidgets.value().forEach(w => {
        fileUploads.push(
          this.transport
            .postFile(this.dataSource, w.config.fileUpload)
            .catch(e => console.log(e))
            .then(uploadRes => {
              w.config.file = uploadRes.body.file;
              delete w.config.fileUpload;
            })
        );
      });
    }
    Promise.all(fileUploads)
      .then(() => this.transport.put(this.dataSource, this._widgets))
      .then(() => {
        this.emitChange();
      })
      .catch(e => console.log(e));
  }

  [messenger.ev(widgetActions.add)](options){
    var w = new Widget();
    w.name        = options.widgetType.name;
    w.provider    = options.widgetType.name;
    w.role        = options.widgetRole;
    w.key         =  this.maxKey + 1;
    this._widgets.splice(options.widgetPosition, 0, w);

    this.save();
  }

  [messenger.ev(widgetActions.update)](widget){
    var widgetIndex = this._widgets.map(x => x.key).indexOf(widget.key);
    if(widgetIndex < 0){
      throw 'Cannot find widget to update.';
    }
    this._widgets[widgetIndex] = widget;

    this.save();
  }

  [messenger.ev(widgetActions.remove)](key){
    this._widgets = this._widgets.filter(x => x.key !== key);
    this.save();
  }
}
