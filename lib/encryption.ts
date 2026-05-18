import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

function getKey(): Buffer {
  const raw = process.env.ENCRYPTION_KEY;
  if (!raw) throw new Error('ENCRYPTION_KEY environment variable is not set');
  return Buffer.from(raw, 'hex');
}

export function encrypt(text: string): { encrypted: string; iv: string; tag: string } {
  const KEY = getKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return {
    encrypted: encrypted.toString('hex'),
    iv: iv.toString('hex'),
    tag: cipher.getAuthTag().toString('hex'),
  };
}

export function decrypt(encrypted: string, iv: string, tag: string): string {
  const KEY = getKey();
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, Buffer.from(iv, 'hex'));
  decipher.setAuthTag(Buffer.from(tag, 'hex'));
  return Buffer.concat([
    decipher.update(Buffer.from(encrypted, 'hex')),
    decipher.final(),
  ]).toString('utf8');
}

export function maskApiKey(key: string): string {
  if (key.length < 8) return '••••••••';
  const parts = key.split('-');
  const prefix = parts.slice(0, 3).join('-'); // sk-ant-api03
  const last4 = key.slice(-4);
  return `${prefix}-${'•'.repeat(20)}${last4}`;
}
