/**
 * Built-in text for the Privacy Policy and Terms pages. The storefront shows this until
 * the admin saves an edited version (Admin → Legal Pages); the editor also starts from it.
 */
export interface LegalItem {
  subtitle: string;
  text: string;
}

export interface LegalSection {
  title: string;
  icon: string;
  highlight?: string;
  items: LegalItem[];
}

export interface LegalPageContent {
  title: string;
  intro: string;
  noteLabel: string;
  note: string;
  summary: string[];
  footerNote: string;
  sections: LegalSection[];
  updatedAt?: string;
}

export type LegalSlug = "privacy" | "terms";

/** Shown as "Last updated" until the page is edited in the admin. */
export const DEFAULT_LEGAL_UPDATED = "2026-03-28";

export const DEFAULT_LEGAL: Record<LegalSlug, LegalPageContent> = {
  privacy: {
    title: "Privacy Policy",
    intro:
      "At The Dry Factory, your privacy is as important to us as the quality of our products. This policy explains what data we collect, how we use it, and the rights you have over your information.",
    noteLabel: "Our promise:",
    note: "We will never sell your personal data. We collect only what is necessary to serve you well, and we protect it with the same care we put into our products.",
    summary: [],
    footerNote:
      "This Privacy Policy may be updated from time to time. We will notify you of significant changes via email or a prominent notice on our website. Continued use of our services after changes constitutes acceptance.",
    sections: [
      {
        icon: "Database",
        title: "Information We Collect",
        items: [
          {
            subtitle: "Information You Provide",
            text: "When you place an order, create an account, or contact us, we collect personal information such as your name, email address, phone number, shipping address, and payment details. We also collect any messages or feedback you send us directly.",
          },
          {
            subtitle: "Information Collected Automatically",
            text: "When you visit our website, we automatically collect certain information about your device and browsing behavior, including your IP address, browser type, operating system, referring URLs, pages viewed, and the date and time of your visit.",
          },
          {
            subtitle: "Information from Third Parties",
            text: "We may receive information about you from third-party services such as payment processors, shipping partners, and analytics providers that help us operate our business.",
          },
        ],
      },
      {
        icon: "Eye",
        title: "How We Use Your Information",
        items: [
          {
            subtitle: "Order Fulfilment",
            text: "We use your personal information to process and deliver your orders, send order confirmations and shipping updates, handle returns and refunds, and provide customer support.",
          },
          {
            subtitle: "Communication",
            text: 'With your consent, we may send you promotional emails about new products, offers, and updates. You can opt out of marketing communications at any time by clicking the "Unsubscribe" link in any email.',
          },
          {
            subtitle: "Improving Our Services",
            text: "We use aggregated and anonymised data to understand how customers use our website, identify areas for improvement, conduct research, and develop new products and features.",
          },
          {
            subtitle: "Legal Compliance",
            text: "We may use your information to comply with applicable laws and regulations, respond to lawful requests from public authorities, and protect our legal rights.",
          },
        ],
      },
      {
        icon: "UserCheck",
        title: "Sharing of Information",
        items: [
          {
            subtitle: "Service Providers",
            text: "We share your information with trusted third-party service providers who assist us in operating our website and business including payment processors (Razorpay, Stripe), shipping carriers, email service providers, and cloud hosting services. These parties are contractually obligated to keep your information confidential.",
          },
          {
            subtitle: "We Do Not Sell Your Data",
            text: "The Dry Factory does not sell, rent, or trade your personal information to any third party for their marketing purposes. Your data is yours.",
          },
          {
            subtitle: "Legal Requirements",
            text: "We may disclose your information if required by law, court order, or governmental authority, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.",
          },
        ],
      },
      {
        icon: "Lock",
        title: "Data Security",
        items: [
          {
            subtitle: "How We Protect Your Data",
            text: "We implement industry-standard security measures including SSL/TLS encryption for all data transmitted between your browser and our servers, secure storage of personal information with restricted access, and regular security audits of our systems.",
          },
          {
            subtitle: "Payment Security",
            text: "We do not store your full credit card or debit card details on our servers. All payment transactions are processed through PCI-DSS compliant payment processors.",
          },
          {
            subtitle: "Retention",
            text: "We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Typically, order data is retained for 7 years for accounting purposes.",
          },
        ],
      },
      {
        icon: "Bell",
        title: "Cookies & Tracking",
        items: [
          {
            subtitle: "What Are Cookies",
            text: "Cookies are small text files placed on your device when you visit our website. They help us remember your preferences, understand how you use our site, and improve your experience.",
          },
          {
            subtitle: "Types of Cookies We Use",
            text: "Essential cookies (required for the website to function), preference cookies (remembering your choices like language), analytics cookies (understanding usage patterns via Google Analytics), and marketing cookies (showing relevant advertisements on third-party platforms).",
          },
          {
            subtitle: "Managing Cookies",
            text: "You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of our website. For more information, visit www.allaboutcookies.org.",
          },
        ],
      },
      {
        icon: "Shield",
        title: "Your Rights",
        items: [
          {
            subtitle: "Access & Portability",
            text: "You have the right to request a copy of the personal data we hold about you and to receive it in a structured, machine-readable format.",
          },
          {
            subtitle: "Correction & Deletion",
            text: "You may request that we correct inaccurate information or delete your personal data. We will honour such requests unless we are required to retain the information by law.",
          },
          {
            subtitle: "Withdrawal of Consent",
            text: "Where we process your data based on your consent (e.g., marketing emails), you may withdraw that consent at any time without affecting the lawfulness of processing prior to withdrawal.",
          },
          {
            subtitle: "How to Exercise Your Rights",
            text: "To exercise any of these rights, please contact us at support@thedryfactory.com. We will respond within 30 days.",
          },
        ],
      },
      {
        icon: "Mail",
        title: "Contact Us",
        items: [
          {
            subtitle: "Privacy Enquiries",
            text: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to us. We are committed to resolving any concerns promptly and transparently.",
          },
          {
            subtitle: "Contact Details",
            text: "Email: support@thedryfactory.com\nPhone: +91 75673 50328\nAddress: The Dry Factory, 12 Cold Chain Avenue, Andheri East, Mumbai 400 069, Maharashtra, India.",
          },
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro:
      "These terms explain the rules and conditions that apply when you shop with The Dry Factory or use our website. Please read them carefully before placing an order.",
    noteLabel: "Plain English summary:",
    note: "Buy from us, enjoy great freeze-dried products, and if anything is wrong we'll make it right. These terms protect both you and us, and they are governed by Indian law.",
    summary: ["7-day returns window", "Free ship above ₹499", "No hidden fees", "Secure payments", "Indian law governs"],
    footerNote:
      "If you have any questions about these Terms, please don't hesitate to reach out. We're humans, not lawyers, and we're happy to explain anything in plain language.",
    sections: [
      {
        icon: "FileText",
        title: "Acceptance of Terms",
        highlight:
          "By accessing our website or purchasing our products, you agree to these Terms of Service.",
        items: [
          {
            subtitle: "Agreement to Terms",
            text: 'These Terms of Service ("Terms") govern your access to and use of the The Dry Factory website (The Dry Factory.com) and purchase of our products. By browsing the website, placing an order, or creating an account, you confirm that you have read, understood, and agree to be bound by these Terms.',
          },
          {
            subtitle: "Eligibility",
            text: "You must be at least 18 years of age to place an order on our website. By using our services, you represent and warrant that you meet this requirement. If you are under 18, you may only use our website under the supervision of a parent or legal guardian.",
          },
          {
            subtitle: "Changes to Terms",
            text: "The Dry Factory reserves the right to modify these Terms at any time. We will provide notice of significant changes via email or a banner on our website. Your continued use of our services after the effective date of changes constitutes your acceptance of the revised Terms.",
          },
        ],
      },
      {
        icon: "ShoppingCart",
        title: "Products & Orders",
        highlight:
          "All prices are in Indian Rupees (₹) and inclusive of applicable taxes unless stated otherwise.",
        items: [
          {
            subtitle: "Product Descriptions",
            text: "We make every effort to accurately describe our products, including ingredients, weights, and nutritional information. However, we do not warrant that product descriptions, images, or other content are completely accurate, complete, or error-free. Product packaging may vary from images shown.",
          },
          {
            subtitle: "Pricing",
            text: "All prices are listed in Indian Rupees (₹) and are inclusive of GST unless explicitly stated otherwise. We reserve the right to modify prices at any time without prior notice. Prices at the time of order placement are the prices charged.",
          },
          {
            subtitle: "Order Acceptance",
            text: "Placing an order constitutes an offer to purchase. Your order is accepted when we send you a confirmation email. We reserve the right to refuse or cancel any order for reasons including product unavailability, errors in product information or pricing, or suspected fraudulent activity.",
          },
          {
            subtitle: "Delivery",
            text: "We ship pan-India. Estimated delivery times are 3–7 business days depending on your location. Free shipping is available on orders above ₹499. We are not responsible for delays caused by courier partners, natural events, or circumstances beyond our control.",
          },
          {
            subtitle: "Out of Stock",
            text: "If a product you have ordered is out of stock, we will notify you promptly and offer a full refund, a substitute product, or the option to wait until the product is restocked.",
          },
        ],
      },
      {
        icon: "RefreshCw",
        title: "Returns & Refunds",
        highlight:
          "We offer a 7-day return window on all products from the date of delivery.",
        items: [
          {
            subtitle: "Return Eligibility",
            text: "Products may be returned within 7 days of delivery if they are unused, in original sealed packaging, and accompanied by proof of purchase. Due to the nature of food products, we cannot accept returns of opened or partially consumed items unless they are defective.",
          },
          {
            subtitle: "Damaged or Defective Products",
            text: "If your order arrives damaged, defective, or incorrect, please contact us within 48 hours of delivery with photographs of the item and packaging. We will arrange a free replacement or issue a full refund at your discretion.",
          },
          {
            subtitle: "Refund Process",
            text: "Approved refunds are processed within 5–7 business days of us receiving the returned product. Refunds are credited to the original payment method. Shipping charges are non-refundable unless the return is due to our error.",
          },
          {
            subtitle: "How to Initiate a Return",
            text: "To initiate a return, email us at returns@The Dry Factory.com with your order number, reason for return, and supporting photographs (if applicable). Our team will guide you through the process.",
          },
        ],
      },
      {
        icon: "AlertTriangle",
        title: "User Conduct",
        highlight:
          "Our platform must be used lawfully and respectfully. Misuse may result in account termination.",
        items: [
          {
            subtitle: "Prohibited Activities",
            text: "You agree not to: use our website for any unlawful purpose; attempt to gain unauthorised access to our systems; transmit spam, viruses, or malicious code; scrape or copy content from our website without permission; impersonate any person or entity; or engage in any activity that disrupts or interferes with our services.",
          },
          {
            subtitle: "User-Generated Content",
            text: "If you submit reviews, comments, or other content to our website, you grant The Dry Factory a non-exclusive, royalty-free licence to use, reproduce, and display such content. You are solely responsible for the accuracy and legality of content you submit.",
          },
          {
            subtitle: "Account Termination",
            text: "We reserve the right to suspend or terminate your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.",
          },
        ],
      },
      {
        icon: "Scale",
        title: "Limitation of Liability",
        highlight:
          "Our liability is limited to the value of the order in question.",
        items: [
          {
            subtitle: "Disclaimer of Warranties",
            text: 'Our website and products are provided "as is" without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.',
          },
          {
            subtitle: "Limitation of Liability",
            text: "To the maximum extent permitted by applicable law, The Dry Factory shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or website. Our total liability for any claim arising out of or relating to these Terms shall not exceed the amount you paid for the order in question.",
          },
          {
            subtitle: "Allergen Disclaimer",
            text: "Our products are made in a facility that may process tree nuts, peanuts, dairy, gluten, and soy. While we maintain high hygiene standards, we cannot guarantee the complete absence of cross-contamination. Customers with severe allergies should consult a medical professional before consuming our products.",
          },
          {
            subtitle: "Health Claims",
            text: "Nothing on our website constitutes medical advice. Nutritional information is provided for general guidance only. Our products are not intended to diagnose, treat, cure, or prevent any disease.",
          },
        ],
      },
      {
        icon: "Globe",
        title: "Intellectual Property",
        highlight:
          "All content on this website is the property of The Dry Factory and protected by copyright law.",
        items: [
          {
            subtitle: "Ownership",
            text: "All content on the The Dry Factory website including text, graphics, logos, images, product descriptions, and software is the exclusive property of The Dry Factory or its content suppliers and is protected by Indian and international copyright, trademark, and other intellectual property laws.",
          },
          {
            subtitle: "Limited Licence",
            text: "We grant you a limited, non-exclusive, non-transferable licence to access and use our website for personal, non-commercial purposes. You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any content without our express written permission.",
          },
          {
            subtitle: "Trademarks",
            text: '"The Dry Factory" and our logo are trademarks of The Dry Factory. You may not use our trademarks in connection with any product or service without our prior written consent.',
          },
        ],
      },
      {
        icon: "MessageSquare",
        title: "Disputes & Governing Law",
        highlight:
          "These Terms are governed by the laws of India. Disputes shall be resolved in Mumbai courts.",
        items: [
          {
            subtitle: "Governing Law",
            text: "These Terms shall be governed by and construed in accordance with the laws of the Republic of India, without regard to its conflict of law provisions.",
          },
          {
            subtitle: "Dispute Resolution",
            text: "In the event of a dispute, we encourage you to first contact us directly at legal@The Dry Factory.com so we can attempt to resolve the matter amicably. If resolution cannot be reached informally, the dispute shall be submitted to arbitration under the Arbitration and Conciliation Act, 1996.",
          },
          {
            subtitle: "Jurisdiction",
            text: "For matters not subject to arbitration, you agree to submit to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra, India.",
          },
          {
            subtitle: "Consumer Rights",
            text: "Nothing in these Terms limits your statutory rights under the Consumer Protection Act, 2019 (India) or any other applicable consumer protection legislation.",
          },
        ],
      },
    ],
  },
};
