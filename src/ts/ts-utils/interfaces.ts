import { CallbackFn } from "./types";

export interface UserProps {
  name?: string;
  age?: number;
}

export interface EventsData {
  [key: string]: CallbackFn[];
}
