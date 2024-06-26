const OECD_SCHEME = 'Fields of Science and Technology (FOS)';
const OECD_SCHEME_URI = 'http://www.oecd.org/science/inno/38235147.pdf';
const MAPPING = {
  mappingListVersion: '1.0',
  originalUrl:
    'https://www.dfg.de/en/dfg_profile/statutory_bodies/review_boards/subject_areas/index.jsp',
  dfgFields: [
    {
      dfgId: '101',
      dfgLabel: 'Ancient Cultures',
      fosId: '6.1',
      fosLabel: 'History and archaeology'
    },
    {
      dfgId: '101',
      dfgLabel: 'Ancient Cultures',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10101',
      dfgLabel: 'Prehistory',
      fosId: '6.1',
      fosLabel: 'History and archaeology'
    },
    {
      dfgId: '10102',
      dfgLabel: 'Classical Philology',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10103',
      dfgLabel: 'Ancient History',
      fosId: '6.1',
      fosLabel: 'History and archaeology'
    },
    {
      dfgId: '10104',
      dfgLabel: 'Classical Archaeology',
      fosId: '6.1',
      fosLabel: 'History and archaeology'
    },
    {
      dfgId: '10105',
      dfgLabel: 'Egyptology and Ancient Near Eastern Studies',
      fosId: '6.1',
      fosLabel: 'History and archaeology'
    },
    {
      dfgId: '102',
      dfgLabel: 'History',
      fosId: '6.1',
      fosLabel: 'History and archaeology'
    },
    {
      dfgId: '10201',
      dfgLabel: 'Medieval History',
      fosId: '6.1',
      fosLabel: 'History and archaeology'
    },
    {
      dfgId: '10202',
      dfgLabel: 'Early Modern History',
      fosId: '6.1',
      fosLabel: 'History and archaeology'
    },
    {
      dfgId: '10203',
      dfgLabel: 'Modern and Current History',
      fosId: '6.1',
      fosLabel: 'History and archaeology'
    },
    {
      dfgId: '10204',
      dfgLabel: 'History of Science',
      fosId: '6.3',
      fosLabel: 'Philosophy, ethics and religion'
    },
    {
      dfgId: '103',
      dfgLabel: 'Fine Arts, Music, Theatre and Media Studies',
      fosId: '6.4',
      fosLabel: 'Art (arts, history of arts, performing arts, music)'
    },
    {
      dfgId: '10301',
      dfgLabel: 'Art History',
      fosId: '6.4',
      fosLabel: 'Art (arts, history of arts, performing arts, music)'
    },
    {
      dfgId: '10302',
      dfgLabel: 'Musicology',
      fosId: '6.4',
      fosLabel: 'Art (arts, history of arts, performing arts, music)'
    },
    {
      dfgId: '10303',
      dfgLabel: 'Theatre and Media Studies',
      fosId: '6.4',
      fosLabel: 'Art (arts, history of arts, performing arts, music)'
    },
    {
      dfgId: '104',
      dfgLabel: 'Linguistics',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10401',
      dfgLabel: 'General and Applied Linguistics',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10402',
      dfgLabel: 'Individual Linguistics',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10403',
      dfgLabel: 'Typology, NonEuropean Languages, Historical Linguistics',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '105',
      dfgLabel: 'Literary Studies',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10501',
      dfgLabel: 'Medieval German Literature',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10502',
      dfgLabel: 'Modern German Literature',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10503',
      dfgLabel: 'European and American Literature',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10504',
      dfgLabel: 'General and Comparative Literature and Cultural Studies',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '106',
      dfgLabel:
        'NonEuropean Languages and Cultures, Social and Cultural Anthropology, Jewish Studies and Religious Studies',
      fosId: '6.3',
      fosLabel: 'Philosophy, ethics and religion'
    },
    {
      dfgId: '106',
      dfgLabel:
        'NonEuropean Languages and Cultures, Social and Cultural Anthropology, Jewish Studies and Religious Studies',
      fosId: '5.4',
      fosLabel: 'Sociology'
    },
    {
      dfgId: '106',
      dfgLabel:
        'NonEuropean Languages and Cultures, Social and Cultural Anthropology, Jewish Studies and Religious Studies',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10601',
      dfgLabel: 'Social and Cultural Anthropology and Ethnology/Folklore',
      fosId: '5.4',
      fosLabel: 'Sociology'
    },
    {
      dfgId: '10602',
      dfgLabel: 'Asian Studies',
      fosId: '6.5',
      fosLabel: 'Other humanities'
    },
    {
      dfgId: '10602',
      dfgLabel: 'Asian Studies',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10602',
      dfgLabel: 'Asian Studies',
      fosId: '5.4',
      fosLabel: 'Sociology'
    },
    {
      dfgId: '10603',
      dfgLabel: 'African, American and Oceania Studies',
      fosId: '6.5',
      fosLabel: 'Other humanities'
    },
    {
      dfgId: '10603',
      dfgLabel: 'African, American and Oceania Studies',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10603',
      dfgLabel: 'African, American and Oceania Studies',
      fosId: '5.4',
      fosLabel: 'Sociology'
    },
    {
      dfgId: '10604',
      dfgLabel: 'Islamic Studies, Arabian Studies, Semitic Studies',
      fosId: '6.3',
      fosLabel: 'Philosophy, ethics and religion'
    },
    {
      dfgId: '10604',
      dfgLabel: 'Islamic Studies, Arabian Studies, Semitic Studies',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10604',
      dfgLabel: 'Islamic Studies, Arabian Studies, Semitic Studies',
      fosId: '5.4',
      fosLabel: 'Sociology'
    },
    {
      dfgId: '10605',
      dfgLabel: 'Religious Studies and Jewish Studies',
      fosId: '6.3',
      fosLabel: 'Philosophy, ethics and religion'
    },
    {
      dfgId: '10605',
      dfgLabel: 'Religious Studies and Jewish Studies',
      fosId: '6.2',
      fosLabel: 'Languages and literature'
    },
    {
      dfgId: '10605',
      dfgLabel: 'Religious Studies and Jewish Studies',
      fosId: '5.4',
      fosLabel: 'Sociology'
    },
    {
      dfgId: '107',
      dfgLabel: 'Theology',
      fosId: '6.3',
      fosLabel: 'Philosophy, ethics and religion'
    },
    {
      dfgId: '10701',
      dfgLabel: 'Protestant Theology',
      fosId: '6.3',
      fosLabel: 'Philosophy, ethics and religion'
    },
    {
      dfgId: '10702',
      dfgLabel: 'Roman Catholic Theology',
      fosId: '6.3',
      fosLabel: 'Philosophy, ethics and religion'
    },
    {
      dfgId: '108',
      dfgLabel: 'Philosophy',
      fosId: '6.3',
      fosLabel: 'Philosophy, ethics and religion'
    },
    {
      dfgId: '10801',
      dfgLabel: 'History of Philosophy',
      fosId: '6.3',
      fosLabel: 'Philosophy, ethics and religion'
    },
    {
      dfgId: '10802',
      dfgLabel: 'Theoretical Philosophy',
      fosId: '6.3',
      fosLabel: 'Philosophy, ethics and religion'
    },
    {
      dfgId: '10803',
      dfgLabel: 'Practical Philosophy',
      fosId: '6.3',
      fosLabel: 'Philosophy, ethics and religion'
    },
    {
      dfgId: '109',
      dfgLabel: 'Education Sciences',
      fosId: '5.3',
      fosLabel: 'Educational sciences'
    },
    {
      dfgId: '10901',
      dfgLabel: 'General Education and History of Education',
      fosId: '5.3',
      fosLabel: 'Educational sciences'
    },
    {
      dfgId: '10902',
      dfgLabel: 'Research on Teaching, Learning, and Training',
      fosId: '5.3',
      fosLabel: 'Educational sciences'
    },
    {
      dfgId: '10903',
      dfgLabel:
        'Research on Socialization and Educational Institutions and Professions',
      fosId: '5.3',
      fosLabel: 'Educational sciences'
    },
    {
      dfgId: '110',
      dfgLabel: 'Psychology',
      fosId: '5.1',
      fosLabel: 'Psychology'
    },
    {
      dfgId: '11001',
      dfgLabel: 'General, Biological and Mathematical Psychology',
      fosId: '5.1',
      fosLabel: 'Psychology'
    },
    {
      dfgId: '11002',
      dfgLabel: 'Developmental and Educational Psychology',
      fosId: '5.1',
      fosLabel: 'Psychology'
    },
    {
      dfgId: '11002',
      dfgLabel: 'Developmental and Educational Psychology',
      fosId: '5.3',
      fosLabel: 'Educational sciences'
    },
    {
      dfgId: '11003',
      dfgLabel: 'Social Psychology, Industrial and Organisational Psychology',
      fosId: '5.1',
      fosLabel: 'Psychology'
    },
    {
      dfgId: '11004',
      dfgLabel:
        'Differential Psychology, Clinical Psychology, Medical Psychology, Methodology',
      fosId: '5.1',
      fosLabel: 'Psychology'
    },
    {
      dfgId: '111',
      dfgLabel: 'Social Sciences',
      fosId: '5',
      fosLabel: 'Social sciences'
    },
    {
      dfgId: '11101',
      dfgLabel: 'Sociological Theory',
      fosId: '5.4',
      fosLabel: 'Sociology'
    },
    {
      dfgId: '11102',
      dfgLabel: 'Empirical Social Research',
      fosId: '5.4',
      fosLabel: 'Sociology'
    },
    {
      dfgId: '11102',
      dfgLabel: 'Empirical Social Research',
      fosId: '5.9',
      fosLabel: 'Other social sciences'
    },
    {
      dfgId: '11103',
      dfgLabel: 'Communication Sciences',
      fosId: '5.8',
      fosLabel: 'Media and communications'
    },
    {
      dfgId: '11104',
      dfgLabel: 'Political Science',
      fosId: '5.6',
      fosLabel: 'Political Science'
    },
    {
      dfgId: '112',
      dfgLabel: 'Economics',
      fosId: '5.2',
      fosLabel: 'Economics and business'
    },
    {
      dfgId: '11201',
      dfgLabel: 'Economic Theory',
      fosId: '5.2',
      fosLabel: 'Economics and business'
    },
    {
      dfgId: '11202',
      dfgLabel: 'Economic and Social Policy',
      fosId: '5.2',
      fosLabel: 'Economics and business'
    },
    {
      dfgId: '11203',
      dfgLabel: 'Public Finance',
      fosId: '5.6',
      fosLabel: 'Political Science'
    },
    {
      dfgId: '11203',
      dfgLabel: 'Public Finance',
      fosId: '5.2',
      fosLabel: 'Economics and business'
    },
    {
      dfgId: '11204',
      dfgLabel: 'Business Administration',
      fosId: '5.2',
      fosLabel: 'Economics and business'
    },
    {
      dfgId: '11205',
      dfgLabel: 'Statistics and Econometrics',
      fosId: '5.2',
      fosLabel: 'Economics and business'
    },
    {
      dfgId: '11206',
      dfgLabel: 'Economic and Social History',
      fosId: '5.2',
      fosLabel: 'Economics and business'
    },
    {
      dfgId: '113',
      dfgLabel: 'Jurisprudence',
      fosId: '5.5',
      fosLabel: 'Law'
    },
    {
      dfgId: '11301',
      dfgLabel: 'Legal and Political Philosophy, Legal History, Legal Theory',
      fosId: '5.5',
      fosLabel: 'Law'
    },
    {
      dfgId: '11302',
      dfgLabel: 'Private Law',
      fosId: '5.5',
      fosLabel: 'Law'
    },
    {
      dfgId: '11303',
      dfgLabel: 'Public Law',
      fosId: '5.5',
      fosLabel: 'Law'
    },
    {
      dfgId: '11304',
      dfgLabel: 'Criminal Law and Law of Criminal Procedure',
      fosId: '5.5',
      fosLabel: 'Law'
    },
    {
      dfgId: '11305',
      dfgLabel: 'Criminology',
      fosId: '5.5',
      fosLabel: 'Law'
    },
    {
      dfgId: '201',
      dfgLabel: 'Basic Biological and Medical Research',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20101',
      dfgLabel: 'Biochemistry',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20102',
      dfgLabel: 'Biophysics',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20103',
      dfgLabel: 'Cell Biology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20104',
      dfgLabel: 'Structural Biology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20105',
      dfgLabel: 'General Genetics',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20106',
      dfgLabel: 'Developmental Biology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20107',
      dfgLabel: 'Bioinformatics and Theoretical Biology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20107',
      dfgLabel: 'Bioinformatics and Theoretical Biology',
      fosId: '1.2',
      fosLabel: 'Computer and information sciences'
    },
    {
      dfgId: '20108',
      dfgLabel: 'Anatomy',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20108',
      dfgLabel: 'Anatomy',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '202',
      dfgLabel: 'Plant Sciences',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20201',
      dfgLabel: 'Plant Systematics and Evolution',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20202',
      dfgLabel: 'Plant Ecology and Ecosystem Analysis',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20203',
      dfgLabel: 'Interorganismic Interactions of Plants',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20204',
      dfgLabel: 'Plant Physiology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20205',
      dfgLabel: 'Plant Biochemistry and Biophysics',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20206',
      dfgLabel: 'Plant Cell and Developmental Biology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20207',
      dfgLabel: 'Â Plant Genetics',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '203',
      dfgLabel: 'Zoology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20301',
      dfgLabel: 'Systematics and Morphology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20302',
      dfgLabel: 'Evolution, Anthropology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20303',
      dfgLabel: 'Animal Ecology, Biodiversity and Ecosystem Research',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20304',
      dfgLabel: 'Sensory and Behavioural Biology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20305',
      dfgLabel: 'Biochemistry and Animal Physiology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20306',
      dfgLabel: 'Animal Genetics, Cell and Developmental Biology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '204',
      dfgLabel: 'Microbiology, Virology and Immunology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '204',
      dfgLabel: 'Microbiology, Virology and Immunology',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '204',
      dfgLabel: 'Microbiology, Virology and Immunology',
      fosId: '3.3',
      fosLabel: 'Health sciences'
    },
    {
      dfgId: '20401',
      dfgLabel: 'Metabolism, Biochemistry and Genetics of Microorganisms',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20402',
      dfgLabel: 'Microbial Ecology and Applied Microbiology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20403',
      dfgLabel: 'Medical Microbiology, Molecular Infection Biology',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20403',
      dfgLabel: 'Medical Microbiology, Molecular Infection Biology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20404',
      dfgLabel: 'Virology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20405',
      dfgLabel: 'Immunology',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '205',
      dfgLabel: 'Medicine',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '205',
      dfgLabel: 'Medicine',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20501',
      dfgLabel: 'Epidemiology, Medical Biometry, Medical Informatics',
      fosId: '3.3',
      fosLabel: 'Health sciences'
    },
    {
      dfgId: '20501',
      dfgLabel: 'Epidemiology, Medical Biometry, Medical Informatics',
      fosId: '1.2',
      fosLabel: 'Computer and information sciences'
    },
    {
      dfgId: '20502',
      dfgLabel: 'Public Health, Health Services Research, Social Medicine',
      fosId: '3.3',
      fosLabel: 'Health sciences'
    },
    {
      dfgId: '20503',
      dfgLabel: 'Human Genetics',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20503',
      dfgLabel: 'Human Genetics',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20504',
      dfgLabel: 'Physiology',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20505',
      dfgLabel: 'Nutritional Sciences',
      fosId: '3.3',
      fosLabel: 'Health sciences'
    },
    {
      dfgId: '20506',
      dfgLabel: 'Pathology and Forensic Medicine',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20506',
      dfgLabel: 'Pathology and Forensic Medicine',
      fosId: '3.5',
      fosLabel: 'Other medical sciences'
    },
    {
      dfgId: '20507',
      dfgLabel: 'Clinical Chemistry and Pathobiochemistry',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20507',
      dfgLabel: 'Clinical Chemistry and Pathobiochemistry',
      fosId: '2.6',
      fosLabel: 'Medical engineering'
    },
    {
      dfgId: '20508',
      dfgLabel: 'Pharmacy',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20509',
      dfgLabel: 'Pharmacology',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20510',
      dfgLabel: 'Toxicology and Occupational Medicine',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20511',
      dfgLabel: 'Anaesthesiology',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20512',
      dfgLabel: 'Cardiology, Angiology',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20513',
      dfgLabel: 'Pneumology, Clinical Infectiology, Intensive Care Medicine',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20514',
      dfgLabel: 'Hematology, Oncology, Transfusion Medicine',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20515',
      dfgLabel: 'Gastroenterology, Metabolism',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20516',
      dfgLabel: 'Nephrology',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20517',
      dfgLabel: 'Endocrinology, Diabetology',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20518',
      dfgLabel: 'Rheumatology, Clinical Immunology, Allergology',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20519',
      dfgLabel: 'Dermatology',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20520',
      dfgLabel: 'Pediatric and Adolescent Medicine',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20521',
      dfgLabel: 'Gynaecology and Obstetrics',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20522',
      dfgLabel: 'Reproductive Medicine/Biology',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20522',
      dfgLabel: 'Reproductive Medicine/Biology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20523',
      dfgLabel: 'Urology',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20524',
      dfgLabel: 'Gerontology and Geriatric Medicine',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20525',
      dfgLabel: 'Vascular and Visceral Surgery',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20526',
      dfgLabel: 'Cardiothoracic Surgery',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20527',
      dfgLabel: 'Traumatology and Orthopaedics',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20528',
      dfgLabel: 'Dentistry, Oral Surgery',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20529',
      dfgLabel: 'Otolaryngology',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20530',
      dfgLabel: 'Radiology and Nuclear Medicine',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20531',
      dfgLabel: 'Radiation Oncology and Radiobiology',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20532',
      dfgLabel: 'Biomedical Technology and Medical Physics',
      fosId: '3.4',
      fosLabel: 'Health biotechnology'
    },
    {
      dfgId: '206',
      dfgLabel: 'Neurosciences',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '206',
      dfgLabel: 'Neurosciences',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20601',
      dfgLabel: 'Molecular Neuroscience and Neurogenetics',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20601',
      dfgLabel: 'Molecular Neuroscience and Neurogenetics',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20602',
      dfgLabel: 'Cellular Neuroscience',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20602',
      dfgLabel: 'Cellular Neuroscience',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20603',
      dfgLabel: 'Developmental Neurobiology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20604',
      dfgLabel: 'Systemic Neuroscience, Computational Neuroscience, Behaviour',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20604',
      dfgLabel: 'Systemic Neuroscience, Computational Neuroscience, Behaviour',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20604',
      dfgLabel: 'Systemic Neuroscience, Computational Neuroscience, Behaviour',
      fosId: '1.2',
      fosLabel: 'Computer and information sciences'
    },
    {
      dfgId: '20605',
      dfgLabel: 'Comparative Neurobiology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20605',
      dfgLabel: 'Comparative Neurobiology',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20606',
      dfgLabel: 'Cognitive Neuroscience and Neuroimaging',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20606',
      dfgLabel: 'Cognitive Neuroscience and Neuroimaging',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20606',
      dfgLabel: 'Cognitive Neuroscience and Neuroimaging',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20607',
      dfgLabel: 'Molecular Neurology',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20607',
      dfgLabel: 'Molecular Neurology',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '20608',
      dfgLabel: 'Clinical Neurosciences I Neurology, Neurosurgery',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20609',
      dfgLabel: 'Biological Psychiatry',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20609',
      dfgLabel: 'Biological Psychiatry',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20610',
      dfgLabel:
        'Clinical Neurosciences II Psychiatry, Psychotherapy, Psychosomatic Medicine',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '20611',
      dfgLabel: 'Clinical Neurosciences III Ophthalmology',
      fosId: '3.2',
      fosLabel: 'Clinical medicine'
    },
    {
      dfgId: '207',
      dfgLabel: 'Agriculture, Forestry, Horticulture and Veterinary Medicine',
      fosId: '4.1',
      fosLabel: 'Agriculture, forestry, and fisheries'
    },
    {
      dfgId: '20701',
      dfgLabel: 'Soil Sciences',
      fosId: '4.1',
      fosLabel: 'Agriculture, forestry, and fisheries'
    },
    {
      dfgId: '20702',
      dfgLabel: 'Plant Cultivation',
      fosId: '4.1',
      fosLabel: 'Agriculture, forestry, and fisheries'
    },
    {
      dfgId: '20703',
      dfgLabel: 'Plant Nutrition',
      fosId: '4.1',
      fosLabel: 'Agriculture, forestry, and fisheries'
    },
    {
      dfgId: '20704',
      dfgLabel: 'Ecology of Agricultural Landscapes',
      fosId: '4.5',
      fosLabel: 'Other agricultural sciences'
    },
    {
      dfgId: '20705',
      dfgLabel: 'Plant Breeding',
      fosId: '4.1',
      fosLabel: 'Agriculture, forestry, and fisheries'
    },
    {
      dfgId: '20706',
      dfgLabel: 'Phytomedicine',
      fosId: '3.1',
      fosLabel: 'Basic medicine'
    },
    {
      dfgId: '20707',
      dfgLabel: 'Agricultural and Food Process Engineering',
      fosId: '2.11',
      fosLabel: 'Other engineering and technologies'
    },
    {
      dfgId: '20708',
      dfgLabel: 'Agricultural Economics and Sociology',
      fosId: '4.5',
      fosLabel: 'Other agricultural sciences'
    },
    {
      dfgId: '20709',
      dfgLabel: 'Inventory, Control and Use of Forest Resources',
      fosId: '4.1',
      fosLabel: 'Agriculture, forestry, and fisheries'
    },
    {
      dfgId: '20710',
      dfgLabel: 'Basic Forest Research',
      fosId: '4.1',
      fosLabel: 'Agriculture, forestry, and fisheries'
    },
    {
      dfgId: '20711',
      dfgLabel: 'Animal Husbandry, Breeding and Hygiene',
      fosId: '4.2',
      fosLabel: 'Animal and dairy science'
    },
    {
      dfgId: '20712',
      dfgLabel: 'Animal Nutrition and Nutrition Physiology',
      fosId: '4.2',
      fosLabel: 'Animal and dairy science'
    },
    {
      dfgId: '20713',
      dfgLabel: 'Basic Veterinary Medical Science',
      fosId: '4.3',
      fosLabel: 'Veterinary science'
    },
    {
      dfgId: '20714',
      dfgLabel:
        'Basic Research on Pathogenesis, Diagnostics and Therapy and Clinical Veterinary Medicine',
      fosId: '4.3',
      fosLabel: 'Veterinary science'
    },
    {
      dfgId: '301',
      dfgLabel: 'Molecular Chemistry',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '30101',
      dfgLabel: 'Inorganic Molecular Chemistry',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '30102',
      dfgLabel: 'Organic Molecular Chemistry',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '302',
      dfgLabel: 'Chemical Solid State and Surface Research',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '30201',
      dfgLabel: 'Solid State and Surface Chemistry, Material Synthesis',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '30201',
      dfgLabel: 'Solid State and Surface Chemistry, Material Synthesis',
      fosId: '2.4',
      fosLabel: 'Chemical engineering'
    },
    {
      dfgId: '30202',
      dfgLabel:
        'Physical Chemistry of Solids and Surfaces, Material Characterisation',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '30203',
      dfgLabel: 'Theory and Modelling',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '303',
      dfgLabel: 'Physical and Theoretical Chemistry',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '30301',
      dfgLabel:
        'Physical Chemistry of Molecules, Interfaces and Liquids Spectroscopy, Kinetics',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '30302',
      dfgLabel: 'General Theoretical Chemistry',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '304',
      dfgLabel: 'Analytical Chemistry, Method Development (Chemistry)',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '30401',
      dfgLabel: 'Analytical Chemistry, Method Development (Chemistry)',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '305',
      dfgLabel: 'Biological Chemistry and Food Chemistry',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '305',
      dfgLabel: 'Biological Chemistry and Food Chemistry',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '30501',
      dfgLabel: 'Biological and Biomimetic Chemistry',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '30501',
      dfgLabel: 'Biological and Biomimetic Chemistry',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '30502',
      dfgLabel: 'Food Chemistry',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '30502',
      dfgLabel: 'Food Chemistry',
      fosId: '1.6',
      fosLabel: 'Biological sciences'
    },
    {
      dfgId: '306',
      dfgLabel: 'Polymer Research',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '30601',
      dfgLabel: 'Preparatory and Physical Chemistry of Polymers',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '30602',
      dfgLabel: 'Experimental and Theoretical Physics of Polymers',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '30603',
      dfgLabel: 'Polymer Materials',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '30603',
      dfgLabel: 'Polymer Materials',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '307',
      dfgLabel: 'Condensed Matter Physics',
      fosId: '1.3',
      fosLabel: 'Physical sciences'
    },
    {
      dfgId: '30701',
      dfgLabel: 'Experimental Condensed Matter Physics',
      fosId: '1.3',
      fosLabel: 'Physical sciences'
    },
    {
      dfgId: '30702',
      dfgLabel: 'Theoretical Condensed Matter Physics',
      fosId: '1.3',
      fosLabel: 'Physical sciences'
    },
    {
      dfgId: '308',
      dfgLabel:
        'Optics, Quantum Optics and Physics of Atoms, Molecules and Plasmas',
      fosId: '1.3',
      fosLabel: 'Physical sciences'
    },
    {
      dfgId: '30801',
      dfgLabel: 'Optics, Quantum Optics, Atoms, Molecules, Plasmas',
      fosId: '1.3',
      fosLabel: 'Physical sciences'
    },
    {
      dfgId: '309',
      dfgLabel: 'Particles, Nuclei and Fields',
      fosId: '1.3',
      fosLabel: 'Physical sciences'
    },
    {
      dfgId: '30901',
      dfgLabel: 'Particles, Nuclei and Fields',
      fosId: '1.3',
      fosLabel: 'Physical sciences'
    },
    {
      dfgId: '310',
      dfgLabel:
        'Statistical Physics, Soft Matter, Biological Physics, Nonlinear Dynamics',
      fosId: '1.3',
      fosLabel: 'Physical sciences'
    },
    {
      dfgId: '310',
      dfgLabel:
        'Statistical Physics, Soft Matter, Biological Physics, Nonlinear Dynamics',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '31001',
      dfgLabel:
        'Statistical Physics, Soft Matter, Biological Physics, Nonlinear Dynamics',
      fosId: '1.3',
      fosLabel: 'Physical sciences'
    },
    {
      dfgId: '31001',
      dfgLabel:
        'Statistical Physics, Soft Matter, Biological Physics, Nonlinear Dynamics',
      fosId: '1.4',
      fosLabel: 'Chemical sciences'
    },
    {
      dfgId: '311',
      dfgLabel: 'Astrophysics and Astronomy',
      fosId: '1.3',
      fosLabel: 'Physical sciences'
    },
    {
      dfgId: '31101',
      dfgLabel: 'Astrophysics and Astronomy',
      fosId: '1.3',
      fosLabel: 'Physical sciences'
    },
    {
      dfgId: '312',
      dfgLabel: 'Mathematics',
      fosId: '1.1',
      fosLabel: 'Mathematics'
    },
    {
      dfgId: '31201',
      dfgLabel: 'Mathematics',
      fosId: '1.1',
      fosLabel: 'Mathematics'
    },
    {
      dfgId: '313',
      dfgLabel: 'Atmospheric Science and Oceanography',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '31301',
      dfgLabel: 'Atmospheric Science',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '31302',
      dfgLabel: 'Oceanography',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '314',
      dfgLabel: 'Geology and Palaeontology',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '31401',
      dfgLabel: 'Geology and Palaeontology',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '315',
      dfgLabel: 'Geophysics and Geodesy',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '31501',
      dfgLabel: 'Geophysics',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '31502',
      dfgLabel:
        'Geodesy, Photogrammetry, Remote Sensing, Geoinformatics, Cartography',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '31502',
      dfgLabel:
        'Geodesy, Photogrammetry, Remote Sensing, Geoinformatics, Cartography',
      fosId: '2.7',
      fosLabel: 'Environmental engineering'
    },
    {
      dfgId: '31502',
      dfgLabel:
        'Geodesy, Photogrammetry, Remote Sensing, Geoinformatics, Cartography',
      fosId: '1.2',
      fosLabel: 'Computer and information sciences'
    },
    {
      dfgId: '316',
      dfgLabel: 'Geochemistry, Mineralogy and Crystallography',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '31601',
      dfgLabel: 'Geochemistry, Mineralogy and Crystallography',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '317',
      dfgLabel: 'Geography',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '317',
      dfgLabel: 'Geography',
      fosId: '5.7',
      fosLabel: 'Social and economic geography'
    },
    {
      dfgId: '31701',
      dfgLabel: 'Physical Geography',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '31702',
      dfgLabel: 'Human Geography',
      fosId: '5.7',
      fosLabel: 'Social and economic geography'
    },
    {
      dfgId: '318',
      dfgLabel: 'Water Research',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '31801',
      dfgLabel:
        'Hydrogeology, Hydrology, Limnology, Urban Water Management, Water Chemistry, Integrated Water Resources',
      fosId: '1.5',
      fosLabel: 'Earth and related environmental sciences'
    },
    {
      dfgId: '401',
      dfgLabel: 'Production Technology',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '401',
      dfgLabel: 'Production Technology',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '40101',
      dfgLabel: 'MetalCutting Manufacturing Engineering',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40102',
      dfgLabel: 'Primary Shaping and Reshaping Technology',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40103',
      dfgLabel: 'Micro, Precision, Mounting, Joining, Separation Technology',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40104',
      dfgLabel: 'Plastics Engineering',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '40105',
      dfgLabel:
        'Production Automation, Factory Operation, Operations Management',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40105',
      dfgLabel:
        'Production Automation, Factory Operation, Operations Management',
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, Electronic engineering, Information engineering'
    },
    {
      dfgId: '402',
      dfgLabel: 'Mechanics and Constructive Mechanical Engineering',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40201',
      dfgLabel: 'Construction, Machine Elements',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40202',
      dfgLabel: 'Mechanics',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40203',
      dfgLabel: 'Lightweight Construction, Textile Technology',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '40204',
      dfgLabel: 'Acoustics',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40204',
      dfgLabel: 'Acoustics',
      fosId: '1.3',
      fosLabel: 'Physical sciences'
    },
    {
      dfgId: '403',
      dfgLabel: 'Process Engineering, Technical Chemistry',
      fosId: '2.4',
      fosLabel: 'Chemical engineering'
    },
    {
      dfgId: '40301',
      dfgLabel: 'Chemical and Thermal Process Engineering',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40301',
      dfgLabel: 'Chemical and Thermal Process Engineering',
      fosId: '2.4',
      fosLabel: 'Chemical engineering'
    },
    {
      dfgId: '40302',
      dfgLabel: 'Technical Chemistry',
      fosId: '2.4',
      fosLabel: 'Chemical engineering'
    },
    {
      dfgId: '40303',
      dfgLabel: 'Mechanical Process Engineering',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40304',
      dfgLabel: 'Biological Process Engineering',
      fosId: '2.9',
      fosLabel: 'Industrial biotechnology'
    },
    {
      dfgId: '404',
      dfgLabel: 'Heat Energy Technology, Thermal Machines, Fluid Mechanics',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40401',
      dfgLabel: 'Energy Process Engineering',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40402',
      dfgLabel: 'Technical Thermodynamics',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40403',
      dfgLabel: 'Fluid Mechanics',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '40404',
      dfgLabel: 'Hydraulic and Turbo Engines and Piston Engines',
      fosId: '2.3',
      fosLabel: 'Mechanical engineering'
    },
    {
      dfgId: '405',
      dfgLabel: 'Materials Engineering',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '40501',
      dfgLabel:
        'Metallurgical and Thermal Processes, Thermomechanical Treatment of Materials',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '40502',
      dfgLabel: 'Sintered Metallic and Ceramic Materials',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '40503',
      dfgLabel: 'Composite Materials',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '40504',
      dfgLabel: 'Mechanical Behaviour of Construction Materials',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '40505',
      dfgLabel: 'Coating and Surface Technology',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '406',
      dfgLabel: 'Materials Science',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '40601',
      dfgLabel: 'Thermodynamics and Kinetics of Materials',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '40602',
      dfgLabel: 'Synthesis and Properties of Functional Materials',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '40603',
      dfgLabel: 'Microstructural Mechanical Properties of Materials',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '40604',
      dfgLabel: 'Structuring and Functionalisation',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '40605',
      dfgLabel: 'Biomaterials',
      fosId: '2.9',
      fosLabel: 'Industrial Biotechnology'
    },
    {
      dfgId: '407',
      dfgLabel: 'Systems Engineering',
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, electronic engineering, information engineering'
    },
    {
      dfgId: '40701',
      dfgLabel: 'Automation, Control Systems, Robotics, Mechatronics',
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, electronic engineering, information engineering'
    },
    {
      dfgId: '40702',
      dfgLabel: 'Measurement Systems',
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, electronic engineering, information engineering'
    },
    {
      dfgId: '40703',
      dfgLabel: 'Microsystems',
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, electronic engineering, information engineering'
    },
    {
      dfgId: '40704',
      dfgLabel: 'Traffic and Transport Systems, Logistics',
      fosId: '2.1',
      fosLabel: 'Civil engineering'
    },
    {
      dfgId: '40704',
      dfgLabel: 'Traffic and Transport Systems, Logistics',
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, electronic engineering, information engineering'
    },
    {
      dfgId: '40705',
      dfgLabel: 'Human Factors, Ergonomics, HumanMachine Systems',
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, electronic engineering, information engineering'
    },
    {
      dfgId: '408',
      dfgLabel: 'Electrical Engineering',
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, electronic engineering, information engineering'
    },
    {
      dfgId: '40801',
      dfgLabel: 'Electronic Semiconductors, Components, Circuits, Systems',
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, electronic engineering, information engineering'
    },
    {
      dfgId: '40802',
      dfgLabel:
        'Communications, HighFrequency and Network Technology, Theoretical Electrical Engineering',
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, electronic engineering, information engineering'
    },
    {
      dfgId: '40803',
      dfgLabel: 'Electrical Energy Generation, Distribution, Application',
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, electronic engineering, information engineering'
    },
    {
      dfgId: '409',
      dfgLabel: 'Computer Science',
      fosId: '1.2',
      fosLabel: 'Computer and information sciences'
    },
    {
      dfgId: '409',
      dfgLabel: 'Computer Science',
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, electronic engineering, information engineering'
    },
    {
      dfgId: '40901',
      dfgLabel: 'Theoretical Computer Science',
      fosId: '1.2',
      fosLabel: 'Computer and information sciences'
    },
    {
      dfgId: '40902',
      dfgLabel: 'Software Technology',
      fosId: '1.2',
      fosLabel: 'Computer and information sciences'
    },
    {
      dfgId: '40903',
      dfgLabel: 'Operating, Communication and Information Systems',
      fosId: '1.2',
      fosLabel: 'Computer and information sciences'
    },
    {
      dfgId: '40904',
      dfgLabel: 'Artificial Intelligence, Image and Language Processing',
      fosId: '1.2',
      fosLabel: 'Computer and information sciences'
    },
    {
      dfgId: '40905',
      dfgLabel: 'Computer Architecture and Embedded Systems',
      fosId: '2.2',
      fosLabel:
        'Electrical engineering, electronic engineering, information engineering'
    },
    {
      dfgId: '410',
      dfgLabel: 'Construction Engineering and Architecture',
      fosId: '2.1',
      fosLabel: 'Civil engineering'
    },
    {
      dfgId: '41001',
      dfgLabel:
        'Architecture, Building and Construction History, Sustainable Building Technology, Building Design',
      fosId: '2.1',
      fosLabel: 'Civil engineering'
    },
    {
      dfgId: '41002',
      dfgLabel:
        'Urbanism, Spatial Planning, Transportation and Infrastructure Planning, Landscape Planning',
      fosId: '2.7',
      fosLabel: 'Environmental engineering'
    },
    {
      dfgId: '41002',
      dfgLabel:
        'Urbanism, Spatial Planning, Transportation and Infrastructure Planning, Landscape Planning',
      fosId: '5.7',
      fosLabel: 'Social and economic geography'
    },
    {
      dfgId: '41003',
      dfgLabel: 'Construction Material Sciences, Chemistry, Building Physics',
      fosId: '2.1',
      fosLabel: 'Civil engineering'
    },
    {
      dfgId: '41003',
      dfgLabel: 'Construction Material Sciences, Chemistry, Building Physics',
      fosId: '2.5',
      fosLabel: 'Materials engineering'
    },
    {
      dfgId: '41004',
      dfgLabel:
        'Structural Engineering, Building Informatics, Construction Operation',
      fosId: '2.1',
      fosLabel: 'Civil engineering'
    },
    {
      dfgId: '41005',
      dfgLabel: 'Applied Mechanics, Statics and Dynamics',
      fosId: '2.1',
      fosLabel: 'Civil engineering'
    },
    {
      dfgId: '41006',
      dfgLabel: 'Geotechnics, Hydraulic Engineering',
      fosId: '2.7',
      fosLabel: 'Environmental engineering'
    }
  ]
};

export default {
  data: MAPPING,
  findByIds: function (ids) {
    let subjects = this.data.dfgFields.filter((subject) => {
      return ids.includes(subject.dfgId);
    });
    let unique_subjects = [
      ...new Map(
        subjects.map((subject) => [subject['fosId'], subject])
      ).values()
    ];

    return unique_subjects.map((subject) => {
      return {
        subject: subject.fosLabel,
        subjectScheme: OECD_SCHEME,
        schemeUri: OECD_SCHEME_URI,
        classificationCode: subject.fosId
      };
    });
  }
};
