import forms from 'newforms';

module.exports = forms.Form.extend({
  filter: forms.CharField({required: false}),
  searchKeys: forms.CharField({label: 'Keys to search (comma separated)', required: false}),
  useRegex: forms.BooleanField({label: 'Use Regex', initial: false, required: false})
});
