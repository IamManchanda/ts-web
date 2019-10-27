import { CallbackFn } from "./types";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export interface HasId {
  id?: number;
}

export interface EventsData {
  [key: string]: CallbackFn[];
}
