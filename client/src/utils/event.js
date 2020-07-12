const listeners = {};

/**
 * @param {string} name 
 */
export function get(name) {
  return listeners[name] ?? [];
}

/**
 * @param {string} name 
 * @param {any} data 
 */
export function emit(name, data) {
  listeners[name]
}
