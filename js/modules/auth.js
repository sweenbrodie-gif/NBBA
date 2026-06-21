/**
 * NBBA Broadcast Graphics - Authentication Module
 * 
 * Handles user authentication, role management, and permissions.
 * Uses Firebase Authentication with custom claims for role-based access control.
 */

import { getAuth } from '../config.js';

let currentUser = null;
let currentUserRole = null;
let authStateCallbacks = [];

/**
 * Get current authenticated user
 * @returns {Object|null} Current user object or null
 */
function getCurrentUser() {
  return currentUser;
}

/**
 * Get current user's role
 * @returns {string|null} User role (admin, operator, statistician, guest)
 */
function getCurrentUserRole() {
  return currentUserRole;
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is logged in
 */
function isAuthenticated() {
  return currentUser !== null;
}

/**
 * Check if user has a specific role
 * @param {string} requiredRole - Role to check
 * @returns {boolean} True if user has the role
 */
function hasRole(requiredRole) {
  return currentUserRole === requiredRole;
}

/**
 * Check if user has permission (role-based)
 * @param {string} requiredRole - Minimum required role
 * @returns {boolean} True if user has sufficient permissions
 */
function hasPermission(requiredRole) {
  const roleHierarchy = {
    'admin': 4,
    'operator': 3,
    'statistician': 2,
    'guest': 1,
  };

  const userLevel = roleHierarchy[currentUserRole] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;

  return userLevel >= requiredLevel;
}

/**
 * Register authentication state listener
 * @param {Function} callback - Called with (user, role) when auth state changes
 * @returns {Function} Unsubscribe function
 */
function onAuthStateChanged(callback) {
  authStateCallbacks.push(callback);
  return () => {
    authStateCallbacks = authStateCallbacks.filter(cb => cb !== callback);
  };
}

/**
 * Notify all listeners of auth state change
 * @private
 */
function notifyAuthStateChange() {
  authStateCallbacks.forEach(callback => {
    callback(currentUser, currentUserRole);
  });
}

/**
 * Initialize auth state listener
 * Must be called once at app startup
 */
function initializeAuthListener() {
  const auth = getAuth();

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      currentUser = user;
      // Get user's custom claims (role)
      const idTokenResult = await user.getIdTokenResult();
      currentUserRole = idTokenResult.claims.role || 'guest';
    } else {
      currentUser = null;
      currentUserRole = null;
    }
    notifyAuthStateChange();
  });
}

/**
 * Login with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User credential object
 */
async function loginWithEmail(email, password) {
  try {
    const auth = getAuth();
    const credential = await auth.signInWithEmailAndPassword(email, password);
    return {
      success: true,
      user: credential.user,
      message: 'Login successful',
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: error.message,
    };
  }
}

/**
 * Logout current user
 * @returns {Promise<Object>} Result object
 */
async function logout() {
  try {
    const auth = getAuth();
    await auth.signOut();
    return {
      success: true,
      message: 'Logout successful',
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: error.message,
    };
  }
}

/**
 * Get ID token for API calls
 * @returns {Promise<string>} JWT token
 */
async function getIdToken() {
  try {
    if (!currentUser) {
      throw new Error('No user logged in');
    }
    return await currentUser.getIdToken();
  } catch (error) {
    console.error('Failed to get ID token:', error);
    return null;
  }
}

/**
 * Refresh user's auth token
 * @returns {Promise<void>}
 */
async function refreshToken() {
  try {
    if (currentUser) {
      await currentUser.getIdToken(true);
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
  }
}

/**
 * Check if user has specific email domain (for organizational accounts)
 * @param {string} domain - Domain to check (e.g., 'company.com')
 * @returns {boolean} True if user email ends with domain
 */
function hasEmailDomain(domain) {
  if (!currentUser || !currentUser.email) {
    return false;
  }
  return currentUser.email.endsWith(`@${domain}`);
}

/**
 * Get user's display name
 * @returns {string} Display name or email
 */
function getUserDisplayName() {
  if (!currentUser) {
    return 'Guest';
  }
  return currentUser.displayName || currentUser.email.split('@')[0];
}

/**
 * Get user's email
 * @returns {string} User email or empty string
 */
function getUserEmail() {
  return currentUser?.email || '';
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  getCurrentUser,
  getCurrentUserRole,
  isAuthenticated,
  hasRole,
  hasPermission,
  onAuthStateChanged,
  initializeAuthListener,
  loginWithEmail,
  logout,
  getIdToken,
  refreshToken,
  hasEmailDomain,
  getUserDisplayName,
  getUserEmail,
};
