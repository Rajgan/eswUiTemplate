import { Action } from '@ngrx/store';

export enum PreferencesActionTypes {
    SetLanguage = '[Preferences] Set Language',
}

export class SetLanguage implements Action {
  readonly type = PreferencesActionTypes.SetLanguage;

  constructor(public payload: string) {}
}

export type PreferencesActionsUnion = SetLanguage;
