require('dotenv').config({ path: '.env.deploy' });

module.exports = {
  apps: [
    {
      name: 'backend',
      script: './backend/src/app.ts',
      interpreter: 'ts-node',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_SERVER,
      ref: 'origin/master',
      repo: process.env.DEPLOY_REPO,
      path: process.env.DEPLOY_PATH,
      'pre-deploy-local': '',
      'post-deploy': `
        cp ~/local/path/to/.env backend/.env &&
        cd backend &&
        npm install &&
        pm2 startOrReload ecosystem.config.js --only backend
      `,
    },
  },
};