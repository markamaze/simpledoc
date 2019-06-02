import styled from 'styled-components'


export const appStyle = {
  body: {
    position: "fixed",
    display: "flex",
    minWidth: "100%",
    minHeight: "100%",
    top: "0",
    left: "0",
    boxSizing: "borderBox"
  }
}


export const Container = styled.div`
  display: flex;
  box-sizing: border-box;
`

export const ModulePageWrapper = styled(Container)`
  min-width: 100%;
  max-width: 100%;
`
