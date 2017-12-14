import { combineReducers } from 'redux';
import LibraryReducer from './LibraryReducer';
import SelectionReducer from './SelectionReducer';

// The keys names specified into the combineReducers method
// will be the name of the piece of state
export default combineReducers({
  libraries: LibraryReducer,
  selectedLibraryId: SelectionReducer
});
