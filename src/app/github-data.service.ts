import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubDataService {

  constructor(
    private http: HttpClient
  ) { }

  getJSON(): Observable<any> {
    // TO DO: get 100 results
    const url = "https://api.github.com/search/repositories?q=stars%3A>%3D10000";
    return this.http.get(url)
  }

}
