module.exports = {

  hosts: {
    django: process.env.DJANGO_HOST ? process.env.DJANGO_HOST : 'backend',
  },

  ports: {
    server: process.env.PORT ? process.env.PORT : 3000,
    django: process.env.DJANGO_PORT ? process.env.DJANGO_PORT : 8081,  // HTTP port for django in Docker
  },

  proxy: {
    apiProxy: 'http://127.0.0.1:8000/api',
  },

};
