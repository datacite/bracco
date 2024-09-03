import classic from 'ember-classic-decorator';
/* eslint-disable no-useless-escape */
import BaseValidator from 'ember-cp-validations/validators/base';
import { isURL, isISBN } from 'validator';

@classic
class IdentifierFormat extends BaseValidator {
  validate(value, options, model) {
    const ark = /^ark:\/[0-9]{5}\/\S+$/;
    const lsid =
      /^[uU][rR][nN]:[lL][sS][iI][dD]:(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%]):(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%]):(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%])[:]?(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%])?$/;
    const purl = {
      require_host: true,
      host_whitelist: ['purl.org', 'oclc.org']
    };
    const arxiv =
      /^(arXiv:)(\d{4}.\d{4,5}|[a-z\-]+(\.[A-Z]{2})?\/\d{7})(v\d+)?/;
    const doi = /^(10\.\d{4,5}\/.+)/;
    const doiUrl =
      /^(?:(http|https):\/\/(dx.)?(doi.org|handle.test.datacite.org)?\/)(10\.\d{4,5}\/.+)/;
    const bibcode = /\d{4}[A-Za-z\.\&]{5}[\w\.]{4}[ELPQ-Z\.][\d\.]{4}[A-Z]/;
    const urn = /^urn:[a-z0-9][a-z0-9-]{0,31}:[a-z0-9()+,\-.:=@;$_!*'%/?#]/;
    const types = [
      'EAN13',
      'EISSN',
      'Handle',
      'IGSN',
      'ISSN',
      'ISTC',
      'LISSN',
      'LSID',
      'PMID',
      'UPC',
      'w3id'
    ];

    switch (true) {
      case model.relatedIdentifierType == 'ARK':
        return ark.test(value) ? true : 'Please enter a valid ARK.';
      case model.relatedIdentifierType == 'arXiv':
        return arxiv.test(value) ? true : 'Please enter a valid arXiv.';
      case model.relatedIdentifierType == 'DOI':
        return doi.test(value) || doiUrl.test(value)
          ? true
          : 'Please enter a valid DOI.';
      case model.relatedIdentifierType == 'bibcode':
        return bibcode.test(value) ? true : 'Please enter a valid bibcode.';
      case model.relatedIdentifierType == 'LSID':
        return lsid.test(value) ? true : 'Please enter a valid LSID.';
      case model.relatedIdentifierType == 'PURL':
        return isURL(value, purl) ? true : 'Please enter a valid PURL.';
      case model.relatedIdentifierType == 'URN':
        return urn.test(value) ? true : 'Please enter a valid URN.';
      case model.relatedIdentifierType == 'ISBN':
        return isISBN(value) ? true : 'Please enter a valid ISBN.';
      case model.relatedIdentifierType == 'URL':
        return isURL(value) ? true : 'Please enter a valid URL.';
      case types.includes(model.relatedIdentifierType):
        return true;
      default:
        return 'Please enter a Related Identedfier type.';
    }
  }
}

export default IdentifierFormat;
