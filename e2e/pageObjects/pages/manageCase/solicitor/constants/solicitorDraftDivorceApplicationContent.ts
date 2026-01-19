// Shared test data to eliminate duplication
const SharedValues = {
  // Applicant 1 details
  applicant1FirstName: "ApplicantOne First",
  applicant1MiddleName: "ApplicantOne Middle",
  applicant1LastName: "ApplicantOne Last",
  applicant1Email: "pwapplicant1testingsolcase67890@mailinator.com",
  applicant1PhoneNumber: "01234567890",
  marriageApplicant1Name: "ApplicantOne Middle Last",

  // Applicant 2 details
  applicant2FirstName: "ApplicantTwo First",
  applicant2MiddleName: "ApplicantTwo Middle",
  applicant2LastName: "ApplicantTwo Last",
  applicant2Email: "pwapplicant2testingsolcase12345@mailinator.com",
  marriageApplicant2Name: "ApplicantTwo Middle Last",

  // Shared details
  postcode: "SW1H 9AJ",
  marriageDate: "01/10/2016",
  pageTitle: "Apply: divorce or dissolution",

  // Solicitor details
  solicitorName: "Test Solicitor",
  solicitorPhone: "00000000000",
  solicitorReference: "Ref123",
  solicitorOrganisation: "NFD Solicitor Organisation",
} as const;

export const AboutApplicantContent = {
  content: {
    applicant1FirstName: SharedValues.applicant1FirstName,
    applicant1LastName: SharedValues.applicant1LastName,
    applicant1MiddleName: SharedValues.applicant1MiddleName,
    applicant1Email: SharedValues.applicant1Email,
    applicantPostcode: SharedValues.postcode,
    applicant1PhoneNumber: SharedValues.applicant1PhoneNumber,
    marriageApplicant1Name: SharedValues.marriageApplicant1Name,
  },
  selectors: {
    radioButtons: {
      radioButtonApplicant1NameDifferentNo:
        "#applicant1NameDifferentToMarriageCertificate_No",
      radioButtonMarriageFormationTypeOppositeSexCouple:
        "#marriageFormationType-oppositeSexCouple",
      radioButtonApplicant1AddressOverseasNo: "#applicant1AddressOverseas_No",
      radioButtonApplicant1ContactDetailsPublic:
        "#applicant1ContactDetailsType-public",
    },
    textBoxes: {
      applicant1FirstName: "#applicant1FirstName",
      applicant1MiddleName: "#applicant1MiddleName",
      applicant1LastName: "#applicant1LastName",
      marriageApplicant1Name: "#marriageApplicant1Name",
      applicant1Email: "#applicant1NonConfidentialEmail",
      applicant1PhoneNumber: "#applicant1NonConfidentialPhone",
      applicant1Postcode:
        "#applicant1NonConfidentialAddress_applicant1NonConfidentialAddress_postcodeInput",
    },
    dropdowns: {
      addressList:
        "#applicant1NonConfidentialAddress_applicant1NonConfidentialAddress_addressList",
      divorceWho: "#divorceWho",
    },
  },
} as const;

export const aboutRespondentOrApplicantTwoContent = {
  content: {
    applicant2FirstName: SharedValues.applicant2FirstName,
    applicant2LastName: SharedValues.applicant2LastName,
    applicant2MiddleName: SharedValues.applicant2MiddleName,
    marriageApplicant2Name: SharedValues.marriageApplicant2Name,
  },
  selectors: {
    radioButtons: {
      radioButtonApplicant2NameDifferentNo:
        "#applicant2NameDifferentToMarriageCertificate_No",
    },
    textBoxes: {
      applicant2FirstName: "#applicant2FirstName",
      applicant2MiddleName: "#applicant2MiddleName",
      applicant2LastName: "#applicant2LastName",
      marriageApplicant2Name: "#marriageApplicant2Name",
    },
  },
} as const;

export const ApplicantTwoServiceDetailsContent = {
  content: {
    applicantPostcode: SharedValues.postcode,
    applicant2Email: SharedValues.applicant2Email,
  },
  selectors: {
    radioButtons: {
      applicant2SolicitorRepresentedNo: "#applicant2SolicitorRepresented_No",
      applicant2AddressOverseasNo: "#applicant2AddressOverseas_No",
    },
    textBoxes: {
      applicant2Email: "#applicant2NonConfidentialEmail",
      applicant2Postcode:
        "#applicant2NonConfidentialAddress_applicant2NonConfidentialAddress_postcodeInput",
    },
    dropdowns: {
      addressList:
        "#applicant2NonConfidentialAddress_applicant2NonConfidentialAddress_addressList",
    },
  },
} as const;

export const HowDoYouWantToApplyForDivorceContent = {
  selectors: {
    radioButtons: {
      radioButtonDivorce: "#divorceOrDissolution-divorce",
      radioButtonSoleApplication: "#applicationType-soleApplication",
    },
  },
} as const;

export const MarriageBrokenDownIrretrievablyContent = {
  selectors: {
    radioButtons: {
      applicant1ScreenHasMarriageBrokenYes:
        "#applicant1ScreenHasMarriageBroken_Yes",
    },
  },
} as const;

export const MarriageCertificateDetailsContent = {
  content: {
    marriageDate: SharedValues.marriageDate,
  },
  selectors: {
    radioButtons: {
      marriageMarriedInUkYes: "#marriageMarriedInUk_Yes",
    },
    textBoxes: {
      marriageDateDay: "#marriageDate-day",
      marriageDateMonth: "#marriageDate-month",
      marriageDateYear: "#marriageDate-year",
    },
  },
} as const;

export const OtherLegalProceedingsContent = {
  selectors: {
    radioButtons: {
      applicant1LegalProceedingsNo: "#applicant1LegalProceedings_No",
    },
  },
} as const;

export const SolAboutTheSolicitorContent = {
  content: {
    pageTitle: SharedValues.pageTitle,
    solicitorName: SharedValues.solicitorName,
    solicitorPhone: SharedValues.solicitorPhone,
    solicitorReference: SharedValues.solicitorReference,
    solicitorOrganisation: SharedValues.solicitorOrganisation,
  },
  selectors: {
    radioButtons: {
      applicant1SolicitorAgreeToReceiveEmailsCheckboxYes:
        "#applicant1SolicitorAgreeToReceiveEmailsCheckbox-Yes",
    },
    textBoxes: {
      applicant1SolicitorName: "#applicant1SolicitorName",
      applicant1SolicitorReference: "#applicant1SolicitorReference",
      applicant1SolicitorPhone: "#applicant1SolicitorPhone",
      applicant1SolicitorEmail: "#applicant1SolicitorEmail",
      searchOrgText: "#search-org-text",
    },
  },
} as const;
