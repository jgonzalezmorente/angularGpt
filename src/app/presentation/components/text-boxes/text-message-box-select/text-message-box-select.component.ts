import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface Option {
  id: string;
  text: string;
}

export interface TextMessageBoxEvent {
  prompt: string;
  selectedOption: string;
}

@Component({
  selector: 'app-text-message-box-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './text-message-box-select.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextMessageBoxSelectComponent {
  @Input() placeholder: string = '';
  @Input({ required: true }) options!: Option[];

  @Output() onMessge = new EventEmitter<TextMessageBoxEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [ '', Validators.required ],
    selectedOption: [ '', Validators.required ]
  });

  handleSubmit() {
    if ( this.form.invalid ) return;

    const { prompt, selectedOption } = this.form.value;
    this.onMessge.emit({ prompt: prompt!, selectedOption: selectedOption! });
    this.form.reset();
  }
}
