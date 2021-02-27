import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EnrolleesService } from './enrollees.service';
import { MatDialogModule } from '@angular/material';

describe('EnrolleesService', () => {
  let backend: HttpTestingController;
  let service: EnrolleesService;
  const baseUrl = 'http://localhost:8080/';

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, MatDialogModule],
    });

    service = TestBed.get(EnrolleesService);
    backend = TestBed.get(HttpTestingController);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getEnrollees should hit the correct end point', () => {
    service.getEnrollees().subscribe();

    const request = backend.expectOne({
      url: `${baseUrl}enrollees`,
      method: 'GET',
    });

    backend.verify();
  });

  it('putEnrollee should hit the correct end point', () => {
    const enrolleeDetails: API.DenoApp.PutEnrolleeBody = {
      name: 'Will Wright',
      active: false
    };
    const id = '65f43b1d-6790-409f-a5b3-fd7d69fa36a6';

    service.putEnrollee(id, enrolleeDetails).subscribe();

    const request = backend.expectOne({
      url: `${baseUrl}enrollees/${id}`,
      method: 'PUT',
    });

    backend.verify();
  });
});
