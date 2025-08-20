import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto bg-[var(--card-dark)] text-center border-t-2 border-[var(--primary-color)] shadow-[0_-2px_20px_rgba(24,119,254,0.08)] relative z-10">
      <div className="max-w-[1200px] mx-auto px-5 py-8 flex flex-col items-center gap-5 md:px-10 md:py-8 md:gap-6">
        {/* Top Content */}
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between md:gap-6 gap-4 border-b border-white/10 pb-3 flex-wrap">
          <p className="m-0 text-[1em] tracking-wide text-[var(--text-muted)] text-left">
            &copy; {new Date().getFullYear()} Neontek. All Rights Reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-5 mt-0">
            <a
              href="https://www.linkedin.com/in/neon-tek-b17239307/"
              aria-label="LinkedIn"
              title="NeonTek on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-light)] text-lg p-2 rounded-full bg-white/5 flex items-center justify-center transition-all hover:text-[var(--primary-color)] hover:bg-[rgba(24,119,254,0.10)] hover:scale-110"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://www.instagram.com/neontek.thedev/"
              aria-label="Instagram"
              title="NeonTek on Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-light)] text-lg p-2 rounded-full bg-white/5 flex items-center justify-center transition-all hover:text-[var(--primary-color)] hover:bg-[rgba(24,119,254,0.10)] hover:scale-110"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://web.facebook.com/profile.php?id=61558884915047#"
              aria-label="Facebook"
              title="NeonTek on Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-light)] text-lg p-2 rounded-full bg-white/5 flex items-center justify-center transition-all hover:text-[var(--primary-color)] hover:bg-[rgba(24,119,254,0.10)] hover:scale-110"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://neontek.co.ke"
              aria-label="Website"
              title="NeonTek's Website"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-light)] text-lg p-2 rounded-full bg-white/5 flex items-center justify-center transition-all hover:text-[var(--primary-color)] hover:bg-[rgba(24,119,254,0.10)] hover:scale-110"
            >
              <i className="fas fa-globe"></i>
            </a>
            <a
              href="https://blog.neontek.co.ke"
              aria-label="Blog"
              title="NeonTek's Blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-light)] text-lg p-2 rounded-full bg-white/5 flex items-center justify-center transition-all hover:text-[var(--primary-color)] hover:bg-[rgba(24,119,254,0.10)] hover:scale-110"
            >
              <i className="fas fa-blog"></i>
            </a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <a
            href="https://neontek.co.ke/legal/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] text-[0.95em] px-3 py-1 rounded-md transition-all hover:text-[var(--primary-color)] hover:bg-[rgba(24,119,254,0.08)]"
          >
            Terms of Use
          </a>
          <a
            href="https://neontek.co.ke/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] text-[0.95em] px-3 py-1 rounded-md transition-all hover:text-[var(--primary-color)] hover:bg-[rgba(24,119,254,0.08)]"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
