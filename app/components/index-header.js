import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('div')
export default class IndexHeader extends Component {
  didRender() {
    super.didRender(...arguments);

    if (this.element.querySelector('a.active.nav-link') == null) {
      this.element.querySelector('a.nav-link').classList.add("active")
    }
 
    if (this.element.querySelector('a.active.nav-link').parentElement !== null) {
      this.element.querySelector('a.active.nav-link').parentElement.classList.add("active")
    }
  }
}
