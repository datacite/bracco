import { htmlSafe } from '@ember/template';
import Component from '@ember/component';
import ENV from 'bracco/config/environment';
import { inject as service } from '@ember/service';

const data = {
  about_links: [
    {
      name: 'What we do',
      url: ENV.LINKS.WHAT_WE_DO_URL,
    },
    {
      name: 'Governance',
      url: ENV.LINKS.GOVERNANCE_URL,
    },
    {
      name: 'Members',
      url: ENV.LINKS.MEMBERS_URL,
    },
    {
      name: 'Steering groups',
      url: ENV.LINKS.STEERING_URL,
    },
    {
      name: 'Staff',
      url: ENV.LINKS.STAFF,
    },
    {
      name: 'Job opportunities',
      url: ENV.LINKS.JOB_OPPORTUNITIES_URL,
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
      url: ENV.LINKS.METADATA_SCHEMA_URL,
    },
    {
      name: 'Support',
      url: ENV.LINKS.SUPPORT_URL,
    },
    {
      name: 'Fee Model',
      url: ENV.LINKS.FEE_MODEL_URL,
    },
  ],
  community_links: [
    {
      name: 'Members',
      url: ENV.LINKS.MEMBERS_URL,
    },
    {
      name: 'Partners',
      url: ENV.LINKS.PARTNERS_URL,
    },
    {
      name: 'Steering groups',
      url: ENV.LINKS.STEERING_URL,
    },
    {
      name: 'Service providers',
      url: ENV.LINKS.SERVICE_PROVIDERS_URL,
    },
    {
      name: 'Roadmap',
      url: ENV.LINKS.ROADMAP_URL,
    },
  ],
  contact_links: [
    {
      name: 'Imprint',
      url: ENV.LINKS.IMPRINT,
    },
    {
      name: 'Terms and conditions',
      url: ENV.LINKS.TERMS_AND_CONDITIONS_URL,
    },
    {
      name: 'Privacy policy',
      url: ENV.LINKS.PRIVACY_POLICY_URL,
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
