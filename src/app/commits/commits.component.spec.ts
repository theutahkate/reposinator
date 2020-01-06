import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { ResultsComponent } from '../results/results.component';
import { CardComponent } from '../card/card.component';
import { CommitsComponent } from './commits.component';

describe('CommitsComponent', () => {
  let component: CommitsComponent;
  let fixture: ComponentFixture<CommitsComponent>;

  const mockCommitsData = [
    {
      "commit": {
        "author":
        {
          "name": "All of us",
          "date": "2019-09-28 05:33:47"
        },
        "message": "omg what have I done"
      }
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommitsComponent,
        MockComponent(CardComponent),
        MockComponent(ResultsComponent)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsComponent);
    component = fixture.componentInstance;
    component.commit = mockCommitsData[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct commit information', () => {
    let ele = fixture.nativeElement
    let authorEle = ele.querySelector('.commit--author');
    let dateEle = ele.querySelector('.commit--date');
    let messageEle = ele.querySelector('.commit--message');

    expect(authorEle.innerText).toContain(mockCommitsData[0].commit.author.name)
    expect(dateEle.innerText).toContain(mockCommitsData[0].commit.author.date)
    expect(messageEle.innerText).toContain(mockCommitsData[0].commit.message)
  })
});
