import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import checkScreen from '../modules/checkScreen/CheckScreenState';
import gallery from '../modules/gallery/GalleryState';
import app from '../modules/AppState';
import calendar from '../modules/calendar/CalendarState';
import charts from '../modules/charts/ChartsState';
import chat from '../modules/chat/ChatState';
import posts from '../modules/blog/PostsState'

export default combineReducers({
  // ## Generator Reducers
  checkScreen,
  gallery,
  app,
  calendar,
  charts,
  chat,
  posts,
});
