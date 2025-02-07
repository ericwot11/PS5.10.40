function int64(low, hi) {
    this.low = (low >>> 0);
    this.hi = (hi >>> 0);

    this.add32inplace = function (val) {
        let new_lo = (((this.low >>> 0) + val) & 0xFFFFFFFF) >>> 0;
        let new_hi = (this.hi >>> 0);
        if (new_lo < this.low) new_hi++;
        this.hi = new_hi;
        this.low = new_lo;
    }

    this.add64 = function (other) {
        let result_lo = (this.low + other.low) >>> 0;
        let carry = (result_lo < this.low) ? 1 : 0;
        let result_hi = (this.hi + other.hi + carry) >>> 0;
        return new int64(result_lo, result_hi);
    }

    this.xor64 = function (vallo, valhi) {
        let new_lo = this.low ^ vallo;
        let new_hi = this.hi ^ valhi;
        return new int64(new_lo, new_hi);
    }

    this.toString = function () {
        let lo_str = (this.low >>> 0).toString(16).padStart(8, '0');
        let hi_str = (this.hi >>> 0).toString(16);
        return hi_str === "0" ? lo_str : hi_str + lo_str;
    }

    return this;
}

// Exemple d'utilisation :
let address1 = new int64(0xdeadbeef, 0x00000001);
let address2 = new int64(0x00000010, 0x00000000);
let result = address1.add64(address2);
console.log(result.toString());  // Affiche l'adresse finale

