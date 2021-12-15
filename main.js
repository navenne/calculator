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

    const createDiv = function (...buttons) {
      const element = document.createElement("div");
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
    const div2 = createDiv(
      createButton("CE"),
      createButton("←"),
      createButton("%"),
      createButton("+")
    );
    const div3 = createDiv(
      createButton("7"),
      createButton("8"),
      createButton("9"),
      createButton("-")
    );
    const div4 = createDiv(
      createButton("4"),
      createButton("5"),
      createButton("6"),
      createButton("x")
    );
    const div5 = createDiv(
      createButton("1"),
      createButton("2"),
      createButton("3"),
      createButton("÷")
    );

    const div6 = createDiv(
      createButton("0"),
      createButton("±"),
      createButton(","),
      createButton("=")
    );

    div1.appendChild(document.createElement("input"));
    div.style.maxWidth = "200px";
    div.style.textAlign = "center";
    div.style.backgroundColor = "#F0F0C6";
    div.style.padding = "5px";

    appendChildren(div, div1, div2, div3, div4, div5, div6);

    document.body.appendChild(div);
  });
}
