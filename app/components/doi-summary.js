import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
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
