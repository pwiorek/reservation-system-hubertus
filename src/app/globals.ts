import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  BASE_URL = 'http://localhost:8080';
}

export enum ViewBreakpoints {
  phone = '688px',
  tablet = '992px',
  laptop = '1280px',
}
