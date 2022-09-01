const idxs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'].reduce((a, c, i) => ({ ...a, [c.toLocaleUpperCase()]: i }), {})
export const hdexcel = (data) => {
  const obj = { floors: [] }
  let floor = ''
  let room = ''
  let roomstart = 0
  const table = []
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const index = idxs[key[0]]
      if (index > -1) {
        table[key.slice(1)] = table[key.slice(1)] || []
        table[key.slice(1)][index] = data[key].w.replaceAll(' ', '')
      }
    }
  }
  // console.log(table)
  table.forEach((_, i) => {
    const key = ['', 'cmp', 'bjd', 'name', 'head', 'sub'][i]
    if (key) obj[key] = _
    else if (_.length === 2 && _[0] === undefined && _[1]) {
      if (floor) obj.floors.push(floor)
      floor = { title: _, rooms: [] }
    } else if (_[0] > 0) {
      roomstart = 1
      _[6] = _[6] || ''
      _[7] = _[7] || ''
      if (!(table[i - 1][0] > 0)) room = { title: table[i - 1], ctt: [_] }
      else room.ctt.push(_)
    }
    if (!(_[0] > 0)) {
      if (roomstart) floor.rooms.push(room)
      roomstart = 0
    }
  })
  obj.floors.push(floor)
  console.log(obj)
  return obj
}
export const countdata = (data, _this) => {
  const terms = []
  data.total = []
  data.total[2] = data.floors.map(_ => _.title[1]).join('、') + '总计'
  data.total[7] = +data.floors.reduce((aaa, _) => {
    _.total = []
    _.total[2] = _.title[1] + '合计'
    _.total[7] = +_.rooms.reduce((aa, j) => {
      j.total = []
      j.total[2] = '小计'
      j.total[7] = +j.ctt.reduce((a, c) => {
        terms.push(c)
        c[7] = (+c[5] * (+c[6] || 0)).toFixed(2)
        return +c[7] + a
      }, 0)
      j.total[7] = j.total[7].toFixed(2)
      return aa + +j.total[7]
    }, 0)
    _.total[7] = _.total[7].toFixed(2)
    return aaa + +_.total[7]
  }, 0)
  data.total[7] = data.total[7].toFixed(2)
  _this.terms = terms
  const keys = [...new Set(terms.map(_ => _[2]))]
  const rterms = [...keys.map(i => {
    const term = terms.find(_ => _[2] === i)
    return [...term.slice(1, 5), term[6]]
  }), ...(JSON.parse(localStorage.terms || null) || [])]
  const tkeys = [...new Set(rterms.map(_ => _[1]))].map(_ => rterms.find(i => i[1] === _))
  localStorage.terms = JSON.stringify(tkeys)
  console.log(tkeys)
}

export const bFileReader = (file) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = (e) => resolve(e.target.result) // CHANGE to whatever function you want which would eventually call resolve
    fr.onerror = reject
    fr.readAsBinaryString(file)
  })
}
// 页面
export function download(url, fileName) {
  const eleLink = document.createElement('a')
  eleLink.download = fileName
  eleLink.href = url
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}
