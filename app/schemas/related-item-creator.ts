import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';
import { Type } from '@warp-drive-mirror/core-types/symbols';
import { registerDerivations } from '@ember-data-mirror/model/migration-support';

export type RelatedItemCreator = {
  name: string;
  givenName: string;
  familyName: string;
  nameType: string;
}

export const RelatedItemCreatorSchema: ResourceSchema = {
  identity: null,
  type: 'RelatedItemCreator',
  fields: [
    {
      kind: 'field',
      name: 'name',
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
      name: 'displayName',
      type: 'displayName',
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

////////////////////
// Register Schemas
////////////////////

export function registerRelatedItemCreatorSchema(schema: SchemaService) { 
  schema.registerResources([
    RelatedItemCreatorSchema
  ])
};

////////////////////////////////////////
// Register Derived Fields (Derivations)
////////////////////////////////////////

export function registerRelatedItemCreatorDerivations(schema: SchemaService) {
  schema.registerDerivation(displayName);
  //registerDerivations(schema);
};
