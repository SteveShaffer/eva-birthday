"use client";

import { useState } from "react";
import { RSVP } from "@/lib/google-sheets";

export default function AdminDashboardClient({ initialRsvps }: { initialRsvps: RSVP[] }) {
  const [rsvps] = useState<RSVP[]>(initialRsvps);

  const isAtt = (r: RSVP) => r.attendingSaturday || r.attendingSunday || r.attendingMonday;
  const totalGuests = rsvps.reduce((acc, curr) => isAtt(curr) ? acc + (parseInt(curr.guests) || 0) : acc, 0);

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

      <div className="card">
        <h2 className="mb-3">RSVP Details</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '12px' }}>Timestamp</th>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Attending</th>
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
                    {isAtt(rsvp) ? (
                      <span style={{ color: 'green', fontWeight: 'bold' }}>
                        {[
                          rsvp.attendingSaturday && "Sat",
                          rsvp.attendingSunday && "Sun",
                          rsvp.attendingMonday && "Mon"
                        ].filter(Boolean).join(", ")}
                      </span>
                    ) : (
                      <span style={{ color: 'red', fontWeight: 'bold' }}>No</span>
                    )}
                  </td>
                  <td style={{ padding: '12px' }}>{isAtt(rsvp) ? rsvp.guests : "-"}</td>
                  <td style={{ padding: '12px' }}>{rsvp.comment}</td>
                </tr>
              ))}
              {rsvps.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-light)' }}>
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
