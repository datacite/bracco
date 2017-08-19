import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Component.extend(RouteMixin, {
  classNames: ['col-md-9'],

  hasInput: Ember.computed.notEmpty('query'),

  search(query) {
    let params = Object.assign(this.get('model').get("otherParams"), { query: query, metadata: null });

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
      this.search(query);
    },
    clear() {
      this.set('query', '');
      this.search('');
    },
    selectMetadata(metadata) {
      this.showMetadata(metadata);
    }
  },

  didInsertElement: function() {
    let placeholders = { 'work': 'Search for DOI',
                         'member': 'Search for member',
                         'data-center': 'Search for client',
                         'user': 'Search for user' }
    this.set('placeholder', placeholders[this.get('model').get("modelName")]);
  }
});
