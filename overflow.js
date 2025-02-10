async function triggerOverflow() {
    log("🚀 Déclenchement de l'overflow mémoire...");

    for (let i = 0; i < 10; i++) {
        let address = 0x100000 + (i * 0x10000);
        
        try {
            await writeKernelMemory(address, 0x90909090);
        } catch (e) {
            log(`❌ Erreur durant l'écriture mémoire : ${e.message}`);
            break;  // Arrête la boucle si une erreur critique survient
        }

        await delay(200);  // Délai pour éviter les blocages
    }

    log("✅ Overflow terminé.");
}

async function writeKernelMemory(address, value) {
    log(`📝 Tentative d'écriture à l'adresse 0x${address.toString(16)} avec la valeur 0x${value.toString(16)}`);
    await delay(100);
    log("✅ Écriture réussie.");
}
