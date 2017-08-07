 // option = {
 //   RequestHeader: Object 请求头
 //   url: String 请求地址
 //   query: Object 请求参数
 //   method: String 请求方法
 // }
export default function (option) {
  var promise = new Promise(function (resolve, reject) {
    var xmlhttp = new XMLHttpRequest()
    var data = ''
     //设置请求头
    if (option.RequestHeader) {
      for (let key in option.RequestHeader) {
        if (option.RequestHeader.hasOwnProperty(key)) {
          xmlhttp.setRequestHeader(key, option.RequestHeader[key])
        }
      }
    }
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState !== 4) {
        return
      }
      if ([200, 304].indexOf(xmlhttp.status) === -1) {
        reject('Server responded with a status of ' + xmlhttp.status);
      } else {
        resolve(xmlhttp.responseText);
      }
    }
     //编辑请求数据
    if (option.query) {
      for (let key in option.query) {
        if (option.query.hasOwnProperty(key)) {
          data += key + "=" + option.query[key] + "&"
        }
      }
    }
    data = data.slice(0,data.length-1)
     //根据请求方法编辑数据并发送请求
    option.method = option.method.toUpperCase()
    if (option.method === "GET") {
      xmlhttp.open("GET", option.url + "?" + data, true)
      xmlhttp.send()
    } else {
      xmlhttp.open("POST", option.url, true)
      xmlhttp.send(data)
    }
  })
  return promise
}