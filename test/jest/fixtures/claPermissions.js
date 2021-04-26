export default {
  'hasLoaded': true,
  'isPending': false,
  'failed': false,
  'records': [
    {
      'version': 'v1',
      'requestParameters': {
        'identifier': '0262012103',
        'identifierType': 'ISBN',
        'licenceType': '136',
        'messageId': '1619097915',
        'senderName': 'hux@firstorder.com',
        'usageTypes': '1,2',
        'htmlToggle': true
      },
      'metadata': {
        'manifestationId': '6258800',
        'title': 'A Semantic Web Primer',
        'identifier': '9780262012102',
        'identifierType': 'ISBN',
        'publicationType': 'Book',
        'publicationForm': 'Print',
        'publicationCountry': 'United Kingdom of Great Britain & N. Ireland',
        'publisher': 'MIT Press Limited',
        'contributor': [
          'ANTONIOU,GRIGORIS',
          'Van Harmelen, Frank'
        ]
      },
      'usagesSummary': [
        {
          'usageType': 'Photocopying',
          'reportType': 'Permitted',
          'header': {
            'title': 'Subject to defined extent limits, this title is covered by your CLA licence for the following uses:',
            'introduction': "<span class='ts-para'><span class=\"ts-para-InformationText\"></span> </span> <span class='ts-para'><span class=\"ts-para-InformationText\">Staff, students and visiting academics may:</span> </span>  "
          },
          'usageTypeId': '1',
          'usageDetails': [
            {
              'title': 'Photocopy extracts from paper originals',
              'reportType': 'Permitted'
            },
            {
              'title': 'Copy onto acetate',
              'reportType': 'Permitted'
            },
            {
              'title': 'Send by fax',
              'reportType': 'Permitted'
            },
            {
              'title': 'Send copies to overseas students, who may not make further copies under the licence',
              'reportType': 'Permitted'
            }
          ],
          'footer': {
            'restrictions': '',
            'terms': "<span class='ts-para'><span class=\"ts-para-ImportantText\">This text is intended for use as guidance only and not as a substitute for the CLA </span> <a class=\"ts-para-ImportantResource\" href=\"https://www.cla.co.uk/higher-education-licence-docs\">Licence Terms</a> <span class=\"ts-para-ImportantText\"> themselves, which should be read in full. In the event of conflict between the two, the Licence shall prevail.</span> </span> <span class='ts-para'><span class=\"ts-para-ImportantText\">For permissions not listed above, please contact the publisher direct.</span> </span>  "
          }
        },
        {
          'usageType': 'Scanning',
          'reportType': 'Permitted',
          'header': {
            'title': 'Subject to defined extent limits, this title is covered by your CLA licence for the following uses:',
            'introduction': "<span class='ts-para'><span class=\"ts-para-InformationText\"></span> </span> <span class='ts-para'><span class=\"ts-para-InformationText\">Designated Persons may:</span> </span>  "
          },
          'usageTypeId': '2',
          'usageDetails': [
            {
              'title': 'Scan extracts from paper originals',
              'reportType': 'Permitted'
            },
            {
              'title': 'Print paper copies',
              'reportType': 'Permitted'
            },
            {
              'title': 'Email scanned extracts',
              'reportType': 'Permitted'
            },
            {
              'title': 'Store scanned extracts on a Secure Network',
              'reportType': 'Permitted'
            },
            {
              'title': 'Use scanned extracts in PowerPoint presentations',
              'reportType': 'Permitted'
            },
            {
              'title': 'Send scanned extracts to overseas students, who may print a single copy',
              'reportType': 'Permitted'
            },
            {
              'title': 'Other uses specific to the CLA Higher Education Licence - see terms and conditions for details',
              'reportType': 'Permitted'
            }
          ],
          'footer': {
            'restrictions': '',
            'terms': "<span class='ts-para'><span class=\"ts-para-ImportantText\">This text is intended for use as guidance only and not as a substitute for the CLA </span> <a class=\"ts-para-ImportantResource\" href=\"https://www.cla.co.uk/higher-education-licence-docs\">Licence Terms</a> <span class=\"ts-para-ImportantText\"> themselves, which should be read in full. In the event of conflict between the two, the Licence shall prevail.</span> </span> <span class='ts-para'><span class=\"ts-para-ImportantText\">For permissions not listed above, please contact the publisher direct.</span> </span>  "
          }
        },
        {
          'usageType': 'Second extract permissions',
          'reportType': 'available',
          'header': {
            'title': '',
            'introduction': 'Second extract permissions allow customers to reuse an additional section of a published work.  <br />More information can be found <a href="https://www.cla.co.uk/second-extract-permissions" target="_blank">here</a>'
          },
          'usageTypeId': null,
          'usageDetails': null,
          'footer': {
            'restrictions': null,
            'terms': ''
          }
        }
      ]
    }
  ],
  'successfulMutations': [],
  'failedMutations': [],
  'pendingMutations': [],
  'loadedAt': '2021-04-22T13:38:24.857Z',
  'url': 'https://api.cla.co.uk/check-permissions/v1/GetPermissionByIdentifier/ISBN/0262012103/136?htmlToggle=true&messageId=1619097915&usageTypes=1%2C2',
  'headers': {},
  'httpStatus': 200,
  'other': {
    'totalRecords': null
  },
  'resource': 'claPermissions',
  'module': '@folio/inventory',
  'throwErrors': true
};
