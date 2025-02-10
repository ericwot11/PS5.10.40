async function dumpKernelMemory(startAddress, size) {
    log(`📥 Démarrage du dump mémoire à partir de l'adresse 0x${startAddress.toString(16)} sur ${size} octets`);

    for (let i = 0; i < size; i += 4) {
        let address = startAddress + i;
        try {
            let value = await readKernelMemory(address);
            log(`📖 [Adresse 0x${address.toString(16)}] Valeur lue : 0x${value.toString(16)}`);
        } catch (e) {
            log(`❌ Erreur durant la lecture mémoire à l'adresse 0x${address.toString(16)} : ${e.message}`);
            break;
        }

        await delay(100);  // Délai pour éviter la surcharge
    }

    log("✅ Dump mémoire terminé.");
}

async function readKernelMemory(address) {
    log(`📖 Lecture mémoire à l'adresse 0x${address.toString(16)}...`);
    await delay(50);  // Ajoute un délai pour simuler une lecture lente
    return 0xdeadbeef;  // Retourne une valeur fictive
}
