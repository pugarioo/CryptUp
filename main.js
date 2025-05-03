function shiftKey(key) {
    let keyLength = key.length;

    let newKey = "";

    for (let char of key) {
        newKey += String.fromCharCode((char.charCodeAt(0) + key.length) % 256);
    }

    return newKey;
}

function reverse(str) {
    let reversed = "";

    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str.charAt(i);
    }

    return reversed;
}

function encryptMessage(plain_text, key) {
    let referenceKey = shiftKey(key);

    let usableKey = "";

    for (let i = 0; i < plain_text.length; i++) {
        usableKey += referenceKey.charAt(i % referenceKey.length);
    }

    let encrypted = "";

    for (let i = 0; i < plain_text.length; i++) {
        encrypted += String.fromCharCode(
            (plain_text.charCodeAt(i) + usableKey.charCodeAt(i)) % 256
        );
    }

    return reverse(encrypted);
}

function decryptMessage(encrypted_text, key) {
    let rev_encrypted_text = reverse(encrypted_text);

    let referenceKey = shiftKey(key);

    let decrypted = "";

    let usableKey = "";
    for (let i = 0; i < rev_encrypted_text.length; i++) {
        usableKey += referenceKey.charAt(i % referenceKey.length);
    }

    for (let i = 0; i < rev_encrypted_text.length; i++) {
        decrypted += String.fromCharCode(
            (rev_encrypted_text.charCodeAt(i) - usableKey.charCodeAt(i) + 256) %
                256
        );
    }

    return decrypted;
}

function encrypt() {
    const text = document.querySelector("#message").value;
    const key = document.querySelector("#key").value;

    document.querySelector("#result").value = encryptMessage(text, key);
}

function decrypt() {
    const text = document.querySelector("#message").value;
    const key = document.querySelector("#key").value;

    document.querySelector("#result").value = decryptMessage(text, key);
}

function resetFields() {
    document.getElementById("message").value = "";
    document.getElementById("key").value = "";
    document.getElementById("result").value = "";
}
