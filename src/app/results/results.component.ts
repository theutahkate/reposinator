import { Component, OnInit } from '@angular/core';
import { GithubDataService } from '../github-data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  repos;

  constructor(
    private githubData: GithubDataService
  ) { }

  ngOnInit() {
    this.githubData
      .getReposJSON()
      .subscribe(data => {
        this.repos = data.items
      })
  }
}
