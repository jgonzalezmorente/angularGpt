import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [

  ],
  templateUrl: './chat-message.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent {

  @Input({ required: true }) text!: string;

}
