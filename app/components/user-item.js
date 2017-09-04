import Ember from 'ember';

const roles = [{ 'id': 'staff_admin', 'name': "Staff admin" },
               { 'id': 'provider_admin', 'name': "Provider admin" },
               { 'id': 'client_admin', 'name': "Client admin" },
               { 'id': 'user', 'name': 'User' }];

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['panel', 'panel-default'],
  edit: false,
  role: { 'id': 'user', 'name': 'User' },
  roles: roles,
  member: null,
  members: [],
  'data-center': null,
  'data-centers': [],

  showMembers: false,
  showDataCenters: false,

  selectRole(roleId) {
    this.set('role', roles.findBy('id', roleId));
    this.set('showMembers', Ember.String.w("provider_admin client_admin").includes(roleId));
  },
  selectMember(memberId) {
    this.set('showDataCenters', Ember.isPresent(memberId));
  },

  actions: {
    edit: function(user) {
      this.set('edit', true);
      this.selectRole(user.get('role'));
      if (this.get('showMembers')) {
        this.set('members', this.get('store').query('member', { 'member-type': 'allocating', 'page[size]': 10 }));
      }
      if (this.get('showDataCenters')) {
        this.set('data-centers', this.get('store').query('data-center', { 'page[size]': 10 }));
      }
    },
    searchMember: function(query) {
      let params = { 'query': query, 'member-type': 'allocating', 'page[size]': 10 };
      this.set('members', this.get('store').query('member', params));
    },
    searchDataCenter: function(query) {
      let params = { 'query': query, 'page[size]': 10 };
      this.set('data-centers', this.get('store').query('data-center', params));
    },
    submit: function() {
      this.set('edit', false);
    },
    cancel: function() {
      this.set('edit', false);
    },
    selectRole(role) {
      this.selectRole(role.id);
    },
    selectMember(member) {
      this.selectMember(member.id);
    }
  }
});
