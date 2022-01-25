import { createStore, combineReducers } from "redux";
//import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit"
//action types
const SET_STATS:string="SET_STATS"

//action creators
export type statGroup= [number, number, number, number, number, number,]
type setStatAction ={
  type: string;
  stats: statGroup
}
export const setStats=(stats:statGroup):setStatAction=>{
  return {
    type: SET_STATS,
    stats
  }
}
const initialStateStatSet: statGroup=[0,0,0,0,0,0]

//reducer
const statsReducer= (state:statGroup= initialStateStatSet, action: setStatAction): statGroup=>{
  switch(action.type){
    case SET_STATS:
      return action.stats;
    default:
      return state
  }
}
const rootReducer= combineReducers({
    stats: statsReducer
})

export const store= createStore(rootReducer)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

