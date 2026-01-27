/**
 * URL validation utilities for Link Collections widget
 * Implements security best practices to prevent XSS and injection attacks
 */

const ALLOWED_PROTOCOLS = ["http:", "https:"];
const MAX_URL_LENGTH = 2048;
const MAX_NAME_LENGTH = 100;

/**
 * Validates that a URL uses a safe protocol (http/https only)
 * Prevents javascript:, data:, and other potentially dangerous protocols
 *
 * @param url - The URL to validate
 * @returns true if the URL is safe to use, false otherwise
 */
export function isValidUrl(url: string): boolean {
  if (!url || url.length > MAX_URL_LENGTH) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return ALLOWED_PROTOCOLS.includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Sanitizes a name string by removing potentially dangerous characters
 *
 * @param name - The name to sanitize
 * @returns Sanitized name with length limit applied
 */
export function sanitizeName(name: string): string {
  if (!name) return "";

  // Remove angle brackets to prevent potential XSS
  const sanitized = name.replace(/[<>]/g, "");

  // Apply length limit
  return sanitized.slice(0, MAX_NAME_LENGTH);
}

/**
 * Validates and sanitizes a URL string
 *
 * @param url - The URL to validate and sanitize
 * @returns Sanitized URL or empty string if invalid
 */
export function sanitizeUrl(url: string): string {
  if (!url) return "";

  const trimmed = url.trim();

  // Check length
  if (trimmed.length > MAX_URL_LENGTH) {
    return "";
  }

  // Validate protocol
  if (!isValidUrl(trimmed)) {
    return "";
  }

  return trimmed;
}

/**
 * Constants for validation
 */
export const VALIDATION = {
  MAX_URL_LENGTH,
  MAX_NAME_LENGTH,
  ALLOWED_PROTOCOLS,
} as const;
