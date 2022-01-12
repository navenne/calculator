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

      addBehaviour() {
        // Limpia display
        const reset = () =>
          this.keypad
            .get("CE")
            .addEventListener("click", () => (calc.display.value = "0"));

        // Borra un dígito. Si es el último, aparece un cero
        const deleteDigit = () =>
          this.keypad
            .get("←")
            .addEventListener(
              "click",
              () =>
                (calc.display.value =
                  calc.display.value.length == 1
                    ? "0"
                    : calc.display.value.slice(
                        0,
                        calc.display.value.length - 1
                      ))
            );

        // Comprueba si ya hay un punto decimal en el display, para añadirlo o no
        const addComma = () =>
          this.keypad
            .get(",")
            .addEventListener(
              "click",
              () =>
                (calc.display.value = calc.display.value.includes(".")
                  ? calc.display.value
                  : calc.display.value + ".")
            );

        // Comprueba si el valor del display es 0, para añadirlo o no. Así solo puede haber un cero antes de un punto decimal
        const zero = () =>
          this.keypad
            .get("0")
            .addEventListener(
              "click",
              () =>
                (calc.display.value =
                  calc.display.value == "0"
                    ? calc.display.value
                    : calc.display.value + "0")
            );

        // Botones del 1 al 9
        const numbersOneToNine = () =>
          Array(1, 2, 3, 4, 5, 6, 7, 8, 9).forEach((number) =>
            this.keypad
              .get(number.toString())
              .addEventListener(
                "click",
                () =>
                  (calc.display.value =
                    calc.display.value == "0" ? number : calc.display.value + number)
              )
          );


        reset();
        deleteDigit();
        addComma();
        zero();
        numbersOneToNine();
      },
    };

    calc.init();
    calc.addBehaviour();
  });
}
