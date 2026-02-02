import React from "react";

/**
 * PUBLIC_INTERFACE
 * Simple footer.
 */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>Recipe Explorer — frontend-only demo</span>
        <span className="footer__muted">Mock data • Instant search • Responsive UI</span>
      </div>
    </footer>
  );
}
