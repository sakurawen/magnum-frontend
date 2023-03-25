import { DependencyList, useEffect } from 'react';

type Key =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

export const Control = 0b00000001;
export const Alt = 0b00000010;
export const Shift = 0b00000100;
type CombineKey = 1 | 2 | 4;
type GlobalKeyListener = (this: void, ev: KeyboardEvent) => any;

const hasCombineKey = (all: number, combinationKey: CombineKey) => {
  return (all & combinationKey) === combinationKey;
};

const keyDownSet = new Set();

/**
 * 注册全局事件监听，支持a-z+ctrl、alt、shift最多四个按键组合
 * @param key
 * @param listener
 * @param options
 * @param deps
 */
export const useHotKey = (
  [key, combineKey]: [Key, CombineKey[]],
  callback: GlobalKeyListener,
  deps?: DependencyList,
) => {
  useEffect(() => {
    const keyDownHandler: GlobalKeyListener = (e) => {
      const downKey = e.key.toLowerCase();
      if (downKey !== key) return;
      e.preventDefault();
      const select = combineKey.reduce((acc, cur) => acc | cur, 0);
      if (keyDownSet.has(key)) {
        return;
      }
      keyDownSet.add(key);
      const ctrlDown = e.ctrlKey;
      const altDown = e.altKey;
      const shiftDown = e.shiftKey;
      if (hasCombineKey(select, Control) && !ctrlDown) return;
      if (hasCombineKey(select, Alt) && !altDown) return;
      if (hasCombineKey(select, Shift) && !shiftDown) return;
      callback(e);
    };
    const handleKeyUp: GlobalKeyListener = (e) => {
      const key = e.key.toLowerCase();
      keyDownSet.delete(key);
    };
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, deps);
};
