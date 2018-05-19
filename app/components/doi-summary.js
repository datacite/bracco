import Component from '@ember/component';
import ENV from 'bracco/config/environment';

export default Component.extend({
  tagName: 'div',
  classNames: ['panel-body'],
  isList: false,

  didReceiveAttrs() {
    this._super(...arguments);
    
    Ember.$.getScript(ENV.MATHJAX_URL);
  }
});
