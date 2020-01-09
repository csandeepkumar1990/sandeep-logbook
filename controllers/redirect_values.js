let login = '/login';
let home = '/home';
let services = '/services';
const localhost = 'http://localhost:4200'

if (process.env.NODE_ENV === 'development') {
  login = localhost + login;
  home = localhost + home;
  services = localhost + services;
}

module.exports = {
  login,
  home,
  services
};
