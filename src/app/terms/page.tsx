import Link from "next/link";
import { FileText } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <main className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="card text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: 'var(--color-secondary)' }}>
          <FileText size={48} />
        </div>
        <h1 style={{ color: 'var(--color-primary)', marginBottom: '24px' }}>Terms and Conditions</h1>
        
        <div style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <h2 className="mb-2" style={{ fontSize: '1.5rem', color: 'var(--color-text)' }}>SMS Notifications Program</h2>
          <p className="mb-3">
            By providing your phone number on our RSVP form, you consent to receive SMS notifications from our messaging program.
          </p>
          
          <ul className="mb-4" style={{ paddingLeft: '24px' }}>
            <li><strong>Program Name:</strong> shaffer.tech</li>
            <li><strong>Description:</strong> Shaffer family tech tools</li>
            <li><strong>Message and Data Rates:</strong> Message and data rates may apply.</li>
            <li><strong>Message Frequency:</strong> A few times per registration.</li>
          </ul>

          <h2 className="mb-2" style={{ fontSize: '1.5rem', color: 'var(--color-text)' }}>Opt-Out and Support</h2>
          <p className="mb-3">
            You can cancel the SMS service at any time. Simply text <strong>STOP</strong> to the phone number. Upon sending <strong>STOP</strong>, we will confirm your unsubscribe status via SMS. Following this confirmation, you will no longer receive SMS messages from us. To rejoin, sign up as you did initially, and we will resume sending SMS messages to you.
          </p>
          <p className="mb-4">
            If you experience issues with the messaging program you can reply with the keyword <strong>HELP</strong> for more assistance, or you can get help directly at <strong>info@shaffer.tech</strong>.
          </p>
        </div>

        <Link href="/" className="btn btn-primary mt-4">
          Back to Invitation
        </Link>
      </div>
    </main>
  );
}
