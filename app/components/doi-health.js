import Ember from 'ember';

export default Ember.Component.extend({

  bodyHasDoi: Ember.computed(function() {
    if (this.get('model').get("landingPage").bodyHasPid) {
      return "Yes";
    } else {
      return "No";
    }
  }),

  hasSchemaOrg: Ember.computed(function() {
    if (this.get('model').get("landingPage").hasSchemaOrg) {
      return "Yes";
    } else {
      return "No";
    }
  }),

  isStatusError: Ember.computed(function() {
    return this.get('model').get("landingPage").status != 200 && this.get('model').get("landingPage").status != null;
  }),

  hasError: Ember.computed(function() {
    if (this.get('model').get("landingPage").error) {
      return true;
    } else {
      return false;
    }
  }),

});
