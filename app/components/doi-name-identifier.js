import Component from '@ember/component';

const nameIdentifierSchemeList = [
  'ISNI',
  'ORCID'
];

const nameIdentifierSchemeOrganizationList = [
  'ISNI',
  'ROR'
];

const schemeUriList = {
  isni: 'ISNI',
  orcid: 'ORCID',
  ror: 'ROR'
};

export default Component.extend({
  nameIdentifierSchemeList,
  nameIdentifierSchemes: nameIdentifierSchemeList,

  actions: {
    searchNameIdentifierScheme(query) {
      var nameIdentifierSchemes = nameIdentifierSchemeList.filter(function (nameIdentifierScheme) {
        return nameIdentifierScheme.toLowerCase().startsWith(query.toLowerCase());
      })
      this.set('nameIdentifierSchemes', nameIdentifierSchemes);
    },
    selectNameIdentifierScheme(nameIdentifierScheme) {
      this.fragment.set('nameIdentifierScheme', nameIdentifierScheme);
      this.fragment.set('schemeUri', schemeUriList[nameIdentifierScheme]);
      this.set('nameIdentifierSchemes', nameIdentifierSchemeList);
    }
  }
});
