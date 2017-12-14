// first arg is the state object
// second arg is the action that was dispatched
// if the initial state is undefined return null
export default (state = null, action) => {
  switch (action.type) {
    case 'select_library':
      return action.payload;
    default:
    // if unknown type, return the old state
      return state;
  }
};
