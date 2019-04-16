import React from 'react'
import Toolbar from '../utility/Toolbar'
import StyledLink from '../utility/StyledLink'


export const agencyToolbar = <Toolbar column >
              <StyledLink to="/" label=">>" />
              <StyledLink to="/Agency/Forms" label="Forms" />
              <StyledLink to="/Agency/Programs" label="Programs" />
              <StyledLink to="/Agency/Users" label="Users" />
              <StyledLink to="/Agency/Positions" label="Positions" />
              <StyledLink to="/Agency/Clients" label="Clients" />
            </Toolbar>
