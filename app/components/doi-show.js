import Ember from 'ember';
const { service } = Ember.inject;
import moment from 'moment';

const stateList = {
  undetermined: ['undetermined', 'registered', 'findable'],
  draft: ['draft', 'registered', 'findable'],
  registered: ['registered', 'findable'],
  findable: ['registered', 'findable']
}

const yearList = Array.from(new Array(50), (x,i) => i + 1970);

export default Ember.Component.extend({
  currentUser: service(),
  store: service(),

  edit: false,
  transfer: false,
  isDisabled: true,
  doi: null,
  oldClient: null,
  client: null,
  clients: [],
  resourceType: null,
  resourceTypes: [],
  stateList,
  state: null,
  yearList,
  years: null,

  reset() {
    this.set('doi', null);
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
    this.set('isDisabled', client.id === this.get('oldClient.id'));
    this.set('client', client)
    this.get('doi').set('client', client);
    this.get('doi').set('provider', client.get('provider'));
  },
  searchPublished(query) {
    var years = yearList.filter(function(year) {
      return year.toString().startsWith(query);
    })
    this.set('years', years);
  },
  selectPublished(published) {
    this.get('doi').set('published', published);
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
      this.searchPublished(null);
      this.set('years', yearList);
      this.set('edit', true);
    },
    transfer(doi) {
      this.set('doi', doi);
      this.get('doi').set('confirmDoi', doi.get('doi'));
      this.get('doi').set('xml', null);
      this.set('oldClient', this.get('doi').get('client'));
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
    searchPublished(query) {
      this.searchPublished(query);
    },
    selectPublished(published) {
      this.selectPublished(published);
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
      this.get('doi').set('useForm', form === 'form');
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

      doi.set('client', this.get('client'));
      doi.set('provider', this.get('client').get('provider'));

      let self = this;
      doi.save().then(function() {
        self.set('edit', false);
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
