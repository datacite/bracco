import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';
import { type Affiliation, registerAffiliationSchema } from './affiliation';
import { type NameIdentifier, registerNameIdentifierSchema } from './name-identifier';
import { Type } from '@warp-drive-mirror/core-types/symbols';
import { registerDerivations } from '@ember-data-mirror/model/migration-support';

export type Contributor = {
  name: string;
  contributorType: string;
  givenName: string;
  familyName: string;
  nameType: string;
  nameIdentifiers: Readonly<NameIdentifier[]>;
  affiliation: Readonly<Affiliation[]>;
};

export const ContributorSchema: ResourceSchema = {
  identity: null,
  type: 'Contributor',
  fields: [
    {
      kind: 'field',
      name: 'name',
    },
    {
      kind: 'field',
      name: 'contributorType',
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
      name: 'nameType',
    },
    {
      kind: 'schema-array',
      name: 'nameIdentifiers',
      type: 'NameIdentifier',
    },
    {
      kind: 'schema-array',
      name: 'affiliation',
      type: 'Affiliation',
    },
    {
      name: 'displayName',
      type: 'displayName',
      options: { fields: [], separator: ' '  },
      kind: 'derived',
    },
    {
      name: 'orcid',
      type: 'orcid',
      options: { fields: [], separator: ' '  },
      kind: 'derived',
    },
  ]
};

////////////////////
// Derivations
////////////////////

function displayName(record: any, options: any, prop: any) {
  return record.familyName
    ? [record.givenName, record.familyName].join(' ')
    : record.name;
}
displayName[Type] = 'displayName';

function orcid(record: any, options: any, prop: any) {
  if (record.nameIdentifiers) {
    let id = record.nameIdentifiers.find(nameIdentifier => nameIdentifier.nameIdentifierScheme === 'ORCID');

    if (id && id.nameIdentifier) {
     return id.nameIdentifier.substr(id.nameIdentifier.indexOf('0'));
    } else {
      return null;
    }
  } else {
    return null;
  }
}
orcid[Type] = 'orcid';

////////////////////
// Register Schemas
////////////////////

export function registerContributorSchema(schema: SchemaService) {
  registerAffiliationSchema(schema);
  registerNameIdentifierSchema(schema);
  
  schema.registerResources([
    ContributorSchema
  ])
};

////////////////////////////////////////
// Register Derived Fields (Derivations)
////////////////////////////////////////

export function registerContributorDerivations(schema: SchemaService) {
  schema.registerDerivation(orcid);
  schema.registerDerivation(displayName);
  //registerDerivations(schema);
};
