// Simple exemple de fonction d'injection pour tester une chaîne ROP
function ropInjection() {
    console.log("Injection ROP réussie!");
    addLog("Injection ROP exécutée avec succès.", "success");
    alert("Injection ROP réussie!");
}

// Lancer l'injection de manière synchrone
setTimeout(() => {
    ropInjection();
}, 3000); // Délai de 3 secondes pour démarrer l'injection
