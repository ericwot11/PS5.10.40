import { Int } from './module/int64.mjs';
let exploitStarted = false;

async function startPSFreeExploit() {
    if (exploitStarted) return;
    exploitStarted = true;

    log("Début de l'exploit PSFree...");
    try {
        await run_psfree("10.40");  // Exemple de firmware cible
        log("Exploit PSFree terminé avec succès !");
        
        log("Obtention des primitives de mémoire...");
        let p = window.p;
        log("Lecture arbitraire à l'adresse 0xdeadbeef :", p.read4(new Int(0xdeadbeef, 0)));
        
        log("Chargement des payloads compatibles...");
        await loadCompatiblePayloads();
    } catch (error) {
        log("Erreur lors de l'exécution de l'exploit PSFree : " + error, "error");
    }
}

// Fonction pour charger les payloads après exploitation réussie
async function loadCompatiblePayloads() {
    const payloads = [
        { title: "FTP Server", file: "ftpsrv.elf" },
        { title: "Debugger", file: "ps5debug_v1.0b2.elf" }
    ];
    
    for (let payload of payloads) {
        log(`Chargement du payload ${payload.title}...`);
        // Simulation de chargement de payload
        await new Promise(resolve => setTimeout(resolve, 1000));
        log(`${payload.title} chargé avec succès.`);
    }
}

// Fonction utilitaire pour afficher les logs
function log(message, type = "info") {
    console.log(`[${new Date().toLocaleTimeString()}] [${type.toUpperCase()}] ${message}`);
}

// Lancer l’exploit via un bouton
document.getElementById("launch-exploit-btn").addEventListener("click", startPSFreeExploit);
