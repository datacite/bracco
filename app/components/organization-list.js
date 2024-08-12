import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('div')
@classNames('row')
export default class OrganizationList extends Component {}
