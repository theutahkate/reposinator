import { Component, OnInit, Input } from '@angular/core';
import { GithubDataService } from '../github-data.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent implements OnInit {

  @Input() commit;

  constructor() { }

  ngOnInit() {
  }

}
