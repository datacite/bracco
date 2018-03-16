import Ember from 'ember';
const { service } = Ember.inject;
import fetch from 'fetch';
import moment from 'moment';
import ENV from 'bracco/config/environment';

const stateList = {
  undetermined: ['undetermined', 'registered', 'findable'],
  draft: ['draft', 'registered', 'findable'],
  registered: ['registered', 'findable'],
  findable: ['registered', 'findable']
}

const years = [
  1999,
  2000,
  2001,
  2002,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018
];

export default Ember.Component.extend({
  currentUser: service(),
  store: service(),

  edit: false,
  transfer: false,
  doi: null,
  client: null,
  clients: [],
  resourceType: null,
  resourceTypes: [],
  stateList,
  state: null,
  years,
  useForm: false,

  reset() {
    this.set('doi', null);
    this.set('useForm', false);
    this.set('edit', false);
    this.set('delete', false);
    this.set('transfer', false);
  },
  searchClient(query) {
    if (this.get('currentUser').get('isAdmin')) {
      this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'page[size]': 100 }));
    } else if (this.get('currentUser').get('isProvider')) {
      this.set('clients', this.get('store').query('client', { 'query': query, 'provider-id': this.get('currentUser').get('provider_id'), sort: 'name', 'page[size]': 100 }));
    }
  },
  selectClient(client) {
    this.set('client', client)
    this.get('doi').set('client', client);
    this.get('doi').set('provider', client.get('provider'));
  },
  searchResourceType(query) {
    this.set('resourceTypes', this.get('store').query('resource-type', { 'query': query, sort: 'name', 'page[size]': 100 }));
  },
  selectResourceType(resourceType) {
    this.set('resourceType', resourceType)
    this.get('doi').set('resource-type', resourceType);
  },
  setStates(state) {
    // test prefix uses only draft state
    if (this.get('doi').get('prefix') === '10.5072') {
      this.set('states', ['draft']);
      this.get('doi').set('state', 'draft');
    } else {
      this.set('states', stateList[state]);
    }
  },
  setEvent(stateChange) {
    if (stateChange[1] === 'draft') {
      return 'start';
    } else if (stateChange[0] === 'draft' && stateChange[1] === 'registered') {
      return 'register';
    } else if (stateChange[0] === 'draft' && stateChange[1] === 'findable') {
      return 'publish';
    } else if (stateChange[0] === 'registered' && stateChange[1] === 'findable') {
      return 'publish';
    } else if (stateChange[0] === 'findable' && stateChange[1] === 'registered') {
      return 'hide';
    }
  },
  new(input) {
    let doi = this.get('doi').get('doi');
    let url = ENV.APP_URL + '/dois/' + doi;
    return fetch(url, {
      method: 'put',
      headers: {
        'authorization': 'Bearer ' + this.get('currentUser').get('jwt'),
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          type: 'dois',
          attributes: {
            doi: doi,
            xml: input
          }
        }
      })
    }).then(function(response) {
      if (response.ok) {
        return response.json().then(function(res) {
          return res.data;
        });
      } else {
        Ember.Logger.assert(false, response);
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error);
    });
  },
  b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  },

  actions: {
    edit(doi) {
      this.set('doi', doi);
      this.get('doi').set('confirmDoi', doi.get('doi'));

      var timestamp = new Date(Date.parse(doi.get('published')));
      let published = moment(timestamp).utc().format('Y');
      this.get('doi').set('published', published);

      this.setStates(doi.get('state'));
      this.searchClient(null);
      this.searchResourceType(null);
      this.set('edit', true);
    },
    transfer(doi) {
      this.set('doi', doi);
      this.get('doi').set('confirmDoi', doi.get('doi'));
      this.searchClient(null);
      this.set('transfer', true);
    },
    delete(doi) {
      this.set('doi', doi);
      this.get('doi').set('confirmDoi', null);
      this.set('delete', true);
    },
    searchClient(query) {
      this.searchClient(query);
    },
    selectClient(client) {
      this.selectClient(client);
    },
    selectResourceType(resourceType) {
      this.selectResourceType(resourceType);
    },
    searchResourceType(query) {
      this.searchResourceType(query);
    },
    // selectPublished(date) {
    //   this.selectPublished(date);
    // },
    selectState(state) {
      this.get('doi').set('state', state);
    },
    selectForm(form) {
      this.set('useForm', form === 'form');
    },
    didSelectFiles(files, resetInput) {
      var reader = new FileReader();
      let self = this;
      reader.onload = function(e) {
        var data = e.target.result;
        var xml = self.b64DecodeUnicode(data.split(",")[1]);
        self.get('doi').set('xml', xml);

        self.get('doi').set('creator', null);
        self.get('doi').set('title', null);
        self.get('doi').set('publisher', null);
        self.get('doi').set('published', null);
        self.get('doi').set('resourceType', null);
        self.get('doi').set('resourceTypeSubtype', null);
        self.get('doi').set('description', null);
        self.get('doi').set('license', null);
      }
      reader.readAsDataURL(files[0]);

      resetInput();
    },
    submit(doi) {
      // change state via event if there is a change
      let stateChange = doi.changedAttributes().state;
      if (typeof stateChange !== 'undefined') {
        doi.set('event', this.setEvent(stateChange));
      }

      let self = this;
      doi.save().then(function() {
        self.set('edit', false);
        self.set('useForm', false);
        self.set('transfer', false);
      });
    },
    destroy(doi) {
      let self = this;
      this.set('client', this.get('doi').get('client'));
      this.get('store').findRecord("doi", doi.id, { backgroundReload: false }).then(function(doi) {
        doi.destroyRecord().then(function () {
          self.get('router').transitionTo('clients.show.dois', self.get('client'));
        });
      });
    },
    cancel() {
      this.reset();
    }
  },

  didInsertElement() {
    let forms = { 'xml': 'Upload File',
                  'form': 'Use Form' };
    this.set('forms', forms);
  }
});
