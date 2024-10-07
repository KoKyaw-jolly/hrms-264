import { Component, Input, OnInit } from '@angular/core';
import { APP_IMPORT } from '../../../app.import';
import { DetailsModalObj } from '../../../core/models/modal.interface';

@Component({
  selector: 'app-modal-details-content',
  standalone: true,
  imports: [
    APP_IMPORT
  ],
  templateUrl: './modal-details-content.component.html',
  styleUrl: './modal-details-content.component.scss'
})

export class ModalDetailsContentComponent implements OnInit {

  @Input() detailsObj?: { [key: string]: any } | null;

  contentObject: DetailsModalObj[] = [];

  ngOnInit(): void {
    if (this.detailsObj) {
      this.contentObject = Object.entries(this.detailsObj).map(([key, value]) => ({
        name: key,
        label: value,
        type: Array.isArray(value) ? 'array' : 'string'
      }));
    }
    console.log(this.contentObject);
  }
}