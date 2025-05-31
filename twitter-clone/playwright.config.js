
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e-tester',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
});
