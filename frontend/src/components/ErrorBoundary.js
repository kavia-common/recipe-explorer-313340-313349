import React from "react";

/**
 * PUBLIC_INTERFACE
 * Error boundary to prevent the whole app from crashing due to render errors.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Intentionally minimal: keep console visibility but avoid noisy logging infra.
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ padding: 24 }}>
          <h1 style={{ marginTop: 0 }}>Something went wrong</h1>
          <p style={{ color: "var(--color-secondary)" }}>
            Please refresh the page. If the problem persists, try again later.
          </p>
          <pre
            style={{
              background: "rgba(15, 23, 42, 0.04)",
              border: "1px solid rgba(15, 23, 42, 0.10)",
              borderRadius: 12,
              padding: 12,
              overflowX: "auto"
            }}
          >
            {String(this.state.error || "")}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
