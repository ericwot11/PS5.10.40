let enableAlerts = true;  // Peut être désactivé en production

addEventListener('unhandledrejection', event => {
    const reason = event.reason;
    const message = `Unhandled rejection:\n${reason}\n${reason.sourceURL}:${reason.line}:${reason.column}\n${reason.stack}`;
    handleError(message);
});

addEventListener('error', event => {
    const reason = event.error;
    const message = `Unhandled error:\n${reason}\n${reason.sourceURL}:${reason.line}:${reason.column}\n${reason.stack}`;
    handleError(message);
    return true;
});

function handleError(message) {
    logError(message);
    if (enableAlerts) {
        alert(message);
    }
}

function logError(message) {
    console.log(message);
    // Enregistrer les erreurs dans localStorage pour un débogage ultérieur
    let existingLogs = JSON.parse(localStorage.getItem("errorLogs")) || [];
    existingLogs.push({ timestamp: new Date().toISOString(), message });
    localStorage.setItem("errorLogs", JSON.stringify(existingLogs));
}

// Importer dynamiquement le module principal
import('./psfree.mjs').catch(error => handleError(`Erreur d'importation : ${error}`));
