import * as React from "react";

const initialState: IErrorBoundaryState = { error: null, resetKeys: ["prev"] };

// component
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, IErrorBoundaryState> {
  state = initialState;

  static getDerivedStateFromError(error: Error) {
    return { error: error };
  }

  resetErrorBoundary = () => {
    this.setState(initialState);
  };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
  }

  componentDidUpdate(prevProps: IErrorBoundaryState) {
    if (this.state.error == null) {
      return;
    }

    if (!this.props.resetKeys) return;

    if (prevProps.resetKeys.join("") === this.props.resetKeys.join("")) {
      this.resetErrorBoundary();
    }
  }

  render() {
    const { error } = this.state;
    const { fallback, children } = this.props;

    if (error !== null) {
      if (fallback) {
        return fallback({
          error,
          reset: this.resetErrorBoundary,
        });
      }
      this.resetErrorBoundary();
    }
    return children;
  }
}
