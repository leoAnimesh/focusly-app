export default (state, action) => {
  switch (action.type) {
    case "ADD_TASKS":
      return {
        ...state,
        TasksObject: [...state.TasksObject, action.payload],
      };
    default:
      return state;
  }
};
