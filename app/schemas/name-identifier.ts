import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type NameIdentifier = {
  nameIdentifier: 'string',
  nameIdentifierScheme: 'string',
  schemeUri: 'string',
};

export const NameIdentifierSchema: ResourceSchema = {
  identity: null,
  type: 'NameIdentifier',
  fields: [
    {
      kind: 'field',
      name: 'nameIdentifier',
    },
    {
      kind: 'field',
      name: 'nameIdentifierScheme',
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

export function registerNameIdentifierSchema(schema: SchemaService) {
  schema.registerResources([
    NameIdentifierSchema,
  ])
};
