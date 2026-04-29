"use client";

import { useState } from "react";
import { RSVP } from "@/lib/google-sheets";

export default function AdminDashboardClient({ initialRsvps }: { initialRsvps: RSVP[] }) {
  const [rsvps] = useState<RSVP[]>(initialRsvps);
  const [smsMessage, setSmsMessage] = useState("");
  const [smsStatus, setSmsStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const totalGuests = rsvps.reduce((acc, curr) => curr.isAttending ? acc + (parseInt(curr.guests) || 0) : acc, 0);
  const attendingRsvps = rsvps.filter(r => r.isAttending);

  const handleSendSMS = async () => {
    if (!smsMessage.trim() || rsvps.length === 0) return;
    
    if (!confirm(`Are you sure you want to send this message to ${rsvps.length} phone numbers?`)) return;

    setSmsStatus("sending");
    try {
      const phones = attendingRsvps.map(r => r.phone).filter(Boolean);
      
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: smsMessage, phones }),
      });
      
      if (!res.ok) throw new Error("Failed to send SMS");
      
      setSmsStatus("success");
      setSmsMessage("");
      setTimeout(() => setSmsStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setSmsStatus("error");
    }
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div className="card text-center">
          <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)', margin: '0' }}>{rsvps.length}</h2>
          <p style={{ color: 'var(--color-text-light)', fontWeight: 'bold' }}>Total RSVPs</p>
        </div>
        <div className="card text-center">
          <h2 style={{ fontSize: '3rem', color: 'var(--color-secondary)', margin: '0' }}>{totalGuests}</h2>
          <p style={{ color: 'var(--color-text-light)', fontWeight: 'bold' }}>Total Guests Expected</p>
        </div>
      </div>

      <div className="card mb-4">
        <h2 className="mb-2">Send SMS Blast</h2>
        <p className="mb-2" style={{ color: 'var(--color-text-light)' }}>
          This will send a text message to all {attendingRsvps.length} registered phone numbers of attending guests via Twilio.
        </p>
        
        <textarea 
          rows={4} 
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '16px' }}
          placeholder="e.g. We are located near the monkey exhibit! See you soon!"
          value={smsMessage}
          onChange={(e) => setSmsMessage(e.target.value)}
        ></textarea>
        
        {smsStatus === "success" && (
          <div style={{ color: 'green', marginBottom: '16px', fontWeight: 'bold' }}>Messages sent successfully!</div>
        )}
        {smsStatus === "error" && (
          <div style={{ color: 'red', marginBottom: '16px', fontWeight: 'bold' }}>Error sending messages. Check console and Twilio balance.</div>
        )}
        
        <button 
          className="btn btn-primary" 
          onClick={handleSendSMS}
          disabled={smsStatus === "sending" || !smsMessage.trim()}
        >
          {smsStatus === "sending" ? "Sending..." : "Send SMS to All"}
        </button>
      </div>

      <div className="card">
        <h2 className="mb-3">RSVP Details</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '12px' }}>Timestamp</th>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Attending</th>
                <th style={{ padding: '12px' }}>Phone</th>
                <th style={{ padding: '12px' }}>Guests</th>
                <th style={{ padding: '12px' }}>Comment</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', color: 'var(--color-text-light)' }}>
                    {new Date(rsvp.timestamp).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{rsvp.name}</td>
                  <td style={{ padding: '12px' }}>
                    {rsvp.isAttending ? (
                      <span style={{ color: 'green', fontWeight: 'bold' }}>Yes</span>
                    ) : (
                      <span style={{ color: 'red', fontWeight: 'bold' }}>No</span>
                    )}
                  </td>
                  <td style={{ padding: '12px' }}>{rsvp.isAttending ? rsvp.phone : "-"}</td>
                  <td style={{ padding: '12px' }}>{rsvp.isAttending ? rsvp.guests : "-"}</td>
                  <td style={{ padding: '12px' }}>{rsvp.comment}</td>
                </tr>
              ))}
              {rsvps.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-light)' }}>
                    No RSVPs yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
