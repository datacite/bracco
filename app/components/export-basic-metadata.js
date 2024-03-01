import Component from '@ember/component';
import Papa from 'papaparse';
import FileSaver from 'file-saver';
import currentDate from '../utils/current-date';
import formatCreators from '../utils/format-creators';

export default Component.extend({
  tagName: '',
  classNames: [],

  actions: {
    exportBasicMetadata(model) {
      let dois = [];

      this.model.forEach(function (doi) {
        dois.push({
          doi: doi.doi,
          url: doi.url,
          registered: doi.registered,
          state: doi.state,
          resourceTypeGeneral: doi.types.resourceTypeGeneral,
          resourceType: doi.types.resourceType,
          title: doi.title,
          author: formatCreators(doi.creators, {}),
          publisher: doi.publisher ? doi.publisher.name : null,
          publicationYear: doi.publicationYear
        });
      });

      var csv = Papa.unparse(dois);

      var FileSaver = require('file-saver');
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      var filename =
        currentDate() +
        (this.client_id ? '-' + this.client_id : '-' + 'dois') +
        (this.page ? '-' + this.page : '') +
        '.csv';
      FileSaver.saveAs(blob, filename);
    }
  }
});
