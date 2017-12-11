import Ember from 'ember';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['dropdownMenu'],
  dropdownMenu: Ember.computed(function() {
    this.get('currentUser').get('isAuthenticated');
  }),

  didInsertElement: function() {
    this.set('currentUser', this.get('currentUser'));
    this.set('signout', { href: ENV.JWT_HOST + '/sign_out' })
    this.set('signin', { href: ENV.JWT_HOST + '/sign_in', className: 'btn btn-sm btn-neutral' })
  }
});
