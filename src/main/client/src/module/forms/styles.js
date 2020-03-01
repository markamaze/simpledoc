import styled from 'styled-components'
import colors from '../../colors'


export const FormPageWrapper = styled.div`
width: 100%;
max-width: 100%;
height: 100%;
max-height: 100%;
overflow: auto;

.document {
  background: ${colors.three};
  color: ${colors.four};
  flex-grow: 1;
  padding: .5rem 2rem 1rem;
  overflow: auto;

  .storage-handler-item{
    background: ${colors.four};
    color: ${colors.three};
  }
}

.container {
  display: flex;
  flex-direction: column;
  padding: .25rem;
  overflow: auto;

  .selected {
    background: ${colors.two};
    color: ${colors.one};
  }
}
.container-item{
  display: flex;
  margin: .25rem;
  flex-grow: 1;
}
.item-label{
  font-style: italic;
  font-weight: bolder;
  align-self: flex-start;
  max-width: 30%;
  min-width: 30%;
}
.container-row {
  display: flex;
  flex-direction: column;
  padding: .25rem;
  align-items: center;

  @media (min-width: 500px) {
    flex-direction: row;
  }
}

.border-bottom{
   border-bottom: solid thin lightgray;
}

.container-fill {
  display: flex;
  flex-direction: column;
  /* flex-grow: 2; */
  overflow: auto;
  background: white;
  color: black;
}

.storage-handlers{
  display: flex;
  flex-direction: row;
  margin: .5rem;
}
.storage-handler-item{
  display: flex;
  flex-grow: 1;
  justify-content: center;
  margin: .5rem;
  background: lightgray;
  cursor: pointer;
}
`

export const DocumentWrapper = styled.div``

export const EditorWrapper = styled.div``

export const CreatorWrapper = styled.div``
