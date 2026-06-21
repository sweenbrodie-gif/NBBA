/**
 * NBBA Broadcast Graphics - GSAP Animations Module
 * 
 * Professional broadcast-grade animations using GSAP.
 * All animations run at 60 FPS with smooth easing.
 */

/**
 * Check if GSAP is loaded
 * @private
 * @returns {boolean}
 */
function isGSAPLoaded() {
  return typeof gsap !== 'undefined';
}

/**
 * Fade in element
 * @param {Element|string} target - Target element or selector
 * @param {number} duration - Duration in seconds
 * @param {Object} options - Additional options
 * @returns {Promise<gsap.core.Timeline>} Animation timeline
 */
async function fadeIn(target, duration = 0.5, options = {}) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.to(target, {
    duration,
    opacity: 1,
    ease: 'power2.out',
    ...options,
  });
}

/**
 * Fade out element
 * @param {Element|string} target - Target element or selector
 * @param {number} duration - Duration in seconds
 * @param {Object} options - Additional options
 * @returns {Promise<gsap.core.Timeline>} Animation timeline
 */
async function fadeOut(target, duration = 0.5, options = {}) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.to(target, {
    duration,
    opacity: 0,
    ease: 'power2.out',
    ...options,
  });
}

/**
 * Slide in from left
 * @param {Element|string} target - Target element
 * @param {number} duration - Duration in seconds
 * @param {Object} options - Additional options
 * @returns {gsap.core.Timeline} Animation timeline
 */
function slideInLeft(target, duration = 0.6, options = {}) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.fromTo(target, 
    { x: -200, opacity: 0 },
    {
      duration,
      x: 0,
      opacity: 1,
      ease: 'power3.out',
      ...options,
    }
  );
}

/**
 * Slide in from right
 * @param {Element|string} target - Target element
 * @param {number} duration - Duration in seconds
 * @param {Object} options - Additional options
 * @returns {gsap.core.Timeline} Animation timeline
 */
function slideInRight(target, duration = 0.6, options = {}) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.fromTo(target,
    { x: 200, opacity: 0 },
    {
      duration,
      x: 0,
      opacity: 1,
      ease: 'power3.out',
      ...options,
    }
  );
}

/**
 * Slide out to left
 * @param {Element|string} target - Target element
 * @param {number} duration - Duration in seconds
 * @param {Object} options - Additional options
 * @returns {gsap.core.Timeline} Animation timeline
 */
function slideOutLeft(target, duration = 0.6, options = {}) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.to(target, {
    duration,
    x: -200,
    opacity: 0,
    ease: 'power3.in',
    ...options,
  });
}

/**
 * Slide out to right
 * @param {Element|string} target - Target element
 * @param {number} duration - Duration in seconds
 * @param {Object} options - Additional options
 * @returns {gsap.core.Timeline} Animation timeline
 */
function slideOutRight(target, duration = 0.6, options = {}) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.to(target, {
    duration,
    x: 200,
    opacity: 0,
    ease: 'power3.in',
    ...options,
  });
}

/**
 * Scale up element
 * @param {Element|string} target - Target element
 * @param {number} duration - Duration in seconds
 * @param {Object} options - Additional options
 * @returns {gsap.core.Timeline} Animation timeline
 */
function scaleUp(target, duration = 0.5, options = {}) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.fromTo(target,
    { scale: 0.8, opacity: 0 },
    {
      duration,
      scale: 1,
      opacity: 1,
      ease: 'elastic.out',
      ...options,
    }
  );
}

/**
 * Scale down element
 * @param {Element|string} target - Target element
 * @param {number} duration - Duration in seconds
 * @param {Object} options - Additional options
 * @returns {gsap.core.Timeline} Animation timeline
 */
function scaleDown(target, duration = 0.5, options = {}) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.to(target, {
    duration,
    scale: 0.8,
    opacity: 0,
    ease: 'elastic.in',
    ...options,
  });
}

/**
 * Bounce animation
 * @param {Element|string} target - Target element
 * @param {number} duration - Duration in seconds
 * @param {Object} options - Additional options
 * @returns {gsap.core.Timeline} Animation timeline
 */
function bounce(target, duration = 0.6, options = {}) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.to(target, {
    duration,
    y: 0,
    ease: 'bounce.out',
    ...options,
  });
}

/**
 * Rotate element
 * @param {Element|string} target - Target element
 * @param {number} rotation - Rotation in degrees
 * @param {number} duration - Duration in seconds
 * @param {Object} options - Additional options
 * @returns {gsap.core.Timeline} Animation timeline
 */
function rotate(target, rotation = 360, duration = 1, options = {}) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.to(target, {
    duration,
    rotation,
    ease: 'power2.inOut',
    ...options,
  });
}

/**
 * Glow effect (shadow pulse)
 * @param {Element|string} target - Target element
 * @param {string} color - Glow color
 * @param {number} duration - Duration in seconds
 * @returns {gsap.core.Timeline} Animation timeline
 */
function glow(target, color = '#ffffff', duration = 0.5) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.to(target, {
    duration,
    boxShadow: `0 0 20px ${color}`,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

/**
 * Pulse effect
 * @param {Element|string} target - Target element
 * @param {number} duration - Duration in seconds
 * @returns {gsap.core.Timeline} Animation timeline
 */
function pulse(target, duration = 0.5) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.to(target, {
    duration,
    scale: 1.1,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

/**
 * Flash effect
 * @param {Element|string} target - Target element
 * @param {number} times - Number of flashes
 * @param {number} duration - Duration in seconds
 * @returns {gsap.core.Timeline} Animation timeline
 */
function flash(target, times = 3, duration = 0.3) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.to(target, {
    duration: duration / 2,
    opacity: 0.5,
    repeat: times * 2 - 1,
    yoyo: true,
    ease: 'power2.inOut',
  });
}

/**
 * Shake effect
 * @param {Element|string} target - Target element
 * @param {number} duration - Duration in seconds
 * @returns {gsap.core.Timeline} Animation timeline
 */
function shake(target, duration = 0.5) {
  if (!isGSAPLoaded()) return null;
  
  return gsap.to(target, {
    duration: duration / 4,
    x: 10,
    repeat: 4,
    yoyo: true,
    ease: 'power2.inOut',
  });
}

/**
 * Stagger multiple elements
 * @param {string} selector - CSS selector for elements
 * @param {Object} config - Animation configuration
 * @returns {gsap.core.Timeline} Animation timeline
 */
function stagger(selector, config = {}) {
  if (!isGSAPLoaded()) return null;
  
  const defaults = {
    duration: 0.5,
    opacity: 1,
    y: 0,
    stagger: 0.1,
    ease: 'power2.out',
  };
  
  return gsap.to(selector, { ...defaults, ...config });
}

/**
 * Create timeline for sequential animations
 * @returns {gsap.core.Timeline} New timeline
 */
function createTimeline() {
  if (!isGSAPLoaded()) return null;
  return gsap.timeline();
}

/**
 * Play animation
 * @param {gsap.core.Timeline} timeline - Timeline to play
 */
function play(timeline) {
  if (timeline) {
    timeline.play();
  }
}

/**
 * Pause animation
 * @param {gsap.core.Timeline} timeline - Timeline to pause
 */
function pause(timeline) {
  if (timeline) {
    timeline.pause();
  }
}

/**
 * Kill all animations on target
 * @param {Element|string} target - Target element
 */
function killAll(target) {
  if (isGSAPLoaded()) {
    gsap.killTweensOf(target);
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  fadeIn,
  fadeOut,
  slideInLeft,
  slideInRight,
  slideOutLeft,
  slideOutRight,
  scaleUp,
  scaleDown,
  bounce,
  rotate,
  glow,
  pulse,
  flash,
  shake,
  stagger,
  createTimeline,
  play,
  pause,
  killAll,
};
