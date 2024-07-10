const encryptionMap = {
    'a': '0',    'b': '1',    'c': '001', 'd': '100',
    'e': '010',  'f': '011',  'g': '110', 'h': '111',
    'i': '0001', 'j': '0010', 'k': '0011', 'l': '0100',
    'm': '0101', 'n': '0110', 'o': '0111', 'p': '1000',
    'q': '1001', 'r': '1010', 's': '1011', 't': '1100',
    'u': '1101', 'v': '1110', 'w': '1111', 'x': '00001',
    'y': '00010','z': '00011', ' ': '\u200B', '\n': '\u200B' 

const decryptionMap = Object.fromEntries(
    Object.entries(encryptionMap).map(([k, v]) => [v, k])
);

const separator = '\u200B'; 
function removeSpecialCharacters(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function encrypt(text) {
    const cleanText = removeSpecialCharacters(text);
    return cleanText.split('').map(char => encryptionMap[char] || '').join(separator);
}

function decrypt(text) {
    return text.split(separator).map(code => decryptionMap[code] !== undefined ? decryptionMap[code] : code).join('');
}

// Restante do seu código para interação com o HTML permanece igual


document.getElementById('encrypt-btn').addEventListener('click', function() {
    const inputText = document.getElementById('input-text').value;
    const outputText = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');

    if (inputText) {
        const encryptedText = encrypt(inputText);
        outputText.value = encryptedText;
        document.getElementById('iniciacao-mensagem').style.display = 'none';
        document.getElementById('resposta-mensagem').style.display = 'block';
        copyBtn.disabled = false;
    } else {
        outputText.value = 'Nenhuma mensagem encontrada. Digite um texto para criptografar.';
        copyBtn.disabled = true;
    }
});

document.getElementById('decrypt-btn').addEventListener('click', function() {
    const inputText = document.getElementById('input-text').value;
    const outputText = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');

    if (inputText) {
        const decryptedText = decrypt(inputText);
        outputText.value = decryptedText;
        document.getElementById('iniciacao-mensagem').style.display = 'none';
        document.getElementById('resposta-mensagem').style.display = 'block';
        copyBtn.disabled = false;
    } else {
        outputText.value = 'Nenhuma mensagem encontrada. Digite um texto para descriptografar.';
        copyBtn.disabled = true;
    }
});

document.getElementById('copy-btn').addEventListener('click', function() {
    const outputText = document.getElementById('output-text').value;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(outputText).then(() => {
            const copyMsg = document.getElementById('copy-msg');
            copyMsg.style.display = 'inline';
            setTimeout(() => {
                copyMsg.style.display = 'none';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    } else {
        fallbackCopyTextToClipboard(outputText);
    }
});

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        const copyMsg = document.getElementById('copy-msg');
        copyMsg.style.display = 'inline';
        setTimeout(() => {
            copyMsg.style.display = 'none';
        }, 2000);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
