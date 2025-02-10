// Fonction améliorée pour le dump mémoire avec gestion des erreurs
console.log("🚀 Début sécurisé du dump mémoire avec pauses...");

function dumpMemorySafely(startAddress, size) {
    const chunkSize = 0x1000; // Taille des segments à lire (4096 octets)
    let currentAddress = startAddress;
    let memoryDump = "";
    let iterationLimit = 0;

    function dumpNextChunk() {
        try {
            if (currentAddress >= startAddress + size || iterationLimit > 1000) {
                console.log("✅ Dump terminé !");
                console.log(memoryDump);
                return;
            }

            let value = readMemory(currentAddress);
            memoryDump += `Adresse 0x${currentAddress.toString(16)} : ${value.toString(16)}\n`;
            currentAddress += chunkSize;
            iterationLimit++;

            // Affiche une ligne de log toutes les 10 itérations
            if (iterationLimit % 10 === 0) {
                console.log(`⏳ Dump en cours à l'adresse 0x${currentAddress.toString(16)}...`);
            }

            // Pause pour éviter de bloquer le navigateur
            setTimeout(dumpNextChunk, 50); // Pause de 50 ms entre chaque segment
        } catch (err) {
            console.log(`❌ Erreur à l'adresse 0x${currentAddress.toString(16)} : ${err.message}`);
            currentAddress += chunkSize; // Sauter les adresses problématiques
            setTimeout(dumpNextChunk, 50);
        }
    }

    dumpNextChunk(); // Lancer la boucle de dump
}

// Exemple : Lancer le dump de 64 Ko à partir de 0x100000
dumpMemorySafely(0x100000, 0x10000);
