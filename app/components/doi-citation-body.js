import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('div')
export default class DoiCitationBody extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
  }

  didRender() {
    super.didRender(...arguments);

    window.MathJax.typesetClear([this.element]);
    this.element.innerHTML = this.text;
    window.MathJax.typeset([this.element]);
  }
}
