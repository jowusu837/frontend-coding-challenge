import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sortable',
  templateUrl: './sortable.component.html',
  styleUrls: ['./sortable.component.scss']
})
export class SortableComponent implements OnInit {
  @Input() active: boolean = false;
  @Output() onToggle = new EventEmitter<string>();

  constructor() {
  }

  sortDirection = SortDirection.DESCENDING;

  get caret() {
    return this.sortDirection === SortDirection.ASCENDING ? '&and;' : '&or;';
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === SortDirection.ASCENDING ? SortDirection.DESCENDING : SortDirection.ASCENDING;
    this.onToggle.emit(this.sortDirection);
  }

  ngOnInit(): void {
  }

}

export class SortDirection {
  static ASCENDING = 'asc';
  static DESCENDING = 'desc';
}
