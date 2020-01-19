import React from 'react'
import List from './moduleComponents/List'



function AgencyPage(props){

  return  <List className="page agency-page "
              treeRoot={props.structuralNodes.find( n=>n.id===n.structuralNode_parent_id)}
              rootIdKey="id"
              treeNodeKey="structuralNode_parent_id"
              dataSet={props.structuralNodes}
              columns={[{label: "", selector: "structuralNode_label"}]}
              itemComponent={ item => item.display.call(item, props, error=>{throw new Error(`${error}: handled by Agency`)}).card}
              itemActions={[
                {label: "+", action: item => this.newChildNode(item) },
                {label: "restructure", action: item => item.display.call(item, props, error=>{throw new Error(`${error}: handled by Agency`)}).builder},
                {label: "edit", action: item => item.display.call(item, props, error=>{throw new Error(`${error}: handled by Agency`)}).editor}
              ]}
              headerComponent={<div className="page-header">Agency Overview</div>} />
}

function TemplatesManagerPage(props){

  return  <List
              dataSet={props.agentTemplates}
              columns={[
                {label: "label", selector: "agentTemplate_label"},
                // {label: "Password", selector: "password"},
                {label: "Id", selector: "id"}
              ]}
              itemComponent={ item => item.display.call(item, props, error => { throw new Error(`${error}: handled by Agency`)}).card}
              itemActions={[
                {label: "modify", action: item => item.display.call(item, props, error => { throw new Error(`${error}@UsersManagerPage@Agency`)}).builder}
              ]}
              headerComponent={<div className="page-header">Manage Agency TemplatesManagerPage</div>} />
}

function DataTagsManagerPage(props){

  return  <List
              dataSet={props.dataTags}
              columns={[
                {label: "label", selector: "dataTag_label"},
                {label: "Id", selector: "id"}
              ]}
              itemComponent={ item => item.display.call(item, props, error => { throw new Error(`${error}: handled by Agency`)}).card}
              itemActions={[
                {label: "modify", action: item => item.display.call(item, props, error => { throw new Error(`${error}@DataTagsManagerPage@Agency`)}).builder}
              ]}
              headerComponent={<div className="page-header">Manage Agency DataTagsManagerPage</div>} />
}

function UsersManagerPage(props){

  return  <List
              dataSet={props.users}
              columns={[
                {label: "Username", selector: "username"},
                {label: "userId", selector: "id"}
              ]}
              itemComponent={ item => item.display.call(item, props, error => { throw new Error(`${error}: handled by Agency`)}).card}
              itemActions={[
                {label: "modify", action: item => item.display.call(item, props, error => { throw new Error(`${error}@UsersManagerPage@Agency`)}).builder}
              ]}
              headerComponent={<div className="page-header">Manage Agency Users</div>} />

}


export default function Agency(props){
  const [activePage, setActivePage] = React.useState("agency")
  const loadActivePage = () => {

  }

  const pages = pageProps => ({
    agency: <AgencyPage {...pageProps} />,
    templates: <TemplatesManagerPage {...pageProps} />,
    dataTags: <DataTagsManagerPage {...pageProps} />,
    users: <UsersManagerPage {...pageProps} />
  })

  return  <div>
            <div style={{display:"flex"}}>
              {
                Object.keys(pages()).map( pageKey =>
                    <div onClick={() => setActivePage(pageKey)}
                          style={{width: "25%", margin:"0 auto", padding: ".5rem"}} >
                      {pageKey}
                    </div>)
              }
            </div>
            { pages(props)[activePage] }
          </div>
}
