import Immutable from 'immutable';
import axios from './api';
import qs from 'qs';

const call = ({ method, route, data, params, api }) => {
    const operation = axios.request({
      baseURL: api,
      url: route,
      method,
      data,
      params,
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
    });
    
    return new Promise((resolve, reject) => {
        operation
        .then(res => {
            if(res.status >= 200 && res.status < 300) {
                // Response was good! Let's parse it and resolve
                if (!res.data) return resolve({ data: res.data });
                const immutableJson = Immutable.fromJS(res.data);
                const _data = immutableJson.get ? immutableJson.get('data') : immutableJson;
                if (_data) return resolve({ data: _data, meta: immutableJson.get && immutableJson.get('meta') });
                return resolve({ data: immutableJson });
            }

             // Response was bad, let's throw an error
            const error = new Error('IMGUR API Error!');
            error.details = Immutable.fromJS(res.data);
            return reject(error);
        })
        .catch(err => {
                console.log(err, 'err');
                const error = new Error('Error while fetching from Imgur API');
                error.details = err;
                return reject(error);
            });
    });
}

const post = ({ route, api, params, data }) => {
    return call({ method: 'POST', route, api, params, data });
};
const put = ({ route, api, params, data }) => {
    return call({ method: 'PUT', route, api, params, data });
};  
const get = ({ route, api, params }) => {
    return call({ method: 'GET', route, api, params });
}; 
const patch = ({ route, api, params, data }) => {
    return call({ method: 'PATCH', route, api, params, data });
};
const _delete = ({ route, api, params, data }) => {
    return call({ method: 'DELETE', route, api, params, data });
};

  // eslint-disable-next-line import/no-anonymous-default-export
  export default {
    call,
    post,
    put,
    get,
    patch,
    delete: _delete
  };