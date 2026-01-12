import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'pages/login.html'),
                about: resolve(__dirname, 'pages/about.html'),
                contact: resolve(__dirname, 'pages/contact.html'),
                vehicles: resolve(__dirname, 'pages/vehicles.html'),
                inventoryControl: resolve(__dirname, 'pages/inventory-control.html'),
                servicesRequest: resolve(__dirname, 'pages/services-request.html'),
                // Admin pages
                adminDashboard: resolve(__dirname, 'pages/admin/index.html'),
                adminServices: resolve(__dirname, 'pages/admin/services.html')
            },
        },
    },
    server: {
        open: true
    }
});
