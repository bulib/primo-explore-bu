export const sample_list_of_updates = [
  {
    "id":"hathitrust-availability",
    "title":"Hathi Trust Availability ETAS",
    "description":"the hathitrust emergency temporary access service (ETAS) allows online reading access to selected materials",
    "icon":{"code":"mediation","group":"action"},
    "template":`
      <h3>About the HathiTrust Emergency Temporary Access Service (ETAS)</h3>
      <p>The HathiTrust Emergency Temporary Access Service (ETAS) allows current BU students, faculty, and staff to have <strong>online reading access to selected materials that are in the BU Libraries but are currently unavailable due to the closure of the Libraries</strong>.</p>
      <p>Faculty, students, and staff can access these materials via <a href="http://library.bu.edu/buls">BU Libraries Search</a>. Physical books in BU Libraries that are also available via HathiTrust will have a “<strong>Full Text Available at HathiTrust</strong>” link included in their records in BU Libraries Search.</p>
      <p class="big-text"><strong>Access to these books is a multi-step process. Please follow the steps outlined below to read the books online.</strong></p>
      <h3>How to Access Books via HathiTrust</h3>
      <p>
        Faculty, students, and staff can access these materials via BU Libraries Search. Physical books in BU Libraries that are also available via 
        HathiTrust will have a “<strong>Full Text Available at HathiTrust</strong>” link included in their records in BU Libraries Search. 
        <em>(Note: This link will also be shown for out-of-copyright items; for those items the link will take you directly to the item without having to follow the steps below.)</em>
      </p>
    `
  },
  {
    "id":"visiting-the-libraries",
    "title":"Visiting the Libraries",
    "description":"discussion of covid-related changes to bu libraries operation",
    "icon":{"code":"business","group":"communication"},
    "template":`
      <h2>Try Online First</h2>
      <p>
        Our building capacity has been significantly reduced to comply with public health guidelines. To avoid long waits, try connecting with us online 
        before you come to our physical locations. We have expanded our online service delivery and may be able to help you without a visit to one of our branches. 
      </p>
    `
  }
];
export const sample_list_of_elements = [
  {
    "id":"getting-started",
    "title":"Getting Started",
    "description":"brief static html content with an overview on how to use BULS; links to direct to main BULS help page in WordPress, other pages, and/or other sections of the menu",
    "icon":{"code":"description","group":"action"},
    "template":`
      <p>BU Libraries Search contains articles, books, journals, databases, films, music, dissertations, and other scholarly materials for your research</p>
      <h2>Search Tips</h2>
      <code>brief info about title or subject keyword searches</code>
      <br /><br />
      <h2>Filtering</h2>
      <p>Use the filters to limit to one or more material types (books, articles)</p>
      <p>Use Peer-Reviewed Articles to quickly limit to only these results...</p>
    `
  },
  {
    "id":"tutorials",
    "title":"Tutorials",
    "description":"at a minimum, links to individual videos and a playlist of existing BULS video tutorials (tbd if in Kaltura, WordPress, or youtube); if possible and desired, embed using Kaltura embed code",
    "icon":{"code":"shop_two","group":"action"},
  },
  {}, // DIVIDER, // search-specific
  {
    "id":"whats-in-search",
    "title":"What's in Search?",
    "description":`brief description of material types, "scopes", and collections; may have submenus for each of the above; likely also link out to WordPress page with all PCI collections`,
    "icon":{"code":"toc","group":"action"}
  },
  {
    "id":"didnt-find",
    "title":"Didn't find it?",
    "description":`TBD info about ILL, scope of collections, and problem cases`,
    "icon":{"code":"swap_horiz","group":"action"},
  },
  {}, //DIVIDER, // conceptual 
  {
    "id":"guides",
    "title":"Guides",
    "description":`info about research, subject, course, and how to guides; how to find in BULS by way of search and related more info links; link out to LibGuides home`,
    "icon":{"code":"directions","group":"maps"}
  },
  {
    "id":"glossary",
    "title":"Glossary",
    "description":"list of common terms (jargon) and definitions",
    "icon":{"code":"view_list","group":"action"}
  },
  {}, //DIVIDER, 
  {
    "id":"query-builder",
    "title":"Query Builder",
    "description":`placeholder for this, tbd functionality for future development; interim step may just be to have text demonstrating adv query syntax`,
    "icon":{"code":"find_in_page","group":"action"}
  }, 
  {}, //DIVIDER, Search Help
  {
    "id":"saving-results",
    "title":"Saving Results",
    "description":"information about My Favorites, exporting results, ref managers",
    "icon":{"code":"save","group":"content"}    
  },
  {
    "id":"citing-sources",
    "title":"Citing Sources",
    "description":"likely, but may depend on if including saving results; would have info about ref managers",
    "icon":{"code":"create","group":"content"}
  },
  {
    "id":"account",
    "title":"Account",
    "description":"information about My Library Account functionality- loans, renewals, policies?; may also highlight or link to My Library Account",
    "icon":{"code":"account_box","group":"action"}
  },
  {}, //DIVIDER,
  {
    "id":"for-instructors",
    "title":"For Instructors",
    "description":`may be more "For" sections; will need considerable content work`,
    "icon":{"code":"info","group":"action"},
  },
  {}, //DIVIDER, communication
  {
    "id":"ask-us",
    "title":"Ask Us",
    "description":"needs definition; how to point to chat? link to ask a librarian?",
    "icon":{"code":"forum","group":"communication"}
  },
  {
    "id":"feedback",
    "title":"Feedback",
    "description":`directs to a new form to send feedback in the format of specific questions, e.g. "rate your experience", "did you find what you're looking for?", "send us your thoughts on improving search"; will want to clearly differentiate from Ask and reference help, so that patrons who need help soon can get it`,
    "icon":{"code":"chat","group":"communication"}
  }
];