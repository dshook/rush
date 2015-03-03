import forms from 'newforms';

var SignupForm = forms.Form.extend({
  //file: forms.FileField({required: false, controlled: true, ref:"fileUpload"}),
  delimiter: forms.CharField({initial: ','}),
  rowDelimiter: forms.ChoiceField({initial: 'auto', choices: ['auto', 'unix', 'mac', 'windows', 'unicode']}),
  escape: forms.CharField({required: false}),
});

module.exports = SignupForm;