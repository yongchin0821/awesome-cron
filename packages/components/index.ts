import * as components from "./src/index";
export * from "./src/index";
export default {
  install: (app: any) => {
    for (const comkey in components) {
      console.log(comkey)
      console.log(components)
      app.component(
        (components as any)[comkey].name,
        (components as any)[comkey]
      );
    }
  },
};
