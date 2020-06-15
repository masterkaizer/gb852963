module.exports = {
  apps: {
    name: 'API',
    script: 'app.js',
    env: {
      "PORT": 3000,
      NODE_ENV: 'development',
      database: 'mongodb://localhost:27017/books',
    },
    env_testing: {
      "PORT": 3000,
      NODE_ENV: 'testing',
      database: 'mongodb://localhost:27017/books',
    },
    env_production: {
      "PORT": 80,
      NODE_ENV: 'production',
      database: 'mongodb://localhost:27017/books',
    }
  },

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ./config/ecosystem.config.js --env production'
    }
  }
};
