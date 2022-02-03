import React, { createContext, useReducer } from "react";
import TasksReducer from "./TasksReducer";

const InitialState = {
  TasksObject: [],
};

export const TasksContext = createContext(InitialState);

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TasksReducer, InitialState);
  const addTasks = (tasks) => {
    dispatch({
      type: "ADD_TASKS",
      payload: tasks,
    });
  };

  return (
    <TasksContext.Provider value={{ TaskObject: state.TaskObject, addTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
