/**
 * @author Laura Hidalgo Rivera
 */

{
  document.addEventListener("DOMContentLoaded", function () {

    /**
     * Crea un botón
     * @param {string} text texto del botón
     * @returns button, el botón creado
     */
    const createButton = function (text) {
      const button = document.createElement("button");
      const content = document.createTextNode(text);
      button.appendChild(content);
      button.style.width = "100%";
      button.style.margin = "5px";
      return button;
    };

    /**
     * Crea la botonera
     * @param  {...string} buttons texto de los botones
     * @returns keypad, mapa de botones
     */
    const createKeypad = function (...buttons) {
      const keypad = new Map();
      buttons.forEach((text) => {
        keypad.set(text, createButton(text));
      });
      return keypad;
    };

    const calc = {
      display: document.createElement("input"),

      keypad: createKeypad(
        "CE",
        "←",
        "%",
        "+",
        "7",
        "8",
        "9",
        "-",
        "4",
        "5",
        "6",
        "x",
        "1",
        "2",
        "3",
        "÷",
        "0",
        "±",
        ",",
        "="
      ),

      init() {
        // Creo div padre
        const div = document.createElement("div");
        div.style.maxWidth = "200px";
        div.style.textAlign = "center";
        div.style.backgroundColor = "#F0F0C6";
        div.style.padding = "5px";

        // Creo display
        const divDisplay = document.createElement("div");
        divDisplay.appendChild(this.display);

        // Creo botonera
        const divKeypad = document.createElement("div");
        divKeypad.style.display = "grid";
        divKeypad.style.gridTemplateColumns = "repeat(4, 1fr)";
        divKeypad.style.columnGap = "5px";
        divKeypad.style.justifyContent = "space-evenly";
        divKeypad.style.justifyItems = "center";

        // Añado cada botón del array keypad al div de la botonera
        this.keypad.forEach((e) => {
          divKeypad.appendChild(e);
        });

        // Añadir los divs al div padre y este último al body
        div.appendChild(divDisplay);
        div.appendChild(divKeypad);
        document.body.appendChild(div);

        // Mostrar 0 al inicializar la calculadora
        this.display.style.textAlign = "right";
        this.display.value = 0;

        // Cuando se hace click en el botón de la coma, se comprueba si ya hay un punto decimal en el display, para añadirlo o no
        this.keypad.get(",").addEventListener("click", function () {
          calc.display.value = calc.display.value.includes(".") ? calc.display.value : calc.display.value + ".";
        });
      }
    };

    calc.init();
  });
}
