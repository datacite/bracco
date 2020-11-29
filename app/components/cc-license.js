import { htmlSafe } from '@ember/template';
import { w } from '@ember/string';
import { A } from '@ember/array';
import Component from '@ember/component';
import URI from 'urijs';

const Tooltips = [
  {
    key: 'cc',
    title: 'Creative Commons (CC)',
    text:
      'A Creative Commons license enables the free distribution of an otherwise copyrighted work.'
  },
  {
    key: 'by',
    title: 'Attribution (BY)',
    text:
      'Licensees may copy, distribute, display and perform the work and make derivative works and remixes based on it only if they give the author or licensor the credits (attribution) in the manner specified by these.'
  },
  {
    key: 'sa',
    title: 'Share-alike (SA)',
    text:
      'Licensees may distribute derivative works only under a license identical ("not more restrictive") to the license that governs the original work.'
  },
  {
    key: 'nc',
    title: 'Non-commercial (NC)',
    text:
      'Licensees may copy, distribute, display, and perform the work and make derivative works and remixes based on it only for non-commercial purposes.'
  },
  {
    key: 'nd',
    title: 'No Derivative Works (ND)',
    text:
      'Licensees may copy, distribute, display and perform only verbatim copies of the work, not derivative works and remixes based on it.'
  },
  {
    key: 'zero',
    title: 'Public Domain (Zero)',
    text:
      'Copyright holder has waived the copyright interest and has dedicated the work to the world-wide public domain.'
  }
];

export default Component.extend({
  tagName: 'div',
  classNames: ['license'],

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.licenseURL != null) {
      let uri = new URI(this.licenseURL);
      let licenseLogo = null;
      if (uri.hostname() === 'creativecommons.org') {
        let labels = A(uri.segment(1).split('-'));
        labels.unshift('cc');
        let val = null;

        licenseLogo = labels.reduce(function (sum, key) {
          if (w('public publicdomain').includes(key)) {
            key = 'zero';
          }
          if (w('cc by nd nc sa zero').includes(key)) {
            val = {
              class: 'cc cc-' + key,
              tooltip: A(Tooltips).findBy('key', key)
            };
            A(sum).pushObject(val);
          }
          return sum;
        }, []);
      } else if (uri.hostname() === 'opensource.org') {
        switch (uri.segment(1)) {
          case 'MIT':
            licenseLogo = [
              {
                logo: htmlSafe(
                  '<img src="https://img.shields.io/:license-MIT-blue.svg" />'
                )
              }
            ];
        }
      }
      this.set('licenseLogo', licenseLogo);
    } else {
      this.set('licenseLogo', null);
    }
  }
});
