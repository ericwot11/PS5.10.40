// psfree_utils.js - Utilitaires pour l'accès à la mémoire PS5

function readMemory(address) {
    console.log(`Lecture de la mémoire à l'adresse : 0x${address.toString(16)}`);
    // Simulation de la lecture mémoire à l'adresse spécifiée
    // Implémentation ici de la lecture mémoire réelle
    return "dummyData";  // Retourne des données simulées
}

function writeMemory(address, data) {
    console.log(`Écriture des données à l'adresse : 0x${address.toString(16)} avec les données : ${data}`);
    // Implémentation de l'écriture de données dans la mémoire
    // Utilise cette fonction pour injecter ou modifier la mémoire de la PS5
}

writeMemory(0x100000, "newData");  // Exemple d'écriture
