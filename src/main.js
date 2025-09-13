/* import { token_list } from "./utils/token_list.js";
import { token_to_compare } from "./utils/compare_token_list.js";

const toke_missing = token_list.filter((token) => !token_to_compare.includes(token));
console.log('token faltante', toke_missing); */

let excel1 = null;
let excel2 = null;

document.getElementById('inputExcel').addEventListener('change', function(event) {
        console.log(event)
        const file = event.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
    
            // Tomamos la primera hoja
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
    
            // Convertimos a JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);
    
            // Mostramos en pantalla
            excel1 = jsonData.map(token => token.codigo);
        };
        reader.readAsArrayBuffer(file);
});

document.getElementById('inputExcel2').addEventListener('change', function(event) {
        console.log(event)
        const file = event.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
    
            // Tomamos la primera hoja
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
    
            // Convertimos a JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);
    
            // Mostramos en pantalla
            excel2 = jsonData.map(token => token.codigo);
        };
        reader.readAsArrayBuffer(file);
});

document.getElementById('btn-compare').addEventListener('click', () => {
    const toke_missing = excel1.filter((token) => !excel2.includes(token));
    console.log('token faltante', toke_missing);
    document.getElementById('output').textContent = `${toke_missing}`;
});

