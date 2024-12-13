// Finish conversion of this component to a @glimmer component.
import { classNames, tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';


@tagName('div')
@classNames('panel-body')
export default class DoiSummary extends Component {
  isList = false;

  @service
  store;

  isResearcherProfile = false;

  didRender() {
    super.didRender(...arguments);

    window.MathJax.typeset([this.element]);
  }
}
