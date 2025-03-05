import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type Description = {
  description: string;
  descriptionType: string,
  lang: string,
};

export const DescriptionSchema: ResourceSchema = {
  identity: null,
  type: 'Description',
  fields: [
    {
      kind: 'field',
      name: 'description',
    },
    {
      kind: 'field',
      name: 'descriptionType',
    },
    {
      kind: 'field',
      name: 'lang',
    },
  ],
}

////////////////////
// Register Schema
////////////////////

export function registerDescriptionSchema(schema: SchemaService) {
  schema.registerResources([
    DescriptionSchema,
  ])
};
