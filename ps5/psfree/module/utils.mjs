import { Int } from './int64.mjs';

export class DieError extends Error {
    constructor(...args) {
        super(...args);
        this.name = this.constructor.name;
    }
}

export function die(msg = '') {
    logError(`Erreur critique : ${msg}`);
    throw new DieError(msg);
}

export const debug_log = (msg = '') => {
    console.log(msg);  // Affichage dans la console
    document.getElementById('console').innerText += msg + '\n';
};

export function clear_log() {
    document.getElementById('console').innerHTML = '';
}

export function str2array(str, length, offset = 0) {
    let arr = new Array(length);
    for (let i = 0; i < length; i++) {
        arr[i] = str.charCodeAt(i + offset);
    }
    return arr;
}

export function align(a, alignment) {
    if (!(a instanceof Int)) a = new Int(a);
    const mask = -alignment & 0xffffffff;
    return new a.constructor(a.low & mask, a.high);
}

export async function send(url, buffer, fileName, onload = () => {}) {
    try {
        const file = new File([buffer], fileName, { type: 'application/octet-stream' });
        const form = new FormData();
        form.append('upload', file);
        
        let response = await fetch(url, { method: 'POST', body: form });
        if (!response.ok) throw new Error(`Échec de l’envoi du fichier : ${response.status}`);
        onload();
    } catch (error) {
        logError(`Erreur d'envoi : ${error}`);
    }
}

export function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function hex(number) {
    return '0x' + number.toString(16);
}

export function hex_np(number) {
    return number.toString(16);
}

function logError(message) {
    console.error(message);
    debug_log(`[Erreur] ${message}`);
}
