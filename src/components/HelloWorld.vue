<script setup lang="ts">
import { ref, watch, reactive, onMounted } from "vue";
import cronstrue from "cronstrue";

const datas = reactive({
  start: '"At ',
  end: '."',
  full: "",
  textCount: 5,
  toHighlight: null,
});

type TparsedText = {
  full?: string;
  hour?: string;
  min?: string;
  mond?: string;
  mon?: string;
  wkd?: string;
};

const parsedText = ref<TparsedText>({
  full: "",
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
  datas.textCount = l.length;
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

const parser5 = () => {
  let ele: HTMLElement = document.getElementById("crontext");
  // console.log(ele.selectionStart);
  let startindex = document.getElementById("crontext").selectionStart;
  let text = crontext.value.substring(0, startindex);
  // let textList = formatter(text).indexOf(" ") != -1 ? formatter(text).split(" ") : [];
  let textList = formatter(text).split(" ");
  console.log(textList);
  switch (textList.length) {
    case 1:
      datas.toHighlight = "min";
      break;
    case 2:
      datas.toHighlight = "hour";
      break;
    case 3:
      datas.toHighlight = "mond";
      break;
    case 4:
      datas.toHighlight = "mon";
      break;
    case 5:
      datas.toHighlight = "wkd";
      break;
  }
  highlight();
};

const highlight = () => {
  for (var item of ["min", "hour", "mond", "mon", "wkd"]) {
    if (item == datas.toHighlight) {
      document.getElementById(item).style.color = "gray";
    } else {
      document.getElementById(item).style.color = "black";
    }
  }
};

const strategies = {
  5: parser5,
  6: () => {},
  7: () => {},
};

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

const cursorParsing = (e) => {
  // console.log(e.target.value);
  // format textCount
  formatter(e.target.value);
  strategies[datas.textCount]();
};

const getParsedText = () => {
  parsedText.value = cronstrue.toDetails(crontext.value);
  if (parsedText.value.full.substring(0, 7).indexOf(":") == -1) {
    parsedText.value.min = parsedText.value.min.replace("at ", "");
    parsedText.value.hour = ", " + parsedText.value.hour;
  } else {
    parsedText.value.min = parsedText.value.full.substring(3, 5);
    parsedText.value.hour = ":" + parsedText.value.full.substring(6, 11);
  }
};

watch(crontext, (newValue, oldValue) => {
  formatter(newValue);
  try {
    getParsedText();
    console.log(parsedText.value);
  } catch (e) {
    console.log(e);
  }
});

const sshow = (e) => {};

onMounted(() => {
  setStringFormat();
  getParsedText();
});
</script>

<template>
  <div class="parser-text">
    <h1>
      {{ datas.start }}
      <!-- <span id="text">{{ datas.full }}</span> -->
      <span id="min">{{ parsedText.min }}</span>
      <span id="hour">{{ parsedText.hour }}</span>
      <span id="mond">{{ parsedText.mond }}</span>
      <span id="mon">{{ parsedText.mon }}</span>
      <span id="wkd">{{ parsedText.wkd }}</span>
      {{ datas.end }}
    </h1>
  </div>
  <div class="cron">
    <input
      id="crontext"
      v-model="crontext"
      placeholder="edit me"
      :onchange="change"
      :onmouseup="cursorParsing"
      :onkeyup="cursorParsing"
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
#crontext {
  height: 50px;
  width: 80%;
  font-size: 30px;
  text-align: center;
}
</style>
