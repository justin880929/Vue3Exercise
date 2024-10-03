//對axios二次封裝
import axios from "axios";
//創建axios實例
const dataRequests = axios.create({
  //配置對象
  //基礎路徑，發請求時，路徑會出現api
  baseURL: `https://api.jsonbin.io/v3`,
  //請求超時時間
  timeout: 5000,
});
dataRequests.interceptors.request.use(function (config) {
  // 在發送請求之前添加header
  config.headers['Content-Type'] = "application/json";
  config.headers['X-Master-Key'] = "$2a$10$gEFoKNtRQWyx2Vzm5FbyR.kA2JCqNEsSOzThL2ki2ervQ8vt14QA6";
  config.headers['X-JSON-Path']= "$.echartsData"
  config.headers['X-Bin-Meta'] = false;
  return config;
}, function (error) {
  // 對請求錯誤做些甚麼
  return Promise.reject(error);
});
dataRequests.interceptors.response.use(function (res) {
  return res.data;
}, function (error) {
  return Promise.reject(error);
});
//對外暴露
export const reqData=()=>dataRequests({url:`/b/66fd5018e41b4d34e43bcc46`,method:'get'});
