import Component from '@ember/component';
//import { inject as service } from '@ember/service';
//import { reads } from '@ember/object/computed';
import Papa from 'papaparse';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin, {
  //router: service(),
  tagName: '',
  classNames: ['export-basic-metadata'],
  //repositoryId: reads('router.currentRoute.attributes.repository.id'),
  //providerId: reads('router.currentRoute.attributes.provider.id'),

  actions: {
    exportBasicMetadata(model) {
      let dois = [];

      this.model.forEach(function(doi, meta = this.model.meta, i = 0) {
        dois.push({ 
          "doi" : doi.doi,
          "url" : doi.url,
          "registered": doi.registered,
          "state": doi.state,
          //"resourceTypeGeneral": meta.resourceTypes[i].title,
          //"resourceTypes": ??,
          "title": doi.title,
          "author": doi.author,
          "publisher": doi.publisher,
          "publicationYear": doi.publicationYear
        });
        i++;
      });

      var csv = Papa.unparse(dois);

      this.saveFileAs('dois.csv', csv, 'text/csv');
    }
  }
})