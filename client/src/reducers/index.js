import { combineReducers } from "redux";
import userReducer from "./auth";
import postsReducer from "./posts";
import themeReducer from "./theme";

export const reducers = combineReducers(
    {
        postsReducer,
        userReducer,
        themeReducer
    }
);