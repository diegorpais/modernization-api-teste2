import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.scss']
})
export class MessageAlertComponent {

  constructor(private alertService: AlertService) { }

  showAlertMessage(): void {
    this.alertService.showAlert('teste');
  }
}
