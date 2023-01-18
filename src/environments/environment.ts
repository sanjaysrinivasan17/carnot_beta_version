// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // api_name: "https://asset.datasee.ai/Carnot_BE/carnot/" //production api
  api_name: "http://ec2-3-110-224-113.ap-south-1.compute.amazonaws.com:8000/carnot/" //production api beta version
  // api_name: "http://localhost:8000/carnot/" // test instance api new
  // api_name: "http://carnot-app.herokuapp.com/carnot/" // test instance api new
  // api_name: "https://carnot-app.herokuapp.com/carnot/" // test instance api 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
