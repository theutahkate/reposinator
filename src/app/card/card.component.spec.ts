import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { By } from "@angular/platform-browser";

import { CardComponent } from './card.component';
import { GithubDataService } from '../github-data.service';
import { CommitsComponent } from '../commits/commits.component';
import { ResultsComponent } from '../results/results.component';

describe('CardComponent', () => {

  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  // Create a fake GithubDataService with a 'getReposJSON' spy
  const githubService = jasmine.createSpyObj('GithubDataService', ['getReposJSON', 'getCommitsJSON']);

  const mockReposData = {
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

  const getReposSpy = githubService.getReposJSON.and.returnValue({
    subscribe: (callback) => {
      callback(mockReposData)
    }
  })

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        MockComponent(ResultsComponent),
        MockComponent(CommitsComponent)
      ],
      providers: [
        { provide: GithubDataService, useValue: githubService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.repo = mockReposData.items[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct repository information on a card', () => {
    let ele = fixture.nativeElement
    let headingEle = ele.querySelectorAll('.card--heading__link')[0];
    let subHeadEles = ele.querySelectorAll('.card--heading__subhead');
    let descEle = ele.querySelectorAll('.card--desc');

    expect(headingEle.innerText).toContain(mockReposData.items[0].name)
    expect(headingEle.href).toContain(mockReposData.items[0].html_url)
    expect(subHeadEles[0].innerText).toContain(mockReposData.items[0].owner.login)
    expect(subHeadEles[1].innerText).toContain(mockReposData.items[0].stargazers_count)
    expect(descEle[0].innerText).toContain(mockReposData.items[0].description)
  })

  it('should trigger getCommits() on button click', async(() => {
    spyOn(component, 'getCommits');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.getCommits).toHaveBeenCalled();
    });
  }))
});
