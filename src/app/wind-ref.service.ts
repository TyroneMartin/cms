import { Injectable } from '@angular/core';

function _window(): any {
  return typeof window !== 'undefined' ? window : null;
}

@Injectable({
  providedIn: 'root'
})
export class WindRefService {
  getNativeWindow(): any {
    return _window();
  }
}
