const axios = require('axios').default

function get ({ url } = {}) {
  axios.get(url || 'http://www.baidu.com')
    .then(function (response) {
      console.log(response)
      console.log(1)
    })
    .catch(function (error) {
      console.log(error)
      console.log(1)
    })
    .finally(function () {
    })
}

const http = {
  get
}

module.exports = {
  http
}
