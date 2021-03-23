import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class Api {
  url: string = "https://demo-api.now.sh";

  headersConfig: any = {
    "Content-Type": "application/json",
  };

  constructor(public http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders(this.headersConfig);
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + "/" + endpoint, {
      headers: this.getHeaders(),
    });
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = { headers: this.getHeaders() };
    }
    return this.http.post(this.url + "/" + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + "/" + endpoint, body, {
      headers: this.getHeaders(),
    });
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + "/" + endpoint, {
      headers: this.getHeaders(),
    });
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + "/" + endpoint, body, {
      headers: this.getHeaders(),
    });
  }
}
