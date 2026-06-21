/**
 * NBBA Broadcast Graphics - Firestore Module
 * 
 * Handles all Firestore database operations including real-time listeners,
 * document reads/writes, and batch operations.
 */

import { getFirestore, CONFIG } from '../config.js';

// Store active listeners for cleanup
const activeListeners = new Map();

/**
 * Get a single document
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @returns {Promise<Object|null>} Document data or null
 */
async function getDocument(collection, docId) {
  try {
    const db = getFirestore();
    const doc = await db.collection(collection).doc(docId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  } catch (error) {
    console.error(`Error getting document ${docId} from ${collection}:`, error);
    return null;
  }
}

/**
 * Get all documents from a collection with optional query
 * @param {string} collection - Collection name
 * @param {Array} constraints - Array of firebase.firestore.QueryConstraint
 * @returns {Promise<Array>} Array of documents with ids
 */
async function getDocuments(collection, constraints = []) {
  try {
    const db = getFirestore();
    let query = db.collection(collection);

    constraints.forEach(constraint => {
      query = query.where(constraint.field, constraint.operator, constraint.value);
    });

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error getting documents from ${collection}:`, error);
    return [];
  }
}

/**
 * Create or update a document
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @param {Object} data - Data to set
 * @param {boolean} merge - If true, merge with existing data
 * @returns {Promise<boolean>} Success status
 */
async function setDocument(collection, docId, data, merge = true) {
  try {
    const db = getFirestore();
    await db.collection(collection).doc(docId).set(data, { merge });
    return true;
  } catch (error) {
    console.error(`Error setting document ${docId} in ${collection}:`, error);
    return false;
  }
}

/**
 * Add a new document with auto-generated ID
 * @param {string} collection - Collection name
 * @param {Object} data - Document data
 * @returns {Promise<string|null>} New document ID or null
 */
async function addDocument(collection, data) {
  try {
    const db = getFirestore();
    const docRef = await db.collection(collection).add(data);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collection}:`, error);
    return null;
  }
}

/**
 * Update specific fields in a document
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<boolean>} Success status
 */
async function updateDocument(collection, docId, updates) {
  try {
    const db = getFirestore();
    await db.collection(collection).doc(docId).update(updates);
    return true;
  } catch (error) {
    console.error(`Error updating document ${docId} in ${collection}:`, error);
    return false;
  }
}

/**
 * Delete a document
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @returns {Promise<boolean>} Success status
 */
async function deleteDocument(collection, docId) {
  try {
    const db = getFirestore();
    await db.collection(collection).doc(docId).delete();
    return true;
  } catch (error) {
    console.error(`Error deleting document ${docId} from ${collection}:`, error);
    return false;
  }
}

/**
 * Set up real-time listener on a document
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @param {Function} callback - Called with document data on changes
 * @returns {Function} Unsubscribe function
 */
function listenToDocument(collection, docId, callback) {
  const db = getFirestore();
  const listenerId = `${collection}/${docId}`;

  const unsubscribe = db.collection(collection).doc(docId).onSnapshot(
    (doc) => {
      if (doc.exists) {
        callback({ id: doc.id, ...doc.data() });
      } else {
        callback(null);
      }
    },
    (error) => {
      console.error(`Error listening to ${listenerId}:`, error);
      callback(null);
    }
  );

  activeListeners.set(listenerId, unsubscribe);
  return () => {
    unsubscribe();
    activeListeners.delete(listenerId);
  };
}

/**
 * Set up real-time listener on a collection query
 * @param {string} collection - Collection name
 * @param {Function} callback - Called with array of documents on changes
 * @param {Array} constraints - Query constraints
 * @returns {Function} Unsubscribe function
 */
function listenToCollection(collection, callback, constraints = []) {
  const db = getFirestore();
  let query = db.collection(collection);

  constraints.forEach(constraint => {
    query = query.where(constraint.field, constraint.operator, constraint.value);
  });

  const listenerId = `collection_${collection}_${Date.now()}`;

  const unsubscribe = query.onSnapshot(
    (snapshot) => {
      const documents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(documents);
    },
    (error) => {
      console.error(`Error listening to collection ${collection}:`, error);
      callback([]);
    }
  );

  activeListeners.set(listenerId, unsubscribe);
  return () => {
    unsubscribe();
    activeListeners.delete(listenerId);
  };
}

/**
 * Perform a batch write operation
 * @param {Function} batchFn - Function that receives batch object
 * @returns {Promise<boolean>} Success status
 */
async function batch(batchFn) {
  try {
    const db = getFirestore();
    const batch = db.batch();
    await batchFn(batch);
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error in batch operation:', error);
    return false;
  }
}

/**
 * Increment a numeric field
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @param {string} field - Field name
 * @param {number} value - Value to increment by
 * @returns {Promise<boolean>} Success status
 */
async function incrementField(collection, docId, field, value = 1) {
  try {
    const db = getFirestore();
    await db.collection(collection).doc(docId).update({
      [field]: firebase.firestore.FieldValue.increment(value),
    });
    return true;
  } catch (error) {
    console.error(`Error incrementing field ${field}:`, error);
    return false;
  }
}

/**
 * Array union (add to array if not exists)
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @param {string} field - Array field name
 * @param {any} element - Element to add
 * @returns {Promise<boolean>} Success status
 */
async function arrayUnion(collection, docId, field, element) {
  try {
    const db = getFirestore();
    await db.collection(collection).doc(docId).update({
      [field]: firebase.firestore.FieldValue.arrayUnion(element),
    });
    return true;
  } catch (error) {
    console.error(`Error adding to array ${field}:`, error);
    return false;
  }
}

/**
 * Array remove (remove from array)
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @param {string} field - Array field name
 * @param {any} element - Element to remove
 * @returns {Promise<boolean>} Success status
 */
async function arrayRemove(collection, docId, field, element) {
  try {
    const db = getFirestore();
    await db.collection(collection).doc(docId).update({
      [field]: firebase.firestore.FieldValue.arrayRemove(element),
    });
    return true;
  } catch (error) {
    console.error(`Error removing from array ${field}:`, error);
    return false;
  }
}

/**
 * Clean up all active listeners
 * Call this when app is shutting down
 */
function unsubscribeAll() {
  activeListeners.forEach((unsubscribe) => {
    unsubscribe();
  });
  activeListeners.clear();
}

/**
 * Get server timestamp
 * @returns {Object} Firebase server timestamp
 */
function getServerTimestamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  getDocument,
  getDocuments,
  setDocument,
  addDocument,
  updateDocument,
  deleteDocument,
  listenToDocument,
  listenToCollection,
  batch,
  incrementField,
  arrayUnion,
  arrayRemove,
  unsubscribeAll,
  getServerTimestamp,
};
