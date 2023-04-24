import { htmlSafe } from '@ember/template';
import Component from '@ember/component';
import ENV from 'bracco/config/environment';
import { inject as service } from '@ember/service';

const data = {
  about_links: [
    {
      name: 'What we do',
      url: ENV.LINKS.WHAT_WE_DO,
    },
    {
      name: 'Governance',
      url: ENV.LINKS.GOVERNANCE,
    },
    {
      name: 'Members',
      url: ENV.LINKS.MEMBERS,
    },
    {
      name: 'Steering groups',
      url: ENV.LINKS.STEERING,
    },
    {
      name: 'Staff',
      url: ENV.LINKS.STAFF,
    },
    {
      name: 'Job opportunities',
      url: ENV.LINKS.JOB_OPPORTUNITIES,
    },
  ],
  services_links: [
    {
      name: 'Assign DOIs',
      url: ENV.LINKS.ASSIGN_DOIS,
    },
    {
      name: 'Metadata search',
      url: ENV.LINKS.METADATA_SEARCH,
    },
    {
      name: 'Event data',
      url: ENV.LINKS.EVENT_DATA,
    },
    {
      name: 'Profiles',
      url: ENV.LINKS.PROFILES,
    },
    {
      name: 're3data',
      url: ENV.LINKS.RE3DATA,
    },
    {
      name: 'Citation formatter',
      url: ENV.LINKS.CITATION_FORMATTER,
    },
    {
      name: 'Statistics',
      url: ENV.LINKS.STATISTICS,
    },
    {
      name: 'Service status',
      url: ENV.LINKS.SERVICE_STATUS,
    },
    {
      name: 'Content negotiation',
      url: ENV.LINKS.CONTENT_NEGOTIATION,
    },
    {
      name: 'OAI-PMH',
      url: ENV.LINKS.OAI_PMH,
    },
    {
      name: 'Test environment',
      url: ENV.LINKS.TEST_ENVIRONMENT,
    },
  ],
  resources_links: [
    {
      name: 'Metadata schema',
      url: ENV.LINKS.METADATA_SCHEMA,
    },
    {
      name: 'Support',
      url: ENV.LINKS.SUPPORT,
    },
    {
      name: 'Fee Model',
      url: ENV.LINKS.FEE_MODEL,
    },
  ],
  community_links: [
    {
      name: 'Members',
      url: ENV.LINKS.MEMBERS,
    },
    {
      name: 'Partners',
      url: ENV.LINKS.PARTNERS,
    },
    {
      name: 'Steering groups',
      url: ENV.LINKS.STEERING,
    },
    {
      name: 'Service providers',
      url: ENV.LINKS.SERVICE_PROVIDERS,
    },
    {
      name: 'Roadmap',
      url: ENV.LINKS.ROADMAP,
    },
  ],
  contact_links: [
    {
      name: 'Imprint',
      url: ENV.LINKS.IMPRINT,
    },
    {
      name: 'Terms and conditions',
      url: ENV.LINKS.TERMS_AND_CONDITIONS,
    },
    {
      name: 'Privacy policy',
      url: ENV.LINKS.PRIVACY_POLICY,
    },
  ],
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
