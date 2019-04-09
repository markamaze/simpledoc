import React from 'react'

import { LayoutStyle } from '../../styles/formStyles'
import Pairs from './Pairs'
import Table from './Table'
import Grid from './Grid'


export default class Layout extends React.Component {

  buildLayout(layout) {
    return  <LayoutStyle className={`layout ${this.props.activeObject === this.props.layout ? 'active' : null}`}>
              { this.getHeader(layout.get('label')) }
              { this.getLayoutComponent(layout) }
            </LayoutStyle>
  }

  getHeader(label) {
    return  <div className="header" >
              <span className='headertitle'
                    onClick={()=>this.props.headerClick(this.props.layout)}>
                {label}
              </span>
              <span className='headertools'>
                { typeof this.props.injectEditor ? this.props.injectEditor : null }
              </span>
            </div>
  }

  getLayoutComponent(layout) {
    switch (layout.get('type')) {
      case "PAIRS":
        return <Pairs layout={layout} activeObject={this.props.activeObject} elementClick={this.props.headerClick}/>
        break
      case "TABLE":
        return <Table layout={layout} activeObject={this.props.activeObject} elementClick={this.props.headerClick} />
        break
      case "GRID":
        return <Grid layout={layout} activeObject={this.props.activeObject} elementClick={this.props.headerClick} />
        break
      default: return null
    }
  }

  getclass() {}

  render() {
    return  this.buildLayout(this.props.layout)
  }
}
