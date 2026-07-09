export const caseFlagsCommonContent = {
  caseLevelFlags: "Case level flags",
  partyLevelFlags: "Party level flags",
  caseFlags: "Case flags",
  complexCase: "Complex Case",
  specialMeasure: "Special measure",
  screeningWitness: "Screening witness from accused",
  caseLevel: "Case level",
  partyLevel: "Test your name Test your last name",
  updateReason: "Update reason:",
  active: "ACTIVE",
  inactive: "INACTIVE",
  appOrApp1: "applicant or applicant1"
}

export const updateFlagPageContent = {
  ...caseFlagsCommonContent,
  selectors: {
    textarea: {
      flagStatusReasonChange: "#flagStatusReasonChange"
    }
  }
}

export const confirmationPageContent = {
  flagAdded: "This Flag has been added to case",
  flagUpdated: "Flag updated",
  closeAndReturn: "Close and Return to case details"
}

export const reviewFlagDetailsContent = {
  ...caseFlagsCommonContent,
  addFlagTo: "Add flag to",
  updateFlagFor: "Update flag for",
  flagType: "Flag type",
  comments: "Comments",
  status: "Status"
}

export const addCommentsContent = {
  ...caseFlagsCommonContent,
  selectors: {
    textarea: {
      flagComments: "#flagComments",
      flagStatusReasonChange: "#flagStatusReasonChange"
    }
  }
}
