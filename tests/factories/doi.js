import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('doi', {
  dataset: {
    id: '10.25499/jjva5eho424vep7dz2pson7qz',
    doi: '10.25499/jjva5eho424vep7dz2pson7qz',
    identifier: 'https://handle.test.datacite.org/10.25499/jjva5eho424vep7dz2pson7qz',
    url: null,
    creator: [{
      "type": "Person",
      "id": "https://orcid.org/0000-0002-2822-4968",
      "name": "Mitesh Patel",
      "given-name": "Mitesh",
      "family-name": "Patel"
    }],
    titles: [{
      'title': 'Submitted chemical data for InChIKey YAPQBXQYLJRXSA-UHFFFAOYSA-N'
    }],
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
