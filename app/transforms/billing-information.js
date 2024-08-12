import classic from 'ember-classic-decorator';
import Transform from '@ember-data/serializer/transform';
import countryList from 'iso-3166-country-list';

const stateList = [
  { code: 'US-AL', name: 'Alabama' },
  { code: 'US-AK', name: 'Alaska' },
  { code: 'US-AZ', name: 'Arizona' },
  { code: 'US-AR', name: 'Arkansas' },
  { code: 'US-CA', name: 'California' },
  { code: 'US-CO', name: 'Colorado' },
  { code: 'US-CT', name: 'Connecticut' },
  { code: 'US-DE', name: 'Delaware' },
  { code: 'US-FL', name: 'Florida' },
  { code: 'US-GA', name: 'Georgia' },
  { code: 'US-HI', name: 'Hawaii' },
  { code: 'US-ID', name: 'Idaho' },
  { code: 'US-IL', name: 'Illinois' },
  { code: 'US-IN', name: 'Indiana' },
  { code: 'US-IA', name: 'Iowa' },
  { code: 'US-KS', name: 'Kansas' },
  { code: 'US-KY', name: 'Kentucky' },
  { code: 'US-LA', name: 'Louisiana' },
  { code: 'US-ME', name: 'Maine' },
  { code: 'US-MD', name: 'Maryland' },
  { code: 'US-MA', name: 'Massachusetts' },
  { code: 'US-MI', name: 'Michigan' },
  { code: 'US-MN', name: 'Minnesota' },
  { code: 'US-MS', name: 'Mississippi' },
  { code: 'US-MO', name: 'Missouri' },
  { code: 'US-MT', name: 'Montana' },
  { code: 'US-NE', name: 'Nebraska' },
  { code: 'US-NV', name: 'Nevada' },
  { code: 'US-NH', name: 'New Hampshire' },
  { code: 'US-NJ', name: 'New Jersey' },
  { code: 'US-NM', name: 'New Mexico' },
  { code: 'US-NY', name: 'New York' },
  { code: 'US-NC', name: 'North Carolina' },
  { code: 'US-ND', name: 'North Dakota' },
  { code: 'US-OH', name: 'Ohio' },
  { code: 'US-OK', name: 'Oklahoma' },
  { code: 'US-OR', name: 'Oregon' },
  { code: 'US-PA', name: 'Pennsylvania' },
  { code: 'US-RI', name: 'Rhode Island' },
  { code: 'US-SC', name: 'South Carolina' },
  { code: 'US-SD', name: 'South Dakota' },
  { code: 'US-TN', name: 'Tennessee' },
  { code: 'US-TX', name: 'Texas' },
  { code: 'US-UT', name: 'Utah' },
  { code: 'US-VT', name: 'Vermont' },
  { code: 'US-VA', name: 'Virginia' },
  { code: 'US-WA', name: 'Washington' },
  { code: 'US-WV', name: 'West Virginia' },
  { code: 'US-WI', name: 'Wisconsin' },
  { code: 'US-WY', name: 'Wyoming' },
  { code: 'US-DC', name: 'District of Columbia' },
  { code: 'US-AS', name: 'American Samoa' },
  { code: 'US-GU', name: 'Guam' },
  { code: 'US-MP', name: 'Northern Mariana Islands' },
  { code: 'US-PR', name: 'Puerto Rico' },
  { code: 'US-UM', name: 'United States Minor Outlying Islands' },
  { code: 'US-VI', name: 'Virgin Islands, U.S.' },
  // Canadian provinces
  { code: 'CA-AB', name: 'Alberta' },
  { code: 'CA-BC', name: 'British Columbia (Colombie-Britannique)' },
  { code: 'CA-MB', name: 'Manitoba' },
  { code: 'CA-NB', name: 'New Brunswick (Nouveau-Brunswick)' },
  { code: 'CA-NL', name: 'Newfoundland and Labrador (Terre-Neuve)' },
  { code: 'CA-NS', name: 'Nova Scotia (Nouvelle-Écosse)' },
  { code: 'CA-ON', name: 'Ontario' },
  { code: 'CA-PE', name: 'Prince Edward Island (Île-du-Prince-Édouard)' },
  { code: 'CA-QC', name: 'Quebec (Québec)' },
  { code: 'CA-SK', name: 'Saskatchewan' },
  { code: 'CA-NT', name: 'Northwest Territories (Territoires du Nord-Ouest)' },
  { code: 'CA-NU', name: 'Nunavut' },
  { code: 'CA-YT', name: 'Yukon Territory (Teritoire du Yukon)' },
  // Chinese provinces
  { code: 'CN-34', name: 'Anhui' },
  { code: 'CN-11', name: 'Beijing' },
  { code: 'CN-50', name: 'Chongqing' },
  { code: 'CN-35', name: 'Fujian' },
  { code: 'CN-62', name: 'Gansu' },
  { code: 'CN-44', name: 'Guangdong' },
  { code: 'CN-45', name: 'Guangxi' },
  { code: 'CN-52', name: 'Guizhou' },
  { code: 'CN-46', name: 'Hainan' },
  { code: 'CN-13', name: 'Hebei' },
  { code: 'CN-23', name: 'Heilongjiang' },
  { code: 'CN-41', name: 'Henan' },
  { code: 'CN-91', name: 'Hong Kong' },
  { code: 'CN-42', name: 'Hubei' },
  { code: 'CN-43', name: 'Hunan' },
  { code: 'CN-32', name: 'Jiangsu' },
  { code: 'CN-36', name: 'Jiangxi' },
  { code: 'CN-22', name: 'Jilin' },
  { code: 'CN-21', name: 'Liaoning' },
  { code: 'CN-15', name: 'Nei Monggol' },
  { code: 'CN-64', name: 'Ningxia' },
  { code: 'CN-63', name: 'Qinghai' },
  { code: 'CN-61', name: 'Shaanxi' },
  { code: 'CN-37', name: 'Shandong' },
  { code: 'CN-31', name: 'Shanghai' },
  { code: 'CN-14', name: 'Shanxi' },
  { code: 'CN-51', name: 'Sichuan' },
  { code: 'CN-71', name: 'Taiwan' },
  { code: 'CN-12', name: 'Tianjin' },
  { code: 'CN-65', name: 'Xinjiang' },
  { code: 'CN-54', name: 'Xizang' },
  { code: 'CN-53', name: 'Yunnan' },
  { code: 'CN-33', name: 'Zhejiang' },
  // Australian states/territories
  { code: 'AU-NSW', name: 'New South Wales' },
  { code: 'AU-QLD', name: 'Queensland' },
  { code: 'AU-SA', name: 'South Australia' },
  { code: 'AU-TAS', name: 'Tasmania' },
  { code: 'AU-VIC', name: 'Victoria' },
  { code: 'AU-WA', name: 'Western Australia' },
  { code: 'AU-ACT', name: 'Australian Capital Territory' },
  { code: 'AU-NT', name: 'Northern Territory' }
];

@classic
export default class BillingInformation extends Transform {
  deserialize(serialized) {
    if (serialized) {
      return {
        city: serialized.city ? serialized.city : '',
        state: serialized.state
          ? stateList.find((state) => state.code === serialized.state)
          : {},
        postCode: serialized.postCode,
        department: serialized.department,
        address: serialized.address,
        organization: serialized.organization,
        country: serialized.country
          ? {
              code: serialized.country,
              name: countryList.name(serialized.country)
            }
          : {}
      };
    } else {
      return null;
    }
  }

  serialize(deserialized) {
    if (deserialized) {
      return {
        city: deserialized.city,
        state: deserialized.state ? deserialized.state.code : '',
        address: deserialized.address,
        postCode: deserialized.postCode,
        department: deserialized.department,
        organization: deserialized.organization,
        country: deserialized.country ? deserialized.country.code : ''
      };
    } else {
      return null;
    }
  }
}
