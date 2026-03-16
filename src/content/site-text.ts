export const siteText = {
  metadata: {
    title: "Western.App Showcase",
    description: "A promotional landing page for Western.App",
  },
  links: {
    home: "/",
    terms: "/terms",
    privacy: "/privacy",
  },
  brand: {
    srOnlyName: "Western.App",
    displayName: "western.app",
    legalName: "Western.App",
  },
  hero: {
    title: "The Future of the Frontier has arrived.",
    description:
      "Experience the next generation of equine ASMR.",
  },
  teaser: {
    title: "Something New is on the Horizon",
    description:
      "We're putting the finishing touches on an experience you won't want to miss.",
  },
  benefits: {
    title: "Why you'll love it",
    description:
      "Discover the key features that will revolutionize your workflow.",
    items: [
      {
        title: "Blazing Fast",
        description:
          "Our platform is optimized for speed, ensuring a snappy and responsive experience at all times.",
      },
      {
        title: "Secure by Design",
        description:
          "With state-of-the-art security, your data is always protected and private. Trust is built-in.",
      },
      {
        title: "Seamless Integration",
        description:
          "Connect with your favorite tools and services effortlessly. Our ecosystem is designed to be extensible.",
      },
    ],
  },
  theme: {
    toggleLabel: "Toggle theme",
  },
  footer: {
    rightsReserved: "All rights reserved.",
    termsLabel: "Terms of Service",
    privacyLabel: "Privacy",
  },
  legal: {
    lastUpdated: "March 12, 2026",
    lastUpdatedLabel: "Last updated",
    terms: {
      title: "Terms of Service",
      intro:
        "These placeholder terms are for development/demo use only and are not legal advice.",
      sections: [
        {
          heading: "Use of Service",
          body:
            "You may use this site for lawful purposes only. Do not misuse or attempt to disrupt the service.",
        },
        {
          heading: "Content and Availability",
          body:
            "The service and content are provided as-is and may change, pause, or be removed at any time without notice.",
        },
        {
          heading: "Liability",
          body:
            "To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages.",
        },
        {
          heading: "Contact",
          body:
            "For questions about these terms, contact us at legal@goldencloudinnovations.com.",
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      intro:
        "This is a placeholder privacy policy for development/demo use only and is not legal advice.",
      sections: [
        {
          heading: "Data Collection",
          body:
            "This static site does not directly collect personal data from visitors.",
        },
        {
          heading: "Third-Party Services",
          body:
            "Third-party providers such as hosting or analytics tools may process technical request data.",
        },
        {
          heading: "Data Storage",
          body:
            "No application-specific user database is used in this deployment.",
        },
        {
          heading: "Your Choices",
          body:
            "You can request deletion of your data by contacting us at privacy@goldencloudinnovations.com.",
        },
      ],
    },
  },
} as const;
