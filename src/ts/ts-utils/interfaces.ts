import { CallbackFn } from "./types";
import { AxiosPromise } from "axios";

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

export interface ModelAttributes<T> {
  getAttr<K extends keyof T>(key: K): T[K];
  setAttr(update: T): void;
  getAllAttrs(): T;
}

export interface ModelEvents {
  on(eventName: string, callback: CallbackFn): void;
  trigger(eventName: string): void;
}

export interface ModelSync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}
