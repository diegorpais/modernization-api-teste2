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

  it('should emit message through modal$', () => {
    const testMessage = 'teste';
    let receivedMessage: string | undefined;

    service.modal$.subscribe(msg => receivedMessage = msg);
    service.showModal(testMessage);

    expect(receivedMessage).toBe(testMessage);
  });

  it('should emit message through nonBlocking$', () => {
    const testMessage = 'teste';
    let receivedMessage: string | undefined;

    service.nonBlocking$.subscribe(msg => receivedMessage = msg);
    service.showNonBlocking(testMessage);

    expect(receivedMessage).toBe(testMessage);
  });
});