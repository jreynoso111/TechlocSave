/**
 * AdminHeader.js
 * Dynamically renders the secondary administration navigation bar.
 */
export function renderAdminHeader(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';

  const links = [
    { name: 'Dashboard', href: 'index.html', id: 'admin-nav-index' },
    { name: 'Profiles', href: 'profiles.html', id: 'admin-nav-profiles', adminOnly: true },
    { name: 'Titles', href: 'titles.html', id: 'admin-nav-titles' },
    { name: 'Vehicles', href: 'vehicles.html', id: 'admin-nav-vehicles' },
    { name: 'Analytics', href: 'analytics.html', id: 'admin-nav-analytics' },
  ];

  const renderedLinks = links.map(link => {
    const isActive = currentPage === link.href;
    const adminAttr = link.adminOnly ? 'data-admin-only' : '';
    const activeClasses = isActive
      ? 'rounded-lg border border-blue-500 bg-blue-600/90 text-white shadow shadow-blue-500/30'
      : 'rounded-lg border border-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white';

    return `
      <a href="${link.href}" ${adminAttr} id="${link.id}"
        class="px-4 py-2 text-xs font-semibold transition ${activeClasses}">
        ${link.name}
      </a>
    `;
  }).join('');

  container.innerHTML = `
    <nav class="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
      <div class="ml-0 mr-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-6 py-3 lg:px-10">
        <span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200">Admin navigation</span>
        <div class="flex flex-wrap items-center gap-1">
          ${renderedLinks}
        </div>
      </div>
    </nav>
  `;

  // Dispatch event after rendering
  window.dispatchEvent(new CustomEvent('adminHeader:rendered'));
}
