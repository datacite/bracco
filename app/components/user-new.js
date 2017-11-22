import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  uid: [
    validator('presence', true),
    validator('format', {
      regex: /^\d{4}-\d{4}-\d{4}-\d{3}[0-9X]+$/,
      message: 'The ORCID ID must consist of 16 digits, or X as last digit.'
    }),
    validator('length', {
      min: 19,
      max: 19
    })
  ],
  name: validator('presence', true)
});

export default Ember.Component.extend(Validations, {
  store: Ember.inject.service(),

  uid: null,
  name: null,
  user: null,
  users: [],
  model: null,
  role: null,
  provider: null,
  client: null,
  disabled: true,
  currentUser: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('currentUser', this.get('currentUser'));

    this.searchRole();
  },

  findUser(uid) {
    this.set('uid', uid);

    if (this.get('validations.attrs.uid.isValid')) {
      let self = this;
      this.get('store').findRecord('user', uid, { include: 'provider,client,role,sandbox' }).then(function(user) {
        self.set('user', user);
        self.set('disabled', false);
        self.set('name', user.get('name'));

        if (self.get('model.client')) {
          self.get('store').findRecord('role', 'client_user').then(function(role) {
            self.selectRole(role);
            self.get('user').set('role', role);
            self.get('user').set('client', self.get('model.client'));
            self.get('user').set('provider', self.get('model.provider'));
          });
        } else if (self.get('model.provider')) {
          self.get('store').findRecord('role', 'provider_user').then(function(role) {
            self.selectRole(role);
            self.get('user').set('role', role);
            self.get('user').set('provider', self.get('model.provider'));
          });
        } else {
          self.selectRole(user.get('role'));
          self.selectClient(user.get('client'));

          self.searchProvider(null);
          self.selectProvider(user.get('provider'));
        }
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
        self.set('name', null);
      });
    } else {
      this.set('name', null);
    }
  },
  searchRole() {
    if (this.get('model.client')) {
      this.set('roles', this.get('store').query('role', { scope: 'client' }));
    } else if (this.get('model.provider')) {
      this.set('roles', this.get('store').query('role', { scope: 'provider' }));
    } else {
      this.set('roles', this.get('store').findAll('role'));
    }
  },
  selectRole(role) {
    this.set('role', role);
    this.get('user').set('role', role);

    if (role.id === 'user') {
      this.set('providers', []);
      this.set('provider', null);
      this.get('user').set('provider', null);

      this.set('client', null);
      this.get('user').set('client', null);

      this.set('isUser', true);
    } else {
      this.set('isUser', false);
    }
  },
  searchProvider(query) {
    if (this.get('currentUser').get('isAdmin')) {
      this.set('providers', this.get('store').query('provider', { 'query': query, sort: 'name', 'page[size]': 25 }));
    } else if (this.get('currentUser').get('provider_id')) {
      let provider = this.get('store').findRecord('provider', this.get('currentUser').get('provider_id'));
      this.set('providers', [provider]);
    } else {
      this.set('providers', []);
    }
  },
  selectProvider(provider) {
    this.set('provider', provider)
    this.get('user').set('provider', provider);

    if (provider) {
      this.set('clients', this.get('store').query('client', { sort: 'name', 'provider-id': provider.id, 'page[size]': 1000 }));
      this.selectClient(this.get('user').get('client'));
    } else {
      this.set('clients', []);
      this.selectClient(null);
    }
  },
  searchClient(query) {
    this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'provider-id': this.get('model.provider').get('id'), 'page[size]': 1000 }));
  },
  selectClient(client) {
    this.set('client', client);
    if (client) {
      if (client.get('isSandbox')) {
        this.get('user').set('sandbox-id', client.id);
      } else {
        this.get('user').set('client', client);
      }
    }
  },

  actions: {
    searchRole() {
      this.searchRole();
    },
    selectRole(role) {
      this.selectRole(role);
    },
    searchProvider(query) {
      this.searchProvider(query);
    },
    selectProvider(provider) {
      this.selectProvider(provider);
    },
    searchClient(query) {
      this.searchClient(query);
    },
    selectClient(client) {
      this.selectClient(client);
    },
    findUser(uid) {
      this.findUser(uid);
    },
    submit() {
      let self = this;
      this.get('user').save().then(function(user) {
        self.get('router').transitionTo('users.show', user.id);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    cancel() {
      if (this.get('model.client')) {
        this.get('router').transitionTo('clients.show.users', this.get('model.client.id'));
      } else if (this.get('model.provider')) {
        this.get('router').transitionTo('providers.show.users', this.get('model.provider.id'));
      } else {
        this.get('router').transitionTo('users');
      }
    }
  }
});
