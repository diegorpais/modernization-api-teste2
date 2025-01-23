import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNotificationComponent } from './modal-notification.component';
import { NotificationService } from '../../services/notification.service';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ModalNotificationComponent', () => {
  let component: ModalNotificationComponent;
  let fixture: ComponentFixture<ModalNotificationComponent>;
  let notificationService: NotificationService;
  let modalSubject: Subject<string>;

  beforeEach(async () => {
    modalSubject = new Subject<string>();
    const notificationServiceMock = {
      modal$: modalSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      declarations: [ ModalNotificationComponent ],
      providers: [
        { provide: NotificationService, useValue: notificationServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNotificationComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message when modal$ emits', () => {
    const testMessage = 'teste';
    modalSubject.next(testMessage);
    fixture.detectChanges();

    const p = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(p.textContent).toBe(testMessage);

    const modal = fixture.debugElement.query(By.css('.modal'));
    expect(modal).toBeTruthy();
  });

  it('should hide modal when closeModal is called', () => {
    const testMessage = 'teste';
    modalSubject.next(testMessage);
    fixture.detectChanges();

    component.closeModal();
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('.modal'));
    expect(modal).toBeNull();
    expect(component.message).toBeNull();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const spy = jest.spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});