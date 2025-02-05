import 'react-native-url-polyfill/auto';

declare global {
  function setImmediate(callback: (...args: any[]) => void, ...args: any[]): number;
  function clearImmediate(id: number): void;
}

// @ts-ignore
if (typeof global.setImmediate === 'undefined') {
  // @ts-ignore
  global.setImmediate = function(callback, ...args) {
    return setTimeout(callback, 0, ...args);
  };
}

// @ts-ignore
if (typeof global.clearImmediate === 'undefined') {
  // @ts-ignore
  global.clearImmediate = function(id) {
    clearTimeout(id);
  };
}
