import Ember from 'ember';
const { service } = Ember.inject;
import ENV from 'bracco/config/environment';
import fetch from 'fetch';

const stateList = {
  inactive: ['inactive'],
  draft: ['draft', 'registered', 'findable'],
  registered: ['registered', 'findable'],
  findable: ['registered', 'findable']
}
const events = {
  "registered": "register",
  "findable": "publish"
};

export default Ember.Component.extend({
  currentUser: service(),
  store: service(),

  tagName: 'div',
  classNames: ['row'],
  new: false,
  edit: false,
  doi: '',
  provider: null,
  target: null,
  client: null,
  clients: [],
  prefix: '10.5072',
  suffix: '',
  prefixes: [],
  events,

  searchClient(query) {
    if (this.get('currentUser').get('isAdmin')) {
      this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'page[size]': 100 }));
    } else if (this.get('currentUser').get('isProvider')) {
      this.set('clients', this.get('store').query('client', { 'query': query, 'provider-id': this.get('currentUser').get('providerId'), sort: 'name', 'page[size]': 100 }));
    }
  },
  selectTarget(target) {
    this.set('target', target);
    this.get('client').set('target', target);
  },
  reset() {
    this.set('client', null);
    this.set('edit', false);
    this.set('new', false);
  },
  getStates(state) {
    // test prefix uses only draft state
    if (this.get('prefix') === '10.5072') {
      return ['draft'];
    } else {
      return stateList[state];
    }
  },
  countLines(xml) {
    this.set('lines', xml.split(/\r\n|\r|\n/).length + 1);
  },
  convertContent(input) {
    let url = ENV.APP_URL + '/metadata/convert';
    return fetch(url, {
      method: 'post',
      headers: {
        'authorization': 'Bearer ' + this.get('currentUser').get('jwt'),
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          type: 'metadata',
          attributes: { xml: input }
        }
      })
    }).then(function(response) {
      if (response.ok) {
        return response.json().then(function(res) {
          return atob(res.data.attributes.xml);
        });
      } else {
        Ember.Logger.assert(false, response);
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error);
    });
  },
  generate() {
    let self = this;
    let url = ENV.APP_URL + '/dois/random?prefix=' + this.get('prefix');
    return fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.get('currentUser').get('jwt')
      }
    }).then(function(response) {
      if (response.ok) {
        return response.json().then(function(data) {
          let suffix = 
          self.get('doi').set('suffix', data.doi);
          return data.doi;
        });
      } else {
        Ember.Logger.assert(false, response)
        return null;
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });
  },

  actions: {
    new: function(model) {
      let self = this;
      this.set('client', this.get('store').peekRecord('client', model.get('otherParams.client-id')));
      this.set('doi', this.get('store').createRecord('doi', { client: this.get('client'), state: 'draft' }));
      this.set('prefixes', this.get('store').query('prefix', { 'client-id': this.get('client.id'), sort: 'name', 'page[size]': 25 }));
      this.set('states', this.getStates('draft'));
      this.set('state', this.get('states')[0]);
      self.get('doi').set('prefix', '10.5072');
      this.set('prefix', '10.5072');
      this.generate().then(function() {
        self.set('new', true);
      });
    },
    edit: function() {
      this.set('client', this.get('store').findRecord('client', this.get('model.otherParams.client-id')));
      this.searchClient(null);
      this.set('edit', true);
    },
    setPrefix(prefix) {
      this.setPrefix(prefix);
    },
    generate() {
      this.generate();
    },
    searchClient(query) {
      this.searchClient(query);
    },
    selectTarget(target) {
      this.selectTarget(target);
    },
    didSelectFiles(files, resetInput) {
      var reader = new FileReader();
      let self = this;
      reader.onload = function(e) {
        var data = e.target.result;
        var input = data.split(",")[1];
        self.convertContent(input).then(function(xml) {
          self.countLines(xml);
          self.get('doi').set('xml', xml);
        });
      }
      reader.readAsDataURL(files[0]);

      resetInput();
    },
    update() {
      this.get('client').save();
      this.set('edit', false);
      this.get('router').transitionTo('clients.show.dois', this.get('target'));
    },
    submit: function(doi) {
      // change state via event if there is a change
      let stateChange = doi.changedAttributes().state;
      if (typeof stateChange !== 'undefined') {
        doi.set('event', this.get('events')[stateChange[1]]);
      }

      doi.set('confirmDoi', doi.get('doi'));
      let self = this;
      doi.save().then(function(doi) {
        self.get('router').transitionTo('dois.show', doi.id);
        self.set('new', false);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    cancel: function() {
      this.reset();
    }
  }
});
