import React from "react";

/**
 * PUBLIC_INTERFACE
 * Small label badge for tags and attributes.
 */
export function Badge({ children, tone = "default" }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
