function p(l,s={}){const t=document.getElementById(l);if(!t)return;const{maxWidthClass:d="max-w-7xl"}=s,a=window.location.pathname.split("/").filter(Boolean),n=window.location.hostname.includes("github.io"),c=n?"TechlocSave":"";n?(a.length-1,a[0]):a.length;const r=window.location.pathname;let e="./";r.includes("/pages/admin/")?e="../../":r.includes("/pages/")&&(e="../");const h=t.getAttribute("data-title")||"Operations";t.innerHTML=`
  <header class="border-b border-slate-800 bg-slate-950/90 backdrop-blur z-50 sticky top-0">
    <div class="mx-auto relative ${d} px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">

      <div class="flex items-center justify-between gap-4 md:flex-none">
        <a href="${e}index.html" class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-700 shadow-lg shadow-blue-500/30">
            <span class="text-xs font-black uppercase tracking-[0.18em] text-white">TL</span>
          </div>
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200">TechLoc Network</p>
            <h1 class="text-base font-black leading-tight text-white">${h}</h1>
          </div>
        </a>

        <button id="mobile-menu-toggle" class="inline-flex items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/70 p-2 text-slate-200 transition hover:border-blue-500 hover:text-white md:hidden" aria-label="Toggle navigation" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
        </button>
      </div>

      <div id="primary-nav" class="hidden flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 text-sm font-semibold text-slate-200 shadow-lg shadow-blue-900/20 md:mt-0 md:flex md:flex-1 md:flex-row md:items-center md:justify-end md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none">

        <nav class="flex flex-col gap-2 md:flex-row md:items-center md:gap-1">
          <a id="nav-home" href="${e}index.html" class="rounded-full px-3 py-1 transition-colors hover:text-white hover:bg-slate-800">Home</a>
          <a id="nav-control-view" href="${e}pages/vehicles.html" class="rounded-full px-3 py-1 transition-colors hover:text-white hover:bg-slate-800">Control Map</a>
          <a id="nav-inventory-control" href="${e}pages/inventory-control.html" class="rounded-full px-3 py-1 transition-colors hover:text-white hover:bg-slate-800">Inventory</a>
          <a id="nav-services" href="${e}pages/admin/services.html" class="rounded-full px-3 py-1 transition-colors hover:text-white hover:bg-slate-800">Services</a>
          <a id="nav-dashboard" href="${e}pages/admin/index.html" data-dashboard-link class="hidden rounded-full px-3 py-1 transition-colors hover:text-white hover:bg-slate-800">Dashboard</a>
          <a id="nav-contact" href="${e}pages/contact.html" class="rounded-full px-3 py-1 transition-colors hover:text-white hover:bg-slate-800">Contact</a>
        </nav>

        <div class="flex flex-col gap-3 border-t border-slate-800 pt-3 md:flex-row md:items-center md:gap-3 md:border-0 md:pt-0 md:flex-none md:justify-end">
          <a id="nav-login" href="${e}pages/login.html" class="rounded-full border border-blue-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-100 transition hover:bg-blue-600 hover:text-white">Login</a>
          <button id="nav-logout" type="button" class="hidden rounded-full border border-red-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-100 transition hover:border-red-400 hover:text-white">Logout</button>
        </div>
      </div>

    </div>
  </header>
  `;const o=t.querySelector("#mobile-menu-toggle"),i=t.querySelector("#primary-nav");o&&i&&o.addEventListener("click",()=>{const x=o.getAttribute("aria-expanded")==="true";o.setAttribute("aria-expanded",!x),i.classList.toggle("hidden")}),window.dispatchEvent(new CustomEvent("header:rendered"))}export{p as r};
