<h1 id="title">Exodus seed.seco unlock</h1>

1.  The script reads the encrypted wallet data from the `case/seed.seco`.
2.  It then tries the passwords from `case/passwords.txt`.
3.  If a password is correct it decrypts the file extracts the passphrase and returns it in `output/Mnemonic.txt`.


The repository already includes a real `seed.seco` and one of the password of `passwords.txt` to test out the script.
  
### **Where to Find the `seed.seco` File:**

<p>You can obtain the <code>seed.seco</code> file by navigating to the following directory on your computer: <code>%appdata%/Exodus/exodus.wallet</code>.</p>

### **Important Notes:**

*   Please ensure you have a legitimate reason to recover your wallet 🔍.
*   This tool is intended for **personal use only 🔒**.

  

<h2>🛠️ Installation Steps:</h2>

<p>1. Install all required modules (it will automatically install good versions, may download a bad version if you manually download)</p>

```
npm i
```

<p>2. Run the script</p>

```
node index.js
```