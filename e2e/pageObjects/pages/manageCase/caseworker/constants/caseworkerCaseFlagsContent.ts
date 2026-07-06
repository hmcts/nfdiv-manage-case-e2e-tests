export const caseFlagsCommonContent = {
  CASE_LEVEL_FLAGS: "Case level flags",
  PARTY_LEVEL_FLAGS: "Party level flags",
  CASE_FLAGS: "Case flags",
  COMPLEX_CASE: "Complex Case",
  SPECIAL_MEASURE: "Special measure",
  SCREENING_WITNESS: "Screening witness from accused",
  CASE_LEVEL: "Case level",
  PARTY_LEVEL: "Test your name Test your last name",
  UPDATE_REASON: "Update reason:",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  APP_OR_APP_1: "applicant or applicant1",
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
  FLAG_ADDED: "This Flag has been added to case",
  FLAG_UPDATED: "Flag updated"
}

export const reviewFlagDetailsContent = {
  ...caseFlagsCommonContent,
  ADD_FLAG_TO: "Add flag to",
  UPDATE_FLAG_FOR: "Update flag for",
  FLAG_TYPE: "Flag type",
  COMMENTS: "Comments",
  STATUS: "Status"
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
