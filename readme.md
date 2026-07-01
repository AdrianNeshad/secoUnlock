<h1 id="title">Exodus seed.seco unlock</h1>

1.  The script reads the seed.seco file in `case/seed.seco`, this file is usually found in <code>%appdata%/Exodus/exodus.wallet</code>.
2.  It then tries the passwords from `case/passwords.txt`.
3.  If a password is correct it decrypts the seed.seco file and extracts the seed phrase in `output/Mnemonic.txt`.

The repository already includes a `seed.seco` file and the corresponding password in `passwords.txt` to test out the script.

<h2>Installation Steps:</h2>

<p>1. Install all required modules</p>

```
npm i
```

<p>2. Run the script</p>

```
node index.js
```

### **Användaravtal:**

*   Vid lyckad extrahering av `seed.seco`-fil är användaren skyldig Adrian (repository owner) en öl.