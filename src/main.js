import { token_list } from "./utils/token_list.js";
import { token_to_compare } from "./utils/compare_token_list.js";

const toke_missing = token_list.filter((token) => !token_to_compare.includes(token));
console.log('token faltante', toke_missing);