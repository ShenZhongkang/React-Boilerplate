import md5 from 'blueimp-md5';
import { flatObj } from './fn';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request(url, options = {}) {
  const fetchResponse = await fetch(url, options);
  const response = await checkStatus(fetchResponse);
  return parseJSON(response);
}

export const get = (url, options) => request(url, options);

export const getWithArgs = (url, args = {}, options = {}) => {
  for (const attr in args) {
    if (args[attr] === undefined || args[attr] === null) {
      delete args[attr];
    }
  }
  let keys = Object.keys(args);
  keys = keys.map(key => {
    if (options.isEncode) {
      return `${key}=${encodeURIComponent(args[key])}`;
    }
    return `${key}=${args[key]}`;
  }).join('&');
  url = `${url}?${keys}`;
  return get(url, options);
};

export const post = (url, data, options) => {
  const opts = {
    ...options,
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  return request(url, opts);
};

export const postFile = (url, data, options) => {
  const opts = {
    ...options,
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Accept: '*/*',
      'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryiqw6SEM6EXa7FlBk',
      authorization: 'authorization-text'
    },
    body: JSON.stringify(data)
  };
  return request(url, opts);
};

export const del = (url, data, options) => {
  const opts = {
    ...options,
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  return request(url, opts);
};

const injectSign = rawData => {
  const requestTime = new Date() - 0;
  const shallowData = JSON.parse(JSON.stringify(rawData));
  shallowData.requestTime = requestTime;
  shallowData.sign = md5(flatObj(shallowData) + (secretKey.sk || ''));
  return shallowData;
};

const secretKey = new Proxy({}, {
  get: (target, key) => {
    if (key === 'sk') {
      return Reflect.get(target, Symbol.for(key));
    }
    return undefined;
  },
  set: (target, key, value) => {
    if (key === 'sk') {
      return Reflect.set(target, Symbol.for(key), value);
    }
  }
});