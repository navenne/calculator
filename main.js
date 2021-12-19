/**
 * @author Laura Hidalgo Rivera
 */

{
  document.addEventListener("DOMContentLoaded", function () {  
    const createButton = function (text) {
      const element = document.createElement("button");
      const content = document.createTextNode(text);
      element.appendChild(content);
      element.style.width = "100%";
      element.style.margin = "5px";
      return element;
    };

    const createDiv = function (...buttonsText) {
      const element = document.createElement("div");
      const buttons = [];
      buttonsText.forEach((e) => {
        buttons.push(createButton(e));
      });
      appendChildren(element, ...buttons);
      element.style.display = "flex";
      element.style.justifyContent = "space-between";
      return element;
    };

    const appendChildren = function (parent, ...children) {
      children.forEach((e) => {
        parent.appendChild(e);
      });
    };

    const div = document.createElement("div");
    const div1 = document.createElement("div");
    const div2 = createDiv("CE", "←", "%", "+");
    const div3 = createDiv("7", "8", "9", "-");
    const div4 = createDiv("4", "5", "6", "x");
    const div5 = createDiv("1", "2", "3", "÷");
    const div6 = createDiv("0", "±", ",", "=");

    div1.appendChild(document.createElement("input"));

    div.style.maxWidth = "200px";
    div.style.textAlign = "center";
    div.style.backgroundColor = "#F0F0C6";
    div.style.padding = "5px";

    appendChildren(div, div1, div2, div3, div4, div5, div6);

    document.body.appendChild(div);
  });
}
