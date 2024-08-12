import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class DoiGeoLocations extends Component {
  showGeoLocations = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.get('geoLocations')) {
      this.model.set('geoLocations', []);
    }
  }

  @action
  addGeoLocation() {
    this.model.get('geoLocations').createFragment();
    this.set('showGeoLocations', true);
  }

  @action
  toggleGeoLocations() {
    this.set('showGeoLocations', !this.showGeoLocations);
  }
}
