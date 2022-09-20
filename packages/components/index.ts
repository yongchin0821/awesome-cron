import * as components from "./src/index";
export * from "./src/index";
import "./src/cronParser/style.css"

export default {
  install: (app: any) => {
    for (const comkey in components) {
      app.component(
        (components as any)[comkey].name,
        (components as any)[comkey]
      );
    }
  },
};
