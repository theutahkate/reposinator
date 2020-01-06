import { Component, OnInit } from '@angular/core';
import { GithubDataService } from '../github-data.service';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  repos;
  errorMsg;
  hasError = false;

  constructor(
    private githubData: GithubDataService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.githubData
      .getReposJSON()
      .subscribe(data => {
        this.repos = data.items
      })
    this.errorService.httpError.asObservable().subscribe(values => {
      if (values && values != '') {
        this.hasError = true;
        this.errorMsg = values;
      }
    });
  }
}
