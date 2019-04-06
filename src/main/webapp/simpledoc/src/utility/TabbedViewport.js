import React from 'react'




export default class TabbedViewport extends React.Component {
  setView(toggleitem) {
    this.props.items.forEach(item =>{
      item.label == toggleitem.label ?
        this.toggledisplay(item)
        : document.getElementById(item.label).style.display = 'none'

    })
  }

  toggledisplay(item){
    let element = document.getElementById(item.label)

    element.style.display == 'none' ?
      element.style.display = 'block'
      : element.style.display = 'none'
  }

  showTabs(){
    return  <ul className='tabset'>
              {
                this.props.items.size > 0 ? this.props.items.map(item =>
                    <li className="tabitem" onClick={()=>this.setView(item)}>
                      { item.component.displayName ? item.component.displayName : item.label }
                    </li>) : null
              }
            </ul>
  }


  render() {
    let renderTabViews = () =>
      this.props.items.map(item =><div className='tabview' id={item.label} >{item.component}</div>)

    return  <div className="tabbedview">
              { this.showTabs() }
              { renderTabViews() }
            </div>
  }
}
