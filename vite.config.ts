import { defineConfig } from 'vite';

// Relative output supports both a custom-domain root and a project subpath.
export default defineConfig({ base: './', build: { target: 'es2022' } });
