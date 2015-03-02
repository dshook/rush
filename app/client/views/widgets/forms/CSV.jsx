import forms from 'newforms';

var SignupForm = forms.Form.extend({
  delimiter: forms.CharField({initial: ','}),
  rowDelimiter: forms.ChoiceField({initial: 'auto', choices: ['auto', 'unix', 'mac', 'windows', 'unicode']}),
  //columns: forms.CharField(),
  escape: forms.CharField({required: false}),
});

module.exports = SignupForm;