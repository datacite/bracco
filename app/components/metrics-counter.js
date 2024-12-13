// Finish conversion of this component to a @glimmer component.
import { classNames, tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@tagName('div')
@classNames('col-lg-3', 'col-md-4')
export default class MetricsCounter extends Component {}
