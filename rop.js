// rop.js
window.rop = {
    gadgets: {
        // Remplace ces adresses par les réelles extraites
        "pop rdi": 0x400a1234,  // Gadget "pop rdi"
        "pop rsi": 0x400b5678,  // Gadget "pop rsi"
        "pop rdx": 0x400c9abc,  // Gadget "pop rdx"
        "mov [rdi], rsi": 0x400e5678, // Gadget "mov [rdi], rsi"
        "ret": 0x400f1234,  // Gadget "ret"
        "call mprotect": 0x40101234,  // Gadget pour appeler mprotect
    },
    execute: function() {
        console.log("Rop exécuté !");
        const chain = [
            this.gadgets["pop rdi"],
            0xdeadbeef, // Valeur à charger dans rdi
            this.gadgets["pop rsi"],
            0xdeadbeef, // Valeur à charger dans rsi
            this.gadgets["mov [rdi], rsi"],  // Exécution du gadget pour manipuler la mémoire
            this.gadgets["ret"]  // Retour à l'exécution
        ];
        this.executeChain(chain);
    },
    executeChain: function(chain) {
        console.log("Exécution de la chaîne ROP...");
        for (let gadget of chain) {
            console.log(`Gadget exécuté : 0x${gadget.toString(16)}`);
        }
    }
};

console.log("Rop.js chargé et variable rop d
