import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMessageEvent, TextMessageBoxEvent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent, ChatMessageComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './chat-template.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatTemplateComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal( false );
  public openAiService = inject( OpenAiService );

  handleMessage( prompt: string ) {
    console.log({prompt });
  }

  // handleMessageWithFile( { prompt, file }: TextMessageEvent ) {
  //   console.log({prompt, file});
  // }

  // handleMessageWithSelect( { prompt, selectedOption }: TextMessageBoxEvent ) {
  //   console.log( { prompt, selectedOption })
  // }
}
