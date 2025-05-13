import type { SchemaService } from '@ember-data-mirror/store/types'; 
import type { DerivedField, LegacyBelongsToField, LegacyHasManyField, ResourceSchema, SchemaArrayField } from '@warp-drive-mirror/core-types/schema/fields';
import { Type } from '@warp-drive-mirror/core-types/symbols';
import {registerDerivations, withDefaults } from '@ember-data-mirror/model/migration-support';
import { belongsTo } from '@ember-data-mirror/model';

import { type Contacts, registerContactSchema, registerContactDerivations } from './contact';
import { type Date, registerDateSchema } from './date';
import { isPresent } from '@ember/utils';

export type Provider = Readonly<{
  id: string;
  $type: 'providers';

    //consortium: Readonly<LegacyBelongsToField>;  
    //consortiumOrganizations: Readonly<LegacyHasManyField>; 
    //contacts: Readonly<LegacyHasManyField>; 
    //clients: Readonly<LegacyHasManyField>;  
    meta: string;
    name: string;
    displayName: string;
    symbol: string;
    globusUuid: string;
    description: string;
    region: string;
    country: string;
    memberType: string;
    organizationType: string;
    focusArea: number;
    logoUrl: string;
    systemEmail: string;
    groupEmail: string;
    website: string;
    isActive: boolean;
    passwordInput: string;
    nonProfitStatus: boolean;
    hasPassword: boolean;
    rorId: string;
    salesforceId: string;
    twitterHandle: string;
    //logo: string;
    //billingInformation: Readonly<BillingInformation>;
    technicalContact: Readonly<Contacts>;
    secondaryTechnicalContact: Readonly<Contacts>;
    billingContact: Readonly<Contacts>;
    secondaryBillingContact: Readonly<Contacts>;
    secondaryServiceContact: Readonly<Contacts>;
    serviceContact: Readonly<Contacts>;
    votingContact: Readonly<Contacts>;
    joined: Readonly<Date>;
    created: Readonly<Date>;
    updated: Readonly<Date>;
    doiEstimate: number;

  [Type]: 'providers';
}>;

export const ProviderSchema: ResourceSchema = withDefaults({
  type: 'providers',
  legacy: true,
  fields: [
    /*
    {
      kind: 'hasMany',
      name: 'clients',
      type: 'clients',
      options: {
        async: true,
        inverse: null,
      }
    },
    */
    /*
    {
      kind: 'belongsTo',
      name: 'consortium',
      type: 'providers',
      options: {
        async: true,
        inverse: 'consortiumOrganizations'
      }
    },
    {
      kind: 'hasMany',
      name: 'consortiumOrganizations',
      type: 'providers',
      options: {
        async: true,
        inverse: 'consortium'
      }
    },
    {
      kind: 'hasMany',
      name: 'contact',
      type: 'providers',
      options: {
        async: true,
        inverse: 'consortiumOrganizations'
      }
    },
    */
    {
      kind: 'field',
      name: 'meta'
    },
    {
      kind: 'field',
      name: 'name',
    },
    {
      kind: 'field',
      name: 'displayName',
    },
    {
      kind: 'field',
      name: 'symbol',
    },
    {
      kind: 'field',
      name: 'globusUuid',
    },
    {
      kind: 'field',
      name: 'description',
    },
    {
      kind: 'field',
      name: 'region',
    },
    {
      kind: 'field',
      name: 'country',
    },
    {
      kind: 'field',
      name: 'memberType',
    },
    {
      kind: 'field',
      name: 'organizationType',
    },
    {
      kind: 'field',
      name: 'focusArea',
    },
    {
      kind: 'field',
      name: 'logoUrl',
    },
    {
      kind: 'field',
      name: 'systemEmail',
    },
    {
      kind: 'field',
      name: 'website',
    },
    {
      kind: 'field',
      name: 'isActive',
    },
    {
      kind: 'field',
      name: 'passwordInput',
    },
    {
      kind: 'field',
      name: 'nonProfitStatus',
    },
    {
      kind: 'field',
      name: 'hasPassword',
    },
    {
      kind: 'field',
      name: 'rorId',
    },
    {
      kind: 'field',
      name: 'salesforceId',
    },
    {
      kind: 'field',
      name: 'twitterHandle',
    },
    // {
    //   kind: 'field',
    //   name: 'logo',
    // },
        // {
    //   kind: 'field',
    //   name: 'billingInformation',
    // },
    {
      kind: 'schema-object',
      name: 'technicalContact',
      type: 'Contact',
    },
    {
      kind: 'schema-object',
      name: 'secondaryTechnicalContact',
      type: 'Contact',
    },
    {
      kind: 'schema-object',
      name: 'billingContact',
      type: 'Contact',
    },
    {
      kind: 'schema-object',
      name: 'secondaryBillingContact',
      type: 'Contact',
    },
    {
      kind: 'schema-object',
      name: 'secondaryServiceContact',
      type: 'Contact',
    },
    {
      kind: 'schema-object',
      name: 'votingContact',
      type: 'Contact',
    },
    {
      kind: 'schema-object',
      name: 'joined',
      type: 'Date',
    },
    {
      kind: 'schema-object',
      name: 'created',
      type: 'Date',
    },
    {
      kind: 'schema-object',
      name: 'updated',
      type: 'Date',
    },
    {
      kind: 'field',
      name: 'doiEstimate',
    },
    {
      kind: 'field',
      name: 'isDestroyed',
    },
    {
      kind: 'field',
      name: 'isDestroying',
    },
    {
      name: 'uid',
      type: 'uid',
      options: { fields: ['provider'], separator: ' '  },
      kind: 'derived',
    },
    {
      name: 'hasRequiredContacts',
      type: 'hasRequireContacts',
      options: { fields: ['provider'], separator: ' '  },
      kind: 'derived',
    },
    {
      name: 'filteredContacts',
      type: 'filteredContacts',
      options: { fields: ['provider'], separator: ' '  },
      kind: 'derived',
    },
    /*
    {
      name: 'formattedBillingInformation',
      type: 'formattedBillingInformation',
      options: { fields: ['provider'], separator: ' '  },
      kind: 'derived',
    },
    */
  ]
});

////////////////////////////////////
// Derivations (similar to @computed) 
////////////////////////////////////

function uid(record: any, options: any, prop: any) {
  return record.id.toUpperCase();
};
uid[Type] = 'uid';

function hasRequiredContacts(record: any, options: any, prop: any) {
  if (record.memberType === 'consortium_organization') {
    return isPresent(record.serviceContact.email);
  } else if (record.memberType !== 'developer') {
    return (
      /*
      isPresent(record.votingContact.email) &&
      isPresent(record.serviceContact.email) &&
      isPresent(record.billingContact.email)
      */
      isPresent(record.votingContact.email) &&
      isPresent(record.serviceContact.email)
    );
  }
}
hasRequiredContacts[Type] = 'hasRequiredContacts';

function filteredContacts(record: any, options: any, prop: any) {
  return record.contacts;
}
filteredContacts[Type] = 'filteredContacts';

/*
function formattedBillingInformation(record: any, options: any, prop: any) {
  if (record.billingInformation) {
    return addressFormatter.format(
      {
        road: record.billingInformation.address,
        city: record.billingInformation.city,
        postcode: record.billingInformation.postCode
          ? record.billingInformation.postCode
          : null,
        state: record.billingInformation.state
          ? record.billingInformation.state.name
          : null,
        country: record.billingInformation.country
          ? record.billingInformation.country.name
          : null,
        countryCode: record.billingInformation.country
          ? record.billingInformation.country.code
          : null
      },
      {
        output: 'array'
      }
    );
  } else {
    return null;
  }
}
formattedBillingInformation[Type] = 'formattedBillingInformation';
*/


//////////////////////////////////////////////////////////////////////////////////////////
// Helper function to register the schema on creation of the schema service (in the store)
//////////////////////////////////////////////////////////////////////////////////////////

export function registerProviderSchema(schema: SchemaService) {
  registerContactSchema(schema);
  registerDateSchema(schema);

  schema.registerResources([
    ProviderSchema,
  ])
}

///////////////////////////////////////////////////////////////////////////////////////////////
// Helper function to register the derivations on creation of the schema service (in the store)
///////////////////////////////////////////////////////////////////////////////////////////////

export function registerProviderDerivations(schema: SchemaService) {
  registerContactDerivations(schema);

  schema.registerDerivation(uid);
  schema.registerDerivation(hasRequiredContacts);
  schema.registerDerivation(filteredContacts);

  registerDerivations(schema)
}
