const { carwler } = require('./src/webCarwler')

carwler()
  .then(res => {
    console.log(res)
  })
