import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'div',
  classNames: ['panel-body'],
  isList: false,
  store: service(),
  isResearcherProfile: false,

  didRender() {
    this._super(...arguments);

    window.MathJax.typeset([this.element]);
  }
});
