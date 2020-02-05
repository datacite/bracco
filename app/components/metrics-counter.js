import Component from '@ember/component';
import { pluralize } from 'ember-inflector';

export default Component.extend({
  tagName: 'div',
  classNames: [ 'col-lg-3', 'col-md-4' ],
  data: null,
  label: '',
  count: 0,
  init() {
    this._super();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.model[`${pluralize(this.label.toLowerCase())}`] != null) {
      this.set('count', this.model[`${pluralize(this.label.toLowerCase())}`]);
    }
  },
});
