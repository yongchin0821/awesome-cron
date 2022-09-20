# awesome-cron

cron parser. cron is awesome

## Installation

```
npm install awesome-cron
```

## Usage

### Install Globally

```js
import { createApp } from "vue";
import cron from "awesome-cron";

const app = createApp(App);
app.use(cron);
app.mount("#app");
```

After the installation, you can use all the components in your SFC like this.
Both `<cron-parser>` and `<cronParser>` are available

```html
<template>
  <cron-parser></cron-parser>
</template>
```

or

```html
<template>
  <cronParser></cronParser>
</template>
```

### Import on Demand

#### Import Directly

```html
<script>
  import { defineComponent } from "vue";
  import { CronParser } from "awesome-cron";

  export default defineComponent({
    components: {
      CronParser,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <CronParser></CronParser>
</template>

<style></style>
```
