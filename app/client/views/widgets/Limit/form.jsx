import forms from 'newforms';

module.exports = forms.Form.extend({
  limit: forms.IntegerField({initial: 10})
});
