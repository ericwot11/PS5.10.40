export class Int {
    constructor(low, high = 0) {
        if (check_not_in_range(low) || check_not_in_range(high)) {
            throw new TypeError('Les parties low ou high ne sont pas des entiers 32 bits.');
        }
        this._u32 = [low >>> 0, high >>> 0];
    }

    get low() {
        return this._u32[0];
    }

    get high() {
        return this._u32[1];
    }

    add(b) {
        const values = lohi_from_one(b);
        const low = this.low + values[0];
        return new Int(
            low >>> 0,
            (this.high + values[1] + (low > 0xffffffff)) >>> 0
        );
    }

    sub(b) {
        const values = lohi_from_one(b);
        const low = this.low - values[0];
        return new Int(
            low >>> 0,
            (this.high - values[1] - (low < 0)) >>> 0
        );
    }

    xor(b) {
        const values = lohi_from_one(b);
        return new Int(this.low ^ values[0], this.high ^ values[1]);
    }

    toString(is_pretty = false) {
        const highHex = this.high.toString(16).padStart(8, '0');
        const lowHex = this.low.toString(16).padStart(8, '0');
        return is_pretty
            ? `0x${highHex.substring(0, 4)}_${highHex.substring(4)}_${lowHex.substring(0, 4)}_${lowHex.substring(4)}`
            : `0x${highHex}${lowHex}`;
    }
}

// Utilitaire pour valider les entrées 32 bits
function check_not_in_range(x) {
    return !Number.isInteger(x) || x < -0x80000000 || x > 0xffffffff;
}

// Conversion rapide des entiers
export function lohi_from_one(low) {
    return low instanceof Int ? low._u32.slice() : [low >>> 0, low < 0 ? -1 >>> 0 : 0];
}
