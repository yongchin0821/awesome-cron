<script setup lang="ts">
import { ref, watch, reactive, onMounted } from "vue";

const datas = reactive({
  start: '"At',
  end: '"',
  hour: "",
  min: "",
  mond: "",
  mon: "",
  wkd: "",
});

const text = reactive({
  hour: "",
  min: "",
  mond: "",
  mon: "",
  wkd: "",
});

const crontext = ref<string>("3 9 * * *");

const desc = ref<string>(
  "*	any value\n,	value list separator\n-	range of values\n/	step values"
);

const formatter = (text: string) => {
  let l = text.split(" ").filter((item) => item != "");
  if (l.length == 5) {
    datas.hour = l[0];
    datas.min = l[1];
    datas.mond = l[2];
    datas.mon = l[3];
    datas.wkd = l[4];
    datas.start = '"At';
    datas.end = '"';
  } else {
    datas.start = "";
    datas.end = "";
  }
  return l.join(" ");
};

const convert = (s) => {
  var i = parseInt(s);
  switch (20 < i ? i % 10 : i) {
    case 1:
      return s + "st";
    case 2:
      return s + "nd";
    case 3:
      return s + "rd";
    default:
      return s + "th";
  }
};

const minParser = (val: string) => {
  if (val.indexOf("*") != 1) {
    text.hour;
  } else if (val.indexOf(",") != 1) {
  } else if (val.indexOf("-") != 1) {
  }
};

const hourParser = (val: string) => {
  if (val.indexOf("*") != 1) {
    text.hour;
  } else if (val.indexOf(",") != 1) {
  } else if (val.indexOf("-") != 1) {
  }
};

const textChange = () => {};

watch(crontext, (newValue, oldValue) => {
  formatter(newValue);
});

const change = (e) => {
  crontext.value = formatter(e.target.value);
};

const setStringFormat = () => {
  String.prototype["format"] = function () {
    const e = arguments;
    return (
      !!this &&
      this.replace(/\{(\d+)\}/g, function (t, r) {
        return e[r] ? e[r] : t;
      })
    );
  };
};

const click = (e) => {
  console.log("focus");
  console.log(e.target.value);
  console.log(document.getElementById("crontext").selectionStart);
  console.log(document.getElementById("crontext").selectionEnd);
  console.log("dsada{0}111{1}".format("hhh", "ddd"));
};

onMounted(() => {
  setStringFormat();
});

</script>

<template>
  <div class="parser-text">
    <h1>
      {{ datas.start }}
      <span id="hour">{{ text.hour }}</span>
      <span id="minute">{{ text.min }}</span>
      <span id="month-day">{{ text.mond }}</span>
      <span id="month">{{ text.mon }}</span>
      <span id="week-day">{{ text.wkd }}</span>
      {{ datas.end }}
    </h1>
  </div>
  <div class="cron">
    <input
      id="crontext"
      v-model="crontext"
      placeholder="edit me"
      :onchange="change"
      :onclick="click"
    />
  </div>
  <div class="desc">
    <div>
      <span>minute</span>
    </div>
    <div>
      <span>hour</span>
    </div>
    <div>day</div>
    <div>week</div>
    <div>month</div>
    <textarea>{{ desc }}</textarea>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
