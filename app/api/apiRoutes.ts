/**
 * The API routes endpoints
 */
export class ApiRoutes {
  /**
   * The dev base url for the application
   */
  //   static BASE_URL_DEV: string = "http://localhost:9015/";

  /**
   * The test base url for the application
   */
  static BASE_URL_TEST: string = "https://apitest.freddie.com/";

  /**
   * The live base url for the application
   */
  static BASE_URL_LIVE: string = "https://api.freddie.com/";

  /**
   * The base url being used for the application
   */
  static BASE_URL: string = ApiRoutes.BASE_URL_LIVE;

  /**
   * The route to Fetch All Managers endpoint
   */
  static FetchAllManagers: string = "/managers";
}
