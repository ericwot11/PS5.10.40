function loadPayload() {
    log("🚀 [Payload] Injection du payload ELF...");
    let payload = loadELFPayload();

    executeROPWrite(0x900000, payload);
    log("✅ Payload injecté avec succès.");
}

function loadELFPayload() {
    log("📥 Chargement du payload ELF...");
    return [0x7F454C46, 0x464C457F];  // Signature ELF (exemple)
}

function executeROPWrite(address, payload) {
    log(`🔧 [ROP] Écriture du payload ELF à l’adresse : 0x${address.toString(16)}`);
}
