// Finish conversion of this component to a @glimmer component.
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiGeoLocations extends Component {
  @tracked showGeoLocations = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.geoLocations) {
      this.model.geoLocations = [];
    }
  }

  @action
  addGeoLocation() {
    this.model.geoLocations.createFragment();
    this.showGeoLocations = true;
  }

  @action
  toggleGeoLocations() {
    this.showGeoLocations = !this.showGeoLocations;
  }
}
