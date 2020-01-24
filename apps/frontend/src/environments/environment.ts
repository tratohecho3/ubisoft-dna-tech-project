// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  routes: {
    apiRoot: 'http://localhost:3333/api'
  },
  pubnub: {
    publishKey: 'pub-c-939ab4b1-96b4-4937-8b47-506ed6590f66',
    subscribeKey: 'sub-c-6ebef5f2-3eb5-11ea-be28-ae0ede4a022d'
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
