import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type Date = {
  date: string;
  dateType: string;
  dateInformation: string;
}

export const DateSchema: ResourceSchema = {
  identity: null,
  type: 'Date',
  fields: [
    {
      kind: 'field',
      name: 'date',
    },
    {
      kind: 'field',
      name: 'dateType',
    },
    {
      kind: 'field',
      name: 'dateInformation',
    },
  ],
};

////////////////////
// Register Schema
////////////////////

export function registerDateSchema(schema: SchemaService) {
  schema.registerResources([
    DateSchema
  ])
};
