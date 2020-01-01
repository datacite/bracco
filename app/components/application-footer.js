import { htmlSafe } from '@ember/template';
import Component from '@ember/component';
import ENV from 'bracco/config/environment';
import isElectron from 'is-electron';

const data = {
  'about_links': [
    {
      'name': 'What we do',
      'url': 'https://www.datacite.org/mission.html',
    },
    {
      'name': 'Governance',
      'url': 'https://www.datacite.org/governance.html',
    },
    {
      'name': 'Steering groups',
      'url': 'https://www.datacite.org/steering.html',
    },
    {
      'name': 'Staff',
      'url': 'https://www.datacite.org/staff.html',
    },
    {
      'name': 'Job opportunities',
      'url': 'https://www.datacite.org/jobopportunities.html',
    },
  ],
  'services_links': [
    {
      'name': 'Assign DOIs',
      'url': 'https://www.datacite.org/dois.html',
    },
    {
      'name': 'Metadata search',
      'url': 'https://www.datacite.org/search.html',
    },
    {
      'name': 'Event data',
      'url': 'https://www.datacite.org/eventdata.html',
    },
    {
      'name': 'Profiles',
      'url': 'https://www.datacite.org/profiles.html',
    },
    {
      'name': 're3data',
      'url': 'https://www.datacite.org/re3data.html',
    },
    {
      'name': 'Citation formatter',
      'url': 'https://www.datacite.org/citation.html',
    },
    {
      'name': 'Statistics',
      'url': 'https://www.datacite.org/stats.html',
    },
    {
      'name': 'Content negotiation',
      'url': 'https://www.datacite.org/content.html',
    },
    {
      'name': 'OAI-PMH',
      'url': 'https://www.datacite.org/oaipmh.html',
    },
  ],
  'resources_links': [
    {
      'name': 'Metadata schema',
      'url': 'https://schema.datacite.org',
    },
    {
      'name': 'Support',
      'url': 'https://support.datacite.org',
    },
  ],
  'community_links': [
    {
      'name': 'Members',
      'url': 'https://www.datacite.org/members.html',
    },
    {
      'name': 'Partners',
      'url': 'https://www.datacite.org/partners.html',
    },
    {
      'name': 'Steering groups',
      'url': 'https://www.datacite.org/steering.html',
    },
    {
      'name': 'Events',
      'url': 'https://www.datacite.org/events.html',
    },
    {
      'name': 'Roadmap',
      'url': 'https://www.datacite.org/roadmap.html',
    },
    {
      'name': 'User Stories',
      'url': 'https://www.datacite.org/user-stories.html',
    },
  ],
  'contact_links': [
    {
      'name': 'Terms and conditions',
      'url': 'https://www.datacite.org/terms.html',
    },
    {
      'name': 'Privacy policy',
      'url': 'https://www.datacite.org/privacy.html',
    },
    {
      'name': 'Acknowledgements',
      'url': 'https://www.datacite.org/acknowledgments.html',
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

    this.set('isElectron', isElectron());
  },
});
