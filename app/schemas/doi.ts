import type { SchemaService } from '@ember-data-mirror/store/types'; 
import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import { Type } from '@warp-drive-mirror/core-types/symbols';
import { withDefaults } from '@warp-drive-mirror/schema-record/schema';
import { SchemaArrayField } from '@warp-drive-mirror/core-types/schema/fields';
import ENV from 'bracco/config/environment';
import { A } from '@ember/array';

import { type AlternateIdentifier, registerAlternateIdentifierSchema } from './alternate-identifier';
import { type Contributor, registerContributorSchema, registerContributorDerivations } from './contributor';
import { type Creator, registerCreatorSchema, registerCreatorDerivations } from './creator';
import { type Date, registerDateSchema } from './date';
import { type Description, registerDescriptionSchema } from './description';
import { type FundingReference, registerFundingReferenceSchema  } from './funding-reference';
import { type GeoLocation, registerGeoLocationSchema  } from './geo-location';
import { type Publisher, registerPublisherSchema } from './publisher';
import { type RelatedIdentifier, registerRelatedIdentifierSchema } from './related-identifier';
import { type RelatedItem, registerRelatedItemSchema, registerRelatedItemDerivations} from './related-item';
import { type Rights, registerRightsSchema } from './rights';
import { type Subject, registerSubjectSchema, registerSubjectDerivations} from './subject';
import { type Title, registerTitleSchema } from './title';
import { type TypeAlt, registerTypeSchema } from './type';

// SchemaService RFC 1027
// https://rfcs.emberjs.com/id/1027-ember-data-schema-service/#the-schemaservice 

/*
export type LegacyBelongsToField = {
  kind: 'belongsTo';
  name: 'repository';
  type: 'RepositoryType';
  options: {
    async: true;
    inverse: null;
    as?: string;
    polymorphic?: GLsizei;dr;
  };
};
*/

/*****TYPES*****/

export type Dois = Readonly<{
  id: string;
  $type: 'dois';

  doi: string;
  confirmDoi: string;
  prefix: string;
  suffix: string;
  url: string;
  //contentUrl: string;
  creators: Readonly<Creator[]>;
  titles: Readonly<Title[]>;
  publisher: Readonly<Publisher>;
  //bcontainer: string;
  publicationYear: number;
  subjects: Readonly<Subject[]>;
  contributors: Readonly<Contributor[]>;
  alternateIdentifiers: Readonly<AlternateIdentifier[]>
  dates: Readonly<Date[]>;
  language: string;
  types: Readonly<TypeAlt>;
  relatedIdentifiers: Readonly<RelatedIdentifier[]>;
  sizes: Readonly<string[]>;
  formats: Readonly<string[]>;
  version: string;
  rightsList: Readonly<Rights[]>;
  descriptions: Readonly<Description[]>;
  geoLocations: Readonly<GeoLocation[]>;
  fundingReferences: Readonly<FundingReference>;
  relatedItems: Readonly<RelatedItem>;
  landingpage: string;
  xml: string;
  metaDataVersion: string;
  schemaVersion: string;
  source: string;
  state: string; 
  //breason: string;
  isActive: boolean;
  event: string;
  created: Date;
  registered: Date;
  updated: Date;
  mode: string;
  meta: string;
  citationCount: number;
  viewCount: number;
  downloadCount: number;

  [Type]: 'dois';
}>;

const DoiSchema: ResourceSchema = withDefaults({
  type: 'dois',
  fields: [
    {
      kind: 'field',
      name: 'doi',
    },
    {
      kind: 'field',
      name: 'confirmDoi'
    },
    {
      kind: 'field',
      name: 'prefix',
    },
    {
      kind: 'field',
      name: 'suffix:',
    },
    {
      kind: 'field',
      name: 'url',
    },
    /*
    {
      kind: 'field',
      name: 'contentUrl',
    },
    */
    {
      kind: 'schema-array',
      name: 'creators',
      type: 'Creator',
    },
    {
      kind: 'schema-array',
      name: 'titles',
      type: 'Title',
    },
    {
      kind: 'schema-object',
      name: 'publisher',
      type: 'Publisher',
    },
    /*
    {
      kind: 'field',
      name: 'bcontainer',
    },    
    */
    {
      kind: 'field',
      name: 'publicationYear',
    },
    {
      kind: 'schema-array',
      name: 'subjects',
      type: 'Subject',
    },
    {
      kind: 'schema-array',
      name: 'contributors',
      type: 'Contributor',
    },
    {
      kind: 'schema-array',
      name: 'alternateIdentifiers',
      type: 'AlternateIdentifier',
    },
    {
      kind: 'schema-array',
      name: 'dates',
      type: 'Date',
    },
    {
      kind: 'field',
      name: 'language',
    },
    {
      kind: 'schema-object',
      name: 'types',
      type: 'TypeAlt',
    },
    {
      kind: 'schema-array',
      name: 'relatedIdentifiers',
      type: 'RelatedIdentifier',
    },
    {
      kind: 'array',
      name: 'sizes'
    },
    {
      kind: 'array',
      name: 'formats',
    },
    {
      kind: 'field',
      name: 'version',
    },
    {
      kind: 'schema-array',
      name: 'rightsList',
      type: 'Rights',
    },
    {
      kind: 'schema-array',
      name: 'descriptions',
      type: 'Description',
    },
    {
      kind: 'schema-array',
      name: 'geoLocations',
      type: 'GeoLocation',
    },
    {
      kind: 'schema-array',
      name: 'fundingReferences',
      type: 'FundingReference',
    },
    {
      kind: 'schema-array',
      name: 'relatedItem',
      type: 'RelatedItem',
    },
    {
      kind: 'field',
      name: 'landingPage',
    },
    {
      kind: 'field',
      name: 'metaDataVersion',
    },
    {
      kind: 'field',
      name: 'schemaVersion',
    },
    {
      kind: 'field',
      name: 'source',
    },
    {
      kind: 'field',
      name: 'state',
    },
    /*
    {
      kind: 'field',
      name: 'breason',
    },
    */
    {
      kind: 'field',
      name: 'isActive',
    },
    {
      kind: 'field',
      name: 'event',
    },
    {
      kind: 'schema-object',
      name: 'created',
      type: 'Date',
    },
    {
      kind: 'schema-object',
      name: 'registered',
      type: 'Date',
    },
    {
      kind: 'schema-object',
      name: 'updated',
      type: 'Date',
    },
    {
      kind: 'field',
      name: 'mode',
    },
    {
      kind: 'field',
      name: 'meta',
    },
    {
      kind: 'field',
      name: 'citationCount',
    },
    {
      kind: 'field',
      name: 'viewCount',
    },
    {
      kind: 'field',
      name: 'downloadCount',
    },
    {
      name: 'identifier',
      type: 'identifier',
      options: { fields: ['doi'], separator: ' '  },
      kind: 'derived',
    },
    {
      name: 'isDraft',
      type: 'isDraft',
      options: { fields: ['doi'], separator: ' '  },
      kind: 'derived',
    },
    {
      name: 'showCitation',
      type: 'showCitation',
      options: { fields: ['doi'], separator: ' '  },
      kind: 'derived',
    },
    {
      name: 'schemaVersionString',
      type: 'schemaVersionString',
      options: { fields: ['doi'], separator: ' '  },
      kind: 'derived',
    },
    {
      name: 'title',
      type: 'title',
      options: { fields: [], separator: ' ' },
      kind: 'derived',
    },
    {
      name: 'description',
      type: 'description',
      options: { fields: [], separator: ' ' },
      kind: 'derived',
    },
    {
      name: 'maxMintFutureOffset',
      type: 'maxMintFutureOffset',
      options: { fields: [], separator: ' ' },
      kind: 'derived',
    },
  ],
});

////////////////////////////////////
// Derivations (similar to @computed) 
////////////////////////////////////

function identifier(record: any, options: any, prop: any) {
  return ENV.HANDLE_SERVER + '/' + record.doi;
}
identifier[Type] = 'identifier';

function isDraft(record: any, options: any, prop: any) {
  return record.state === 'draft';
}
isDraft[Type] = 'isDraft';

function showCitation(record: any, options: any, prop: any) {
  return record.registered;
}
showCitation[Type] = 'showCitation';

function schemaVersionString(record: any, options: any, prop: any) {
  if (record.schemaVersion) {
    return A(record.schemaVersion.split('-')).get('lastObject');
  } else {
    return null;
  }
}
schemaVersionString[Type] = 'schemaVersionString';

function title(record: any, options: any, prop: any) {
  if (record.titles.length > 0) {
    return record.titles[0].title;
  } else {
    return null;
  }
}
title[Type] = 'title';

function description(record: any, options: any, prop: any) {
  if (record.descriptions.length > 0) {
    return record.descriptions[0].description;
  } else {
    return null;
  }
}
description[Type] = 'description';

function maxMintFutureOffset(record: any, options: any, prop: any) {
  return ENV.MAX_MINT_FUTURE_OFFSET;
}
maxMintFutureOffset[Type] = 'maxMintFutureOffset';

//////////////////////////////////////////////////////////////////////////////////////////
// Helper function to register the schema on creation of the schema service (in the store)
//////////////////////////////////////////////////////////////////////////////////////////

export function registerDoiSchema(schema: SchemaService) {
  registerAlternateIdentifierSchema(schema);
  registerContributorSchema(schema);
  registerCreatorSchema(schema);
  registerDateSchema(schema);
  registerDescriptionSchema(schema);
  registerFundingReferenceSchema(schema);
  registerGeoLocationSchema(schema);
  registerPublisherSchema(schema); 
  registerRelatedIdentifierSchema(schema);
  registerRelatedItemSchema(schema);
  registerRightsSchema(schema);
  registerSubjectSchema(schema);
  registerTitleSchema(schema);
  registerTypeSchema(schema);

  schema.registerResources([
    DoiSchema,
  ])
}

///////////////////////////////////////////////////////////////////////////////////////////////
// Helper function to register the derivations on creation of the schema service (in the store)
///////////////////////////////////////////////////////////////////////////////////////////////

export function registerDoiDerivations(schema: SchemaService) {
  registerContributorDerivations(schema);
  registerCreatorDerivations(schema);
  registerRelatedItemDerivations(schema);
  registerSubjectDerivations(schema);

  schema.registerDerivation(identifier);
  schema.registerDerivation(isDraft);
  schema.registerDerivation(showCitation);
  schema.registerDerivation(schemaVersionString);
  schema.registerDerivation(title);
  schema.registerDerivation(description);
  schema.registerDerivation(maxMintFutureOffset);
}
