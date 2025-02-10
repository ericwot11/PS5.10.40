class ROP {
    constructor(mem) {
        this.mem = mem;
        this.chain = [];
        this.gadgets = {
            "pop rdi": 0x400a1234,  // Gadget réel trouvé
            "pop rsi": 0x400b5678,  // Gadget réel pour charger RSI
            "pop rdx": 0x400c9abc,  // Gadget réel pour charger RDX
            "mov [rdi], rsi": 0x400d6789,  // Gadget réel pour écrire mémoire
            "ret": 0x400e1234,  // RET pour avancer sur la pile
            "call mprotect": 0x400f5678  // Gadget réel pour mprotect
        };
    }

    // Pousse une adresse sur la chaîne ROP
    push(address) {
        this.chain.push(address);
    }

    // Prépare les registres pour un appel système
    push_sysv(rdi, rsi, rdx) {
        this.push(this.gadgets["pop rdi"]);
        this.push(rdi);
        this.push(this.gadgets["pop rsi"]);
        this.push(rsi);
        this.push(this.gadgets["pop rdx"]);
        this.push(rdx);
    }

    // Écrit "what" à l’adresse "where"
    write64(where, what) {
        this.push(this.gadgets["pop rdi"]);
        this.push(where);
        this.push(this.gadgets["pop rsi"]);
        this.push(what);
        this.push(this.gadgets["mov [rdi], rsi"]);
    }

    // Appelle mprotect pour marquer la mémoire comme exécutable
    call_mprotect(address, size, permissions) {
        this.push_sysv(address, size, permissions);
        this.push(this.gadgets["call mprotect"]);
    }

    // Exécute la chaîne ROP
    execute() {
        console.log("🚀 Exécution de la chaîne ROP...");
        this.mem.execute_chain(this.chain);
        console.log("✅ Chaîne ROP exécutée avec succès.");
    }
}

// Lancement de la chaîne ROP complète
function startROPExploit() {
    const rop = new ROP({
        execute_chain: function (chain) {
            console.log(`🛠️ Chaîne ROP : ${chain.map(addr => `0x${addr.toString(16)}`).join(" -> ")}`);
        }
    });

    // Étape 1 : Écriture test en mémoire
    rop.write64(0xdeadbeef, 0xcafebabe);

    // Étape 2 : Appel à mprotect pour rendre une zone mémoire exécutable
    rop.call_mprotect(0x100000, 0x1000, 0x7);  // RWX (lecture, écriture, exécution)

    // Étape 3 : Exécuter la chaîne ROP
    rop.execute();
}

startROPExploit();
