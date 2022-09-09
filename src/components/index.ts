import { App } from "vue";
import CronParser from "./CronParser.vue";

export { CronParser };

export default {
  install(app: App) {
    app.component("CronParser", CronParser);
  },
};
