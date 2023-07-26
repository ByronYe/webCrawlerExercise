const axios = require('axios').default

const HEADER = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  Referer: 'http://www.baidu.com/',
}

function get ({ url, params, headers } = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url || 'http://www.baidu.com', {
      headers: { ...HEADER, ...headers },
      params,
    })
      .then(result => {
        const { data, status } = result
        if (status === 200) {
          resolve(data)
        } else {
          reject(new Error(`status: ${status}`))
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

const http = {
  get,
}

module.exports = {
  http,
}
