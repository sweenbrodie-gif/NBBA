/**
 * NBBA Broadcast Graphics - Firebase Storage Module
 * 
 * Handles file uploads, downloads, and image management.
 */

import { getStorage, CONFIG } from '../config.js';

/**
 * Upload a file to Firebase Storage
 * @param {string} path - Storage path (e.g., 'teams/logos/')
 * @param {string} filename - File name
 * @param {File} file - File object
 * @param {Function} onProgress - Progress callback (optional)
 * @returns {Promise<string|null>} Download URL or null
 */
async function uploadFile(path, filename, file, onProgress = null) {
  try {
    const storage = getStorage();
    const fullPath = `${path}${filename}`;
    const storageRef = storage.ref(fullPath);

    let uploadTask = storageRef.put(file);

    if (onProgress) {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
        }
      );
    }

    const snapshot = await uploadTask;
    const downloadURL = await snapshot.ref.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error(`Error uploading file ${filename}:`, error);
    return null;
  }
}

/**
 * Upload a team logo
 * @param {string} teamId - Team ID
 * @param {File} file - Logo file
 * @param {boolean} isAlternate - Is this an alternate logo
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<string|null>} Download URL
 */
async function uploadTeamLogo(teamId, file, isAlternate = false, onProgress = null) {
  const path = isAlternate ? CONFIG.STORAGE_PATHS.TEAM_ALTERNATES : CONFIG.STORAGE_PATHS.TEAM_LOGOS;
  const filename = `${teamId}_${Date.now()}`;
  return uploadFile(path, filename, file, onProgress);
}

/**
 * Upload a player photo
 * @param {string} playerId - Player ID
 * @param {File} file - Photo file
 * @param {boolean} isHeadshot - Is this a headshot
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<string|null>} Download URL
 */
async function uploadPlayerPhoto(playerId, file, isHeadshot = false, onProgress = null) {
  const path = isHeadshot ? CONFIG.STORAGE_PATHS.PLAYER_HEADSHOTS : CONFIG.STORAGE_PATHS.PLAYER_PHOTOS;
  const filename = `${playerId}_${Date.now()}`;
  return uploadFile(path, filename, file, onProgress);
}

/**
 * Upload a sponsor logo
 * @param {string} sponsorId - Sponsor ID
 * @param {File} file - Logo file
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<string|null>} Download URL
 */
async function uploadSponsorLogo(sponsorId, file, onProgress = null) {
  const path = CONFIG.STORAGE_PATHS.SPONSOR_LOGOS;
  const filename = `${sponsorId}_${Date.now()}`;
  return uploadFile(path, filename, file, onProgress);
}

/**
 * Delete a file from storage
 * @param {string} url - Download URL of file to delete
 * @returns {Promise<boolean>} Success status
 */
async function deleteFile(url) {
  try {
    const storage = getStorage();
    const fileRef = storage.refFromURL(url);
    await fileRef.delete();
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}

/**
 * Get download URL for a file
 * @param {string} path - Storage path
 * @returns {Promise<string|null>} Download URL
 */
async function getDownloadURL(path) {
  try {
    const storage = getStorage();
    const url = await storage.ref(path).getDownloadURL();
    return url;
  } catch (error) {
    console.error(`Error getting download URL for ${path}:`, error);
    return null;
  }
}

/**
 * Resize image for optimization (client-side)
 * @param {File} file - Image file
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @returns {Promise<Blob>} Resized image blob
 */
async function resizeImage(file, maxWidth = 1000, maxHeight = 1000) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round(height * (maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round(width * (maxHeight / height));
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, file.type, 0.85);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  uploadFile,
  uploadTeamLogo,
  uploadPlayerPhoto,
  uploadSponsorLogo,
  deleteFile,
  getDownloadURL,
  resizeImage,
};
