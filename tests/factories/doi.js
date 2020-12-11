import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('doi', {
  default: {
    doi: '10.80225/rph240519',
    url: 'https://ada.edu.au/bla',
    alternateIdentifiers: [
      {
        doi: 'https://handle.stage.datacite.org/10.80225/rph24'
      }
    ],
    creators: FactoryGuy.hasMany('creator'),
    contributors: FactoryGuy.hasMany('contributor'),
    titles: FactoryGuy.hasMany('title'),
    descriptions: FactoryGuy.hasMany('description'),
    dates: FactoryGuy.hasMany('date'),
    relatedIdentifiers: FactoryGuy.hasMany('relatedIdentifier'),
    fundingReferences: FactoryGuy.hasMany('fundingReference'),
    rightsList: FactoryGuy.hasMany('rights'),
    geoLocations: FactoryGuy.hasMany('geoLocation'),
    subjects: FactoryGuy.hasMany('subject'),
    publisher: 'Royal Society of Chemistry',
    types: {
      resourceTypeGeneral: 'Dataset',
      resourceType: 'Substance'
    },
    schemaVersion: 'http://datacite.org/schema/kernel-4',
    state: 'findable',
    publicationYear: 2017,
    created: '2017-09-27T14:08:02.000Z',
    registered: '2017-09-27T14:08:02.000Z',
    updated: '2017-09-27T14:08:02.000Z',
    language: 'en',
    downloadCount: 4,
    sizes: ['1 page', '500kb'],
    formats: ['html', 'word'],
    version: '7',
    viewCount: 111111,
    citationCount: 123,
    repository: FactoryGuy.belongsTo('repository')
  },
  emptyDoi: {
    doi: null,
    url: null,
    creators: FactoryGuy.hasMany('creator', { name: null }),
    contributors: FactoryGuy.hasMany('contributor', { name: null }),
    titles: FactoryGuy.hasMany('title', { title: null }),
    subjects: FactoryGuy.hasMany('subject', { subject: null }),
    relatedIdentifiers: FactoryGuy.hasMany('relatedIdentifier', {
      relatedIdentifierType: null
    }),
    fundingReferences: FactoryGuy.hasMany('fundingReference', {
      funderName: null
    }),
    rightsList: FactoryGuy.hasMany('rights', { rights: null }),
    geoLocations: FactoryGuy.hasMany('geoLocation', {
      geoLocation: { geoLocationPoint: {} }
    }),
    dates: FactoryGuy.hasMany('date', { date: null }),
    descriptions: FactoryGuy.hasMany('description', { description: null }),
    publisher: null,
    publicationYear: null,
    state: 'findable'
  },
  draft: {
    state: 'draft'
  }
});

FactoryGuy.define('creator', {
  default: {
    name: 'Patel, Mitesh',
    givenName: 'Mitesh',
    familyName: 'Patel',
    nameType: 'Personal',
    nameIdentifiers: FactoryGuy.hasMany('nameIdentifier'),
    affiliation: FactoryGuy.hasMany('affiliation')
  }
});

FactoryGuy.define('contributor', {
  default: {
    contributorType: 'Editor',
    name: 'Patel, Mitesh',
    givenName: 'Mitesh',
    familyName: 'Patel',
    nameType: 'Personal',
    nameIdentifiers: FactoryGuy.hasMany('nameIdentifier'),
    affiliation: FactoryGuy.hasMany('affiliation')
  }
});

FactoryGuy.define('title', {
  default: {
    title: 'Submitted chemical data for InChIKey YAPQBXQYLJRXSA-UHFFFAOYSA-N'
  }
});

FactoryGuy.define('alternateIdentifier', {
  default: {
    alternateIdentifier: 'https://handle.stage.datacite.org/10.70048/rph240519',
    alternateIdentifierType: 'DOI'
  }
});

FactoryGuy.define('description', {
  default: {
    description:
      'Description of submitted chemical data for InChIKey YAPQBXQYLJRXSA-UHFFFAOYSA-N'
  }
});

FactoryGuy.define('geoLocation', {
  default: {
    geoLocationPlace: 'Mexico'
  }
});

FactoryGuy.define('date', {
  default: {
    date: '2020-12-10',
    dateType: 'Issued'
  }
});

FactoryGuy.define('subject', {
  default: {
    subject: 'Clinical medicine',
    subjectScheme: 'Fields of Science and Technology (FOS)',
    schemeUri: 'http://www.oecd.org/science/inno/38235147.pdf'
  }
});

FactoryGuy.define('nameIdentifier', {
  default: {
    nameIdentifier: 'https://orcid.org/0000-0003-1419-2405',
    nameIdentifierScheme: 'ORCID',
    schemeUri: 'https://orcid.org'
  }
});

FactoryGuy.define('relatedIdentifier', {
  default: {
    relatedIdentifier: '10.80225/rph240519sdfd',
    relatedIdentifierType: 'DOI',
    relationType: 'HasMetadata',
    relatedMetadataScheme: 'DataCite',
    schemeUri:
      'https://schema.datacite.org/meta/kernel-4.3/doc/DataCite-MetadataKernel_v4.3.pdf',
    schemeType: 'XML',
    resourceTypeGeneral: 'Dataset'
  }
});

FactoryGuy.define('fundingReference', {
  default: {
    funderName: 'National Natural Science Foundation of China',
    funderIdentifier: 'grid.419696.5',
    funderIdentifierType: 'GRID',
    awardNumber: '13321312G45',
    awardUri: 'http://www.nsfc.gov.cn/publish/portal1/',
    awardTitle: 'COVID-19 Money'
  }
});

FactoryGuy.define('rights', {
  default: {
    rights: 'Creative Commons Attribution 3.0 Unported',
    rightsUri: 'http://creativecommons.org/licenses/by/3.0/de/deed.en',
    rightsIdentifier: ' CC-BY-3.0',
    rightsIdentifierScheme: 'SPDX',
    schemeUri: 'https://spdx.org/licenses/'
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
