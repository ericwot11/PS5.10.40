function scanFiles() {
    log("🔍 Début du scan des fichiers sensibles...");

    let startAddress = 0x100000;
    let endAddress = 0x800000;

    for (let addr = startAddress; addr < endAddress; addr += 0x1000) {
        let data = readKernelMemory(addr);
        if (isSensitiveData(data)) {
            log(`🔑 Donnée sensible trouvée à l'adresse : 0x${addr.toString(16)}`);
        }
    }

    log("✅ Scan des fichiers terminé.");
}
