// read_write_memory.js - Lecture et écriture dans la mémoire PS5 après l'exploitation

function readMemory(address) {
    console.log(`Lecture de la mémoire à l'adresse : 0x${address.toString(16)}`);
    // Code pour lire la mémoire
    return "dummyData";  // Retourne des données simulées
}

function writeMemory(address, data) {
    console.log(`Écriture des données à l'adresse : 0x${address.toString(16)} avec les données : ${data}`);
    // Code pour écrire dans la mémoire
}

function manipulateMemory() {
    const memoryAddress = 0x100000;  // Adresse mémoire de test
    const data = readMemory(memoryAddress);  // Lire la mémoire
    console.log(`Données lues : ${data}`);
    writeMemory(memoryAddress, "modifiedData");  // Écrire des nouvelles données
}

manipulateMemory();
