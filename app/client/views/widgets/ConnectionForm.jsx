import forms from 'newforms';

var SignupForm = forms.Form.extend({
  server: forms.CharField(),
  database: forms.CharField(),
  user: forms.CharField(),
  password: forms.CharField({widget: forms.PasswordInput({renderValue: true}) })
});

module.exports = SignupForm;
