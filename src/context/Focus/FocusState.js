import React, { createContext, useReducer } from "react";
import FocusReducer from "./FocusReducer";
const InitialState = {
  FocusObject: [],
};

export const FocusContext = createContext(InitialState);

export const FocusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FocusReducer, InitialState);
  //Actions
  const addFocusTasks = (focusObj) => {
    dispatch({
      type: "ADD_FOCUS_TASKS",
      payload: focusObj,
    });
  };

  const deleteFocusTask = (id) => {
    dispatch({
      type: "DELETE_FOCUS_TASK",
      payload: id,
    });
    console.log("deleted");
  };

  const updateFocusTask = (id) => {
    dispatch({
      type: "UPDATE_FOCUS_TASK",
      payload: id,
    });
  };

  return (
    <FocusContext.Provider
      value={{
        FocusObject: state.FocusObject,
        addFocusTasks,
        deleteFocusTask,
        updateFocusTask,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};
