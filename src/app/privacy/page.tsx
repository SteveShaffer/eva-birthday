import Link from "next/link";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="card text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: 'var(--color-secondary)' }}>
          <Shield size={48} />
        </div>
        <h1 style={{ color: 'var(--color-primary)', marginBottom: '24px' }}>Privacy Policy</h1>
        
        <div style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <p className="mb-3">
            Your privacy is important to us. This privacy policy explains how we collect and use your information on this website.
          </p>
          
          <h2 className="mb-2" style={{ fontSize: '1.5rem', color: 'var(--color-text)' }}>Information We Collect</h2>
          <p className="mb-3">
            When you RSVP for the party, we collect the following personal information:
          </p>
          <ul className="mb-3" style={{ paddingLeft: '24px' }}>
            <li>Your Name</li>
            <li>Your Phone Number</li>
          </ul>

          <h2 className="mb-2" style={{ fontSize: '1.5rem', color: 'var(--color-text)' }}>How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect <strong>only</strong> for the following purposes:
          </p>
          <ul className="mb-4" style={{ paddingLeft: '24px' }}>
            <li><strong>Displaying RSVPs:</strong> Your name and optional comment will be displayed in the guest book section of the site. Your phone number is never displayed publicly.</li>
            <li><strong>Event Notifications:</strong> Your phone number is used exclusively to send you text message notifications regarding the event (such as our exact location on the day of the party).</li>
          </ul>

          <p className="mb-4">
            We will never sell, rent, or share your personal information with third parties.
          </p>
        </div>

        <Link href="/" className="btn btn-primary mt-4">
          Back to Invitation
        </Link>
      </div>
    </main>
  );
}
