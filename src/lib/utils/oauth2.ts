/**
 * OAuth2 Token Management Utility
 * Uses environment variables for client credentials
 * Does not store tokens in localStorage
 */

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

/**
 * Get OAuth2 Bearer token
 * Uses environment variables for client_id and client_secret
 * Caches token in memory (not localStorage) until expiry
 */
export async function getOAuth2Token(): Promise<string> {
  const now = Date.now();

  // Check if we have a valid cached token
  if (cachedToken && tokenExpiry && now < tokenExpiry) {
    return String(cachedToken).trim();
  }

  // Token expired or doesn't exist, get a new one
  try {
    const tokenUrl = process.env.NEXT_PUBLIC_OAUTH2_TOKEN_URL || 
      'https://apigateway-test.summitbankng.com/api/v1/auth/token';
    
    const clientId = process.env.NEXT_PUBLIC_OAUTH2_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_OAUTH2_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('OAuth2 client credentials not configured. Please set NEXT_PUBLIC_OAUTH2_CLIENT_ID and NEXT_PUBLIC_OAUTH2_CLIENT_SECRET environment variables.');
    }

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'client_credentials');

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error_description || 
        errorData.error || 
        `Failed to obtain token: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.access_token) {
      throw new Error('Access token not found in response');
    }

    // Cache token in memory (subtract 60 seconds for safety margin)
    const accessToken = String(data.access_token).trim();
    const expiresIn = data.expires_in || 3600; // Default to 1 hour
    const expiryTime = now + (expiresIn - 60) * 1000;

    cachedToken = accessToken;
    tokenExpiry = expiryTime;

    return accessToken;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to obtain authentication token';
    
    // Clear cached token on error
    cachedToken = null;
    tokenExpiry = null;
    
    throw new Error(errorMessage);
  }
}

/**
 * Clear cached token (useful for testing or forced refresh)
 */
export function clearOAuth2Token(): void {
  cachedToken = null;
  tokenExpiry = null;
}

