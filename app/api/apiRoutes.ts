/**
 * The API routes endpoints
 */
export class ApiRoutes {
  /**
   * The dev base url for the application
   */
  //   static BASE_URL_DEV: string = "http://localhost:3050/";

  /**
   * The test base url for the application
   */
  static BASE_URL_TEST: string = "https://apitest.dimlang.com/";

  /**
   * The live base url for the application
   */
  static BASE_URL_LIVE: string = "https://api.dimlang.com/api/v1";

  /**
   * The base url being used for the application
   */
  static BASE_URL: string = ApiRoutes.BASE_URL_LIVE;

  /**
   * The route to Waitlist Subscription endpoint
   */
  static WaitlistSubscription: string = "/waitlist";
}
