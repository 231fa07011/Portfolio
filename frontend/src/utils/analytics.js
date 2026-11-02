/**
 * Google Analytics 4 (GA4) Integration Utility
 *
 * Configures gtag.js and enables event and page tracking.
 * Reads Measurement ID from import.meta.env.VITE_GA_MEASUREMENT_ID.
 */

let isInitialized = false;

export function initGA() {
  if (typeof window === 'undefined' || isInitialized) return;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

  if (!measurementId || measurementId === 'YOUR_GA_MEASUREMENT_ID') {
    // Only inform in development mode
    if (import.meta.env.DEV) {
      console.info(
        'ℹ️ Google Analytics: VITE_GA_MEASUREMENT_ID not configured. Analytics is idle.'
      );
    }
    return;
  }

  try {
    // 1. Inject gtag script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);

    // 2. Setup dataLayer & gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', measurementId, {
      page_path: window.location.pathname + window.location.hash,
      send_page_view: true,
    });

    // 3. Track hash navigation within single-page sections (#about, #projects, #contact, etc.)
    window.addEventListener('hashchange', () => {
      trackPageView(window.location.pathname + window.location.hash);
    });

    isInitialized = true;
    console.info(`✓ Google Analytics initialized with ID: ${measurementId}`);
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
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
    if (!measurementId) return;

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
