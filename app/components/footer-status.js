/*global StatusPage*/

import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    if (typeof StatusPage !== 'undefined') {
      let sp = new StatusPage.page({ page: 'nmtzsv0smzk5'});
      let self = this;

      sp.summary({
        success(data) {
          self.$('.color-description').text(data.status.description);
          self.$('.color-dot').addClass(data.status.indicator);
        }
      });
    }
  }
});
