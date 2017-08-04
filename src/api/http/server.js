import qs from 'qs'
import http from 'axios'

export default {
  get(url, config = {}) {
    return http({ ...config, method: 'get', url })
  },
  post(url, data, config = {}) {
    return http({
      ...config,
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...config.headers
      },
      transformRequest: [qs.stringify]
    })
  }
}
