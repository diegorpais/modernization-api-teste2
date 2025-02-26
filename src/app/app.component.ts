import { Component } from '@angular/core';
import { NotificationService } from './notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'seu-nome-do-app';

  constructor(private notificationService: NotificationService) { }

  triggerNotification() {
    // Substitui o uso de alert por notificação
    // alert('teste');
    this.notificationService.showNotification('teste');
  }
}
