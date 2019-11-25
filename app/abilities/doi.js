import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';
import { w } from '@ember/string';

export default Ability.extend({
  currentUser: service(),

  canViewHealth: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'provider_admin':
        return true;
      default:
        return false;
    }
  }),
  canViewState: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'provider_admin':
      case 'repository_admin':
        return true;
      default:
        return false;
    }
  }),
  canSource: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canTransfer: computed('currentUser.role_id', 'currentUser.provider_id', 'model.repository.provider.id', 'repository.provider.id', 'model.repository.id', 'model.query.repository-id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.repository.id')) || w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.query.repository-id'))) {
          return false;
        } else {
          return true;
        }
      case 'provider_admin':
        return this.get('currentUser.provider_id') === this.get('model.repository.provider.id') || this.get('currentUser.provider_id') === this.get('repository.provider.id');
      default:
        return false;
    }
  }),
  canMove: computed('currentUser.role_id', 'currentUser.provider_id', 'repository.id', 'repository.provider.id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('repository.id'))) {
          return false;
        } else {
          return true;
        }
      case 'provider_admin':
        return true; //this.get('currentUser.provider_id') === this.get('repository.provider.id');
      default:
        return false;
    }
  }),
  canUpdate: computed('currentUser.role_id', 'model.id', function () {
    if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.id'))) {
      return false;
    } else {
      switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'provider_admin':
        return true;
      case 'repository_admin':
        return this.get('currentUser.repository_id') === this.get('model.id');
      default:
        return false;
      }
    }
  }),
  canUpload: computed('currentUser.role_id', 'currentUser.repository_id', 'model.query.repository-id', function () {
    if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.query.repository-id'))) {
      return false;
    } else {
      switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'repository_admin':
        return this.get('currentUser.repository_id') === this.get('model.query.repository-id');
      default:
        return false;
      }
    }
  }),
  canCreate: computed('currentUser.role_id', 'currentUser.repository_id', 'model.query.repository-id', function () {
    if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.query.repository-id'))) {
      return false;
    } else {
      switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'repository_admin':
        return this.get('currentUser.repository_id') === this.get('model.query.repository-id');
      default:
        return false;
      }
    }
  }),
  canDelete: computed('currentUser.role_id', 'model.repository.id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'repository_admin':
        return this.get('currentUser.repository_id') === this.get('model.repository.id');
      default:
        return false;
    }
  }),
  canModify: computed('currentUser.role_id', 'currentUser.repository_id', 'model.repository.id', function () {
    if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.repository.id'))) {
      return false;
    } else {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'repository_admin':
          return this.get('currentUser.repository_id') === this.get('model.repository.id');
        default:
          return false;
      }
    }
  }),
  canEdit: computed('currentUser.role_id', 'currentUser.repository_id', 'model.repository.id', function () {
    if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.repository.id'))) {
      return false;
    } else {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'repository_admin':
          return this.get('currentUser.repository_id') === this.get('model.repository.id');
        default:
          return false;
      }
  }
  }),
  canForm: computed('currentUser.role_id', 'currentUser.repository_id', 'model.repository.id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'repository_admin':
        return this.get('currentUser.repository_id') === 'demo.datacite' && this.get('currentUser.repository_id') === this.get('model.repository.id');
      default:
        return false;
    }
  }),
  canDetail: computed('currentUser.role_id', 'currentUser.provider_id', 'currentUser.repository_id', 'model.repository.id', 'model.repository.provider.id', 'model.state', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':  
        return this.get('currentUser.provider_id') === this.get('model.repository.provider.id');
      case 'repository_admin':
        return this.get('currentUser.repository_id') === this.get('model.repository.id');
      case 'user':
        return this.get('model.state') === 'findable';
      default:
        return false;
    }
  }),
  canRead: computed('currentUser.role_id', 'currentUser.provider_id', 'currentUser.repository_id', 'model.repository.id', 'model.provider.id', 'model.state', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return this.get('currentUser.provider_id') === this.get('model.provider.id');
      case 'repository_admin':
        return this.get('currentUser.repository_id') === this.get('model.repository.id');
      case 'user':
        return this.get('model.state') === 'findable';
      default:
        return this.get('model.state') === 'findable';
    }
  })
});
