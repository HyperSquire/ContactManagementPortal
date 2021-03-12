import { Observable, MonoTypeOperatorFunction } from 'rxjs';
import { publishReplay, refCount, take } from 'rxjs/operators';

// Common Functions To be Used

// Read The Config File For Base Url Only Once
export const weakShareReplay = <T>(bufferSize?: number, windowTime?: number ): MonoTypeOperatorFunction<T> =>
  (source: Observable<T>): Observable<T> =>
    source.pipe(publishReplay<T>(bufferSize, windowTime), refCount());

// Get the value from Observable
export const getCurrent = <T>(value$: Observable<T>) => value$.pipe(take(1)).toPromise();
