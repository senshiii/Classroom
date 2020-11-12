import { combineReducers } from "redux";

import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import classroomReducer from "./classroomReducer";
import infoReducer from "./infoReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  classroom: classroomReducer,
  info: infoReducer,
});

export default rootReducer;
