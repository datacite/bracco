import Component from '@ember/component';
import { inject as service } from '@ember/service';
//import { formatMathMathjax } from 'bracco/helpers/format-math-mathjax';
//import MathJax from 'mathjax';

export default Component.extend({
  tagName: 'div',
  classNames: [ 'panel-body' ],
  isList: false,
  store: service(),
  isResearcherProfile: false,

  /*
  didInsertElement() {
    this._super(...arguments);
    
    window.MathJax.typeset([this.get('element')]);
  },
*/
  didRender() {
    this._super(...arguments);
    
    window.MathJax.typeset([this.get('element')]);
  },
});
