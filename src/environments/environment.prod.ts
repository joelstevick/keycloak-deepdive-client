export const environment = {
  production: true,
  keycloak: {
    url: 'http://localhost:8080/auth',  // Keycloak URL
    realm: 'my-realm',                  // Your Keycloak realm
    clientId: 'my-app',                 // Your client ID from Keycloak
  },
  api_url: 'http://localhost:8200',
  keycloakSecret: 'OdESmUxkGKaiSxeeP0TI9eH9HMK01Det',

};
