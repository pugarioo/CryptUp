const character_numerics = {};

for (let i = 0; i < 26; i++) {
    const lowercase = String.fromCharCode(97 + i);
    const uppercase = String.fromCharCode(65 + i);
    character_numerics[lowercase] = i;
    character_numerics[uppercase] = i;
}

function getNumeric(char) {
    return character_numerics[char];
}

function isCapital(char) {
    return char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90;
}

function getCharacter(number, isCapital) {
    let char = Object.keys(character_numerics).find((char) => {
        return character_numerics[char] === number;
    });

    if (isCapital) {
        return String.fromCharCode(char.charCodeAt(0) - 32);
    } else {
        return char;
    }
}

function shiftKey(key) {
    let keyLength = key.length;

    let newKey = "";

    for (let char of key) {
        newKey += getCharacter(
            (getNumeric(char) + keyLength) % 26,
            isCapital(char)
        );
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
        if (plain_text.charAt(i) === " ") {
            usableKey += " ";
            continue;
        }
        usableKey += referenceKey.charAt(i % referenceKey.length);
    }

    let encrypted = "";

    for (let i = 0; i < plain_text.length; i++) {
        if (plain_text.charAt(i) === " ") {
            encrypted += " ";
            continue;
        }

        encrypted += getCharacter(
            (getNumeric(plain_text.charAt(i)) +
                getNumeric(usableKey.charAt(i))) %
                26,
            isCapital(plain_text.charAt(i))
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
        if (rev_encrypted_text.charAt(i) === " ") {
            usableKey += " ";
            continue;
        }
        usableKey += referenceKey.charAt(i % referenceKey.length);
    }

    for (let i = 0; i < rev_encrypted_text.length; i++) {
        if (rev_encrypted_text.charAt(i) === " ") {
            decrypted += " ";
            continue;
        }

        decrypted += getCharacter(
            (getNumeric(rev_encrypted_text.charAt(i)) -
                getNumeric(usableKey.charAt(i)) +
                26) %
                26,
            isCapital(rev_encrypted_text.charAt(i))
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
