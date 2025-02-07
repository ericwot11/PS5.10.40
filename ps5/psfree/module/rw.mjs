import { Int, lohi_from_one } from './int64.mjs';

export class BufferView extends Uint8Array {
    constructor(...args) {
        super(...args);
        this._dview = new DataView(this.buffer);
    }

    read16(offset) {
        return this._dview.getUint16(offset, true);
    }

    read32(offset) {
        return this._dview.getUint32(offset, true);
    }

    read64(offset) {
        return new Int(this._dview.getUint32(offset, true), this._dview.getUint32(offset + 4, true));
    }

    write16(offset, value) {
        this._dview.setUint16(offset, value, true);
    }

    write32(offset, value) {
        this._dview.setUint32(offset, value, true);
    }

    write64(offset, value) {
        const [low, high] = lohi_from_one(value);
        this._dview.setUint32(offset, low, true);
        this._dview.setUint32(offset + 4, high, true);
    }
}

// Supprimer les fonctions dépréciées pour éviter les doublons et confusion
