import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { Subject } from 'rxjs';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let notificationService: NotificationService;
  let notifySubject: Subject<string>;

  beforeEach(async () => {
    notifySubject = new Subject<string>();
    await TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      providers: [
        { provide: NotificationService, useValue: { notify$: notifySubject.asObservable(), showNotification: jasmine.createSpy('showNotification') } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display notification message when notified', () => {
    const testMessage = 'teste';
    notifySubject.next(testMessage);
    expect(component.message).toBe(testMessage);
    expect(component.show).toBeTrue();
  });

  it('should hide notification after 3 seconds', fakeAsync(() => {
    const testMessage = 'teste';
    notifySubject.next(testMessage);
    expect(component.show).toBeTrue();
    tick(3000);
    expect(component.show).toBeFalse();
  }));
});