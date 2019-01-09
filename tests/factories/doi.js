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
    state: "searchable",
    publicationYear: 2017,
    registered: "2017-09-27T14:08:02.000Z",
    updated: "2017-09-27T14:08:02.000Z"
  }
});

FactoryGuy.define('creator', {
  default: {
    name: 'Patel, Mitesh',
    givenName: 'Mitesh',
    familyName: 'Patel',
    nameType: 'Personal'
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
