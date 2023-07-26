const { http } = require('../axios')
const cheerio = require('cheerio')

async function carwler () {
  const html = await getHtml()
  const $ = cheerio.load(html)

  const { totalPage } = getPage($)
  const htmls = await getHTMLs({ totalPage, $ })
  const list = getList({ htmls })
  return list
}

function getHtml ({ params } = {}) {
  return http.get({
    url: 'https://cnodejs.org/',
    params: {
      tab: 'all',
      page: 1,
      ...params,
    },
  })
}
function getPage ($) {
  const pageEl = $('.pagination')
  const totalPage = Number(pageEl.find('li').last().find('a').attr('href').slice(-1))
  return {
    totalPage,
  }
}
function getHTMLs ({ totalPage, $ }) {
  const promises = [...Array(totalPage)].map((current, index) => {
    return getHtml({
      params: {
        page: index + 1,
      },
    })
  })
  return Promise.all(promises)
}
function getList ({ htmls }) {
  const list = []
  htmls.forEach(html => {
    const $ = cheerio.load(html)
    const articlesEl = $('#topic_list>.cell')
    const articles = articlesEl.map(function (index, element, array) {
      let titleStr = $(element).find('.topic_title_wrapper a').text()
      titleStr = titleStr.replace('\n', '').trim()
      return {
        titleStr,
      }
    }).get()
    list.push(...articles)
  })
  return list.concat()
}

module.exports = {
  carwler,
}
