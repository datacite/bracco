import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model, { attr, belongsTo } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';
import _string from 'lodash/string';

const Validations = buildValidations({
  email: [
    validator('presence', {
      presence: true
    }),
    validator('email-format', {
      allowBlank: true
    }),
    validator('unique-email')
  ],
  confirmDelete: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function () {
        return this.model.get('isNew');
      })
    }),
    validator('inclusion', {
      in: ['Delete'],
      message: "The entered text does not match 'Delete'.",
      disabled: computed('model', function () {
        return this.model.get('isNew');
      })
    })
  ]
});

@classic
export default class Contact extends Model.extend(Validations) {
  @belongsTo('provider', {
    async: true
  })
  provider;

  @attr()
  meta;

  @attr('string')
  email;

  @attr('string')
  givenName;

  @attr('string')
  familyName;

  @attr('string')
  name;

  @attr()
  roleName;

  @attr('date')
  created;

  @attr('date')
  updated;

  @attr('date')
  deleted;

  @computed('name', 'email')
  get displayName() {
    if (this.name) {
      return this.name;
    } else {
      return this.email;
    }
  }

  @computed('roleName')
  get roleNameString() {
    if (this.roleName) {
      return this.roleName
        .map(function (role) {
          return _string.upperFirst(_string.lowerCase(role));
        })
        .join(', ');
    } else {
      return null;
    }
  }
}
