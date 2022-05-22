import { TestBed } from '@angular/core/testing';

import { QulifyService } from './qulify.service';

describe('QulifyService', () => {
  let service: QulifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QulifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
