import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';
import { w } from '@ember/string';

export default Ability.extend({
  currentUser: service(),

  canViewHealth: computed('currentUser.role_id', function () {
    switch (this.currentUser.role_id) {
      case 'staff_admin':
      case 'consortium_admin':
      case 'provider_admin':
        return true;
      default:
        return false;
    }
  }),
  canViewState: computed('currentUser.role_id', function () {
    switch (this.currentUser.role_id) {
      case 'staff_admin':
      case 'consortium_admin':
      case 'provider_admin':
      case 'client_admin':
        return true;
      default:
        return false;
    }
  }),
  canSource: computed('currentUser.role_id', function () {
    switch (this.currentUser.role_id) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canTransfer: computed(
    'currentUser.{role_id,provider_id}',
    'model.repository.{id,provider.id,provider.consortium.id}',
    'model.query.client-id',
    'repository.provider.{id,consortium.id}',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          if (
            w(
              'crossref.citations medra.citations kisti.citations jalc.citations op.citations'
            ).includes(this.model.repository.id) ||
            w(
              'crossref.citations medra.citations kisti.citations jalc.citations op.citations'
            ).includes(this.model.query['client-id'])
          ) {
            return false;
          } else {
            return true;
          }
        case 'consortium_admin':
          return (
            this.currentUser.provider_id ===
              this.model.repository.provider.consortium.id ||
            this.currentUser.provider_id ===
              this.repository.provider.consortium.id
          );
        case 'provider_admin':
          return (
            this.currentUser.provider_id ===
              this.model.repository.provider.id ||
            this.currentUser.provider_id === this.repository.provider.id
          );
        default:
          return false;
      }
    }
  ),
  canMove: computed(
    'currentUser.{role_id,provider_id}',
    'repository.{id,provider.id}',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          if (
            w(
              'crossref.citations medra.citations kisti.citations jalc.citations op.citations'
            ).includes(this.repository.id)
          ) {
            return false;
          } else {
            return true;
          }
        case 'consortium_admin':
          return true;
        case 'provider_admin':
          return true; // this.currentUser.provider_id === this.repository.provider.id;
        default:
          return false;
      }
    }
  ),
  canUpdate: computed(
    'currentUser.{client_id,role_id}',
    'model.{id,repository.id}',
    function () {
      if (
        w(
          'crossref.citations medra.citations kisti.citations jalc.citations op.citations'
        ).includes(this.model.id)
      ) {
        return false;
      } else {
        switch (this.currentUser.role_id) {
          case 'staff_admin':
          case 'consortium_admin':
          case 'provider_admin':
            return true;
          case 'client_admin':
            return this.currentUser.client_id === this.model.repository.id;
          default:
            return false;
        }
      }
    }
  ),
  canUpload: computed(
    'currentUser.{client_id,role_id}',
    'model.{id,query.client-id}',
    function () {
      if (
        w(
          'crossref.citations medra.citations kisti.citations jalc.citations op.citations'
        ).includes(this.model.query['client-id'])
      ) {
        return false;
      } else {
        switch (this.currentUser.role_id) {
          case 'staff_admin':
            return true;
          case 'client_admin':
            return (
              this.currentUser.client_id === this.model.query['client-id'] ||
              this.model.id
            );
          default:
            return false;
        }
      }
    }
  ),
  canCreate: computed(
    'currentUser.{client_id,role_id}',
    'model.{id,query.client-id}',
    function () {
      if (
        w(
          'crossref.citations medra.citations kisti.citations jalc.citations op.citations'
        ).includes(this.model.query['client-id'])
      ) {
        return false;
      } else {
        switch (this.currentUser.role_id) {
          case 'staff_admin':
            return true;
          case 'client_admin':
            return (
              this.currentUser.client_id === this.model.query['client-id'] ||
              this.model.id
            );
          default:
            return false;
        }
      }
    }
  ),
  canDelete: computed(
    'currentUser.{role_id,client_id}',
    'model.repository.id',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return true;
        case 'client_admin':
          return this.currentUser.client_id === this.model.repository.id;
        default:
          return false;
      }
    }
  ),
  canModify: computed(
    'currentUser.{role_id,client_id}',
    'model.repository.id',
    function () {
      if (
        w(
          'crossref.citations medra.citations kisti.citations jalc.citations op.citations'
        ).includes(this.model.repository.id)
      ) {
        return false;
      } else {
        switch (this.currentUser.role_id) {
          case 'staff_admin':
            return true;
          case 'client_admin':
            return this.currentUser.client_id === this.model.repository.id;
          default:
            return false;
        }
      }
    }
  ),
  canEdit: computed(
    'currentUser.{role_id,client_id}',
    'model.repository.id',
    function () {
      if (
        w(
          'crossref.citations medra.citations kisti.citations jalc.citations op.citations'
        ).includes(this.model.repository.id)
      ) {
        return false;
      } else {
        switch (this.currentUser.role_id) {
          case 'staff_admin':
            return true;
          case 'client_admin':
            return this.currentUser.client_id === this.model.repository.id;
          default:
            return false;
        }
      }
    }
  ),
  canForm: computed(
    'currentUser.{role_id,client_id}',
    'model.repository.id',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return true;
        case 'client_admin':
          return (
            this.currentUser.client_id === 'demo.datacite' &&
            this.currentUser.client_id === this.model.repository.id
          );
        default:
          return false;
      }
    }
  ),
  canDetail: computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.repository.{id,provider.id,provider.consortium.id}',
    'model.state',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.currentUser.provider_id ===
            this.model.repository.provider.consortium.id
          );
        case 'provider_admin':
          return (
            this.currentUser.provider_id === this.model.repository.provider.id
          );
        case 'client_admin':
          return this.currentUser.client_id === this.model.repository.id;
        case 'user':
          return this.model.state === 'findable';
        default:
          return false;
      }
    }
  ),
  canRead: computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.repository.{id,provider.id,provider.consortium.id}',
    'model.state',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.currentUser.provider_id ===
            this.model.repository.provider.consortium.id
          );
        case 'provider_admin':
          return (
            this.currentUser.provider_id === this.model.repository.provider.id
          );
        case 'client_admin':
          return this.currentUser.client_id === this.model.repository.id;
        case 'user':
          return this.model.state === 'findable';
        default:
          return this.model.state === 'findable';
      }
    }
  )
});
