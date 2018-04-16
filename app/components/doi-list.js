import Ember from 'ember';
const { service } = Ember.inject;
import ENV from 'bracco/config/environment';
import fetch from 'fetch';

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

  tagName: 'div',
  classNames: ['row'],
  new: false,
  edit: false,
  doi: '',
  provider: null,
  target: null,
  client: null,
  clients: [],
  prefixes: [],
  yearList,
  years: null,
  hasInput: Ember.computed('doi', function() {
    return !Ember.isEmpty(this.get('doi.doi'));
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    this.searchResourceType(null);
  },

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
  searchPublished(query) {
    var years = yearList.filter(function(year) {
      return year.toString().startsWith(query);
    })
    this.set('years', years);
  },
  selectPublished(published) {
    this.get('doi').set('published', published);
  },
  reset() {
    this.set('client', null);
    this.set('edit', false);
    this.set('new', false);
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
  setEvent(state) {
    if (state === 'draft') {
      return 'start';
    } else if (state === 'registered') {
      return 'register';
    } else if (state === 'findable') {
      return 'publish';
    }
  },
  searchResourceType(query) {
    this.set('resourceTypes', this.get('store').query('resource-type', { 'query': query, sort: 'name', 'page[size]': 100 }));
  },
  selectResourceType(resourceType) {
    this.set('resourceType', resourceType)
    this.get('doi').set('resource-type', resourceType);
  },
  generate() {
    let self = this;
    let url = ENV.APP_URL + '/dois/random?prefix=' + this.get('doi').get('prefix');
    return fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.get('currentUser').get('jwt')
      }
    }).then(function(response) {
      if (response.ok) {
        return response.json().then(function(data) {
          var suffix = data.doi.split('/', 2)[1]
          self.get('doi').set('suffix', suffix);
          self.get('doi').set('doi', self.get('doi').get('prefix') + '/' + suffix);
          return suffix;
        });
      } else {
        Ember.Logger.assert(false, response)
        return null;
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });
  },
  b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  },

  actions: {
    new(model) {
      let self = this;
      this.set('client', this.get('store').peekRecord('client', model.get('otherParams.client-id')));
      this.set('doi', this.get('store').createRecord('doi', { client: this.get('client'), prefix: '10.5072', state: 'draft' }));
      this.set('prefixes', this.get('store').query('prefix', { 'client-id': this.get('client.id'), sort: 'name', 'page[size]': 25 }));
      this.setStates('draft');
      this.searchPublished(null);
      this.set('years', yearList);

      this.generate().then(function() {
        self.set('new', true);
      });
    },
    edit() {
      this.set('client', this.get('store').findRecord('client', this.get('model.otherParams.client-id')));
      this.searchClient(null);
      this.set('edit', true);
    },
    selectPrefix(prefix) {
      this.get('doi').set('prefix', prefix.id);
      this.get('doi').set('doi', prefix.id + '/' + this.get('doi').get('suffix'));
      this.setStates(this.get('doi').get('state'));
    },
    selectSuffix(suffix) {
      this.get('doi').set('suffix', suffix);
      this.get('doi').set('doi', this.get('doi').get('prefix') + '/' + suffix);
    },
    selectResourceType(resourceType) {
      this.selectResourceType(resourceType);
    },
    searchResourceType(query) {
      this.searchResourceType(query);
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
    selectState(state) {
      this.get('doi').set('state', state);
    },
    selectForm(form) {
      this.get('doi').set('useForm', form === 'form');
    },
    searchPublished(query) {
      this.searchPublished(query);
    },
    selectPublished(published) {
      this.selectPublished(published);
    },
    didSelectFiles(files, resetInput) {
      let self = this;
      return new Ember.RSVP.Promise(function (resolve, reject) {
        var reader = new FileReader();

        reader.onload = function(e) {
          var data = e.target.result;
          var xml = self.b64DecodeUnicode(data.split(",")[1]);
          self.get('doi').set('xml', xml);
        };

        reader.onerror = function() {
          reject(this);
        }

        reader.readAsDataURL(files[0]);

        resetInput();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    update() {
      this.get('client').save();
      this.set('edit', false);
      this.get('router').transitionTo('clients.show.dois', this.get('target'));
    },
    submit(doi) {
      doi.set('event', this.setEvent(doi.get('state')));

      let self = this;
      doi.save().then(function(doi) {
        self.get('router').transitionTo('clients.show.dois.show', doi.client.id, doi.id);
        self.set('new', false);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    refresh() {
      this.generate();
    },
    clear() {
      this.get('doi').set('suffix', null)
      this.$('input[type=text]:first').focus();
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
