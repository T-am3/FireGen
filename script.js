document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll('input[type="number"], input[type="checkbox"]');
    inputs.forEach(input => input.addEventListener('change', generatePassword));

    generatePassword(); // Initial password generation
});

function generatePassword() {
    const lengthInput = document.getElementById('passwordLength');
    const uppercaseCheckbox = document.getElementById('includeUppercase');
    const numbersCheckbox = document.getElementById('includeNumbers');
    const symbolsCheckbox = document.getElementById('includeSymbols');

    let passwordLength = parseInt(lengthInput.value, 10); // Parse the value as an integer

    // Ensure password length is between 1 and 20
    passwordLength = Math.max(1, Math.min(passwordLength, 20));

    lengthInput.value = passwordLength; // Update the input field value

    const includeUppercase = uppercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_-+=<>?';

    let allChars = lowercaseChars;
    if (includeUppercase) allChars += uppercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    const password = generateRandomPassword(allChars, passwordLength);

    const passwordResult = document.getElementById('passwordResult');
    const copiedIndicator = document.getElementById('copiedIndicator');

    passwordResult.innerText = password;
    copiedIndicator.style.display = 'none';

    copyToClipboard(); // Copy the generated password to clipboard automatically

    const passwordStrength = calculatePasswordStrength(password);
    updateStrengthBar(passwordStrength);
}

function generateRandomPassword(characters, length) {
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = randomValues[i] % characters.length;
        password += characters.charAt(randomIndex);
    }
    return password;
}

function copyToClipboard() {
    const passwordResult = document.getElementById('passwordResult');
    const textarea = document.createElement('textarea');
    textarea.value = passwordResult.innerText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const copiedIndicator = document.getElementById('copiedIndicator');
    copiedIndicator.style.display = 'block';
    setTimeout(function () {
        copiedIndicator.style.display = 'none';
    }, 1500);
}

function updateStrengthBar(strength) {
    const strengthBar = document.getElementById('strengthBar');
    strengthBar.style.width = `${strength}%`;
}

function calculatePasswordStrength(password) {
    // Simple password strength calculation based on length
    const lengthStrength = Math.min(password.length / 20 * 100, 100);
    return lengthStrength;
}
