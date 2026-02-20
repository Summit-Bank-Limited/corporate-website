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
    console.log(`[hardwarePinApi] Making request to ${endpoint}`, { payload: { ...payload } });
    
    // Set up 120 second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 120000); // 120 seconds
    
    let response;
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timeout: The request took longer than 120 seconds');
      }
      throw fetchError;
    }

    console.log(`[hardwarePinApi] Response status: ${response.status} ${response.statusText}`);

    // Parse JSON response with error handling
    let data;
    try {
      const responseText = await response.text();
      console.log(`[hardwarePinApi] Response text:`, responseText.substring(0, 200));
      
      if (!responseText) {
        throw new Error('Empty response from server');
      }
      
      data = JSON.parse(responseText);
      console.log(`[hardwarePinApi] Parsed response:`, JSON.stringify(data).substring(0, 200));
    } catch (parseError) {
      console.error(`[hardwarePinApi] JSON parse error:`, parseError);
      throw new Error(`Failed to parse server response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
    }

    // Handle error response from API route (including 500 errors)
    if (!response.ok || data.success === false || data.error) {
      // Extract error message from various possible locations
      const errorMessage = 
        data.statusDescription || 
        data.error || 
        data.data?.respMsg || 
        data.message ||
        `Server error: ${response.status} ${response.statusText}`;
      
      console.error(`[hardwarePinApi] API error:`, errorMessage);
      throw new Error(errorMessage);
    }

    // Handle API response format
    if (data.statusCode === '200' || data.statusCode === 200) {
      const formattedResponse = {
        statusCode: '200',
        statusDescription: data.statusDescription || 'Success',
        data: data.data,
        message: data.data?.respMsg || data.statusDescription || 'Success',
        ...(data.otp ? { otp: data.otp } : {}),
      };
      console.log(`[hardwarePinApi] Formatted success response:`, JSON.stringify(formattedResponse).substring(0, 200));
      return formattedResponse;
    }

    // Error response
    const errorMsg = data.statusDescription || data.data?.respMsg || data.error || 'Request failed';
    console.error(`[hardwarePinApi] Request failed:`, errorMsg);
    throw new Error(errorMsg);
  } catch (error) {
    console.error(`[hardwarePinApi] Request error:`, error);
    throw new Error(extractErrorMessage(error));
  }
}

export const hardwarePinApi = {
  /**
   * Step 1: Send OTP
   * @param customerId - Customer ID (required)
   */
  async sendOTP(customerId: string) {
    console.log(`[hardwarePinApi.sendOTP] Starting OTP generation for customer:`, customerId);
    const payload = { customer_id: customerId };
    const response = await makeApiRequest('/api/hardware-pin/send-otp', payload);
    
    console.log(`[hardwarePinApi.sendOTP] Received response:`, JSON.stringify(response).substring(0, 300));
    
    // Check if respCode indicates error
    // Only throw error if respCode exists and is explicitly an error code (not a success code)
    // Common success codes: '0', '00', '200', etc.
    // Common error codes: anything else that's not a known success code
    if (response.data?.respCode) {
      const respCode = String(response.data.respCode);
      const successCodes = ['0', '00', '200'];
      
      // Only throw error if respCode is not a known success code
      if (!successCodes.includes(respCode)) {
        const errorMsg = response.data.respMsg || response.statusDescription || 'Failed to send OTP';
        console.error(`[hardwarePinApi.sendOTP] Error respCode detected: ${respCode}`, errorMsg);
        throw new Error(errorMsg);
      } else {
        console.log(`[hardwarePinApi.sendOTP] Success respCode: ${respCode}`);
      }
    } else {
      // If respCode doesn't exist, check if statusCode indicates success
      // If statusCode is 200, we consider it successful even without respCode
      console.log(`[hardwarePinApi.sendOTP] No respCode in response, but statusCode is ${response.statusCode}`);
    }
    
    console.log(`[hardwarePinApi.sendOTP] Returning successful response`);
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

