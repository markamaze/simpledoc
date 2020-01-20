import React from 'react'
import styled from 'styled-components'
import List from '../module/agency/moduleComponents/List'
import colors from '../colors'
import { createBrowserHistory } from 'history'


// const StyleWrapper = styled.div`
//
//   display: flex;
//   flex-direction: row;
//
//   @media (min-width: 500px){
//     flex-direction: row;
//   }
//   header {
//     display: inline-flex;
//     font-size: 4vh + 4vw;
//     flex-grow: 2;
//     padding: 1rem;
//     text-align: center;
//     width: 75%;
//   }
//
//   nav .expanded{
//     display: block;
//     position: absolute;
//     top: 0;
//     right: 0;
//     width: 50%;
//     height: 50%;
//   }
//   nav .collapsed{
//     display: flex;
//     width: 30%;
//   }
//
// `

const StyleWrapper = styled.div`
  .dropdown{
    display: flex,
    width: 25%,

  }
  .dropdown select{
    background: blue,
    font-size: larger,
    display: flex
  }
`



export default function Header(props){


  // const buildModuleNav = routes =>


  return  <StyleWrapper>
            <header>Simpledoc: Auto Clerk</header>
            <nav>
              <div className="dropdown">
                <select onChange={()=> props.pushHistory(event.target.value, {stateKey: "value"})}
                        value={props.location.pathname}>
                  { props.routes.map(route =>
                      !route.routes ? <option key={`header-link-module-${route.path}`} value={route.path}>{route.title}</option> :
                      <optgroup label={route.title} key={`header-optgroup-${route.path}`}>
                      {
                        Object.values(route.routes).map(subroute =>
                          <option key={`header-sublink-module-${subroute.path}-${subroute.title}`} value={subroute.path}>{subroute.title}</option>)
                      }
                      </optgroup>)
                  }
                </select>
              </div>
            </nav>
          </StyleWrapper>
}
