// axios网络请求--二次封装
import axios from "axios"
axios.defaults.baseURL = "http://localhost:3000";
// const request=axios.create({
//     baseURL : "http://localhost:3000"
// })
export default axios;
// export default request;