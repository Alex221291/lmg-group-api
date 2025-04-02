import * as transliterate from 'transliteration';

export class TransliterateService {
  transliterateText(text: string): string {
    return transliterate.transliterate(text, { replace: { ' ': '-' } }).toLowerCase();
  }
}