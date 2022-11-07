import React from 'react';

type ErrorBoundaryProps = {
  errorMessage?: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Error boundary component.
 * @see https://reactjs.org/docs/error-boundaries.html
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError && this.props.errorMessage) {
      // You can render any custom fallback UI
      return <p>An error occurred.</p>;
    }

    if (this.state.hasError) {
      return null;
    }

    if (this.props.children) {
      return this.props.children;
    }

    return null;
  }
}
