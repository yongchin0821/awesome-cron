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
import naive from "naive-ui";

const app = createApp(App);
app.use(naive);
```

After the installation, you can use all the components in your SFC like this.
Both `<cron-parser>` and `<cronParser>` are available

```js
<template>
  <cron-parser></cron-parser>
</template>
```

or

```js
<template>
  <cronParser></cronParser>
</template>
```

### Import on Demand

#### Import Directly

```js
<script>
  import { defineComponent } from 'vue'
  import CronParser from "awesome-cron/src/cronParser";

  export default defineComponent({
    components: {
      CronParser,
    },
    setup() {
      return {}
    }
  })
</script>

<template>
  <CronParser></CronParser>
</template>

<style>

</style>
```
