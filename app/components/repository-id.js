// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import ENV from 'bracco/config/environment';
import { tracked } from '@glimmer/tracking';

export default class RepositoryId extends Component {
  constructor() {
    super(...arguments);

    this.generate();
  }

  generate() {
    let self = this;
    let url = ENV.API_URL + '/repositories/random';
    fetch(url)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            if (self.isDestroying || self.isDestroyed) {
              return;
            }
            self.model.set(
              'symbol',
              self.provider.id.toUpperCase() + '.' + data.symbol
            );
          });
        } else {
          console.debug(response);
        }
      })
      .catch(function (error) {
        console.debug(error);
      });
  }

  @action
  generateAction() {
    this.generate();
  }

  @action
  refreshAction() {
    this.generate();
  }

  @action
  clearAction() {
    this.model.symbol = null;
  }
}
