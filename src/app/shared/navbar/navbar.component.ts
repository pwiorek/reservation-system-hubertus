import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ViewBreakpoints } from '../../globals';

interface NavOption {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
 // TODO: Dynamic data from api


  username = 'Jan Kowalski';
  navOptions: NavOption[] = [
    {name: 'Konto', icon: 'person'},
    {name: 'Grafik', icon: 'event'},
    {name: 'Wyszukiwarka terminów', icon: 'search'},
  ];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) { }

  ngOnInit(): void {
    this.detectMediaQuery();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  private detectMediaQuery(): void {
    this.mobileQuery = this.media.matchMedia(`(max-width: ${ ViewBreakpoints.laptop })`);
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  isCurrentOption(option: string): boolean {
    return this.router.url.includes(option.toLowerCase());
  }


}
