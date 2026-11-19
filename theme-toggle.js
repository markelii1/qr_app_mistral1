/**
 * Theme Toggle Module
 * Handles light/dark theme switching with smooth transitions
 */

(function() {
  'use strict';

  // Theme constants
  const THEME_KEY = 'theme-preference';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';
  const THEME_SYSTEM = 'system';

  // DOM elements
  const htmlElement = document.documentElement;
  let themeToggleButton = null;
  let themeToggleIcon = null;

  /**
   * Get the current theme preference
   * @returns {string} - 'light', 'dark', or 'system'
   */
  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) || THEME_SYSTEM;
  }

  /**
   * Get the system color scheme preference
   * @returns {string} - 'light' or 'dark'
   */
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
  }

  /**
   * Get the current effective theme
   * @returns {string} - 'light' or 'dark'
   */
  function getCurrentTheme() {
    const stored = getStoredTheme();
    if (stored === THEME_SYSTEM) {
      return getSystemTheme();
    }
    return stored;
  }

  /**
   * Apply the theme to the document
   * @param {string} theme - 'light' or 'dark'
   */
  function applyTheme(theme) {
    // Remove all theme classes first
    htmlElement.removeAttribute('data-theme');
    
    // Add the new theme class
    htmlElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === THEME_DARK ? '#000000' : '#ffffff');
    }
    
    // Dispatch custom event for components to react
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const current = getCurrentTheme();
    const newTheme = current === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    
    // Store the preference
    localStorage.setItem(THEME_KEY, newTheme);
    
    // Apply the new theme
    applyTheme(newTheme);
    
    // Update UI
    updateToggleUI();
  }

  /**
   * Set a specific theme
   * @param {string} theme - 'light', 'dark', or 'system'
   */
  function setTheme(theme) {
    if (theme === THEME_SYSTEM) {
      localStorage.removeItem(THEME_KEY);
      applyTheme(getSystemTheme());
    } else {
      localStorage.setItem(THEME_KEY, theme);
      applyTheme(theme);
    }
    updateToggleUI();
  }

  /**
   * Initialize the theme toggle button
   */
  function initToggleButton() {
    // Find the toggle button
    themeToggleButton = document.querySelector('.theme-toggle');
    
    if (!themeToggleButton) {
      // Try to find a button with data-theme-toggle attribute
      themeToggleButton = document.querySelector('[data-theme-toggle]');
    }
    
    if (!themeToggleButton) return;
    
    // Add click handler
    themeToggleButton.addEventListener('click', toggleTheme);
    
    // Find the icon elements
    themeToggleIcon = themeToggleButton.querySelector('.theme-toggle-icon');
    
    // Update UI on load
    updateToggleUI();
    
    // Add keyboard support
    themeToggleButton.setAttribute('role', 'button');
    themeToggleButton.setAttribute('aria-label', 'Toggle theme');
    themeToggleButton.setAttribute('tabindex', '0');
    themeToggleButton.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  /**
   * Update the toggle button UI to reflect current theme
   */
  function updateToggleUI() {
    if (!themeToggleButton) return;
    
    const current = getCurrentTheme();
    const isDark = current === THEME_DARK;
    
    // Update button state
    themeToggleButton.setAttribute('aria-pressed', isDark);
    
    // Update icon visibility
    if (themeToggleIcon) {
      const sunIcon = themeToggleIcon.querySelector('.sun');
      const moonIcon = themeToggleIcon.querySelector('.moon');
      
      if (sunIcon && moonIcon) {
        sunIcon.style.display = isDark ? 'block' : 'none';
        moonIcon.style.display = isDark ? 'none' : 'block';
      }
    }
  }

  /**
   * Initialize the theme system
   */
  function init() {
    // Apply the initial theme
    const initialTheme = getCurrentTheme();
    applyTheme(initialTheme);
    
    // Initialize the toggle button
    initToggleButton();
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      const stored = getStoredTheme();
      if (stored === THEME_SYSTEM) {
        applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
        updateToggleUI();
      }
    });
    
    // Make functions available globally
    window.themeToggle = {
      toggle: toggleTheme,
      set: setTheme,
      get: getCurrentTheme,
      getStored: getStoredTheme,
      getSystem: getSystemTheme
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for module usage
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { init, toggleTheme, setTheme, getCurrentTheme };
  }
})();
