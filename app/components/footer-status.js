import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    var sp = new StatusPage.page({ page: 'nmtzsv0smzk5'});
    var a = this;

    sp.summary({
      success: function(data) {
        a.$('.color-description').text(data.status.description);
        a.$('.color-dot').addClass(data.status.indicator);
      }
    });
  }
});
