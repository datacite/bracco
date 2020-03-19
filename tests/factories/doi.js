import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('doi', {
  default: {
    doi: '10.80225/rph240519',
    url: 'https://datacite.org',
    identifiers: [ {
      'doi': 'https://handle.test.datacite.org/10.80225/rph240519',
    } ],
    creators: FactoryGuy.hasMany('creator'),
    contributors: FactoryGuy.hasMany('contributor'),
    titles: FactoryGuy.hasMany('title'),
    descriptions: FactoryGuy.hasMany('description'),
    geoLocations: FactoryGuy.hasMany('geoLocation'),
    subjects: FactoryGuy.hasMany('subject'),
    publisher: 'Royal Society of Chemistry',
    types: {
      resourceTypeGeneral: 'Dataset',
      resourceType: 'Substance',
    },
    schemaVersion: 'http://datacite.org/schema/kernel-4',
    state: 'findable',
    publicationYear: 2017,
    created: '2017-09-27T14:08:02.000Z',
    registered: '2017-09-27T14:08:02.000Z',
    updated: '2017-09-27T14:08:02.000Z',
    language: 'en',
    downloadCount: 4,
    viewCount: 111111,
    citationCount: 123,
    repository: FactoryGuy.belongsTo('repository'),
  },
  empty: {
    creators: [],
  },
});

FactoryGuy.define('creator', {
  default: {
    name: 'Patel, Mitesh',
    givenName: 'Mitesh',
    familyName: 'Patel',
    nameType: 'Personal',
    nameIdentifiers: FactoryGuy.hasMany('nameIdentifier'),
    affiliation: FactoryGuy.hasMany('affiliation'),
  },
});

FactoryGuy.define('contributor', {
  default: {
    contributorType: 'Editor',
    name: 'Patel, Mitesh',
    givenName: 'Mitesh',
    familyName: 'Patel',
    nameType: 'Personal',
    nameIdentifiers: FactoryGuy.hasMany('nameIdentifier'),
    affiliation: FactoryGuy.hasMany('affiliation'),
  },
});

FactoryGuy.define('title', {
  default: {
    title: 'Submitted chemical data for InChIKey YAPQBXQYLJRXSA-UHFFFAOYSA-N',
  },
});

FactoryGuy.define('description', {
  default: {
    description: 'Description of submitted chemical data for InChIKey YAPQBXQYLJRXSA-UHFFFAOYSA-N',
  },
});

FactoryGuy.define('geoLocation', {
  default: {
    geoLocationPlace: 'Mexico',
  },
});

FactoryGuy.define('subject', {
  default: {
    subject: 'Clinical medicine',
    subjectScheme: 'OECD',
    schemeURI: 'http://www.oecd.org/science/inno' ,
    valueURI: '38235147.pdf',
  },
});

FactoryGuy.define('nameIdentifier', {
  default: {
    nameIdentifier: 'https://orcid.org/0000-0003-1419-2405',
    nameIdentifierScheme: 'ORCID',
    schemeUri: 'https://orcid.org',
  },
});

FactoryGuy.define('affiliation', {
  default: {
    name: 'University of Cambridge',
    affiliationIdentifier: 'https://ror.org/013meh722',
    affiliationIdentifierScheme: 'ROR',
    schemeUri: 'https://ror.org',
  },
});
