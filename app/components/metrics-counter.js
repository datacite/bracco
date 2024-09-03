import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('div')
@classNames('col-lg-3', 'col-md-4')
export default class MetricsCounter extends Component {}
