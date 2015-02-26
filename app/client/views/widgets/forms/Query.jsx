import forms from 'newforms';

var Query = forms.Form.extend({
  query: forms.CharField({widget: forms.Textarea}),
});

module.exports = Query;