import React from 'react'

import communications_reducer from './communications_reducer'


export default module = {
  reducer: {communications: communications_reducer},
  onLoad: () => console.log("communications loading not build"),
  title: "Communications",
  path: "/communications",
  services: {
    createMessage: () => {},
    postBanner: () => {},
    createAlert: () => {}
  },
  utilities: {
    updateMessageState: () => {}
  },
  component: (state) => <div >Communications module</div>
}
