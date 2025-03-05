import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type Title = {
  title: 'string',
  titleType: 'string',
  lang: 'string',
};

export const TitleSchema: ResourceSchema = {
  identity: null,
  type: 'Title',
  fields: [
    {
      kind: 'field',
      name: 'title',
    },
    {
      kind: 'field',
      name: 'titleType',
    },
    {
      kind: 'field',
      name: 'lang',
    },
  ],
};

////////////////////
// Register Schema
////////////////////

export function registerTitleSchema(schema: SchemaService) {
  schema.registerResources([
    TitleSchema
  ])
};
