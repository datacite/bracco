// Finish conversion of this component to a @glimmer component.
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

@tagName('div')
export default class DoiCitationBody extends Component {
  didRender() {
    super.didRender(...arguments);
    window.MathJax.typesetClear([this.element]);
    this.element.innerHTML = this.text;
    window.MathJax.typeset([this.element]);
  }
}
