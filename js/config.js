/**
 * NBBA Broadcast Graphics - Firebase Configuration
 * 
 * This module initializes Firebase and provides the app instance.
 * All other modules depend on this configuration.
 * 
 * IMPORTANT: Replace these values with your actual Firebase project credentials.
 * Get these from: Firebase Console > Project Settings > Your Apps > Web
 */

// ============================================================================
// FIREBASE CONFIGURATION
// ============================================================================
// Replace these values with your Firebase project credentials
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef1234567890abcdef",
};

// ============================================================================
// INITIALIZE FIREBASE
// ============================================================================
let app = null;
let db = null;
let auth = null;
let storage = null;

/**
 * Initialize Firebase application
 * Called automatically when config.js is imported
 */
function initializeFirebase() {
  try {
    // Import Firebase modules from CDN
    // These should be loaded before this script via <script> tags
    if (typeof firebase === 'undefined') {
      console.error('Firebase SDK not loaded. Include Firebase scripts in HTML.');
      return false;
    }

    // Initialize Firebase
    app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    storage = firebase.storage();

    // Enable offline persistence for Firestore
    db.enablePersistence().catch((err) => {
      if (err.code == 'failed-precondition') {
        console.warn('Multiple tabs open, persistence disabled');
      } else if (err.code == 'unimplemented') {
        console.warn('Browser does not support offline persistence');
      }
    });

    console.log('✓ Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('✗ Firebase initialization failed:', error);
    return false;
  }
}

// ============================================================================
// FIREBASE INSTANCE GETTERS
// ============================================================================

/**
 * Get Firebase app instance
 * @returns {firebase.app.App} Firebase app instance
 */
function getFirebaseApp() {
  if (!app) {
    initializeFirebase();
  }
  return app;
}

/**
 * Get Firestore database instance
 * @returns {firebase.firestore.Firestore} Firestore instance
 */
function getFirestore() {
  if (!db) {
    initializeFirebase();
  }
  return db;
}

/**
 * Get Firebase Auth instance
 * @returns {firebase.auth.Auth} Auth instance
 */
function getAuth() {
  if (!auth) {
    initializeFirebase();
  }
  return auth;
}

/**
 * Get Firebase Storage instance
 * @returns {firebase.storage.Storage} Storage instance
 */
function getStorage() {
  if (!storage) {
    initializeFirebase();
  }
  return storage;
}

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

const CONFIG = {
  // Database collection names
  COLLECTIONS: {
    USERS: 'users',
    TEAMS: 'teams',
    PLAYERS: 'players',
    GAMES: 'games',
    STATISTICS: 'statistics',
    PLAYBYPLAY: 'playbyplay',
    GRAPHICS: 'graphics',
    HISTORY: 'history',
    SETTINGS: 'settings',
    SERIES: 'series',
  },

  // User roles
  ROLES: {
    ADMIN: 'admin',
    OPERATOR: 'operator',
    STATISTICIAN: 'statistician',
    GUEST: 'guest',
  },

  // Game states
  GAME_STATES: {
    DRAFT: 'draft',
    PREGAME: 'pregame',
    LIVE: 'live',
    HALFTIME: 'halftime',
    POSTGAME: 'postgame',
    ARCHIVED: 'archived',
  },

  // Clock states
  CLOCK_STATES: {
    STOPPED: 'stopped',
    RUNNING: 'running',
    PAUSED: 'paused',
  },

  // Quarters
  PERIODS: {
    Q1: 'Q1',
    Q2: 'Q2',
    Q3: 'Q3',
    Q4: 'Q4',
    OT: 'OT',
  },

  // Animation speeds (milliseconds)
  ANIMATION_SPEEDS: {
    FAST: 300,
    NORMAL: 500,
    SLOW: 800,
    VERY_SLOW: 1200,
  },

  // Screen resolutions
  RESOLUTIONS: {
    HD: { width: 1920, height: 1080 },
    2K: { width: 2560, height: 1440 },
    4K: { width: 3840, height: 2160 },
  },

  // Default values
  DEFAULTS: {
    GAME_CLOCK_SECONDS: 600,      // 10 minutes (600 seconds)
    SHOT_CLOCK_SECONDS: 24,        // 24 seconds
    QUARTER_DURATION_SECONDS: 1200, // 20 minutes
    HALFTIME_DURATION_SECONDS: 600, // 10 minutes
    TIMEOUT_DURATION_SECONDS: 60,   // 1 minute
  },

  // Storage paths
  STORAGE_PATHS: {
    TEAM_LOGOS: 'teams/logos/',
    TEAM_ALTERNATES: 'teams/alternates/',
    PLAYER_PHOTOS: 'players/photos/',
    PLAYER_HEADSHOTS: 'players/headshots/',
    SPONSOR_LOGOS: 'sponsors/logos/',
    GAME_IMAGES: 'games/images/',
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  firebaseConfig,
  initializeFirebase,
  getFirebaseApp,
  getFirestore,
  getAuth,
  getStorage,
  CONFIG,
};
