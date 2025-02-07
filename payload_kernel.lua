local js = require("js")
local memory = js.global:mem()
local syscall = js.global:execute_syscall()

-- Fonction principale pour gérer les payloads et l'extraction du kernel
function main()
    print("Démarrage du payload Lua avec extraction du kernel et gestion des écritures.")

    -- Étape 1 : Allouer dynamiquement la mémoire avec mmap
    local mmap_address = syscall("mmap", 0x300000, 0x2000, 0x7, 0x22, -1, 0)
    print("Adresse mémoire allouée : " .. string.format("0x%X", mmap_address))

    -- Étape 2 : Écriture de données en mémoire
    local test_data = { 0x41, 0x41, 0x41, 0x41 }  -- Écriture de 'AAAA'
    if writeToMemory(mmap_address, test_data) then
        print("Écriture des données 'AAAA' réussie.")
    else
        print("Échec de l'écriture en mémoire.")
    end

    -- Étape 3 : Vérifier les données écrites
    local read_data = readFromMemory(mmap_address, 4)
    if verifyData(read_data, test_data) then
        print("Les données écrites et lues correspondent : vérification réussie.")
    else
        print("Les données ne correspondent pas : échec de la vérification.")
    end

    -- Étape 4 : Extraction des données kernel critiques
    extractKernelData()

    -- Étape 5 : Injection d'un payload ELF
    executeELFPayload("path/to/ps5debug.elf", mmap_address)
end

-- Fonction pour extraire les données critiques du kernel
function extractKernelData()
    print("\n--- Extraction des données kernel ---")

    -- Localiser la base du kernel
    local kernel_base = findKernelBase()
    if not kernel_base then
        print("Base du kernel introuvable.")
        return
    end
    print("Base du kernel détectée à : " .. string.format("0x%X", kernel_base))

    -- Lire des données à partir d'un offset exemple
    local kernel_config_address = kernel_base + 0x1000
    local config_data = readFromMemory(kernel_config_address, 32)

    -- Afficher les données extraites
    print("Données kernel extraites :")
    for i, value in ipairs(config_data) do
        io.write(string.format("%02X ", value))
    end
    print("\n")

    -- Sauvegarder les données
    saveKernelDump("kernel_config_dump.bin", config_data)
end

-- Localise la base du kernel
function findKernelBase()
    local scan_address = 0xFFFF0000  -- Adresse de départ typique sur PS5
    while scan_address > 0 do
        local data = memory:read32(scan_address)
        if isValidKernelSignature(data) then
            return scan_address
        end
        scan_address = scan_address - 0x1000  -- Descente par pages
    end
    return nil
end

-- Vérifie si la signature correspond au kernel
function isValidKernelSignature(data)
    return data == 0xCAFEBABE  -- Exemple fictif, peut être modifié
end

-- Écrit des données en mémoire
function writeToMemory(address, data)
    for i, value in ipairs(data) do
        memory:write8(address + (i - 1), value)
    end
    return true
end

-- Lit des données en mémoire
function readFromMemory(address, length)
    local result = {}
    for i = 0, length - 1 do
        result[i + 1] = memory:read8(address + i)
    end
    return result
end

-- Vérifie la correspondance des données
function verifyData(read_data, expected_data)
    for i, value in ipairs(expected_data) do
        if read_data[i] ~= value then
            return false
        end
    end
    return true
end

-- Sauvegarde les données kernel extraites
function saveKernelDump(filename, data)
    local file = io.open(filename, "wb")
    for _, byte in ipairs(data) do
        file:write(string.char(byte))
    end
    file:close()
    print("Données kernel sauvegardées dans : " .. filename)
end

-- Injecte un payload ELF
function executeELFPayload(file, address)
    print("Chargement du payload ELF : " .. file)
    memory:writeELF(file, address)
    print("Payload ELF chargé avec succès.")
end

-- Lancer le payload principal
main()
