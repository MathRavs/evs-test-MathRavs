import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run evs-test:serve:development',
        production: 'nx run evs-test:serve:production',
      },
      ciWebServerCommand: 'nx run evs-test:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});