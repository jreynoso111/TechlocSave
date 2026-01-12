/**
 * Renders the common header for all TechLoc pages.
 * @param {string} containerId - The ID of the container element.
 */
export function renderHeader(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { maxWidthClass = 'max-w-7xl' } = options;

  // Determine base path based on current location depth
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const isGithubPages = window.location.hostname.includes('github.io');
  const repoName = isGithubPages ? 'TechlocSave' : '';

  // Find where we are relative to the root
  let depth = 0;
  if (isGithubPages) {
    // On Github Pages, the first part is the repo name
    depth = pathParts.length - 1;
    if (pathParts[0] === repoName) depth--;
  } else {
    depth = pathParts.length;
  }

  // Calculate relative prefix
  // If we are in /pages/admin/, depth is 2, so we need ../../
  // If we are in /pages/, depth is 1, so we need ../
  // If we are at root, depth is 0, so we need ./

  // Simpler approach: check if we are in 'pages' folder
  const currentPath = window.location.pathname;
  let prefix = './';
  if (currentPath.includes('/pages/admin/')) {
    prefix = '../../';
  } else if (currentPath.includes('/pages/')) {
    prefix = '../';
  }

  const title = container.getAttribute('data-title') || 'Operations';

  container.innerHTML = `
  <header class="border-b border-slate-800 bg-slate-950/90 backdrop-blur z-50 sticky top-0">
    <div class="mx-auto relative ${maxWidthClass} px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">

      <div class="flex items-center justify-between gap-4 md:flex-none">
        <a href="${prefix}index.html" class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-700 shadow-lg shadow-blue-500/30">
            <span class="text-xs font-black uppercase tracking-[0.18em] text-white">TL</span>
          </div>
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200">TechLoc Network</p>
            <h1 class="text-base font-black leading-tight text-white">${title}</h1>
          </div>
        </a>

        <button id="mobile-menu-toggle" class="inline-flex items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/70 p-2 text-slate-200 transition hover:border-blue-500 hover:text-white md:hidden" aria-label="Toggle navigation" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
        </button>
      </div>

      <div id="primary-nav" class="hidden flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 text-sm font-semibold text-slate-200 shadow-lg shadow-blue-900/20 md:mt-0 md:flex md:flex-1 md:flex-row md:items-center md:justify-end md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none">

        <nav class="flex flex-col gap-2 md:flex-row md:items-center md:gap-1">
          <a id="nav-home" href="${prefix}index.html" class="rounded-full px-3 py-1 transition-colors hover:text-white hover:bg-slate-800">Home</a>
          <a id="nav-control-view" href="${prefix}pages/vehicles.html" class="rounded-full px-3 py-1 transition-colors hover:text-white hover:bg-slate-800">Control Map</a>
          <a id="nav-inventory-control" href="${prefix}pages/inventory-control.html" class="rounded-full px-3 py-1 transition-colors hover:text-white hover:bg-slate-800">Inventory</a>
          <a id="nav-services" href="${prefix}pages/admin/services.html" class="rounded-full px-3 py-1 transition-colors hover:text-white hover:bg-slate-800">Services</a>
          <a id="nav-dashboard" href="${prefix}pages/admin/index.html" data-dashboard-link class="hidden rounded-full px-3 py-1 transition-colors hover:text-white hover:bg-slate-800">Dashboard</a>
          <a id="nav-contact" href="${prefix}pages/contact.html" class="rounded-full px-3 py-1 transition-colors hover:text-white hover:bg-slate-800">Contact</a>
        </nav>

        <div class="flex flex-col gap-3 border-t border-slate-800 pt-3 md:flex-row md:items-center md:gap-3 md:border-0 md:pt-0 md:flex-none md:justify-end">
          <a id="nav-login" href="${prefix}pages/login.html" class="rounded-full border border-blue-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-100 transition hover:bg-blue-600 hover:text-white">Login</a>
          <button id="nav-logout" type="button" class="hidden rounded-full border border-red-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-100 transition hover:border-red-400 hover:text-white">Logout</button>
        </div>
      </div>

    </div>
  </header>
  `;

  // Mobile menu logic
  const toggleBtn = container.querySelector('#mobile-menu-toggle');
  const navMenu = container.querySelector('#primary-nav');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('hidden');
    });
  }

  // Dispatch event so authManager knows the header is ready
  window.dispatchEvent(new CustomEvent('header:rendered'));
}
