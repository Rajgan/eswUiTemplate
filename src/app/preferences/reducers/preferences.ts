import { PreferencesActionTypes, PreferencesActionsUnion } from '../actions/preferences';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface PreferencesState {
    language: string;
}

const initialState: PreferencesState = {
    language: 'en',
};

export function reducer(state: PreferencesState = initialState, action: PreferencesActionsUnion): PreferencesState {
  switch (action.type) {
    case PreferencesActionTypes.SetLanguage:
      return {
        language: action.payload,
      };

    default:
      return state;
  }
}

export const getPrefState = createFeatureSelector<PreferencesState>('preferences');
export const getLanguage = createSelector(getPrefState, (state: PreferencesState) => state.language);

