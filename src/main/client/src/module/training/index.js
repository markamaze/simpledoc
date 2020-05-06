import React from 'react'

import training_reducer from './training_reducer'


export default module = {
  reducer: {training: training_reducer},
  onLoad: () => console.log("training loading not build"),
  title: "Training",
  path: "/training",
  publicServices: {
    testTrainingService: () => {}
  },
  publicUtility: {},
  component: (state, services) => <div >training module</div>
}
