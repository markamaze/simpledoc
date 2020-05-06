import React from 'react'

import tasks_reducer from './tasks_reducer'


export default module = {
  reducer: {tasks: tasks_reducer},
  onLoad: () => console.log("tasks loading not build"),
  title: "Tasks",
  path: "/tasks",
  services: {
    createTask: () => {},
    subscribeToTask: () => {},
    updateTaskStatus: () => {},
  },
  utilities: {},
  component: (state) => <div >Tasks module</div>
}
