import { createFeatureSelector } from "@ngrx/store";
import { RouterReducerState, AppState } from "./_reducers";

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState
>("router");
