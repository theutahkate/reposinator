import { Component, OnInit, Input } from '@angular/core';
import { GithubDataService } from '../github-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  commits;
  hasCommits = true;
  @Input() repo;

  constructor(
    private githubData: GithubDataService
  ) { }

  ngOnInit() {
  }

  getCommits(owner, repoName) {
    this.githubData
      .getCommitsJSON(owner, repoName)
      .subscribe(data => {
        data.forEach(element => {
          element.commit.author.date = element.commit.author.date.replace(/T/, ' ').slice(0,-1)
        });
        this.commits = data
        if (this.commits.length <= 0) {
          this.hasCommits = false;
        }
      })
  }
}
