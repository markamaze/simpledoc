import React from 'react'

import { SectionStyle } from '../../styles/formStyles'
import Layout from './Layout'


export default class Section extends React.Component {

  buildSection(section) {
    return  <SectionStyle className={`section ${this.props.activeObject === this.props.section ? 'active' : null}`} >
              { this.getHeader(section.get('label')) }
              { this.getLayouts(section.get('layouts')) }
            </SectionStyle>
  }

  getHeader(title) {
    return  <div className="header" >
              <span className='headertitle'
                    onClick={()=>this.props.headerClick(this.props.section)}>
                {title}
              </span>
              <span className='headertools'>
                { typeof this.props.injectEditor ? this.props.injectEditor : null }
              </span>
            </div>
  }

  getLayouts(layouts) {
    return  <div className="container" >
              { layouts.map(layout => <Layout layout={layout}
                                              activeObject={this.props.activeObject}
                                              headerClick={this.props.headerClick} />) }
            </div>
  }

  render() {
    return  this.buildSection(this.props.section)
  }
}
