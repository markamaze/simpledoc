import React from 'react'


export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  componentDidCatch(error, info) { this.setState({ hasError: true, error: error }) }

  render() {
    if (this.state.hasError)
      return  <div className="module-error">
                <div>{`Error in -> ${displayName}`}</div>
                <div>{`${this.state.error}`}</div>
              </div>
    return this.props.children;
  }
}
