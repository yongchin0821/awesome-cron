import { series, src, dest } from "gulp";
import { componentPath } from "../paths";
import run from "../run";

//复制
const copypackage = async () => {
  return src(`${componentPath}/transitpkg/**`).pipe(
    dest(`${componentPath}/dist/`)
  );
};
//发布组件
export const publish = async () => {
  //先给transitpkg升个版本
  await run("pnpm version patch", `${componentPath}`);
  //复制到dist目录
  // await copypackage();
  //在dist下执行发布命令
  // await run("npm publish", `${componentPath}/dist`);
  await run("pnpm publish", `${componentPath}`);
};

export default series(async () => publish());
