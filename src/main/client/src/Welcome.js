import React from 'react'


export default class Welcome extends React.Component {
  constructor(props){
    super(props)
    this.style = {
      display: 'flex',
      boxSizing: 'borderBox',
      width: '50%',
      border: '3px solid black',
      height: '80%',
      padding: '2em',
      margin: '2em auto',
      overflow: 'none'
    }
  }
  render() {
    return  <div style={this.style}>
              Welcome Page
            </div>
  }
}
