import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type Rights = {
  rights: string;
  rightsUri: string;
  lang: string;
  rightsIdentifier: string;
  rightsIdentifierScheme: string;
  schemeUri: string;
}

export const RightsSchema: ResourceSchema = {
  identity: null,
  type: 'Rights',
  fields: [
    {
      kind: 'field',
      name: 'rights',
    },
    {
      kind: 'field',
      name: 'rightsUri',
    },
    {
      kind: 'field',
      name: 'lang',
    },
    {
      kind: 'field',
      name: 'rightsIdentifier',
    },
    {
      kind: 'field',
      name: 'rightsIdentifierScheme',
    },
    {
      kind: 'field',
      name: 'schemeUri',
    },
  ]
};

////////////////////
// Register Schema
////////////////////

export function registerRightsSchema(schema: SchemaService) {
  schema.registerResources([
    RightsSchema
  ])
};
