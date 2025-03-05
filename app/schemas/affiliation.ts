import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type Affiliation = {
  name: 'string';
  affiliationIdentifier: 'string',
  affiliationIdentifierScheme: 'string',
  schemeUri: 'string',
};

export const AffiliationSchema: ResourceSchema = {
  identity: null,
  type: 'Affiliation',
  fields: [
    {
      kind: 'field',
      name: 'name',
    },
    {
      kind: 'field',
      name: 'affiliationIdentifier',
    },
    {
      kind: 'field',
      name: 'affiliationIdentifierScheme',
    },
    {
      kind: 'field',
      name: 'schemeUri',
    },
  ],
};

////////////////////
// Register Schema
////////////////////

export function registerAffiliationSchema(schema: SchemaService) {
  schema.registerResources([
    AffiliationSchema,
  ])
};
