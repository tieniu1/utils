import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import axios from "axios";
import { BASE_URL, timeout } from "./config";



//  导出Request类,可以自定义配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置,url和超时时间
  baseConfig: AxiosRequestConfig = { baseURL: BASE_URL, timeout };

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例,配置为基础配置和传递进来的配置
    this.instance = axios.create(Object.assign(this.baseConfig, config));
    //  请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 一般会请求拦截里面加token,用于后端的验证
        const token = localStorage.getItem("token");
        config.headers.Authorization = token;
        return config;
      },
      (error: any) => {
        // 请求错误,可以使用全局提示框提示
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 直接返回res,也可以只返回res.data
        // 自定义code也可以在这里处理
        return res;
      },
      (error) => {
        // 处理http常见错误,并返回提示信息提示
        let message = "";
        switch (error.response.status) {
          case 400:
            message = "请求错误(400)";
            break;
          case 401:
            message = "未授权，请重新登录(401)";
            // 这里可以清空storage,跳转到登录页面
            break;
          case 403:
            message = "拒绝访问(403)";
            break;
          case 404:
            message = "请求出错(404)";
            break;
          case 408:
            message = "请求超时(408)";
            break;
          case 500:
            message = "服务器错误(500)";
            break;
          case 501:
            message = "服务未实现(501)";
            break;
          case 502:
            message = "网络错误(502)";
            break;
          case 503:
            message = "服务不可用(503)";
            break;
          case 504:
            message = "网络超时(504)";
            break;
          case 505:
            message = "HTTP版本不受支持(505)";
            break;
          default:
            message = `连接出错(${error.response.status})!`;
        }
        // 可以使用弹窗组件弹出错误信息
        // 比如element plus 可以使用 ElMessage
        // ElMessage({
        //   showClose: true,
        //   message: `${message}，请检查网络或联系管理员！`,
        //   type: "error",
        // });

        // reject需要的响应即可
        return Promise.reject(error.response);
      }
    );
  }
   //  定义请求方法(public 是ts中增加的一个可访问性标示,可以省略所有公共成员都能访问.)
   public request(config:AxiosRequestConfig):Promise<AxiosResponse>{
    return this.instance.request(config)
  }
}
//  默认导出Request实例
export default new Request({});
