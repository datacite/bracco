import Component from '@ember/component';
import Papa from 'papaparse';
import FileSaver from 'file-saver';

export default Component.extend({
  tagName: '',
  classNames: ['export-basic-metadata'],

  actions: {
    exportBasicMetadata(model) {
      let dois = [];

      this.model.forEach(function(doi) {
        dois.push({ 
          "doi" : doi.doi,
          "url" : doi.url,
          "registered": doi.registered,
          "state": doi.state,
          "resourceTypeGeneral": doi.types.resourceTypeGeneral,
          "resourceType": doi.types.resourceType,
          "title": doi.title,
          "author": doi.author,
          "publisher": doi.publisher,
          "publicationYear": doi.publicationYear
        });
      });
      
      var csv = Papa.unparse(dois);

      var FileSaver = require('file-saver');
      var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
      FileSaver.saveAs(blob, "dois.csv");
    }
  }
})