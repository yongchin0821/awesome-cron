<script setup lang="ts">
import { ref, watch, reactive, onMounted } from "vue";
import cronstrue from "cronstrue";

const datas = reactive({
  start: '"At ',
  end: '."',
  full: "",
  textCount: 5,
  cursor: null,
  datetime: null,
});

type TparsedText = {
  full?: string;
  sec?: string;
  hour?: string;
  min?: string;
  mond?: string;
  mon?: string;
  wkd?: string;
  year?: string;
  AP?: string;
};

const parsedText = ref<TparsedText>({
  full: "",
  sec: "",
  hour: "",
  min: "",
  mond: "",
  mon: "",
  wkd: "",
  year: "",
  AP: "",
});

const crontext = ref<string>("3 9 * * *");

const desc = ref<string>(
  "*	any value\n,	value list separator\n-	range of values\n/	step values"
);

const formatter = (text: string) => {
  let l = text.split(" ").filter((item) => item != "");
  return l.join(" ");
};

const change = (e) => {
  crontext.value = formatter(e.target.value);
};

// cursorParsing
const parser5 = () => {
  let ele: HTMLElement = document.getElementById("crontext");
  let startindex = ele.selectionStart;
  let text = crontext.value.substring(0, startindex);
  let textList = formatter(text).split(" ");
  switch (textList.length) {
    case 1:
      datas.cursor = "min";
      break;
    case 2:
      datas.cursor = "hour";
      break;
    case 3:
      datas.cursor = "mond";
      break;
    case 4:
      datas.cursor = "mon";
      break;
    case 5:
      datas.cursor = "wkd";
      break;
  }
  highlight();
  changDdesc();
};

const parser6 = () => {
  let ele: HTMLElement = document.getElementById("crontext");
  let startindex = ele.selectionStart;
  let text = crontext.value.substring(0, startindex);
  let textList = formatter(text).split(" ");
  switch (textList.length) {
    case 1:
      datas.cursor = "sec";
      break;
    case 2:
      datas.cursor = "min";
      break;
    case 3:
      datas.cursor = "hour";
      break;
    case 4:
      datas.cursor = "mond";
      break;
    case 5:
      datas.cursor = "mon";
      break;
    case 6:
      datas.cursor = "wkd";
      break;
  }
  highlight();
  changDdesc();
};

const parser7 = () => {
  let ele: HTMLElement = document.getElementById("crontext");
  let startindex = ele.selectionStart;
  let text = crontext.value.substring(0, startindex);
  let textList = formatter(text).split(" ");
  switch (textList.length) {
    case 1:
      datas.cursor = "sec";
      break;
    case 2:
      datas.cursor = "min";
      break;
    case 3:
      datas.cursor = "hour";
      break;
    case 4:
      datas.cursor = "mond";
      break;
    case 5:
      datas.cursor = "mon";
      break;
    case 6:
      datas.cursor = "wkd";
      break;
    case 7:
      datas.cursor = "year";
      break;
  }
  highlight();
  changDdesc();
};

const highlight = () => {
  for (var item of ["sec", "min", "hour", "mond", "mon", "wkd", "year"]) {
    let eles = Array.from(document.getElementsByName(item));
    if (item == datas.cursor) {
      eles.map((e) => {
        e.style.color = "gray";
      });
    } else {
      eles.map((e) => {
        e.style.color = "black";
      });
    }
  }
};

const changDdesc = () => {
  switch (datas.cursor) {
    case "sec":
      desc.value =
        "*	any value\n,	value list separator\n-	range of values\n/	step values";
      break;
    case "min":
      desc.value =
        "*	any value\n,	value list separator\n-	range of values\n/	step values\n0-23	allowed values";
      break;
    case "hour":
      desc.value =
        "*	any value\n,	value list separator\n-	range of values\n/	step values\n0-59	allowed values";
      break;
    case "mond":
      desc.value =
        "*	any value\n,	value list separator\n-	range of values\n/	step values\n1-31	allowed values";
      break;
    case "mon":
      desc.value =
        "*	any value\n,	value list separator\n-	range of values\n/	step values\n1-12	allowed values\nJAN-DEC	alternative single values";
      break;
    case "wkd":
      desc.value =
        "*	any value\n,	value list separator\n-	range of values\n/	step values\n0-6	allowed values\nSUN-SAT	alternative single values\n7	sunday (non-standard)";
      break;
    case "year  ":
      desc.value =
        "*	any value\n,	value list separator\n-	range of values\n/	step values\n0-23	allowed values";
      break;
  }
  ["sec", "min", "hour", "mond", "mon", "wkd", "year"].map((i) => {
    if (i != datas.cursor) {
      document.getElementById("span-" + i).style.textDecoration = "none";
    } else {
      document.getElementById("span-" + i).style.textDecoration = "underline";
    }
  });
};

const strategies = {
  5: parser5,
  6: parser6,
  7: parser7,
};

const cursorParsing = (e) => {
  // format textCount
  let fstr = formatter(e.target.value);
  datas.textCount = fstr.split(" ").length;
  strategies[datas.textCount]();
};

// crontextParsing
const getParsedText = () => {
  parsedText.value = cronstrue.toDetails(crontext.value);
  console.log(parsedText.value);
  if (parsedText.value.full.substring(0, 7).indexOf(":") == -1) {
    datas.datetime = false;
    parsedText.value.min = parsedText.value.min.replace("at ", "");
    parsedText.value.hour = ", " + parsedText.value.hour;
  } else {
    datas.datetime = true;
    parsedText.value.hour = parsedText.value.full.substring(2, 5);
    parsedText.value.min = parsedText.value.full.substring(6, 8);
    parsedText.value.AP = parsedText.value.full.split(",")[0].slice(-3);
  }
};

watch(crontext, (newValue, oldValue) => {
  formatter(newValue);
  try {
    getParsedText();
    // console.log(parsedText.value);
  } catch (e) {
    console.log(e);
  }
});

const ptext = ref();

onMounted(() => {
  getParsedText();
  // console.log(datas.datetime);
  // console.log(ptext);
});
</script>

<template>
  <div class="parser-text" ref="ptext">
    <h1 v-if="datas.datetime == true">
      {{ datas.start }}
      <!-- <span id="text">{{ datas.full }}</span> -->
      <span name="hour">{{ parsedText.hour }}</span>
      <span>:</span>
      <span name="min">{{ parsedText.min }}</span>
      <span v-if="parsedText.sec != null">:</span>
      <span name="sec">{{ parsedText.sec }}</span>
      <span name="hour">{{ parsedText.AP }}</span>
      <span name="mond">{{ parsedText.mond }}</span>
      <span name="mon">{{ parsedText.mon }}</span>
      <span name="wkd">{{ parsedText.wkd }}</span>
      <span name="year">{{ parsedText.year }}</span>
      {{ datas.end }}
    </h1>
    <h1 v-else>
      {{ datas.start }}
      <!-- <span name="text">{{ datas.full }}</span> -->
      <span name="sec">{{ parsedText.sec }}</span>
      <span name="min">{{ parsedText.min }}</span>
      <span name="hour">{{ parsedText.hour }}</span>
      <span name="mond">{{ parsedText.mond }}</span>
      <span name="mon">{{ parsedText.mon }}</span>
      <span name="wkd">{{ parsedText.wkd }}</span>
      <span name="year">{{ parsedText.year }}</span>
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
    <p>
      <span id="span-sec" v-show="datas.textCount == 6 || datas.textCount == 7">
        second
      </span>
      <span id="span-min"> minute </span>
      <span id="span-hour"> hour</span>
      <span id="span-mond"> day </span>
      <span id="span-mon"> month </span>
      <span id="span-wkd"> week </span>
      <span id="span-year" v-show="datas.textCount == 7"> year </span>
    </p>
    <textarea cols="40" rows="10">{{ desc }}</textarea>
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
.desc textarea {
  font-size: large;
  resize: none;
  border: none;
}
</style>
