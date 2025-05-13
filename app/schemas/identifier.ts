import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type Identifier = {
  identifier: string;
  identifierType: string;
}

export const IdentifierSchema: ResourceSchema = {
  identity: null,
  type: 'Identifier',
  fields: [
    {
      kind: 'field',
      name: 'identifier',
    },
    {
      kind: 'field',
      name: 'identifierType',
    },
  ],
};

////////////////////
// Register Schema
////////////////////

export function registerIdentifierSchema(schema: SchemaService) {
  schema.registerResources([
    IdentifierSchema
  ])
};
