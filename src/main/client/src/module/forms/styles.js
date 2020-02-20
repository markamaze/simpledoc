import styled from 'styled-components'


export const FormPageWrapper = styled.div`


.container {
  display: flex;
  flex-direction: column;
  padding: .25rem;
  overflow: auto;
}
.container-row {
  display: flex;
  flex-direction: row;
  padding: .25rem;
  max-height: 10rem;

  label {
    display: flex;
    flex-grow: 1;
    width: 50%;
  }
  input {
    display:flex;
    flex-grow: 1;
    width: 50%;
  }
  select {
    display: flex;
    flex-grow: 1;
    width: 50%;
  }
}

.container-fill {
  display: flex;
  flex-direction: column;
  background: white;
  color: black;
  flex-grow: 1;
  padding: .25rem;
  margin: .25rem;
  border: thin solid black;
  overflow: auto;
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
