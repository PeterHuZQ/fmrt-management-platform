// 存储到前端本地缓存
export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
};
// 读取
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
};
