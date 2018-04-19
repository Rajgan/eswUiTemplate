import { Injectable, NgModule, ViewChild, Output, EventEmitter, Component, OnInit, Input  } from '@angular/core';

@Component({
    selector: 'eswCollapsePanel',
    templateUrl: './collapsePanel.component.html'
})
export class CollapsePanelComponent {
  @Input() public panelTitle: string;
  @Input() public enableCollapse = true;
  @Input() public isCollapsed = false;
  @Output() ChangedState = new EventEmitter();

  public CollapseClick() {

    if (!this.enableCollapse) {
      return;
    }

    this.isCollapsed = !this.isCollapsed;

    if (this.ChangedState != null && this.ChangedState !== undefined) {
      this.ChangedState.emit();
    }
  }
}
