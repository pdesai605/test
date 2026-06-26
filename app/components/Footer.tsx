import { MapPin, Clock, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t border-gold/10 px-8 py-20 md:px-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-16 md:flex-row md:justify-between">
        <div>
          <p className="font-heading text-lg tracking-[0.2em] text-gold uppercase">
            Dragonfly
          </p>
          <p className="mt-3 font-body text-xs tracking-[0.15em] text-gold-soft/40 uppercase">
            Experience Mumbai
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-16">
          <div>
            <div className="mb-4 flex items-center gap-2 text-gold/50">
              <MapPin size={14} />
              <span className="font-body text-[10px] tracking-[0.2em] uppercase">
                Location
              </span>
            </div>
            <p className="font-body text-xs leading-relaxed text-gold-soft/50">
              Lower Parel, Mumbai
              <br />
              Maharashtra, India
            </p>
            <a
              href="https://maps.google.com/?q=Lower+Parel+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-body text-[10px] tracking-[0.15em] text-gold/60 uppercase transition-colors duration-500 hover:text-gold"
            >
              Google Maps
            </a>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 text-gold/50">
              <span className="font-body text-[10px] tracking-[0.2em] uppercase">
                Instagram
              </span>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-gold-soft/50 transition-colors duration-500 hover:text-gold"
            >
              @dragonflymumbai
            </a>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 text-gold/50">
              <Phone size={14} />
              <span className="font-body text-[10px] tracking-[0.2em] uppercase">
                Reservations
              </span>
            </div>
            <a
              href="tel:+912212345678"
              className="font-body text-xs text-gold-soft/50 transition-colors duration-500 hover:text-gold"
            >
              +91 22 1234 5678
            </a>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 text-gold/50">
              <Clock size={14} />
              <span className="font-body text-[10px] tracking-[0.2em] uppercase">
                Hours
              </span>
            </div>
            <p className="font-body text-xs leading-relaxed text-gold-soft/50">
              Wed – Sun
              <br />
              8 PM – 3 AM
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl border-t border-gold/5 pt-8">
        <p className="font-body text-[10px] tracking-[0.15em] text-gold-soft/25 uppercase">
          &copy; {new Date().getFullYear()} Dragonfly Experience Mumbai. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
