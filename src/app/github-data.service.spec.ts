import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GithubDataService } from './github-data.service';
import { asyncData, asyncError } from './async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

describe('GithubDataService', async () => {
  let service: GithubDataService;

  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [GithubDataService]
  }));

  it('should be created', () => {
    service = TestBed.get(GithubDataService);
    expect(service).toBeTruthy();
  });

  it('expects service to fetch repo data', inject([HttpTestingController, GithubDataService], async (service: GithubDataService) => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GithubDataService(<any>httpClientSpy);

    const mockReposData = [
      {
        "name": "freeCodeCamp",
        "html_url": "https://github.com/freeCodeCamp/freeCodeCamp",
        "description": "The https://www.freeCodeCamp.org open source codebase and curriculum. Learn to code for free together with millions of people.",
        "stargazers_count": 307852
      },
      {
        "name": "996.ICU",
        "html_url": "https://github.com/996icu",
        "description": "Repo for counting stars and contributing. Press F to pay respect to glorious developers.",
        "stargazers_count": 248839
      }
    ];

    httpClientSpy.get.and.returnValue(asyncData(mockReposData));

    service.getReposJSON().subscribe(
      data => {
        expect(data).toEqual(mockReposData)
        expect(data[0].stargazers_count).toBeGreaterThan(data[1].stargazers_count)
      },
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  }));

  it('expects service to fetch commit data', inject([HttpTestingController, GithubDataService], async (service: GithubDataService) => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GithubDataService(<any>httpClientSpy);

    const mockCommitsData = [
      {
        "author":
          {
            "name": "All of us",
            "date": "2019-09-28 05:33:47"
          },
        "message": "omg what have I done"
      },
      {
        "author":
        {
          "name": "Also all of us",
          "date": "2020-01-02 13:43:02"
          },
        "message": "fix dumb typpo"
      }
    ];

    httpClientSpy.get.and.returnValue(asyncData(mockCommitsData));

    service.getCommitsJSON("owner", "repoName").subscribe(
      data => {
        expect(data).toEqual(mockCommitsData)
      },
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  }));

  it('should return an error when the server returns a 404', inject([HttpTestingController, GithubDataService], async (service: GithubDataService) => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GithubDataService(<any>httpClientSpy);

    const errorResponse = new HttpErrorResponse({
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    service.getReposJSON().subscribe(
      data => fail('expected an error, not data'),
      error => expect(error.message).toContain('404 Not Found')
    );
  }));
});
