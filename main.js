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

        // Añado cada botón del mapa keypad al div de la botonera
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
      },

      addBehaviour(button) {
        switch (button) {
          case "CE": // Limpia display
            return () => (this.display.value = "0");
          case "←": // Borra un dígito. Si es el último, aparece un cero
            return () =>
            (this.display.value =
              this.display.value.length == 1
                ? "0"
                : this.display.value.slice(
                    0,
                    this.display.value.length - 1
                  ));
          case ",": // Comprueba si ya hay un punto decimal en el display, para añadirlo o no
            return () =>
            (this.display.value = this.display.value.includes(".")
              ? this.display.value
              : this.display.value + ".");
          case "0": // Comprueba si el valor del display es 0, para añadirlo o no. Así solo puede haber un cero antes de un punto decimal
            return () =>
            (this.display.value =
              this.display.value == "0"
                ? this.display.value
                : this.display.value + "0");
          case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": // Botones del 1 al 9
            return () =>
            (this.display.value =
              this.display.value == "0" ? button : this.display.value + button);
          case "±":
            return () =>
            (this.display.value = this.display.value != "0" ? (this.display.value.startsWith("-") ? this.display.value.substring(1, this.display.value.length) : `-${this.display.value}`) : this.display.value);
          default:
            break;
        }
      },
    };

    calc.init();
    Array.from(calc.keypad.keys()).forEach((button => {
      calc.keypad.get(button).addEventListener("click", calc.addBehaviour(button));
    }));
  });
}
