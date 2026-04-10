if (typeof window !== 'undefined' && window.fetch) {
  try {
    const originalFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      value: originalFetch,
      writable: true,
      configurable: true
    });
  } catch (e) {
    console.error('Failed to make fetch writable', e);
  }
}
