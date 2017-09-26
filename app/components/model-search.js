import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Component.extend(RouteMixin, {
  classNames: ['div'],

  hasInput: Ember.computed.notEmpty('query'),
  helpText: null,
  query: null,
  sort: null,

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('query', this.get('model').get('otherParams.query'));
    this.set('sort', this.get('model').get('otherParams.sort'));
  },

  search() {
    let params = Object.assign(this.get('model').get('otherParams'), { query: this.get('query'), sort: this.get('sort') });

    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    // filter by member or data center if currentUser has that role
    // if (this.get('currentUser').get('role') === "member_admin") {
    //   params = Ember.merge(params, { 'member-id': this.get('currentUser').get('member_id') });
    // } else if (this.get('currentUser').get('role') === "data_center_admin") {
    //   params = Ember.merge(params, { 'data-center-id': this.get('currentUser').get('data_center_id') });
    // }
    this.get('router').transitionTo({ queryParams: params });
  },

  actions: {
    doSearch(query) {
      this.set('query', query);
      this.search();
    },
    clear() {
      this.set('query', null);
      this.search();
    },
    selectMetadata(metadata) {
      this.showMetadata(metadata);
    },
    sort(sort) {
      this.set('sort', sort);
      this.search();
    }
  },

  didInsertElement: function() {
    let placeholders = { 'doi': 'DOI',
                         'provider': 'Provider',
                         'client': 'Client',
                         'prefix': 'Prefix',
                         'client-prefix': 'Prefix',
                         'provider-prefix': 'Prefix',
                         'user': 'User' }
    this.set('modelName', placeholders[this.get('model').get("modelName")]);
    if (this.get('model').get("modelName") === "doi") {
      this.set('formats', { '-created': 'Sort by Date Registered', 'score': 'Sort by Relevance' });
      this.set('helpText', 'Blabla');
    } else if (this.get('model').get("modelName") === "prefix") {
      this.set('formats', { '-created': 'Sort by Date Created', 'score': 'Sort by Relevance' });
      this.set('helpText', 'Blabla');
    } else {
      this.set('formats', { '-created': 'Sort by Date Joined', 'name': 'Sort by Name' });
      this.set('helpText', 'Blabla');
    }
  }
});
