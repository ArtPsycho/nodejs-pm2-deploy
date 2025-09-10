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
        cd backend &&
        npm ci &&
        npm run build &&
        cp ${process.env.DEPLOY_PATH}/shared/.env ${process.env.DEPLOY_PATH}/current/backend/.env &&
        pm2 startOrRestart ecosystem.config.js --env production
      `,
      ssh_options: [
        "StrictHostKeyChecking no",
        "PasswordAuthentication no",
        "IdentityFile ~/.ssh/id_ed25519"
      ],
    },
  },
};