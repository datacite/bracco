import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

@classic
export default class RepositoryId extends Component {
  init() {
    super.init(...arguments);

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
              self.provider.get('id').toUpperCase() + '.' + data.symbol
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
    this.model.set('symbol', null);
  }
}
