/**
 * 通用js方法封装处理
 */
import { getToken } from '@/utils/auth'
import querystring from 'querystring'

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

// 添加日期范围
export function addDateRange(params, dateRange) {
  var search = params
  search.beginTime = ''
  search.endTime = ''
  if (dateRange != null && dateRange != '') {
    search.beginTime = this.dateRange[0]
    search.endTime = this.dateRange[1]
  }
  return search
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  var actions = []
  Object.keys(datas).map(key => {
    if (datas[key].dictValue == '' + value) {
      actions.push(datas[key].dictLabel)
      return false
    }
  })
  return actions.join('')
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments
  var flag = true
  var i = 1
  str = str.replace(/%s/g, function() {
    var arg = args[i++]
    if (typeof arg === 'undefined') {
      flag = false
      return ''
    }
    return arg
  })
  return flag ? str : ''
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str == 'undefined' || str == 'null') {
    return ''
  }
  return str
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
  id = id || 'id'
  parentId = parentId || 'parentId'
  children = children || 'children'
  rootId = rootId || 0
  // 对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  // 循环所有项
  const treeData = cloneData.filter(father => {
    const branchArr = cloneData.filter(child => {
      // 返回每一项的子级数组
      return father[id] === child[parentId]
    })
    branchArr.length > 0 ? (father.children = branchArr) : ''
    // 返回第一层
    return father[parentId] === rootId
  })
  return treeData != '' ? treeData : data
}

/**
 * 字典值转换为标签
 * @param {object} dict
 * @param {number|String} val
 */
export function parseDictVal2Label(dict, val) {
  let label = ''
  for (var i = 0; i < dict.length; i++) {
    if (dict[i].dictValue == val) {
      label = dict[i].dictLabel
      break
    }
  }
  return label
}

/**
 * 字典值转键
 * @param {object} dict
 * @param {String} label
 */
export function parseDictLabel2Val(dict, label) {
  let val = ''
  label += ''
  for (var i = 0; i < dict.length; i++) {
    const dictLabel = dict[i].dictLabel + ''
    if (dictLabel.trim() == label.trim()) {
      val = dict[i].dictValue
      break
    }
  }
  return val
}

/**
 * @param {Array} array 数组
 * @param {number|String} val 要转换的值
 * @param {number|String} valName 要转换的值的键名
 * @param {number|String} labelName 要转换的值对应文字的键名
 */
export function parseValToLabel(array, val, valName, labelName) {
  val += ''
  const valArr = val.split(',')
  const targets = []
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (valArr.includes(element[valName] + '')) {
      targets.push(element[labelName])
    }
  }
  return targets.toString()
}

export function runNum(str, fixed) {
  let _s = Number(str)
  if (_s + '' === 'NaN') {
    _s = 0
  }
  if (/^[0-9]*[1-9][0-9]*$/.test(fixed)) {
    _s = _s.toFixed(fixed)
    const rs = _s.indexOf('.')
    if (rs < 0) {
      _s += '.'
      for (let i = 0; i < fixed; i++) {
        _s += '0'
      }
    }
  }
  return _s
}

export function rightExists(string, find, lower = false) {
  string += ''
  find += ''
  if (lower !== true) {
    string = string.toLowerCase()
    find = find.toLowerCase()
  }
  return string.substring(string.length - find.length) === find
}

// 通用下载方法
export function download(path, params) {
  params.Authorization = getToken()
  const url =
    process.env.VUE_APP_BASE_API +
    'api/v1/' +
    path +
    '?' +
    querystring.stringify(params)
  window.location.href = url
}
