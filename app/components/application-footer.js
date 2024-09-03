import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@ember/component';
import ENV from 'bracco/config/environment';

const data = {
  about_links: [
    {
      name: ENV.FOOTER_LINKS.WHAT_WE_DO.NAME,
      url: ENV.FOOTER_LINKS.WHAT_WE_DO.URL
    },
    {
      name: ENV.FOOTER_LINKS.GOVERNANCE.NAME,
      url: ENV.FOOTER_LINKS.GOVERNANCE.URL
    },
    {
      name: ENV.FOOTER_LINKS.STEERING_AND_WORKING_GROUPS.NAME,
      url: ENV.FOOTER_LINKS.STEERING_AND_WORKING_GROUPS.URL
    },
    {
      name: ENV.FOOTER_LINKS.TEAM.NAME,
      url: ENV.FOOTER_LINKS.TEAM.URL
    },
    {
      name: ENV.FOOTER_LINKS.JOB_OPPORTUNITIES.NAME,
      url: ENV.FOOTER_LINKS.JOB_OPPORTUNITIES.URL
    },
    {
      name: ENV.FOOTER_LINKS.PROJECTS.NAME,
      url: ENV.FOOTER_LINKS.PROJECTS.URL
    }
  ],
  work_with_us_links: [
    {
      name: ENV.FOOTER_LINKS.CREATE_DOIS.NAME,
      url: ENV.FOOTER_LINKS.CREATE_DOIS.URL
    },
    {
      name: ENV.FOOTER_LINKS.INTEGRATE_WORKFLOWS.NAME,
      url: ENV.FOOTER_LINKS.INTEGRATE_WORKFLOWS.URL
    },
    {
      name: ENV.FOOTER_LINKS.ENABLE_DISCOVERY.NAME,
      url: ENV.FOOTER_LINKS.ENABLE_DISCOVERY.URL
    },
    {
      name: ENV.FOOTER_LINKS.PROMOTE_REUSE.NAME,
      url: ENV.FOOTER_LINKS.PROMOTE_REUSE.URL
    },
    {
      name: ENV.FOOTER_LINKS.STRATEGIC_INITIATIVES.NAME,
      url: ENV.FOOTER_LINKS.STRATEGIC_INITIATIVES.URL
    }
  ],
  membership_links: [
    {
      name: ENV.FOOTER_LINKS.BECOME_A_MEMBER.NAME,
      url: ENV.FOOTER_LINKS.BECOME_A_MEMBER.URL
    },
    {
      name: ENV.FOOTER_LINKS.DATACITE_FEE_MODEL.NAME,
      url: ENV.FOOTER_LINKS.DATACITE_FEE_MODEL.URL
    },
    {
      name: ENV.FOOTER_LINKS.MEMBERSHIP_ENQUIRY.NAME,
      url: ENV.FOOTER_LINKS.MEMBERSHIP_ENQUIRY.URL
    },
    {
      name: ENV.FOOTER_LINKS.DATACITE_MEMBERS.NAME,
      url: ENV.FOOTER_LINKS.DATACITE_MEMBERS.URL
    }
  ],
  resources_links: [
    {
      name: ENV.FOOTER_LINKS.METADATA_SCHEMA.NAME,
      url: ENV.FOOTER_LINKS.METADATA_SCHEMA.URL
    },
    {
      name: ENV.FOOTER_LINKS.DATACITE_MEMBERS.NAME,
      url: ENV.FOOTER_LINKS.DATACITE_MEMBERS.URL
    }
  ],
  contact_links: [
    {
      name: ENV.FOOTER_LINKS.PRIVACY_POLICY.NAME,
      url: ENV.FOOTER_LINKS.PRIVACY_POLICY.URL
    },
    {
      name: ENV.FOOTER_LINKS.TERMS_AND_CONDITIONS.NAME,
      url: ENV.FOOTER_LINKS.TERMS_AND_CONDITIONS.URL
    },
    {
      name: ENV.FOOTER_LINKS.IMPRINT.NAME,
      url: ENV.FOOTER_LINKS.IMPRINT.URL
    }
  ]
};

@classic
export default class ApplicationFooter extends Component {
  data = data;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (this.default) {
      this.set('type', null);
      this.set('title', htmlSafe(ENV.SITE_TITLE));
    }
  }
}
