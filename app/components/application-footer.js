import { htmlSafe } from '@ember/template';
import Component from '@ember/component';
import ENV from 'bracco/config/environment';

const data = {
  about_links: [
    {
      name: 'What we do',
      url: ENV.CDN_URL + '/value.html'
    },
    {
      name: 'Governance',
      url: ENV.CDN_URL + '/governance.html'
    },
    {
      name: 'Members',
      url: ENV.CDN_URL + '/members.html'
    },
    {
      name: 'Steering groups',
      url: ENV.CDN_URL + '/steering.html'
    },
    {
      name: 'Staff',
      url: ENV.CDN_URL + '/staff.html'
    },
    {
      name: 'Job opportunities',
      url: ENV.CDN_URL + '/jobopportunities.html'
    }
  ],
  services_links: [
    {
      name: 'Assign DOIs',
      url: ENV.CDN_URL + '/dois.html'
    },
    {
      name: 'Metadata search',
      url: ENV.CDN_URL + '/search.html'
    },
    {
      name: 'Event data',
      url: ENV.CDN_URL + '/eventdata.html'
    },
    {
      name: 'Profiles',
      url: ENV.CDN_URL + '/profiles.html'
    },
    {
      name: 're3data',
      url: ENV.CDN_URL + '/re3data.html'
    },
    {
      name: 'Citation formatter',
      url: ENV.CDN_URL + '/citation.html'
    },
    {
      name: 'Statistics',
      url: ENV.CDN_URL + '/stats.html'
    },
    {
      name: 'Service status',
      url: ENV.CDN_URL + '/service.html'
    },
    {
      name: 'Content negotiation',
      url: ENV.CDN_URL + '/content.html'
    },
    {
      name: 'OAI-PMH',
      url: ENV.CDN_URL + '/oaipmh.html'
    },
    {
      name: 'Test environment',
      url: ENV.CDN_URL + '/test.html'
    }
  ],
  resources_links: [
    {
      name: 'Metadata schema',
      url: 'https://schema.datacite.org'
    },
    {
      name: 'Support',
      url: 'https://support.datacite.org'
    },
    {
      name: 'Fee Model',
      url: ENV.CDN_URL + '/feemodel.html'
    }
  ],
  community_links: [
    {
      name: 'Members',
      url: ENV.CDN_URL + '/members.html'
    },
    {
      name: 'Partners',
      url: ENV.CDN_URL + '/partners.html'
    },
    {
      name: 'Steering groups',
      url: ENV.CDN_URL + '/steering.html'
    },
    {
      name: 'Service providers',
      url: ENV.CDN_URL + '/service-providers.html'
    },
    {
      name: 'Roadmap',
      url: ENV.CDN_URL + '/roadmap.html'
    }
  ],
  contact_links: [
    {
      name: 'Imprint',
      url: ENV.CDN_URL + '/imprint.html'
    },
    {
      name: 'Terms and conditions',
      url: ENV.CDN_URL + '/terms.html'
    },
    {
      name: 'Privacy policy',
      url: ENV.CDN_URL + '/privacy.html'
    }
  ]
};

export default Component.extend({
  data,

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.default) {
      this.set('type', null);
      this.set('title', htmlSafe(ENV.SITE_TITLE));
    }
  }
});
