import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxEvent } from '@components/index';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { TextMessageBoxSelectComponent } from '../../components/text-boxes/text-message-box-select/text-message-box-select.component';
import { Message } from '@interfaces/message.interface';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './text-to-audio-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TextToAudioPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal( false );
  public openAiService = inject( OpenAiService );
  public voices = signal([
    { id: "nova", text: "Nova" },
    { id: "alloy", text: "Alloy" },
    { id: "echo", text: "Echo" },
    { id: "fable", text: "Fable" },
    { id: "onyx", text: "Onyx" },
    { id: "shimmer", text: "Shimmer" },
  ]);

  handleMessageWithSelect( { prompt, selectedOption }: TextMessageBoxEvent ) {
    const message = `${ selectedOption } - ${ prompt }`;
    this.messages.update(prev => [ ...prev, { text: message, isGpt: false }]);
    this.isLoading.set(true);
    this.openAiService.textToAudio(prompt, selectedOption).subscribe(
      ({ message, audioUrl }) => {
        this.isLoading.set(false);
        this.messages.update(prev => [
          ...prev,
          {
            isGpt: true,
            text: message,
            audioUrl
          }
        ])
      }
    )
  }
}
