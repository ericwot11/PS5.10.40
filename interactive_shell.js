function interactiveShell() {
    let command = prompt("Entrez la commande à exécuter :");
    while (command !== "exit") {
        let result = executeCommand(command);
        log(`💻 Résultat : ${result}`);
        command = prompt("Entrez la commande suivante :");
    }
    log("👋 Shell terminé.");
}

function executeCommand(cmd) {
    return `Commande ${cmd} exécutée avec succès.`;
}
