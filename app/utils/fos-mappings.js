const OECD_SCHEME = 'Fields of Science and Technology (FOS)';
const OECD_SCHEME_URI = 'https://web-archive.oecd.org/2012-06-15/138575-38235147.pdf';
const MAPPING = {
  mappingListVersion: '1.0',
  originalUrl: 'https://web-archive.oecd.org/2012-06-15/138575-38235147.pdf',
  fosFields: [
    {
      fosId: '1',
      fosLabel: 'Natural sciences'
    },
    {
      fosId: '1.1',
      fosLabel: 'Mathematics'
    },
    {
      fosId: '1.2',
      fosLabel: 'Computer and information sciences'
    },
    {
      fosId: '1.3',
      fosLabel: 'Physical sciences'
    },
    {
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      fosId: '1.7',
      fosLabel: 'Other natural sciences'
    },
    {
      fosId: '2',
      fosLabel: 'Engineering and technology'
    },
    {
      fosId: '2.1',
      fosLabel: 'Civil engineering'
    },
    {
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, electronic engineering, information engineering'
    },
    {
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      fosId: '2.4',
      fosLabel: 'Chemical engineering'
    },
    {
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      fosId: '2.6',
      fosLabel: 'Medical engineering'
    },
    {
      fosId: '2.7',
      fosLabel: 'Environmental engineering'
    },
    {
      fosId: '2.8',
      fosLabel: 'Environmental biotechnology'
    },
    {
      fosId: '2.9',
      fosLabel: 'Industrial biotechnology'
    },
    {
      fosId: '2.10',
      fosLabel: 'Nanotechnology'
    },
    {
      fosId: '2.11',
      fosLabel: 'Other engineering and technologies'
    },
    {
      fosId: '3',
      fosLabel: 'Medical and health sciences'
    },
    {
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      fosId: '3.3',
      fosLabel: 'Health sciences'
    },
    {
      fosId: '3.4',
      fosLabel: 'Medical biotechnology'
    },
    {
      fosId: '3.5',
      fosLabel: 'Other medical sciences'
    },
    {
      fosId: '4',
      fosLabel: 'Agricultural sciences'
    },
    {
      fosId: '4.1',
      fosLabel: 'Agriculture, forestry and fisheries'
    },
    {
      fosId: '4.2',
      fosLabel: 'Animal and dairy science'
    },
    {
      fosId: '4.3',
      fosLabel: 'Veterinary sciences'
    },
    {
      fosId: '4.4',
      fosLabel: 'Agricultural biotechnology'
    },
    {
      fosId: '4.5',
      fosLabel: 'Other agricultural sciences'
    },
    {
      fosId: '5',
      fosLabel: 'Social sciences'
    },
    {
      fosId: '5.1',
      fosLabel: 'Psychology'
    },
    {
      fosId: '5.2',
      fosLabel: 'Economics and business'
    },
    {
      fosId: '5.3',
      fosLabel: 'Educational sciences'
    },
    {
      fosId: '5.4',
      fosLabel: 'Sociology'
    },
    {
      fosId: '5.5',
      fosLabel: 'Law'
    },
    {
      fosId: '5.6',
      fosLabel: 'Political science'
    },
    {
      fosId: '5.7',
      fosLabel: 'Social and economic geography'
    },
    {
      fosId: '5.8',
      fosLabel: 'Media and communications'
    },
    {
      fosId: '5.9',
      fosLabel: 'Other social sciences'
    },
    {
      fosId: '6',
      fosLabel: 'Humanities'
    },
    {
      fosId: '6.1',
      fosLabel: 'History and archaeology'
    },
    {
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      fosId: '6.3',
      fosLabel: 'Philosophy, ethics and religion'
    },
    {
      fosId: '6.4',
      fosLabel: 'Arts (arts, history of arts, performing arts, music)'
    },
    {
      fosId: '6.5',
      fosLabel: 'Other humanities'
    }
  ]
};

export default {
  data: MAPPING,
  scheme: OECD_SCHEME,
  schemeUri: OECD_SCHEME_URI,
  allLabels: function () {
    return this.data.fosFields.map(function (fosField) {
      return fosField.fosLabel;
    });
  },

  findByLabel: function (value) {
    return this.data.fosFields.find((fosField) => fosField.fosLabel == value);
  },
  findSubjectByLabel: function (value) {
    var fos = this.findByLabel(value);
    if (fos) {
      return {
        subject: fos.fosLabel,
        subjectScheme: OECD_SCHEME,
        schemeUri: OECD_SCHEME_URI,
        classificationCode: fos.fosId
      };
    }
    return fos;
  }
};
