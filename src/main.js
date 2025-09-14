/* import { token_list } from "./utils/token_list.js";
import { token_to_compare } from "./utils/compare_token_list.js";

const toke_missing = token_list.filter((token) => !token_to_compare.includes(token));
console.log('token faltante', toke_missing); */

let excel1 = null;
let excel2 = null;

document
  .getElementById("inputExcel")
  .addEventListener("change", function (event) {
    console.log(event); // Muestra en consola información del evento (debug)

    const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
    if (!file) return; // Si no hay archivo, termina la función

    const reader = new FileReader(); // Crea un lector de archivos

    // Cuando el archivo termine de cargarse se ejecuta esta función
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result); // Convierte el archivo a arreglo binario
      const workbook = XLSX.read(data, { type: "array" }); // Lee el archivo Excel con la librería xlsx
      const sheetName = workbook.SheetNames[0]; // Obtiene el nombre de la primera hoja
      const sheet = workbook.Sheets[sheetName]; // Accede a la primera hoja
      const jsonData = XLSX.utils.sheet_to_json(sheet); // Convierte la hoja en un arreglo de objetos JSON
      excel1 = jsonData.map((token) => token.codigo); // Extrae solo la columna 'codigo' y la guarda en excel2
    };

    reader.readAsArrayBuffer(file); // Lee el archivo como binario
  });

document
  .getElementById("inputExcel2")
  .addEventListener("change", function (event) {
    console.log(event);
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      excel2 = jsonData.map((token) => token.codigo);
    };
    reader.readAsArrayBuffer(file);
  });

document.getElementById("btn-compare").addEventListener("click", () => {
    if(!excel1 || !excel2) {
        return alert("There is no data to compare");
    }
  const toke_missing = excel1.filter((token) => !excel2.includes(token));
  console.log("token faltante", toke_missing);
  // Construimos una lista HTML
  const outputElement = document.getElementById("output");
  outputElement.innerHTML = ""; // Limpiar contenido previo

  if (toke_missing.length === 0) {
    outputElement.textContent = "No hay tokens faltantes ✅";
  } else {
    const ul = document.createElement("ul");
    ul.classList.add("token-list");
    toke_missing.forEach((token) => {
      const li = document.createElement("li");
      li.textContent = token;
      ul.appendChild(li);
    });
    outputElement.appendChild(ul);
  }
});
