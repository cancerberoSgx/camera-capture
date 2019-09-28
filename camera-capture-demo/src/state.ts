import { SupportedFormats } from 'camera-capture'

export interface State {
  mime: SupportedFormats;
}

let _state: State

export let getProp: <T extends (keyof State) >(nameOrPartial?: T) => State[T] = (nameOrPartial) => {
  if (!_state) {
    _state = getInitialState();
  }
  return _state[nameOrPartial as keyof State];
}

export function getState():State {
  return _state
}

export function setState(p:Partial<State>):void {
  Object.assign(_state, p)
}

function getInitialState(): State {
  return {
    mime: 'image/jpeg'
  };
}
