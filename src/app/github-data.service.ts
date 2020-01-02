import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubDataService {
  baseUrl = "https://api.github.com";

  constructor(
    private http: HttpClient
  ) { }

  getReposJSON(): Observable<any> {
    const reposUrl = `${this.baseUrl}/search/repositories?q=stars%3A>%3D10000&per_page=100`;
    return this.http.get(reposUrl);
  }

  getCommitsJSON(owner, repoName): Observable<any> {
    const commitsSince = new Date(Date.now() - 86400 * 1000).toISOString()
    const commitsUrl = `${this.baseUrl}/repos/${owner}/${repoName}/commits?since=${commitsSince}`;
    return this.http.get(commitsUrl);
  }
}
