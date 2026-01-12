import { AuthService } from './AuthService.js';

class AuthUIManager {
  constructor() {
    this.navIds = {
      login: 'nav-login',
      logout: 'nav-logout',
      dashboard: 'nav-dashboard',
      services: 'nav-services',
      control: 'nav-control-view'
    };

    this.prefix = './';
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/admin/')) {
      this.prefix = '../../';
    } else if (currentPath.includes('/pages/')) {
      this.prefix = '../';
    }

    // Listen for header rendering
    window.addEventListener('header:rendered', () => {
      this.init();
    });

    // Also init on load just in case header was already there
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  async init() {
    this.setupListeners();
    await this.checkAuth();
  }

  setupListeners() {
    const logoutBtn = document.getElementById(this.navIds.logout);
    if (logoutBtn && !logoutBtn.dataset.listenerAttached) {
      logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const originalText = logoutBtn.textContent;
        logoutBtn.textContent = '...';
        try {
          await AuthService.logout();
        } catch (err) {
          console.error('Logout failed:', err);
          logoutBtn.textContent = originalText;
        }
      });
      logoutBtn.dataset.listenerAttached = 'true';
    }

    // Listen for global auth state changes
    if (!this.stateChangeUnsubscribe) {
      this.stateChangeUnsubscribe = AuthService.onAuthStateChange(async (event, session) => {
        this.updateUI(session);
      });
    }
  }

  async checkAuth() {
    const session = await AuthService.getSession();
    await this.updateUI(session);
  }

  async updateUI(session) {
    const isLoggedIn = !!session;
    const loginBtn = document.getElementById(this.navIds.login);
    const logoutBtn = document.getElementById(this.navIds.logout);
    const dashboardBtn = document.getElementById(this.navIds.dashboard);
    const servicesBtn = document.getElementById(this.navIds.services);

    // Toggle Login/Logout visibility AND text
    if (loginBtn) {
      if (isLoggedIn) {
        loginBtn.classList.add('hidden');
      } else {
        loginBtn.classList.remove('hidden');
        loginBtn.textContent = 'Login';
        loginBtn.href = `${this.prefix}pages/login.html`;
      }
    }

    if (logoutBtn) {
      if (isLoggedIn) {
        logoutBtn.classList.remove('hidden');
        logoutBtn.textContent = 'Logout';
      } else {
        logoutBtn.classList.add('hidden');
      }
    }

    // Hero buttons (index.html)
    const heroLoginBtn = document.getElementById('hero-login-btn');
    const heroDashboardBtn = document.getElementById('hero-dashboard-btn');
    if (heroLoginBtn) {
      heroLoginBtn.classList.toggle('hidden', isLoggedIn);
      if (!isLoggedIn) {
        const icon = heroLoginBtn.querySelector('i');
        heroLoginBtn.innerHTML = '';
        if (icon) heroLoginBtn.appendChild(icon);
        heroLoginBtn.appendChild(document.createTextNode(' Log in'));
      }
    }
    if (heroDashboardBtn) heroDashboardBtn.classList.toggle('hidden', !isLoggedIn);

    // Role-based UI
    if (isLoggedIn && session.user) {
      const profile = await AuthService.getUserProfile(session.user.id);
      const isAdmin = profile.role === 'administrator';
      const isSuspended = profile.status === 'suspended';

      if (dashboardBtn) {
        dashboardBtn.classList.toggle('hidden', !isAdmin || isSuspended);
        if (isAdmin && !isSuspended) dashboardBtn.classList.add('md:inline-flex');
      }
    } else {
      if (dashboardBtn) dashboardBtn.classList.add('hidden');
    }

    // Dispatch event for other components if needed
    window.dispatchEvent(new CustomEvent('auth:ui-updated', { detail: { isLoggedIn, session } }));
  }
}

// Initialize
new AuthUIManager();
