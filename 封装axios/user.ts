import http from "./index";

// 定义result中返回数据的接口
interface ILoginType {
  token: string;
}
export const getUser = (userId: string) => {
  return http.get<ILoginType>(`/user/${userId}`);
};
getUser("xxx").then(({ data }) => {
  console.log(data.result.token);
});
