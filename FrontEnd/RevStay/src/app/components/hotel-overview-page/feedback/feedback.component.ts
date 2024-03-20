import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  @Input({ alias: 'inputFeedback' }) feedback!: string;
  @Input({ alias: 'inputName' }) feedbackName!: string;
}
