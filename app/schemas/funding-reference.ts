import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type FundingReference = {
  funderName: string;
  funderIdentifier: string,
  funderIdentifierType: string,
  awardNumber: string,
  awardUri: string,
  awardTitle: string,
};

export const FundingReferenceSchema: ResourceSchema = {
  identity: null,
  type: 'FundingReference',
  fields: [
    {
      kind: 'field',
      name: 'funderName',
    },
    {
      kind: 'field',
      name: 'funderIdentifier',
    },
    {
      kind: 'field',
      name: 'funderIdentifierType',
    },
    {
      kind: 'field',
      name: 'awardNumber',
    },
    {
      kind: 'field',
      name: 'awardUri',
    },
    {
      kind: 'field',
      name: 'awardTitle',
    },
  ]
}

////////////////////
// Register Schema
////////////////////

export function registerFundingReferenceSchema(schema: SchemaService) {
  schema.registerResources([
    FundingReferenceSchema,
  ])
};
