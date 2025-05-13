import type { DerivedField, LegacyBelongsToField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';
import { registerDerivations, withDefaults } from '@ember-data-mirror/model/migration-support';
import { Type } from '@warp-drive-mirror/core-types/symbols';
import _string from 'lodash/string';
import { isPresent, isBlank } from '@ember/utils';
import addressFormatter from '@fragaria/address-formatter';

import { type Date, registerDateSchema } from './date';

export type Contacts = {
  provider: Readonly<LegacyBelongsToField>;
  // ???
  meta: string;
  email: string;
  givenName: string;
  familyName: string;
  name: string;
  // ???
  roleName: string;
  created: Readonly<Date>;
  updated: Readonly<Date>;
  deleted: Readonly<Date>;
};

export const ContactSchema: ResourceSchema = withDefaults({
  identity: null,
  type: 'contacts',
  legacy: true,
  fields: [
    {
      kind: 'belongsTo',
      name: 'provider',
      type: 'providers',
      options: {
        async: true,
        inverse: null,
      }
    },
    {
      kind: 'field',
      name: 'meta',
    },
    {
      kind: 'field',
      name: 'email',
    },
    {
      kind: 'field',
      name: 'givenName',
    },
    {
      kind: 'field',
      name: 'familyName',
    },
    {
      kind: 'field',
      name: 'name',
    },
    {
      kind: 'field',
      name: 'roleName',
    },
    {
      kind: 'schema-object',
      name: 'created',
      type: 'Date',
    },
    {
      kind: 'schema-object',
      name: 'updated',
      type: 'Date',
    },
    {
      kind: 'schema-object',
      name: 'deleted',
      type: 'Date',
    },
    {
      name: 'displayName',
      type: 'displayName',
      options: { fields: ['doi'], separator: ' '  },
      kind: 'derived',
    },
  ],
});

////////////////////////////////////
// Derivations (similar to @computed) 
////////////////////////////////////

function displayName(record: any, options: any, prop: any) {
  if (record.name) {
    return record.name;
  } else {
    return record.email;
  }
}
displayName[Type] = 'displayName';

function roleName(record: any, options: any, prop: any) {
  if (record.roleName) {
    return record.roleName
      .map(function (role) {
        return _string.upperFirst(_string.lowerCase(role));
      })
      .join(', ');
  } else {
    return null;
  }
}
roleName[Type] = 'roleName';

////////////////////
// Register Schema
////////////////////

export function registerContactSchema(schema: SchemaService) {
  schema.registerResources([
    ContactSchema,
  ])
};

////////////////////////////////////////
// Register Derived Fields (Derivations)
////////////////////////////////////////

export function registerContactDerivations(schema: SchemaService) {
  schema.registerDerivation(displayName);
  schema.registerDerivation(roleName);
  //registerDerivations(schema);
};