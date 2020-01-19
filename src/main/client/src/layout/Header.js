import React from 'react'
import styled from 'styled-components'

import colors from '../colors'


const StyleWrapper = styled.div`

  display: flex;
  flex-direction: row;
  background: ${colors.three};
  color: ${colors.four};

  @media (min-width: 500px){
    flex-direction: row;
  }
  header {
    display: inline-flex;
    font-size: 4vh + 4vw;
    flex-grow: 2;
    padding: 1rem;
    text-align: center;
    width: 75%;
  }

  nav .expanded{
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    background: blueviolet;
    color: ${colors.four};
  }
  nav .collapsed{
    display: flex;
    width: 30%;
  }

`

export default function Header(props){
  const [expandMenu, toggleMenu] = React.useState(false)

  const handleLinkClick = link => {
    props.setActive(link)
    toggleMenu(!expandMenu)
  }

  return  <StyleWrapper>
            <header>Simpledoc: Auto Clerk</header>
            <nav>
              {
                expandMenu ?
                  <div className="expanded">
                    {props.links.map( link => <div className="link" onClick={() => handleLinkClick(`${link}`)}>{link}</div>)}
                  </div>
                  : <div className="collapsed" onClick={()=>toggleMenu(!expandMenu)}>{props.active}</div>
              }

            </nav>
          </StyleWrapper>
}
