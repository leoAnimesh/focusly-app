const deleteTask = (state, id) => {
  return state.filter((value) => {
    if (value.id !== id) {
      return value;
    }
  });
};

const updateTask = (state, id, remainingSets) => {
  return state.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        sets: item.sets - 1,
        completed: remainingSets === 0 ? true : false,
        remainder: false,
      };
    }
    return item;
  });
};

export default (state, action) => {
  switch (action.type) {
    case "ADD_FOCUS_TASKS":
      return {
        ...state,
        FocusObject: [...state.FocusObject, action.payload],
      };
    case "DELETE_FOCUS_TASK":
      return {
        ...state,
        FocusObject: deleteTask(state.FocusObject, action.payload),
      };
    case "UPDATE_FOCUS_TASK":
      return {
        ...state,
        FocusObject: updateTask(
          state.FocusObject,
          action.payload.id,
          action.payload.remainingSets
        ),
      };
    default:
      return state;
  }
};
