import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies - optional filter */
  static async getCompanies(filter) {
    if(filter){
      let res = await this.request(`companies`, {name: filter})
      return res.companies;
    } else {
      let res = await this.request(`companies`);
      return res.companies;
    }
  }

  /** Get all jobs - optional filter */
  static async getJobs(filter) {
    if(filter){
      let res = await this.request(`jobs`, {title: filter})
      return res.jobs;
    } else {
    let res = await this.request(`jobs`);
    return res.jobs;
    }
  }

  /** Signup */
  static async signup({username, password, firstName, lastName, email}) {
    let user = { username, password, firstName, lastName, email };
    let res = await axios.post(`${BASE_URL}/auth/register`, user);
    return this.token = res.data
  }

  /** Login */
  static async login({username, password}) {
    let user = { username, password };
    let res = await axios.post(`${BASE_URL}/auth/token`, user);
    return this.token = res.data
  }

  /** Get User Profile */
  static async getUser(username, token) {
    const url = `users/${username}`;
    this.token = token;
    let res = await this.request(url);
    return res.user;
  }

  /** Edit User Profile - fields allowed to change: firstName, lastName, email */
  static async profileChanges({username, firstName, lastName, email, password}, token) {
    const url = `users/${username}`;
    this.token = token;
    const method = "patch"
    let user = { firstName, lastName, email, password };
    let res = await this.request(url, user, method);
    return res.user
  }

  /** Apply to Job */
  static async apply(username, jobId, token) {
    const url = `users/${username}/jobs/${jobId}`;
    this.token = token;
    const method = "post";
    let res = await this.request(url, {}, method);
    return res.applied;
  }
}

export default JoblyApi;