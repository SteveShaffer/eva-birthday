"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronDown, Download, Monitor } from "lucide-react";
import styles from "./AddToCalendar.module.css";

export default function AddToCalendar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const googleUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20260928T010000Z%2F20260928T030000Z&details=No%20gifts%20required.%20Dinner%20is%20complimentary.%20Parking%20in%20the%20Downtown%20Disney%20Simba%20lot%20is%20%2410%20with%20validation.%20%28Remember%3A%20Megan%20knows%20about%20the%20trip%2C%20but%20Sunday%20dinner%20is%20a%20surprise%21%29%0A%0AWebsite%3A%20https%3A%2F%2Fparty.shaffer.tech&location=Naples%20Ristorante%20e%20Bar%2C%201550%20Disneyland%20Dr%2C%20Anaheim%2C%20CA%2092802&text=Megan%27s%2040th%20Birthday%20Dinner%20%26%20Celebration";

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <button 
        className={styles.triggerButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <CalendarIcon size={16} />
        Add to Calendar
        <ChevronDown size={16} className={styles.arrow} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <a href={googleUrl} target="_blank" rel="noopener noreferrer" className={styles.dropdownItem}>
            <Monitor size={16} />
            Google Calendar
          </a>
          <a href="/api/calendar" download="megans-40th-dinner.ics" className={styles.dropdownItem}>
            <Download size={16} />
            Apple / Outlook (.ics)
          </a>
        </div>
      )}
    </div>
  );
}
