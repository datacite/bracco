import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';
import { type Publisher, registerPublisherSchema } from './publisher';
import { type RelatedItemCreator, registerRelatedItemCreatorSchema, registerRelatedItemCreatorDerivations } from './related-item-creator';
import { type RelatedItemContributor, registerRelatedItemContributorSchema } from './related-item-contributor';
import { type RelatedItemIdentifier, registerRelatedItemIdentifierSchema } from './related-item-identifier';
import { type Title, registerTitleSchema } from './title';
import { Type } from '@warp-drive-mirror/core-types/symbols';
import { registerDerivations } from '@ember-data-mirror/model/migration-support';

export type RelatedItem = {
  relatedItemType: string;
  relationType: string;
  relatedItemIdentifier: Readonly<RelatedItemIdentifier>;
  creators: Readonly<RelatedItemCreator[]>;
  titles: Readonly<Title[]>;
  volume: string;
  issue: string;
  number: string;
  publicationYear: string;
  contributors: Readonly<RelatedItemContributor[]>;
  firstPage: string;
  lastPage: string;
  publisher: Readonly<Publisher>;
  edition: string;
};

export const RelatedItemSchema: ResourceSchema = {
  identity: null,
  type: 'RelatedItem',
  fields: [
    {
      kind: 'field',
      name: 'relatedItemType',
    },
    {
      kind: 'field',
      name: 'relationType',
    },
    {
      kind: 'schema-object',
      name: 'relatedItemIdentifier',
      type: 'RelatedItemIdentifier',
    },
    {
      kind: 'schema-array',
      name: 'creators',
      type: 'RelatedItemCreator'
    },
    {
      kind: 'schema-array',
      name: 'titles',
      type: 'TitleAlt'
    },
    {
      kind: 'field',
      name: 'volume',
    },
    {
      kind: 'field',
      name: 'issue',
    },
    {
      kind: 'field',
      name: 'number',
    },
    {
      kind: 'field',
      name: 'publicationYear',
    },
    {
      kind: 'schema-array',
      name: 'contributors',
      type: 'RelatedItemContributor',
    },
    {
      kind: 'field',
      name: 'firstPage',
    },
    {
      kind: 'field',
      name: 'lastPage',
    },
    {
      kind: 'schema-object',
      name: 'publisher',
      type: 'Publisher',
    },
    {
      kind: 'field',
      name: 'edition',
    },
  ]
};

////////////////////
// Derivations
////////////////////

function title(record: any, options: any, prop: any) {
    if (record.titles.length > 0) {
      return record.titles[0].title;
    } else {
      return null;
    }
}
title[Type] = 'title';

function relatedItemContributors(record: any, options: any, prop: any) {
  return record.contributors
}
relatedItemContributors[Type] = 'relatedItemContributors';

////////////////////
// Register Schema
////////////////////

export function registerRelatedItemSchema(schema: SchemaService) {
  registerPublisherSchema(schema);
  registerRelatedItemContributorSchema(schema);
  registerRelatedItemCreatorSchema(schema);
  registerRelatedItemIdentifierSchema(schema);
  registerTitleSchema(schema);

  schema.registerResources([
    RelatedItemSchema,
  ])
};

export function registerRelatedItemDerivations(schema: SchemaService) {
  registerRelatedItemCreatorDerivations(schema);

  schema.registerDerivation(title);
  schema.registerDerivation(relatedItemContributors);
  //registerDerivations(schema);
}