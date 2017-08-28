import Ember from 'ember';
import URI from 'npm:urijs';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['license'],

  didInsertElement: function() {
    let tooltips = {
      'by': '<b>Attribution (BY)</b>: Licensees may copy, distribute, display and perform the work and make derivative works and remixes based on it only if they give the author or licensor the credits (attribution) in the manner specified by these.',
      'sa': '<b>Share-alike (SA)</b>: Licensees may distribute derivative works only under a license identical ("not more restrictive") to the license that governs the original work. (See also copyleft.) Without share-alike, derivative works might be sublicensed with compatible but more restrictive license clauses, e.g. CC BY to CC BY-NC.),',
      'nc': '<b>Non-commercial (NC)</b>: Licensees may copy, distribute, display, and perform the work and make derivative works and remixes based on it only for non-commercial purposes.',
      'nd': '<b>No Derivative Works (ND)</b>: Licensees may copy, distribute, display and perform only verbatim copies of the work, not derivative works and remixes based on it.'
    }
    let licenseURL = this.get('licenseURL');
    let licenseLogo = licenseURL;
    this.set('licenseURL', licenseURL);
    let uri = new URI(licenseURL);

    if (uri.hostname() === "creativecommons.org") {
      let labels = uri.segment(1).split("-");
      labels.unshift("cc");

      licenseLogo = labels.reduce(function (sum, key) {
        if (Ember.String.w("public publicdomain").includes(key)) {
          key = "zero";
        };
        if (Ember.String.w("cc by nd nc sa zero").includes(key)) {
          return sum + ' <i class="cc cc-' + key + '"></i>';
        } else {
          return sum;
        }
        return a + b;
      }, '');
    } else if (uri.hostname() === "opensource.org") {
      switch(uri.segment(1)) {
        case 'MIT':
          licenseLogo = '<img src="https://img.shields.io/:license-MIT-blue.svg" />';
      }
    } else {
    }
    this.set('licenseLogo', Ember.String.htmlSafe(licenseLogo));
  }
});

// export default Ember.Helper.helper(ccLicense);

//               <i class="cc cc-by-nd"></i>

// def license_img(license)
//   uri = URI.parse(license)
//   if uri.host == "creativecommons.org"
//     _head, prefix, type, version, _tail = uri.path.split('/', 5)
//     if prefix == "publicdomain"
//       "https://licensebuttons.net/p/zero/1.0/80x15.png"
//     else
//       #version = version.to_s.gsub(/(\d)\.\d/, '/1.0')
//       "https://licensebuttons.net/l/#{type}/#{version}/80x15.png"
//     end
//   elsif uri.host == "opensource.org"
//     _head, prefix, type = uri.path.split('/', 3)
//     type = type.gsub('-', ' ')
//     "https://img.shields.io/:license-#{URI.escape(type)}-blue.svg"
//   end
// end
