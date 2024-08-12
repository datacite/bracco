import classic from 'ember-classic-decorator';
import ApplicationSerializer from './application';

@classic
export default class Provider extends ApplicationSerializer {
  keyForRelationship(key) {
    return key;
  }
}
