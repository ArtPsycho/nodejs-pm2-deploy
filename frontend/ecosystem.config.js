require('dotenv').config({ path: '.env.deploy' });

module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'serve',
      args: '-s build -l 3000',
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
      path: process.env.DEPLOY_PATH + '/frontend',
      'pre-deploy-local': '',
      'post-deploy': `
        cd frontend &&
        npm install &&
        npm run build &&
        pm2 startOrReload ecosystem.config.js --only frontend
      `,
    },
  },
};