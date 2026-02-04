/**
 * Hardware PIN API Utility
 * Handles OTP generation, validation, and PIN creation
 * Calls Next.js API routes which proxy to the product API
 */

/**
 * Extract error message from API response
 */
function extractErrorMessage(error: any): string {
  if (error.response?.data) {
    const data = error.response.data;
    if (data.statusDescription) return data.statusDescription;
    if (data.data?.respMsg) return data.data.respMsg;
    if (data.message) return data.message;
    if (data.error) {
      return typeof data.error === 'string' ? data.error : data.error.message || 'An error occurred';
    }
    return 'Unexpected server response';
  }

  if (error.message) {
    if (error.message.includes('Network Error') || error.message.includes('timeout')) {
      return 'Network connection error. Please check your internet connection and try again.';
    }
    if (error.message.includes('401') || error.message.includes('403')) {
      return 'Authentication failed. Please try again.';
    }
  }

  return error.message || 'Network error';
}

/**
 * Make API request to Next.js API route
 */
async function makeApiRequest(
  endpoint: string,
  payload: Record<string, any>
): Promise<any> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Always read the response body, even for error statuses
    const data = await response.json();

    // Handle error response from API route (including 500 errors)
    if (!response.ok || data.success === false || data.error) {
      // Extract error message from various possible locations
      const errorMessage = 
        data.statusDescription || 
        data.error || 
        data.data?.respMsg || 
        data.message ||
        `Server error: ${response.status} ${response.statusText}`;
      
      throw new Error(errorMessage);
    }

    // Handle API response format
    if (data.statusCode === '200' || data.statusCode === 200) {
      return {
        statusCode: '200',
        statusDescription: data.statusDescription || 'Success',
        data: data.data,
        message: data.data?.respMsg || data.statusDescription || 'Success',
        ...(data.otp ? { otp: data.otp } : {}),
      };
    }

    // Error response
    throw new Error(data.statusDescription || data.data?.respMsg || data.error || 'Request failed');
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export const hardwarePinApi = {
  /**
   * Step 1: Send OTP
   * @param customerId - Customer ID (required)
   */
  async sendOTP(customerId: string) {
    const payload = { customer_id: customerId };
    const response = await makeApiRequest('/api/hardware-pin/send-otp', payload);
    
    // Check if respCode indicates error
    if (response.data?.respCode && response.data.respCode !== '0') {
      throw new Error(response.data.respMsg || response.statusDescription || 'Failed to send OTP');
    }
    
    return response;
  },

  /**
   * Step 2: Validate OTP
   * @param otp - OTP token to validate (required)
   * @param customerId - Customer ID (required)
   */
  async validateOTP(otp: string, customerId: string) {
    const payload = { customer_id: customerId, otp: otp };
    const response = await makeApiRequest('/api/hardware-pin/validate-otp', payload);
    
    // Check if respCode indicates success
    if (response.data?.respCode !== '0') {
      throw new Error(response.data?.respMsg || response.statusDescription || 'OTP validation failed');
    }
    
    return response;
  },

  /**
   * Step 3: Create hardware pin
   * @param userId - User ID (required)
   * @param serialNumber - Hardware token serial number (required)
   * @param pin - 4-digit PIN (required)
   */
  async createHardwarePin(userId: string, serialNumber: string, pin: string) {
    const payload = { userId, serialNumber, pin };
    const response = await makeApiRequest('/api/hardware-pin/create-pin', payload);
    
    // Check if respCode indicates success
    if (response.data?.respCode !== '00' && response.data?.respCode !== '0') {
      // Prioritize statusDescription from the API route response
      throw new Error(response.statusDescription || response.data?.respMsg || 'Failed to create PIN');
    }
    
    return response;
  },
};

