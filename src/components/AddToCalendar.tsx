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

  const googleUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20260523T180000Z%2F20260523T220000Z&details=Join%20us%20for%20a%20WILD%20time%21%20We%20will%20update%20on%20our%20exact%20location%20the%20morning%20of%20the%20event.%0A%0AWebsite%3A%20https%3A%2F%2Feva.shaffer.tech&location=Irvine%20Regional%20Park%2C%201%20Irvine%20Park%20Road%2C%20Orange%2C%20California%2092869&text=Eva%27s%205th%20Birthday%20Party%21";

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
          <a href="/api/calendar" download="evas-5th-birthday.ics" className={styles.dropdownItem}>
            <Download size={16} />
            Apple / Outlook (.ics)
          </a>
        </div>
      )}
    </div>
  );
}
