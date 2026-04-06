export const registrationTypes = [
  {
    type: "Early Bird",
    deadline: "August 10, 2026",
    prices: {
      national_paper: "PKR 7,000",
      international_paper: "USD 40",
      professional: "PKR 2,500",
      student: "PKR 1,000",
      international_delegate: "USD 80",
    },
    benefits: [
      "Access to all sessions",
      "Conference kit",
      "Lunch & hi-tea (both days)",
      "Workshop access",
      "Presentation certificate",
      "Conference proceedings (digital)"
    ],
    recommended: true
  },
  {
    type: "Regular",
    deadline: "October 5, 2026",
    prices: {
      national_paper: "PKR 8,000",
      international_paper: "USD 50",
      professional: "PKR 3,000",
      student: "PKR 1,500",
      international_delegate: "USD 100",
    },
    benefits: [
      "Access to all sessions",
      "Conference kit",
      "Lunch & hi-tea (both days)",
      "Workshop access",
      "Presentation certificate",
      "Conference proceedings (digital)"
    ]
  },
  {
    type: "On-site",
    deadline: "October 20-21, 2026",
    prices: {
      national_paper: "PKR 9,000",
      international_paper: "USD 60",
      professional: "PKR 3,500",
      student: "PKR 2,000",
      international_delegate: "USD 120",
    },
    benefits: [
      "Access to all sessions",
      "Lunch & hi-tea (both days)",
      "Certificate",
    ]
  },
  {
    type: "Workshop Only",
    deadline: "October 5, 2026",
    prices: {
      all: "PKR 5,000",
    },
    benefits: [
      "Access to one workshop",
      "Certificate",
      "Refreshments"
    ]
  }
];

export const ieeeDiscount = {
  title: "IEEE Member Discount",
  description: "IEEE student members are exempted from the conference registration fee. Other IEEE members receive a special discounted rate.",
  benefits: [
    "IEEE Student Members: Registration fee waived",
    "IEEE Members: 15% discount on all categories",
    "Valid IEEE membership card required at registration",
  ],
  note: "Present your IEEE membership ID at the time of registration or upload proof with your registration form."
};

export const paymentInfo = {
  bank: "Meezan Bank Limited",
  accountTitle: "NED University of Engineering & Technology (CSIT Sustainability)",
  accountNumber: "0108636991",
  iban: "PK30MEZN0001420108636991",
  branch: "Shah Faisal Colony, Karachi",
  coordinator: {
    name: "Ms. Samia Masood Awan",
    email: "registration@nediconics.com",
    phone: "+92-21-99261261 ext. 2569"
  },
  rules: [
    "One registration form per participant",
    "Paper withdrawal prohibited after registration",
    "At least one author must present; no-show papers excluded from proceedings",
    "On-site payment available based on capacity"
  ]
};
