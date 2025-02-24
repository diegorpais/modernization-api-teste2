import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NotificationService } from './notification/notification.service';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['showNotification']);

    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [
        { provide: NotificationService, useValue: notificationServiceSpy }
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

  it('should call triggerNotification on button click', () => {
    spyOn(component, 'triggerNotification');
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(component.triggerNotification).toHaveBeenCalled();
  });

  it('should call notificationService.showNotification with "teste"', () => {
    component.triggerNotification();
    expect(notificationService.showNotification).toHaveBeenCalledWith('teste');
  });
});