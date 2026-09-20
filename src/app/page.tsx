"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { Calendar, Clock, MapPin, Phone, Users, MessageSquare, Sparkles, ChevronDown } from "lucide-react";
import AddToCalendar from "@/components/AddToCalendar";
import MegansItinerary from "@/components/MegansItinerary";
import * as Sentry from "@sentry/nextjs";

export default function Home() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [totalGuests, setTotalGuests] = useState(0);
  const [isAttending, setIsAttending] = useState(true);
  const [attendingSaturday, setAttendingSaturday] = useState(true);
  const [attendingSunday, setAttendingSunday] = useState(true);
  const [attendingMonday, setAttendingMonday] = useState(true);
  const [submittedAttending, setSubmittedAttending] = useState(true);

  useEffect(() => {
    // Only fetch RSVPs if we are rendering the guest site
    if (process.env.NEXT_PUBLIC_SITE_TARGET === 'megan') return;

    fetch("/api/rsvp")
      .then(res => res.json())
      .then(data => {
        if (data.rsvps) {
          const isAtt = (r: any) => r.attendingSaturday || r.attendingSunday || r.attendingMonday;
          const total = data.rsvps.reduce((acc: number, r: any) => isAtt(r) ? acc + (parseInt(r.guests) || 0) : acc, 0);
          setTotalGuests(total);
          setRsvps(data.rsvps.filter((r: any) => isAtt(r) && r.comment && r.comment.trim() !== ""));
        }
      })
      .catch(err => console.error("Error fetching RSVPs", err));
  }, []);

  if (process.env.NEXT_PUBLIC_SITE_TARGET === 'megan') {
    return <MegansItinerary />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAttending && !attendingSaturday && !attendingSunday && !attendingMonday) {
      alert("Please select at least one day you will be attending!");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          guests: isAttending ? guests : "0", 
          comment, 
          attendingSaturday: isAttending ? attendingSaturday : false, 
          attendingSunday: isAttending ? attendingSunday : false, 
          attendingMonday: isAttending ? attendingMonday : false 
        }),
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

      setName(""); setGuests("1"); setComment(""); setIsAttending(true);
      setAttendingSaturday(true); setAttendingSunday(true); setAttendingMonday(true);
    } catch (error) {
      Sentry.captureException(error, {
        extra: {
          formData: { name, guests, comment, attendingSaturday, attendingSunday, attendingMonday }
        }
      });
      setStatus("error");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={`${styles.badge} animate-bounce`}>Shh! It's a surprise! 🤫</div>
          <h1 className={styles.title}>Megan is turning 40!</h1>
          <p className={styles.subtitle}>Join us for a magical weekend at Disneyland!</p>
        </div>
      </div>

      <div className="container">
        <section className={`card ${styles.detailsCard}`}>
          <div style={{ color: '#0277bd', fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem', backgroundColor: '#e1f5fe', padding: '1rem', borderRadius: '8px', border: '2px solid #03a9f4' }}>
            <p style={{ margin: '0' }}>Megan knows about the trip but not about Sunday's dinner! Please keep that a secret. 🤐</p>
          </div>

          <div className="text-center mt-4 mb-3">
            <h3 style={{ marginBottom: '4px' }}>Itinerary</h3>
            <p style={{ color: 'var(--color-text-light)', fontStyle: 'italic' }}>Join us for whatever parts you'd like</p>
          </div>

          <div className={styles.itineraryDay}>
            <h4>Saturday 9/26: California Adventure Day 🎢</h4>
            <p>Join us if you'd like. Tickets are your responsibility.</p>
            <div style={{ marginTop: '12px', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(0,0,0,0.1)' }}>
              <Image
                src="/california_adventure.jpg"
                alt="California Adventure"
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          <div className={`${styles.itineraryDay} ${styles.mainEvent}`}>
            <h4>Sunday 9/27: Megan's 40th Birthday Dinner & Celebration 🍽️</h4>
            <p><strong>6:00 PM - 8:00 PM</strong> at Naples Ristorante e Bar in Downtown Disney.</p>
            <p>No gifts required. Dinner is complimentary.</p>
            <p className={styles.note}>Parking in the Downtown Disney Simba lot is $10 with validation.</p>
            <div className="mt-3 mb-1" style={{ zIndex: 10, position: 'relative' }}>
              <AddToCalendar />
            </div>
            <div style={{ marginTop: '12px', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(0,0,0,0.1)' }}>
              <Image 
                src="/naples.jpg" 
                alt="Naples Ristorante" 
                width={600} 
                height={400} 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </div>
          </div>

          <div className={styles.itineraryDay}>
            <h4>Monday 9/28: Disneyland Day 🏰</h4>
            <p>Join us if you'd like. Tickets are your responsibility.</p>
            <div style={{ marginTop: '12px', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(0,0,0,0.1)' }}>
              <Image
                src="/disneyland.jpg"
                alt="Disneyland"
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          <div className={styles.detailItem + " mt-3"}>
            <div className={styles.iconWrapper}><Phone size={24} /></div>
            <div>
              <strong>Questions?</strong>
              <p>Text Steve: (818) 949-8623</p>
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
              <Sparkles size={48} className="animate-bounce" color={submittedAttending ? "var(--color-primary)" : "var(--color-text-light)"} />
              <h3>{submittedAttending ? "Magical!" : "Oh no, what a bummer!"}</h3>
              <p>{submittedAttending ? "See ya real soon!" : "We will miss you, but hope to celebrate soon!"}</p>
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
                    <label>Which parts will you join?</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px 0' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'normal' }}>
                        <input type="checkbox" checked={attendingSaturday} onChange={(e) => setAttendingSaturday(e.target.checked)} style={{ width: '20px', height: '20px' }} />
                        Saturday (California Adventure)
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'normal' }}>
                        <input type="checkbox" checked={attendingSunday} onChange={(e) => setAttendingSunday(e.target.checked)} style={{ width: '20px', height: '20px' }} />
                        Sunday (Birthday Dinner)
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'normal' }}>
                        <input type="checkbox" checked={attendingMonday} onChange={(e) => setAttendingMonday(e.target.checked)} style={{ width: '20px', height: '20px' }} />
                        Monday (Disneyland)
                      </label>
                    </div>
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
                  <input type="hidden" id="guests" value="0" />
                </div>
              )}
              <div className={styles.formGroup}>
                <label htmlFor="comment">Optional Comment</label>
                <textarea id="comment" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Can't wait for Space Mountain!"></textarea>
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
