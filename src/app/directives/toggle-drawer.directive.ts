import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appToggleDrawer]'
})
export class ToggleDrawerDirective implements OnInit, OnDestroy, OnChanges {
  @Input() appToggleDrawer = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private readonly _breakpointObserver: BreakpointObserver,
    private readonly _drawer: MatDrawer,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this._breakpointObserver
        .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
        .subscribe((state: BreakpointState) => {
          this.updateDrawerState(state.matches);
        })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appToggleDrawer']) {
      this.updateDrawerState(this._breakpointObserver.isMatched([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateDrawerState(isMediumOrLarger: boolean): void {
    if (isMediumOrLarger && this.appToggleDrawer) {
      this._drawer.open();
    } else {
      this._drawer.close();
    }
  }
}