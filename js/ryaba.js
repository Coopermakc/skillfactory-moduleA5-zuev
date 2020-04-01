const dataURL = "https://api.myjson.com/bins/jcmhn";

const fields = [
  "var1",
  "var2",
  "var3",
  "var4",
  "var5",
  "var6",
  "speach"
];
const dict = {};

function fillDict() {
  fields.forEach(element => dict[element] = $("#" + element).val());
}

function getFormValues() {
	return fields.reduce((acc, field) => {
  	acc[field] = $("#" + field).val();
    return acc;
  }, {});
}

function handleButton() {
  // взять данные по dataUrl, вытащить их и передать в handleData
  $.getJSON(dataURL, handleData);
}

function handleData(data) {
  // кажется, какой-то из этих способов сработает
  //const var1 = $("input[name=var1]")[0].value()
  fillDict();
  let resultText = "";
  //const var1 = $("input[name=var1]")[0].default()
  // надо сделать так чтобы сообщения подменились на значения из формы
  const text = data.text;


  text.forEach(function(line) {
    for (let key in dict) {
      line = line.replace("{" + key + "}", dict[key]);
    }
    resultText += `<span>${line}</span> <br>`;
  });
	$(".result").html(resultText);
}

function init() {
	$("#button-fetch").click(handleButton);
}

$(document).ready(init);
