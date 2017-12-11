import Ember from 'ember';
import ENV from 'bracco/config/environment';
//import fetch from 'fetch';
//import Cookie from 'ember-cli-js-cookie';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['dropdownMenu'],
  dropdownMenu: Ember.computed(function() {
    this.get('currentUser').get('isAuthenticated');
  }),

  // actions: {
  //   signout() {
  //     let url = ENV.JWT_HOST + '/sign_out';
  //     let self = this;
  //     fetch(url).then(function(response) {
  //       if (response.ok) {
  //         //Cookie.remove('_datacite_jwt');
  //         //self.get('currentUser').set('role_id', null);
  //         //self.get('router').transitionTo('index');
  //       }
  //     });
  //   }
  // },

  didInsertElement: function() {
    this.set('currentUser', this.get('currentUser'));
    this.set('signout', { href: ENV.JWT_HOST + '/sign_out' })
    this.set('signin', { href: ENV.JWT_HOST + '/sign_in', className: 'btn btn-sm btn-neutral' })
  }
});
