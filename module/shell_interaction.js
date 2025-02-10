// shell_interaction.js - Interaction avec le shell ELF sur la PS5

function executeShellCommand(command) {
    console.log(`💻 Commande shell exécutée : ${command}`);
    // Simulation de l'exécution d'une commande dans un shell ELF
    setTimeout(() => {
        console.log("✅ Commande exécutée avec succès.");
    }, 500);
}

function startShellInteraction() {
    const shellCommand = "echo 'root access granted' > /tmp/hack.txt";
    executeShellCommand(shellCommand);
}
startShellInteraction();
