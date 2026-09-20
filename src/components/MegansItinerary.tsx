"use client";

import Image from "next/image";
import styles from "../app/page.module.css";
import { Sparkles } from "lucide-react";

export default function MegansItinerary() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className="flex justify-center mb-4">
            <Sparkles size={48} color="var(--color-primary)" />
          </div>
          <h1>Megan's 40th Birthday Weekend!</h1>
          <p>The itinerary for a magical weekend at the Disneyland Resort.</p>
        </div>
      </div>

      <div className="container">
        <section className={`card ${styles.detailsCard}`}>
          <div className="text-center mb-4">
            <h3 style={{ marginBottom: '4px' }}>Agenda</h3>
            <p style={{ color: 'var(--color-text-light)', fontStyle: 'italic' }}>Your birthday weekend schedule</p>
          </div>
          
          {/* SATURDAY */}
          <div className={styles.itineraryDay}>
            <h4>Saturday 9/26</h4>
            
            <div className={styles.agendaItem}>
              <div className={styles.agendaThumbnail}>
                <Image src="/hotel.jpg" alt="Disneyland Hotel" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.agendaContent}>
                <p><strong>Early:</strong> Check in at the Disneyland Hotel, drop off bags, and get room keys. They'll text us when our rooms are available (in the afternoon).</p>
              </div>
            </div>

            <div className={styles.agendaItem}>
              <div className={styles.agendaThumbnail}>
                <Image src="/california_adventure.jpg" alt="California Adventure" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.agendaContent}>
                <p><strong>Daytime:</strong> Spend the day at Disney California Adventure Park.</p>
              </div>
            </div>

            <div className={styles.agendaItem}>
              <div className={styles.agendaThumbnail}>
                <Image src="/saturday_night.jpg" alt="World of Color" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.agendaContent}>
                <p><strong>Night:</strong> Head back to the hotel to relax and settle into our rooms.</p>
              </div>
            </div>
          </div>

          {/* SUNDAY */}
          <div className={styles.itineraryDay}>
            <h4>Sunday 9/27</h4>

            <div className={styles.agendaItem}>
              <div className={styles.agendaThumbnail}>
                <Image src="/cathedral.jpg" alt="Christ Cathedral" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.agendaContent}>
                <p><strong>10:00 AM:</strong> Mass at Christ Cathedral.</p>
              </div>
            </div>

            <div className={styles.agendaItem}>
              <div className={styles.agendaThumbnail}>
                <Image src="/knit.png" alt="Knit Dizzney" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.agendaContent}>
                <p><strong>11:00 AM - 1:00 PM:</strong> Knit Dizzney 2026 at the Picnic Area outside the Disneyland Resort main gates.</p>
              </div>
            </div>

            <div className={styles.agendaItem}>
              <div className={styles.agendaThumbnail}>
                <Image src="/naples.jpg" alt="Naples Ristorante" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.agendaContent}>
                <p><strong>6:15 PM:</strong> Dinner Reservation at Naples Ristorante e Bar in Downtown Disney.</p>
              </div>
            </div>
          </div>

          {/* MONDAY */}
          <div className={styles.itineraryDay}>
            <h4>Monday 9/28</h4>
            
            <div className={styles.agendaItem}>
              <div className={styles.agendaThumbnail}>
                <Image src="/disneyland.jpg" alt="Disneyland" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.agendaContent}>
                <p><strong>Daytime:</strong> Spend the day exploring Disneyland Park.</p>
              </div>
            </div>

            <div className={styles.agendaItem}>
              <div className={styles.agendaThumbnail}>
                <Image src="/club33.jpg" alt="Club 33" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.agendaContent}>
                <p><strong>5:30 PM:</strong> Dinner Reservation for 2 at Club 33.</p>
                <p style={{ marginTop: '4px' }}>
                  <a 
                    href="/club33-details.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: 'var(--color-secondary)', 
                      textDecoration: 'underline', 
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    📄 View Reservation &amp; Dress Code Details
                  </a>
                </p>
              </div>
            </div>

            <div className={styles.agendaItem}>
              <div className={styles.agendaThumbnail}>
                <Image src="/monday_night.png" alt="Disneyland Fireworks" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.agendaContent}>
                <p><strong>Night:</strong> Retire to the Disneyland Hotel.</p>
              </div>
            </div>
          </div>

          {/* TUESDAY */}
          <div className={styles.itineraryDay}>
            <h4>Tuesday 9/29</h4>
            
            <div className={styles.agendaItem}>
              <div className={styles.agendaThumbnail}>
                <Image src="/hotel.jpg" alt="Disneyland Hotel" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.agendaContent}>
                <p><strong>Morning:</strong> Check out and head home.</p>
              </div>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
