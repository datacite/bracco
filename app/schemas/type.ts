import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type TypeAlt = {
  ris: string;
  bibtex: string;
  citeproc: string;
  resourceTypeGeneral: string;
  resourceType: string;
  schemaOrg: string;
}

export const TypeSchema: ResourceSchema = {
  identity: null,
  type: 'TypeAlt',
  fields: [
    {
      kind: 'field',
      name: 'ris',
    },
    {
      kind: 'field',
      name: 'bibtex',
    },
    {
      kind: 'field',
      name: 'citeproc',
    },
    {
      kind: 'field',
      name: 'resourceTypeGeneral',
    },
    {
      kind: 'field',
      name: 'resourceType',
    },
    {
      kind: 'field',
      name: 'schemaOrg',
    },
  ],
};

////////////////////
// Register Schema
////////////////////

export function registerTypeSchema(schema: SchemaService) {
  schema.registerResources([
    TypeSchema
  ])
};
