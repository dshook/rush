import forms from 'newforms';

var SignupForm = forms.Form.extend({
  delimiter: forms.CharField({initial: ','}),
  endLine: forms.CharField({initial: '\n'}),
  //columns: forms.CharField(),
  escapeChar: forms.CharField({required: false}),
  enclosedChar: forms.CharField({required: false}),
});

module.exports = SignupForm;