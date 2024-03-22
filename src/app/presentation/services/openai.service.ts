import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { orthographyUseCase } from '@use-cases/index';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  checkOrthography( prompt: string ) {
    return from( orthographyUseCase( prompt ) );
  }

}
