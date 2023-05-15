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
      name: 'Create DOIs with Fabrica',
      url: ENV.FABRICA_URL,
    },
    {
      name: 'Discover metadata with Commons',
      url: ENV.LINKS.COMMONS_URL,
    },
    {
      name: 'Integrate with APIs',
      url: ENV.LINKS.INTEGRATOR_URL,
    },
    {
      name: 'Partner Services',
      url: ENV.LINKS.PARTNER_SERVICES_URL,
    }
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
