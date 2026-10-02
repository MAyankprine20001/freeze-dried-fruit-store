import LegalPageView from "../components/legal/LegalPageView";

// Content is editable from Admin → Legal Pages (built-in text in src/data/legalDefaults.ts).
export default function PrivacyPolicy() {
  return <LegalPageView slug="privacy" />;
}
