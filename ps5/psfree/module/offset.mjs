// Offsets principaux pour les manipulations mémoire
export const js_butterfly = 0x8;
export const js_inline_prop = 0x10;
export const size_jsobj = js_inline_prop;

// JSArrayBufferView
export const view_m_vector = 0x10;
export const view_m_length = 0x18;
export const view_m_mode = 0x1c;
export const size_view = 0x20;

// StringImpl
export const strimpl_strlen = 4;
export const strimpl_m_data = 8;
export const strimpl_inline_str = 0x14;
export const size_strimpl = 0x18;

// JSHTMLTextAreaElement
export const jsta_impl = 0x18;
export const size_jsta = 0x20;

// Constantes globales
export const KB = 1024;
export const MB = KB * KB;
export const GB = KB * KB * KB;
export const page_size = 16 * KB;

// Fonction pour ajuster dynamiquement les offsets si nécessaire
export function adjustOffsetsForFirmware(firmwareVersion) {
    if (firmwareVersion.startsWith("10")) {
        console.log("Ajustement des offsets pour le firmware 10.x...");
        // Exemple d'ajustement futur (pourrait être dynamique selon tests)
        // js_butterfly = 0xA; 
    }
}
