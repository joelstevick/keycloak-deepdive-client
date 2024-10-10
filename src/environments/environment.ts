// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  keycloak: {
    url: 'http://localhost:8080', // Keycloak URL
    realm: 'my-realm', // Your Keycloak realm
    clientId: 'my-app', // Your client ID from Keycloak
  },
  api_url: 'http://localhost:8200',
  keycloakSecret: 'OdESmUxkGKaiSxeeP0TI9eH9HMK01Det',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
