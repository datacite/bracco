import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('doi', {
  default: {
    doi: '10.25499/jjva5eho424vep7dz2pson7qz',
    identifiers: [{
      'doi': 'https://handle.test.datacite.org/10.25499/jjva5eho424vep7dz2pson7qz'
    }],
    creators: FactoryGuy.hasMany('creator'),
    titles: FactoryGuy.hasMany('title'),
    descriptions: FactoryGuy.hasMany('description'),
    publisher: 'Royal Society of Chemistry',
    types: {
      resourceTypeGeneral: 'Dataset',
      resourceType: 'Substance'
    },
    schemaVersion: "http://datacite.org/schema/kernel-4",
    state: "findable",
    publicationYear: 2017,
    created: "2017-09-27T14:08:02.000Z",
    registered: "2017-09-27T14:08:02.000Z",
    updated: "2017-09-27T14:08:02.000Z"
  },
  empty: {
    creators: []
  }
});

FactoryGuy.define('creator', {
  default: {
    name: 'Patel, Mitesh',
    givenName: 'Mitesh',
    familyName: 'Patel',
    nameType: 'Personal',
    nameIdentifiers: FactoryGuy.hasMany('nameIdentifier'),
    affiliation: FactoryGuy.hasMany('affiliation'),
  }
});

FactoryGuy.define('title', {
  default: {
    title: 'Submitted chemical data for InChIKey YAPQBXQYLJRXSA-UHFFFAOYSA-N'
  }
});

FactoryGuy.define('description', {
  default: {
    description: 'Description of submitted chemical data for InChIKey YAPQBXQYLJRXSA-UHFFFAOYSA-N'
  }
});

FactoryGuy.define('nameIdentifier', {
  default: {
    nameIdentifier: 'https://orcid.org/0000-0003-1419-2405',
    nameIdentifierScheme: 'ORCID',
    schemeUri: 'https://orcid.org'
  }
});

FactoryGuy.define('affiliation', {
  default: {
    name: 'University of Cambridge',
    affiliationIdentifier: 'https://ror.org/013meh722',
    affiliationIdentifierScheme: 'ROR',
    schemeUri: 'https://ror.org'
  }
});
