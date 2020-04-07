/**
 * Error Boundary.
 */
import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    const { errorInfo, error } = this.state;
    if (errorInfo) {
      console.error(`%c ${error.toString()} ${errorInfo.componentStack}`, "color:red");
      return (
        <div>
          加载出了一点问题。
        </div>
      );
    }
    return this.props.children;
  }
}

const withEb = children => <ErrorBoundary>{children}</ErrorBoundary>;

export {
  withEb
}