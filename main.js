const seco = require("seco-file");
const zlib = require("zlib");
const bs = require("bitcoin-seed");
const fs = require("fs");
const path = require("path");

function shrink(e) {
    const t = e.readUInt32BE(0);
    return e.slice(4, t + 4);
}

function decrypt(secoPath, password) {
    try {
        let decrypted = seco.decryptData(fs.readFileSync(secoPath), password).data;
        let shrinked = shrink(decrypted);
        let gunzipped = zlib.gunzipSync(shrinked);
        let mnemonic = bs.fromBuffer(gunzipped).mnemonicString;
        return mnemonic;
    } catch (err) {
        return null;
    }
}

const secoFilePath = path.join(__dirname, "case/seed.seco");
const outputDir = path.join(__dirname, "output");

function ExodusExtract() {
    const passwords = fs
        .readFileSync(path.join(__dirname, "case/passwords.txt"), "utf-8")
        .split("\n")
        .map(password => password.trim())
        .filter(password => password.length > 0);

    const total = passwords.length;

    for (let i = 0; i < total; i++) {
        const password = passwords[i];

        // Visa progress i terminalen
        console.log(`\u001b[33m[${i + 1}/${total}] Testing password:\u001b[0m ${password}`);

        let decryptedMnemonic = decrypt(secoFilePath, password);

        if (decryptedMnemonic) {

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            // Hitta ett ledigt filnamn (Mnemonic.txt, Mnemonic1.txt, Mnemonic2.txt, ...)
            let fileName = "Mnemonic.txt";
            let filePath = path.join(outputDir, fileName);
            let counter = 1;

            while (fs.existsSync(filePath)) {
                fileName = `Mnemonic${counter}.txt`;
                filePath = path.join(outputDir, fileName);
                counter++;
            }

            // Skriv mnemonicen till filen
            fs.writeFileSync(filePath, decryptedMnemonic);

            return {
                mnemonic: decryptedMnemonic,
                password: password,
                success: true
            };
        }
    }

    return {
        Error: "No matching password found.",
        success: false
    };
}

var result = ExodusExtract();

if (result.success === false) {
    console.log(result);
} else {
    console.log("\n\u001b[34mPassword: \u001b[32m", result.password,"\n");
    console.log("\u001b[34mMnemonic: \u001b[32m", result.mnemonic,"\n");
}