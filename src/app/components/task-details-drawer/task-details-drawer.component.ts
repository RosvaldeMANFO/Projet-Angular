import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-task-details-drawer',
  templateUrl: './task-details-drawer.component.html',
})
export class TaskDetailsDrawerComponent implements OnInit, OnDestroy, OnChanges {
  constructor(
    private readonly _breakpointObserver: BreakpointObserver
  ) { }
  
  @Input() task?: Task;

  openDrawer = false;
  private subscription?: any;

  ngOnInit(): void {
    this.subscription = this._breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((state: BreakpointState) => {
        this.updateDrawerState(state.matches);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      this._breakpointObserver
        .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
        .subscribe((state: BreakpointState) => {
          this.updateDrawerState(state.matches);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateDrawerState(isMediumOrLarger: boolean): void {
    this.openDrawer = isMediumOrLarger && this.task !== undefined;
  }
}
