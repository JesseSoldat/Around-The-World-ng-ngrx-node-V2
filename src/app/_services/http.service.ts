import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
// models
import { HttpRes } from "../_models/http-res.model";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  // api calls
  httpPostRequest(path, data): Observable<HttpRes> {
    return this.http.post<HttpRes>(`api/${path}`, data).pipe(
      tap((res: HttpResponse<HttpRes>) => {
        console.log("Post:", res);
      }),
      map((res: HttpResponse<HttpRes>) => res)
    );
  }
}
