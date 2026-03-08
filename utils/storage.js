import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_DIR = path.join(os.homedir(), '.expenswise');
const TOKEN_FILE = path.join(CONFIG_DIR, 'token.json');

export function saveToken(token) {
    if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
    fs.writeFileSync(TOKEN_FILE, JSON.stringify({ token }), 'utf-8');
}

export function getToken() {
    if (fs.existsSync(TOKEN_FILE)) {
        try {
            const data = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8'));
            return data.token;
        } catch (error) {
            return null;
        }
    }
    return null;
}

export function clearToken() {
    if (fs.existsSync(TOKEN_FILE)) {
        fs.unlinkSync(TOKEN_FILE);
    }
}
