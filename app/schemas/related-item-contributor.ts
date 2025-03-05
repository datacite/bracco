import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type RelatedItemContributor = {
  name: string;
  contributorType: string;
  givenName: string;
  familyName: string;
  nameType: string;
};

export const RelatedItemContributorSchema: ResourceSchema = {
  identity: null,
  type: 'RelatedItemContributor',
  fields: [
    {
      kind: 'field',
      name: 'name',
    },
    {
      kind: 'field',
      name: 'contributorType',
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
  ]
};

////////////////////
// Register Schemas
////////////////////

export function registerRelatedItemContributorSchema(schema: SchemaService) {
  schema.registerResources([
    RelatedItemContributorSchema
  ])
};
