import { StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { RootState } from './store';

export type Action = { type: string; payload?: any, error?: any; };
export type EpicAction = Observable<{ type: string; payload?: any, error?: any; }>;
export type EpicRootState = StateObservable<RootState>;
