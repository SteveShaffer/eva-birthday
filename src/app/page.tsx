"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { Calendar, Clock, MapPin, Phone, Users, MessageSquare, PawPrint, ChevronDown } from "lucide-react";
import AddToCalendar from "@/components/AddToCalendar";
import * as Sentry from "@sentry/nextjs";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("1");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [totalGuests, setTotalGuests] = useState(0);
  const [isAttending, setIsAttending] = useState(true);
  const [submittedAttending, setSubmittedAttending] = useState(true);

  useEffect(() => {
    // Fetch RSVPs
    fetch("/api/rsvp")
      .then(res => res.json())
      .then(data => {
        if (data.rsvps) {
          const total = data.rsvps.reduce((acc: number, r: any) => r.isAttending ? acc + (parseInt(r.guests) || 0) : acc, 0);
          setTotalGuests(total);
          setRsvps(data.rsvps.filter((r: any) => r.isAttending && r.comment && r.comment.trim() !== ""));
        }
      })
      .catch(err => console.error("Error fetching RSVPs", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, guests, comment, isAttending }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      setSubmittedAttending(isAttending);

      // Update local state
      if (isAttending) {
        setTotalGuests(prev => prev + parseInt(guests));
        if (comment.trim()) {
          setRsvps(prev => [{ name, comment, date: new Date().toISOString() }, ...prev]);
        }
      }

      setName(""); setPhone(""); setGuests("1"); setComment(""); setIsAttending(true);
    } catch (error) {
      Sentry.captureException(error, {
        extra: {
          formData: { name, phone, guests, comment, isAttending }
        }
      });
      setStatus("error");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={`${styles.badge} animate-bounce`}>You're Invited!</div>
          <h1 className={styles.title}>Eva is turning 5!</h1>
          <p className={styles.subtitle}>Join us for a WILD time!</p>
        </div>
      </div>

      <div className="container">
        <section className={`card ${styles.detailsCard}`}>
          <h2>Party Details</h2>
          <div className={styles.detailItem}>
            <div className={styles.iconWrapper}><Calendar size={24} /></div>
            <div>
              <strong>Saturday, May 23, 2026</strong>
              <p>11:00 AM - 3:00 PM</p>
              <div className="mt-2" style={{ zIndex: 10 }}>
                <AddToCalendar />
              </div>
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.iconWrapper}><MapPin size={24} /></div>
            <div>
              <strong>Irvine Regional Park</strong>
              <p>1 Irvine Park Road<br />Orange, California 92869</p>
              <p className={styles.note}>$3 per car entry fee into the park. We will update on our location the morning of the event.</p>
            </div>
          </div>

          <h3 className="mt-3 mb-2">Schedule</h3>
          <ul className={styles.scheduleList}>
            <li><strong>11am - 1pm:</strong> Food, games, and cake! 🍰</li>
            <li><strong>1pm - 3pm:</strong> Zoo visit (optional) 🦒</li>
          </ul>

          <div className={styles.detailItem + " mt-3"}>
            <div className={styles.iconWrapper}><Phone size={24} /></div>
            <div>
              <strong>Questions?</strong>
              <p>Text Megan: (949) 350-0257</p>
            </div>
          </div>
        </section>

        <section className={`card ${styles.rsvpCard}`} id="rsvp">
          <div className="text-center mb-3">
            <h2>RSVP</h2>
            <p>Please let us know if you can make it!</p>
          </div>

          {status === "success" ? (
            <div className={styles.successMessage}>
              <PawPrint size={48} className="animate-bounce" color={submittedAttending ? "var(--color-primary)" : "var(--color-text-light)"} />
              <h3>{submittedAttending ? "Roar-some!" : "Oh no, what a bummer!"}</h3>
              <p>{submittedAttending ? "We can't wait to see you there!" : "We will miss you, but hope to celebrate soon!"}</p>
              <button className="btn btn-secondary mt-2" onClick={() => setStatus("idle")}>RSVP for someone else</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Will you be joining us?</label>
                <div className={styles.segmentedControl}>
                  <button
                    type="button"
                    className={`${styles.segmentBtn} ${isAttending ? styles.activeYes : ''}`}
                    onClick={() => setIsAttending(true)}
                  >
                    Yes, we'll be there!
                  </button>
                  <button
                    type="button"
                    className={`${styles.segmentBtn} ${!isAttending ? styles.activeNo : ''}`}
                    onClick={() => setIsAttending(false)}
                  >
                    No, we can't make it
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input required type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
              </div>
              {isAttending && (
                <>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input required type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(123) 456-7890" />
                    <small>We'll text you our exact spot the morning of!</small>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="guests">Number of People</label>
                    <div className={styles.selectWrapper}>
                      <Users size={18} className={styles.selectIcon} />
                      <select id="guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                      <ChevronDown size={18} className={styles.selectArrow} />
                    </div>
                  </div>
                </>
              )}
              {!isAttending && (
                <div className={styles.formGroup} style={{ display: 'none' }}>
                  {/* Hidden fields to satisfy form validation if not attending */}
                  <input type="hidden" id="phone" value="N/A" />
                  <input type="hidden" id="guests" value="0" />
                </div>
              )}
              <div className={styles.formGroup}>
                <label htmlFor="comment">Optional Comment (or Joke)</label>
                <textarea id="comment" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Excited for the zoo!"></textarea>
              </div>
              {status === "error" && <p className={styles.error}>Oops, something went wrong. Please try again.</p>}
              <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send RSVP"}
              </button>
            </form>
          )}
        </section>

        {totalGuests > 0 && (
          <div className="card text-center mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(4px)', padding: '16px', border: '2px dashed var(--color-primary)' }}>
            <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>
              🎉 {totalGuests} {totalGuests === 1 ? 'person is' : 'people are'} coming so far! 🎉
            </h3>
          </div>
        )}

        {rsvps.length > 0 && (
          <section className={`card ${styles.guestBookCard}`}>
            <div className="text-center mb-3">
              <h2>
                <MessageSquare size={28} style={{ verticalAlign: 'middle', marginRight: '8px', marginBottom: '4px' }} />
                Guest Book
              </h2>
            </div>
            <div className={styles.commentList}>
              {rsvps.map((rsvp, idx) => (
                <div key={idx} className={styles.commentItem}>
                  <strong>{rsvp.name}</strong>
                  <p>{rsvp.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer style={{ textAlign: 'center', marginTop: '40px', position: 'relative', zIndex: 3, display: 'flex', gap: '16px', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.8)', padding: '4px 12px' }}>
        <Link href="/privacy" style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
        |
        <Link href="/terms" style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', textDecoration: 'underline' }}>
          Terms & Conditions
        </Link>
      </footer>
    </main>
  );
}
