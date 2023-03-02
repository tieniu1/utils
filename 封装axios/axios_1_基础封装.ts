import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
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
  }

  //  定义请求方法(public 是ts中增加的一个可访问性标示,可以省略所有公共成员都能访问.)
  public request(config:AxiosRequestConfig):Promise<AxiosResponse>{
    return this.instance.request(config)
  }
}
//  默认导出Request实例
export default new Request({});
