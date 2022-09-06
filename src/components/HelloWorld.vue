<script setup lang="ts">
import { ref, watch, reactive, onMounted } from "vue";
import cronstrue from "cronstrue";

const datas = reactive({
  start: '"At ',
  end: '."',
  full: "",
  textCount: 5,
  toHighlight: null,
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
  AP: "",
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

const change = (e) => {
  crontext.value = formatter(e.target.value);
};

// cursorParsing
const parser5 = () => {
  let ele: HTMLElement = document.getElementById("crontext");
  let startindex = ele.selectionStart;
  let text = crontext.value.substring(0, startindex);
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
    let eles = Array.from(document.getElementsByName(item));
    if (item == datas.toHighlight) {
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

const strategies = {
  5: parser5,
  6: () => {},
  7: () => {},
};

const cursorParsing = (e) => {
  // format textCount
  formatter(e.target.value);
  strategies[datas.textCount]();
};

// crontextParsing
const getParsedText = () => {
  parsedText.value = cronstrue.toDetails(crontext.value);
  if (parsedText.value.full.substring(0, 7).indexOf(":") == -1) {
    datas.datetime = false;
    parsedText.value.min = parsedText.value.min.replace("at ", "");
    parsedText.value.hour = ", " + parsedText.value.hour;
  } else {
    datas.datetime = true;
    parsedText.value.hour = parsedText.value.full.substring(2, 5);
    parsedText.value.min = parsedText.value.full.substring(6, 9);
    parsedText.value.AP = parsedText.value.full.slice(-2);
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

const ptext = ref();

onMounted(() => {
  getParsedText();
  console.log(datas.datetime);
  console.log(ptext);
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
      <span name="sec">{{ parsedText.sec }}</span>
      <span name="hour">{{ parsedText.AP }}</span>
      <span name="mond">{{ parsedText.mond }}</span>
      <span name="mon">{{ parsedText.mon }}</span>
      <span name="wkd">{{ parsedText.wkd }}</span>
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
