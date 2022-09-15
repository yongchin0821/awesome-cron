import cronParser from "./cronParser.vue";
import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;

const withInstall = <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    //注册组件
    app.component((comp as any).name, comp);
  };
  return comp as SFCWithInstall<T>;
};

const CronParser = withInstall(cronParser);

export default CronParser;
