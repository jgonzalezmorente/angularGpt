import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent, TextMessageBoxFileComponent, TextMessageEvent, TextMessageBoxSelectComponent, TextMessageBoxEvent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './orthography-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class OrthographyPageComponent {
  public messages = signal<Message[]>([{ text: 'Hola Mundo', isGpt: false }]);
  public isLoading = signal( false );
  public openAiService = inject( OpenAiService );

  handleMessage( prompt: string ) {
    console.log({prompt });
  }

  handleMessageWithFile( { prompt, file }: TextMessageEvent ) {
    console.log({prompt, file});
  }

  handleMessageWithSelect( { prompt, selectedOption }: TextMessageBoxEvent ) {
    console.log( { prompt, selectedOption })
  }
}
