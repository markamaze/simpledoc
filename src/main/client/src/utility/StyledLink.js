import React from 'react'
import { NavLink } from 'react-router-dom'

export default class StyledLink extends React.Component {
  constructor(props) {
    super(props)
    this.style = {
      textDecoration: 'none',
      color: "#f8f9fa",
      padding: ".5rem",
      textSize: "1rem"
    }
    this.activeStyle = {
      background: '#b0a18e',
      color: 'purple'
    }
  }
  render() {
    return  <NavLink to={this.props.to}
                    activeStyle={this.activeStyle}
                    style={this.style} >
              {this.props.label}
            </NavLink>

  }
}
