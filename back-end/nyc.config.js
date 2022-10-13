module.exports = {
  include: ['src/**/*.js'],
  exclude: [
    '**/*.{test,spec}.js',
    'src/database/migrations/*.js',
    'src/database/seeders/*.js',
    'src/database/config/*.js',
    'src/database/models/index.js',
    'src/middlewares/*.js',
    'src/api/*.js',
    'src/routes/*.js',
  ],
};
