import forms from 'newforms';

module.exports = forms.Form.extend({
  filter: forms.CharField({required: false})
});
