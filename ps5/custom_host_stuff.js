async function run(wkonly = false, animate = true) {
    if (exploitStarted) return;
    exploitStarted = true;

    await switchPage("console-view", animate);

    // Détection dynamique du type d’exploit
    let firmwareVersion = detectFirmwareVersion(); 
    let wk_exploit_type = firmwareVersion.startsWith("10") ? LOCALSTORE_WK_EXPLOIT_TYPE_VALUE_FONTFACE : LOCALSTORE_WK_EXPLOIT_TYPE_VALUE_PSFREE;
    
    try {
        debug_log(`[+] Lancement de l'exploit WebKit : ${wk_exploit_type}`);
        if (wk_exploit_type === LOCALSTORE_WK_EXPLOIT_TYPE_VALUE_PSFREE) {
            await run_psfree(fw_str);
        } else {
            await run_fontface();
        }
    } catch (error) {
        debug_log(`[!] Échec de l'exploit WebKit : ${error}`);
        await handleExploitError();
    }

    try {
        await main(wkonly);
    } catch (error) {
        debug_log(`[!] Échec de l'exploit kernel : ${error}`);
    }

    debug_log("[+] Tentative de redémarrage dans 4 secondes...");
    await retryExploit();
}

function detectFirmwareVersion() {
    // Simulation de détection (remplacer par une vraie détection)
    return "10.40"; 
}

async function handleExploitError() {
    debug_log("[+] Nouvelle tentative dans 2 secondes...");
    await sleep(2000);
    window.location.reload();
}

async function retryExploit() {
    await sleep(4000);
    window.location.reload();
}

function applyPersistence() {
    let persistenceScript = `
        console.log("Appliquer persistance : scripts et payloads au démarrage");
    `;
    writeToSystemFile("startup.js", persistenceScript);
    debug_log("[+] Persistance appliquée.");
}

// Exemple d’ajout de gestion des erreurs spécifiques
function debug_log(message) {
    console.log(message);
    addLog(message);
}
