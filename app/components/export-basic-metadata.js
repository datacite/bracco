import Component from '@ember/component';
import Papa from 'papaparse';
import FileSaver from 'file-saver';

export default Component.extend({
  tagName: '',
  classNames: ['export-basic-metadata'],

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

      var FileSaver = require('file-saver');
      var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
      FileSaver.saveAs(blob, "dois.csv");
    }
  }
})