/**
 * Google Analytics 4 (GA4) Integration Utility
 *
 * Configures gtag.js and enables event and page tracking.
 * Measurement ID: G-Y22C0THCKR
 */

export const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || 'G-Y22C0THCKR';

let isInitialized = false;

export function initGA() {
  if (typeof window === 'undefined' || isInitialized) return;

  const measurementId = GA_MEASUREMENT_ID;
  if (!measurementId || measurementId === 'YOUR_GA_MEASUREMENT_ID') return;

  try {
    // 1. Ensure dataLayer and gtag are available
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      // Inject script if not already in DOM
      const existingScript = document.querySelector(
        `script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`
      );
      if (!existingScript) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
        document.head.appendChild(script);
      }

      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        page_path: window.location.pathname + window.location.hash,
        send_page_view: true,
      });
    }

    // 2. Track hash navigation within single-page sections (#about, #projects, #contact, etc.)
    window.addEventListener('hashchange', () => {
      trackPageView(window.location.pathname + window.location.hash);
    });

    isInitialized = true;
    console.info(`✓ Google Analytics active with ID: ${measurementId}`);
  } catch (err) {
    console.warn('Google Analytics initialization failed:', err);
  }
}

/**
 * Tracks a page or section view
 * @param {string} path - The page or section path (e.g. '/#projects')
 * @param {string} title - Optional title
 */
export function trackPageView(path, title) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path || window.location.pathname + window.location.hash,
      page_title: title || document.title,
    });
  }
}

/**
 * Tracks custom user interactions and portfolio events
 * @param {string} action - Event action name (e.g., 'resume_download', 'contact_submit')
 * @param {object} params - Key-value metadata
 */
export function trackEvent(action, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}
