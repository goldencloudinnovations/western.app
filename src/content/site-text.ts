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
    title: "The Future of Something is Here",
    description:
      "Experience the next generation of whatever it is we do. Seamlessly integrated, beautifully designed, and vaguely powerful.",
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
  signup: {
    title: "Be the First to Know",
    description:
      "Sign up for our newsletter to get the latest news and a notification when we launch.",
    emailPlaceholder: "name@example.com",
    emailAriaLabel: "Email",
    submitLabel: "Subscribe",
    submitPendingLabel: "Subscribing...",
    invalidEmailMessage: "Please enter a valid email address.",
    successNewMessage: "Thank you for subscribing! We'll keep you updated.",
    successExistingMessage: "You're already subscribed. We'll keep you updated.",
    genericErrorMessage: "An unexpected error occurred. Please try again later.",
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
          heading: "Data We Collect",
          body:
            "For the newsletter form, we collect your email address when you submit it.",
        },
        {
          heading: "How We Use Data",
          body:
            "We use collected emails to send product/newsletter updates related to this project.",
        },
        {
          heading: "Data Storage",
          body:
            "During local development, newsletter emails may be stored in a local SQLite database file.",
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
