import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pros-cons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProsConsPageComponent {

}
