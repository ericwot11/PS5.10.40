let target = null;

export function set_target(value) {
    if (!Number.isInteger(value)) {
        throw new TypeError(`Erreur : la cible doit être un nombre entier. Valeur reçue : ${value}`);
    }

    if (value >= 0x20000 || value < 0) {
        throw new RangeError(`Erreur : la cible est hors des limites autorisées. Valeur reçue : ${value}`);
    }

    const version = value & 0xffff;
    if (!check_bcd(version)) {
        throw new RangeError(`Erreur : la version du firmware n'est pas en BCD. Valeur reçue : ${version}`);
    }

    target = value;
    console.log(`Firmware cible configuré : ${getFirmwareDescription(value)}`);
}

function check_bcd(value) {
    for (let i = 0; i <= 12; i += 4) {
        const nibble = (value >>> i) & 0xf;
        if (nibble > 9) return false;
    }
    return true;
}

// Détection automatique basée sur un scénario fictif
export function detectFirmware() {
    // Exemple fictif de détection, à remplacer par une vraie logique de détection
    let detectedVersion = "10.40";  // Version de firmware de la PS5
    let hexVersion = parseInt(detectedVersion.replace('.', ''), 16) | 0x10000;
    set_target(hexVersion);
}

// Obtenir une description lisible du firmware
function getFirmwareDescription(value) {
    const consoleType = (value & 0x10000) === 0 ? "PS4" : "PS5";
    const major = (value >> 8) & 0xff;
    const minor = value & 0xff;
    return `${consoleType} ${major}.${minor}`;
}
