import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NotificationService } from './services/notification.service';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const notificationServiceMock = {
      showModal: jest.fn(),
      showNonBlocking: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [
        { provide: NotificationService, useValue: notificationServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call showModal with "teste" when triggerModalNotification is called', () => {
    component.triggerModalNotification();
    expect(notificationService.showModal).toHaveBeenCalledWith('teste');
  });

  it('should call showNonBlocking with "teste" when triggerNonBlockingNotification is called', () => {
    component.triggerNonBlockingNotification();
    expect(notificationService.showNonBlocking).toHaveBeenCalledWith('teste');
  });

  it('should call showModal when "Show Modal Notification" button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
    button.click();
    expect(notificationService.showModal).toHaveBeenCalledWith('teste');
  });

  it('should call showNonBlocking when "Show Non-Blocking Notification" button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.btn-secondary')).nativeElement;
    button.click();
    expect(notificationService.showNonBlocking).toHaveBeenCalledWith('teste');
  });
});