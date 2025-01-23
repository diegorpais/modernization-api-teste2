import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NonBlockingNotificationComponent } from './non-blocking-notification.component';
import { NotificationService } from '../../services/notification.service';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('NonBlockingNotificationComponent', () => {
  let component: NonBlockingNotificationComponent;
  let fixture: ComponentFixture<NonBlockingNotificationComponent>;
  let notificationService: NotificationService;
  let nonBlockingSubject: Subject<string>;

  beforeEach(async () => {
    nonBlockingSubject = new Subject<string>();
    const notificationServiceMock = {
      nonBlocking$: nonBlockingSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      declarations: [ NonBlockingNotificationComponent ],
      providers: [
        { provide: NotificationService, useValue: notificationServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonBlockingNotificationComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    jest.useFakeTimers();
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message when nonBlocking$ emits', () => {
    const testMessage = 'teste';
    nonBlockingSubject.next(testMessage);
    fixture.detectChanges();

    const p = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(p.textContent).toBe(testMessage);

    const notification = fixture.debugElement.query(By.css('.notification'));
    expect(notification).toBeTruthy();
  });

  it('should hide message after 3 seconds', fakeAsync(() => {
    const testMessage = 'teste';
    nonBlockingSubject.next(testMessage);
    fixture.detectChanges();

    expect(component.message).toBe(testMessage);

    tick(3000);
    fixture.detectChanges();

    expect(component.message).toBeNull();
    const notification = fixture.debugElement.query(By.css('.notification'));
    expect(notification).toBeNull();
  }));

  it('should unsubscribe on ngOnDestroy', () => {
    const spy = jest.spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});