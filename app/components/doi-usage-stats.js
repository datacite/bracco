import Component from '@ember/component';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import { oneWay } from '@ember/object/computed';
import ENV from 'bracco/config/environment';
import { A } from '@ember/array';

export default Component.extend({
  currentUser: service(),

  usageViews: null,
  usageDownloads: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.fetchUsage();
  },

  fetchUsage() {
    let self = this;
    let url = ENV.EVENTDATA_URL + '/events?doi=' + this.model.get("doi");
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.currentUser.get('jwt'),
        'Accept': 'application/vnd.api+json'
      }
    }).then(function(response) {
      if (response.ok) {
        return response.json().then(function(data) {
          if (data.errors) {
            let message = data.errors[0].title;
            return message;
          } else {
            let usageViews = oneWay(data.meta['relation-types'] && A(data.meta['relation-types']).findBy('id', 'total-dataset-investigations-regular'));
            let usageDownloads = oneWay(data.meta['relation-types'] && A(data.meta['relation-types']).findBy('id', 'total-dataset-requests-regular'));

            if (usageViews) {
              self.set('usageViews', usageViews['year-months']);
            }
            if (usageDownloads) {
              self.set('usageDownloads', usageDownloads['year-months']);
            }
          }
        });
      } else {
        if (console.debug) {
          console.debug(response);
        } else {
          console.log(response);
        }
      }
    }).catch(function(error) {
      if (console.debug) {
        console.debug(error);
      } else {
        console.log(error);
      }
    });
  }
});
