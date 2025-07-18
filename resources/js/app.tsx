import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import AppLayout from '@/layouts/app-layout'; // 👈 Importar tu layout

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: async (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx');
        const page = await resolvePageComponent(`./pages/${name}.tsx`, pages);

    if (!name.startsWith('auth/')) {
        page.default.layout ??= (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
    }


        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// Esto aplicará el tema (oscuro/claro) al cargar
initializeTheme();
