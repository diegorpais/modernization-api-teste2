import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should emit notification message', (done) => {
    const testMessage = 'teste';
    service.notify$.subscribe(message => {
      expect(message).toBe(testMessage);
      done();
    });
    service.showNotification(testMessage);
  });
});