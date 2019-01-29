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
  httpGetRequest(path): Observable<HttpRes> {
    return this.http.get<HttpRes>(`api/${path}`).pipe(
      tap((res: HttpResponse<HttpRes>) => {}),
      map((res: HttpResponse<HttpRes>) => {
        return res;
      })
    );
  }

  httpPostRequest(path, data): Observable<HttpRes> {
    return this.http.post<HttpRes>(`api/${path}`, data).pipe(
      tap((res: HttpResponse<HttpRes>) => {
        // console.log("Post:", res);
      }),
      map((res: HttpResponse<HttpRes>) => res)
    );
  }

  httpPatchRequest(path, data): Observable<HttpRes> {
    return this.http.patch<HttpRes>(`api/${path}`, data).pipe(
      tap((res: HttpResponse<HttpRes>) => {
        // console.log("Patch:", res);
      }),
      map((res: HttpResponse<HttpRes>) => res)
    );
  }
}
