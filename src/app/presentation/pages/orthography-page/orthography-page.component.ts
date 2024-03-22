import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, GptMessageOrthographyComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    GptMessageOrthographyComponent,
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
  public messages = signal<Message[]>([]);
  public isLoading = signal( false );
  public openAiService = inject( OpenAiService );

  handleMessage( prompt: string ) {
    this.isLoading.set(true);
    this.messages.update(prev => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.openAiService.checkOrthography( prompt ).subscribe(
      resp => {
        this.isLoading.set(false);
        this.messages.update(prev => [
          ...prev,
          {
            isGpt: true,
            text: resp.message,
            info: resp,
          }
        ]
      );
      }
    );
  }
}
