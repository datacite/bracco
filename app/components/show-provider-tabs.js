// Finish conversion of this component to a @glimmer component.
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@tagName('div')
export default class ShowProviderTabs extends Component {
  didRender() {
    super.didRender(...arguments);

    // Remove old active indicator
    if (this.element.querySelector('li.nav-item.active')) {
      this.element.querySelector('li.nav-item.active').classList.remove("active")
    }

    if (this.element.querySelector('a.active.nav-link') == null) {
      this.element.querySelector('a.nav-link').classList.add("active")
    }
 
    if (this.element.querySelector('a.active.nav-link').parentElement !== null) {
      this.element.querySelector('a.active.nav-link').parentElement.classList.add("active")
    }
  }
}
