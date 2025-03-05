import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type Publisher = {
  name: string;
  lang: string,
  publisherIdentifier: string,
  publisherIdentifierScheme: string,
  schemeUri: string,
};

export const PublisherSchema: ResourceSchema = {
  identity: null,
  type: 'Publisher',
  fields: [
    {
      kind: 'field',
      name: 'name',
    },
    {
      kind: 'field',
      name: 'lang',
    },
    {
      kind: 'field',
      name: 'publisherIdentifier',
    },
    {
      kind: 'field',
      name: 'publisherIdentifierScheme',
    },
    {
      kind: 'field',
      name: 'schemeUri',
    },
  ],
}

////////////////////
// Register Schema
////////////////////

export function registerPublisherSchema(schema: SchemaService) {
  schema.registerResources([
    PublisherSchema,
  ])
};
