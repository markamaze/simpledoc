import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import TagWrapper from './moduleComponents/TagWrapper'
import * as workspace_actions from '../workspace/workspace_actions'
import * as agency_actions from './module_actions'
import colors from '../../colors'


const Wrapper = styled.div`
  background: ${colors.four};
  color: ${colors.three};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem;
  height: auto;
  min-height: 100%;
  align-items: stretch;
  div:empty {
    display: none;
  }

  .structure {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: .5rem;
    margin: .5rem;
    border: 1px solid ${colors.three};
    border-radius: .5rem;
    width: 100%;

    @media (max-width: 700px) {
      width: 100%;
    }
  }

  .structure-min {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
    margin: 0;
    max-height: 1.5rem;
  }
  header {
    display: block;
    width: 100%;
    max-height: 2rem;
    font-weight: bold;
  }
  .structure-min header {
    font-weight: normal;
  }
  .agent-templates {
    font-size: .8rem;
    header {
      font-size: .8rem;
    }
  }
  .tags {
    display: flex;
    flex-direction: column;
    padding: .5rem;
  }
  .child-structures {
    display: flex;
    flex-grow: 2;
  }
  .active-agents {
    margin-left: 1rem;
    background: lightgray;
  }

  .filters {
    display: flex;
    width: 100%;
    background: white;
    border: thin solid black;
  }
  .agency-filter {
    padding: 1rem;
  }
  .display-filter {
    padding: 1rem;
  }
`
class AgencyOrganization extends React.Component {


  buildOrganization(id, depthIndex) {
    let children = this.getChildrenStructures(id)
    let depth = ++depthIndex

    return children.map( child => depth > 2 ?
                <div className="structure-min" depth={depth} style={{ paddingLeft: depth + "rem"}}>
                  <header>{child.label}</header>
                  { this.buildOrganization(child.id, depth)}
                </div> :
                <div className="structure" depth={depth} >
                  <div className="general-info">
                    <header>{child.label}</header>
                    <div className="tags">{this.loadTags(child)}</div>
                    <div className="agent-templates">
                      <header>Agent Templates</header>
                      {
                        this.getAgentTemplates(child).map( template => {
                          return  <div>
                                    <span>{template.label}</span>
                                    <span className="active-agents">
                                      { this.getActiveAgents(child.id, template.id).map( agent => agent.label) }
                                    </span>
                                  </div> })}

                    </div>
                  </div>
                  <div className="child-structures">{ this.buildOrganization(child.id, depth) }</div>
                </div>)

  }

  getActiveAgents(structureId, templateId){
    return this.props.agents.filter( agent => agent.agentLink === structureId && agent.templateId === templateId )
  }

  loadTags(structure){
    let tagIds = structure.dataTags
    return tagIds.map( tagid => <TagWrapper>{this.props.dataTags.find( tag => tag.id === tagid).label}</TagWrapper>)
  }

  getChildrenStructures(id) {
    return this.props.agencyStructures.filter( structure => structure.parentId === id )
  }

  getAgentTemplates(structure){
    let templates = []

    structure.agentAssignments.forEach( item => {
      let template = this.props.agentTemplates.find( template => template.id === item.id)
      let index = item.limit
      while(index > 0){
        templates = Object.assign([], templates.concat(template))
        --index
      }

    })


    return templates
  }

  agencyFilter() {

    return  <div className="agency-filter">
              <form>
                <fieldset>
                  <label name="filter-structure-branch">structure branch</label>
                  <select name="filter-structure-branch">
                    {
                      this.props.agencyStructures.map(structure =>
                        <option value={structure.id}>{structure.label}</option>)
                    }
                  </select>

                </fieldset>
                <fieldset>
                  <label name="filter-by-tag">filter by tag</label>
                  <select name="filter-by-tag">
                    { this.props.dataTags.map(tag => <option value={tag.id}>{tag.label}</option>) }
                  </select>
                </fieldset>
              </form>
            </div>
  }

  displayFilter(){
    return  <div className="display-filter">
              <form>
                <fieldset>
                  <label name="display-agent-templates">show agent templates</label>

                </fieldset>
                <fieldset>
                  <label name="display-tags">show data tags</label>

                </fieldset>
                <fieldset>
                  <label name="display-active-agents">show active agents</label>

                </fieldset>
                <fieldset>

                </fieldset>
              </form>
            </div>
  }

  render() {
    let root = this.props.agencyStructures.find( structure => structure.parentId === "root")
    return  <Wrapper>
              <div className="filters">
                { this.agencyFilter() }
                { this.displayFilter() }
              </div>
              <header>{root.label}</header>
              { this.buildOrganization(root.id, 0) }
            </Wrapper>

  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    agents: state.agency.agents,
    agencyStructures: state.agency.structuralNodes,
    agentTemplates: state.agency.agentTemplates,
    dataTags: state.agency.dataTags,
    users: state.agency.users,
    temp_state: state.workspace.savedTempState,
    workspace_actions: workspace_actions,
    agency_actions: agency_actions
  }
}

export default connect(mapStateToProps)(AgencyOrganization)
