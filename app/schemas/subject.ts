import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';
import { Type } from '@warp-drive-mirror/core-types/symbols';

export type Subject = {
  subject: string;
  subjectScheme: string;
  schemeUri: string;
  valueUri: string;
  classificationCode: string;
  lang: string;
};

export const SubjectSchema: ResourceSchema = {
  identity: null,
  type: 'Subject',
  fields: [
    {
      kind: 'field',
      name: 'subject',
    },
    {
      kind: 'field',
      name: 'subjectScheme',
    },
    {
      kind: 'field',
      name: 'schemeUri',
    },
    {
      kind: 'field',
      name: 'valueUri',
    },
    {
      kind: 'field',
      name: 'classificationCode',
    },
    {
      kind: 'field',
      name: 'lang',
    },
    {
      name: 'subjectSchemeUri',
      type: 'subjectSchemeUri',
      options: { fields: [], separator: ' '  },
      kind: 'derived',
    },
  ],
};

////////////////////
// Derivations
////////////////////

function subjectSchemeUri(record: any, options: any, prop: any) {
  return record.schemeUri || '';
}
subjectSchemeUri[Type] = 'subjectSchemeUri';

////////////////////
// Register Schemas
////////////////////

export function registerSubjectSchema(schema: SchemaService) {
  schema.registerResources([
    SubjectSchema,
  ])
};

////////////////////////////////////////
// Register Derived Fields (Derivations)
////////////////////////////////////////

export function registerSubjectDerivations(schema: SchemaService) {
  schema.registerDerivation(subjectSchemeUri);
};
