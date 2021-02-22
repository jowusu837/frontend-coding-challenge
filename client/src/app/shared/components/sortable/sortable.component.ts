import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sortable',
  templateUrl: './sortable.component.html',
  styleUrls: ['./sortable.component.scss']
})
export class SortableComponent implements OnInit {

  constructor() {
  }

  sortDirection = SortDirection.ASCENDING;

  get buttonText() {
    return this.sortDirection === SortDirection.ASCENDING ? '&and;' : '&or;';
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === SortDirection.ASCENDING ? SortDirection.DESCENDING : SortDirection.ASCENDING;
  }

  ngOnInit(): void {
  }

}

export class SortDirection {
  static ASCENDING = 'asc';
  static DESCENDING = 'desc';
}
