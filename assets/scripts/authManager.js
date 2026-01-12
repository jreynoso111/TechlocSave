import { AuthService } from './AuthService.js';

class AuthUIManager {
  constructor() {
    this.navIds = {
      login: 'nav-login',
      logout: 'nav-logout',
      dashboard: 'nav-dashboard',
      services: 'nav-services',
      control: 'nav-control-view' // Added control view
    };

    // We wait for DOM content loaded inside init if not ready
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
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        logoutBtn.textContent = '...';
        await AuthService.logout();
      });
    }

    // Listen for global auth state changes
    AuthService.onAuthStateChange(async (event, session) => {
      this.updateUI(session);
    });
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

    // Toggle Login/Logout
    if (loginBtn) loginBtn.classList.toggle('hidden', isLoggedIn);
    if (logoutBtn) logoutBtn.classList.toggle('hidden', !isLoggedIn);

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
