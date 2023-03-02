const timeout = 10000;
interface IAllurl {
  development: "/api";
  production: "http://xxx.org/prod";
  default: "http://xxx.org/test";
  [propName: string]: string;
}
const allUrl: IAllurl = {
  development: "/api",
  production: "http://xxx.org/prod",
  default: "http://xxx.org/test",
};
const NODE_ENV: keyof IAllurl | undefined = process.env.NODE_ENV;
const BASE_URL:string = NODE_ENV
  ? allUrl[NODE_ENV] || allUrl["default"]
  : allUrl["default"];

export { timeout, BASE_URL };
