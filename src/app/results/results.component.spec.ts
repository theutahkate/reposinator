import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { MockComponent } from 'ng-mocks';

import { ResultsComponent } from './results.component';
import { CardComponent } from '../card/card.component';
import { GithubDataService } from '../github-data.service';
import { CommitsComponent } from '../commits/commits.component';

describe('ResultsComponent', () => {

  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  const mockData = {
    "items": [
      {
        "name": "freeCodeCamp",
        "owner": {
          "login": "freecodecamp"
        },
        "html_url": "https://github.com/freeCodeCamp/freeCodeCamp",
        "description": "The https://www.freeCodeCamp.org open source codebase and curriculum. Learn to code for free together with millions of people.",
        "stargazers_count": 307852
      },
      {
        "name": "996.ICU",
        "owner": {
          "login": "996icu"
        },
        "html_url": "https://github.com/996icu",
        "description": "Repo for counting stars and contributing. Press F to pay respect to glorious developers.",
        "stargazers_count": 248839
      }
    ]
  }
  const repos = mockData.items

  // Create a fake GithubDataService with a 'getReposJSON' spy
  const githubService = jasmine.createSpyObj('GithubDataService', ['getReposJSON']);

  const getReposSpy = githubService.getReposJSON.and.returnValue({ subscribe: (callback) => {
      callback(mockData)
    }
  })

  // helper function to query all the CardComponents
  function cardComponents(): CardComponent[] {
    return fixture.debugElement
      .queryAll(By.directive(CardComponent))
      .map(el => el.componentInstance);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultsComponent,
        MockComponent(CardComponent),
        MockComponent(CommitsComponent)
      ],
      providers:    [
        { provide: GithubDataService, useValue: githubService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create one card component for each element in repos array', () => {
    expect(cardComponents().length).toEqual(fixture.debugElement.children.length);
  })

  it('should set correct repo data from the mock data', () => {
    expect(cardComponents()
      .map(c => c.repo))
      .toEqual(mockData.items)
  })


  // xit('should display error when call to gh fails', () => {

  // })
});
