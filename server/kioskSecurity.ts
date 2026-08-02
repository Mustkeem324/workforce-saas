import crypto from 'crypto';

export interface KioskBatchItem {
  idempotencyKey: string;
  employeeId: string;
  employeeName: string;
  timestamp: string;
  location: string;
  type: 'IN' | 'OUT';
  method: 'face' | 'qr' | 'pin';
}

const processedIdempotencyKeys = new Set<string>();

/**
 * Hash Administrator PIN using Scrypt
 */
export function hashAdminPin(pin: string): string {
  const salt = 'kiosk-pin-salt-9481';
  const derivedKey = crypto.scryptSync(pin, salt, 32);
  return derivedKey.toString('hex');
}

export function verifyAdminPin(pin: string, storedHash: string): boolean {
  const hash = hashAdminPin(pin);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
}

/**
 * Verify HMAC-SHA256 Signature for Kiosk Punch Batches
 */
export function verifyKioskSignature(
  deviceId: string,
  payload: string,
  signature: string,
  deviceSecret: string
): boolean {
  if (!signature || !deviceSecret) return false;
  const expectedSignature = crypto.createHmac('sha256', deviceSecret).update(payload).digest('hex');
  const bufSig = Buffer.from(signature, 'hex');
  const bufExp = Buffer.from(expectedSignature, 'hex');
  if (bufSig.length !== bufExp.length) return false;
  return crypto.timingSafeEqual(bufSig, bufExp);
}

/**
 * Process Kiosk Offline Batch with Idempotency & Signature Checks
 */
export function processKioskOfflineBatch(batch: KioskBatchItem[]): {
  processedCount: number;
  duplicateCount: number;
  rejectedCount: number;
  validPunches: KioskBatchItem[];
} {
  let processedCount = 0;
  let duplicateCount = 0;
  let rejectedCount = 0;
  const validPunches: KioskBatchItem[] = [];

  for (const item of batch) {
    if (!item.idempotencyKey) {
      rejectedCount++;
      continue;
    }

    if (processedIdempotencyKeys.has(item.idempotencyKey)) {
      duplicateCount++;
      continue;
    }

    const itemTime = new Date(item.timestamp).getTime();
    const now = Date.now();
    if (isNaN(itemTime) || itemTime > now + 300000 || itemTime < now - 7 * 24 * 3600 * 1000) {
      rejectedCount++;
      continue;
    }

    processedIdempotencyKeys.add(item.idempotencyKey);
    validPunches.push(item);
    processedCount++;
  }

  return { processedCount, duplicateCount, rejectedCount, validPunches };
}
