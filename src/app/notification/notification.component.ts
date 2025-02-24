import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  message: string = '';
  show: boolean = false;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notify$.subscribe(msg => {
      this.message = msg;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000); // Esconde a notificação após 3 segundos
    });
  }
}
