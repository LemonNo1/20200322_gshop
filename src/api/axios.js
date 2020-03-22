//封装axios
import Axios from 'axios';
import Qs from 'qs';

let hostPortPlusPath = "9066/res"   //线上和测试环境端口?
// let hostPortPlusPath = "8066/res"     //本地开发环境端口
export let requestURL = "http://" + document.location.hostname + ":" + hostPortPlusPath


export function Request(url, data, method) {
  let axios = Axios.create({
    withCredentials: true,
    // baseURL: process.env.API_ROOT,
    timeout: 1000 * 60,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Access-Control-Expose-Headers': ['Content-Disposition'],
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
    }
  });
  data = Qs.stringify(data)
  axios.defaults.withCredentials = true;       //允许cookie
  axios.defaults.headers.common['Visti-Origin'] = requestURL;  //设置域名
  return new Promise((resolve, reject) => {
    if (!method) {//
      axios.post(requestURL + url, data)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err)
        })
    } else {//有第三个参数就是get请求
      axios.get(requestURL + url, {
        params: data
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err)
        })
    }
  }).catch(err => console.log(err))
}
