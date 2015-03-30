import forms from 'newforms';

module.exports = forms.Form.extend({
  //file: forms.FileField({required: false}),
  delimiter: forms.CharField({initial: ','}),
  rowDelimiter: forms.ChoiceField({initial: 'auto', choices: ['auto', 'unix', 'mac', 'windows', 'unicode']}),
  escape: forms.CharField({required: false})
});
