/*
发送ajax请求的模块
函数的返回值是promise对象
 */
import axios from 'axios'

export default function ajax(url, data= {}, type='GET'){
  return new Promise(function (resolve, reject) {
    let promise;
    if(type==='GET'){// GET请求
      // 将data中所有数据作为请求参数拼到url中
      let queryStr = '';
      Object.keys(data).forEach(key =>{
        const value = data[key];
        queryStr += key + '=' + value + '&'
      })
      if(queryStr){
        queryStr = queryStr.substring(0,queryStr.length-1) // username=tom&password=123
        queryStr = '?' + queryStr
      }
      promise = axios.get(url + queryStr)
    }else{
      promise = axios.post(url,data)
    }
    promise.then(response =>{
      resolve(response.data)
    }).catch(error => {
      // 请求失败
      reject(error)
    })
  })
}
