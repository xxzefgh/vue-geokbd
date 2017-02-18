import { KeypressEvent, OffsetRange } from './interfaces';

const ALPHABET = 'abgdevzTiklmnopJrstufqRySCcZwWxjh';
const BASE_INDEX = 4304;

function convertChar(charIndex: number) {
  const char = String.fromCharCode(charIndex);

  if (ALPHABET.indexOf(char) >= 0) {
    return BASE_INDEX + ALPHABET.indexOf(char);
  }

  return charIndex;
}

function isSelectionSupported($input: HTMLInputElement): boolean {
  return typeof $input.selectionStart === 'number' && typeof $input.selectionEnd === 'number';
}

function getInputSelection($input: HTMLInputElement): OffsetRange {
  let start = 0;
  let end = 0;

  if (isSelectionSupported($input)) {
    start = $input.selectionStart;
    end = $input.selectionEnd;
  }

  return { start, end };
}

function setInputSelection($input: HTMLInputElement, offset: OffsetRange): void {
  if (isSelectionSupported($input)) {
    $input.selectionStart = offset.start;
    $input.selectionEnd = offset.end;
  }

  // A little 'hack' to keep natural browser behavior while typing
  $input.blur();
  $input.focus();
}

export default function handleKeypress(evt: KeypressEvent): void {
  const $input = evt.target;
  const which = evt.which;
  const to = convertChar(which);

  // Don't take any action if conversion didn't happen
  if (which === to) {
    return;
  }
  evt.preventDefault();

  // Insert converted char
  const sel = getInputSelection($input);
  const val = $input.value;

  $input.value = val.slice(0, sel.start) + String.fromCharCode(to) + val.slice(sel.end);

  // Move caret to correct position
  setInputSelection($input, { start: sel.start + 1, end: sel.start + 1 });
}
