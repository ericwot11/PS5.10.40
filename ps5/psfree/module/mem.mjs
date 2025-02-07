import { Int, lohi_from_one } from './int64.mjs';
import { view_m_vector, view_m_length } from './offset.mjs';

export let mem = null;

// Initialisation du module de gestion mémoire
function init_module(memory) {
    mem = memory;
}

export class Addr extends Int {
    read8(offset = 0) {
        mem._set_addr_direct(this);
        return mem.read8_at(offset);
    }

    read32(offset = 0) {
        mem._set_addr_direct(this);
        return mem.read32_at(offset);
    }

    write32(offset, value) {
        mem._set_addr_direct(this);
        mem.write32_at(offset, value);
    }
}

export class Memory {
    constructor(main, worker, obj, addr_addr) {
        this._main = main;
        this._worker = worker;
        this._obj = obj;
        this._addr_low = addr_addr.low;
        this._addr_high = addr_addr.high;

        init_module(this);
    }

    addrof(object) {
        if (typeof object !== 'object' || object === null) {
            throw TypeError('L’argument n’est pas un objet JavaScript');
        }
        this._obj.addr = object;
        this._main[view_m_vector / 4] = this._addr_low;
        return new Addr(this._worker.getUint32(0, true), this._worker.getUint32(4, true));
    }

    _set_addr_direct(addr) {
        this._main[view_m_vector / 4] = addr.low;
    }

    read8_at(offset) {
        return this._worker.getUint8(offset);
    }

    write32_at(offset, value) {
        this._worker.setUint32(offset, value, true);
    }
}
