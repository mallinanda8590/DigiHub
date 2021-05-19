import React, { Component } from 'react';
export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
     this.setState({
        error: error,
        errorInfo: errorInfo
      });
    }
    
    render() {
      if (this.state.errorInfo) {
        return (
          <div style={{color:"red"}}>
            <h2>Something went wrong</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
      // Render children if there's no error
      return this.props.children;
    }  
  }