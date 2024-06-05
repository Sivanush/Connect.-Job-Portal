import { TestBed } from '@angular/core/testing';

import { AdminBackendService } from './admin-backend.service';

describe('AdminBackendService', () => {
  let service: AdminBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
