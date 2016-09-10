export default function handleKeypress(evt) {
  var el = evt.target;
  var which = evt.which;
  var to = convertChar(which);

  // Don't take any actions if conversion didn't happen
  if (which === to) {
    return;
  }
  evt.preventDefault();

  // Insert converted char
  var sel = getInputSelection(el);
  var val = el.value;
  el.value = val.slice(0, sel.start) + String.fromCharCode(to) + val.slice(sel.end);

  // Move caret to correct position
  setInputSelection(el, sel.start + 1, sel.start + 1);
}

function convertChar(chIndex) {
  var alphabet = 'abgdevzTiklmnopJrstufqRySCcZwWxjh';
  var ch = String.fromCharCode(chIndex);

  if (alphabet.indexOf(ch) >= 0) {
    return alphabet.indexOf(ch) + 4304;
  }

  return chIndex;
}

function getInputSelection(el) {
  var start = 0,
    end = 0,
    normalizedValue, range,
    textInputRange, len, endRange;

  if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
    start = el.selectionStart;
    end = el.selectionEnd;
  } else {
    range = document.selection.createRange();

    if (range && range.parentElement() == el) {
      len = el.value.length;
      normalizedValue = el.value.replace(/\r\n/g, "\n");

      // Create a working TextRange that lives only in the input
      textInputRange = el.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());

      // Check if the start and end of the selection are at the very end
      // of the input, since moveStart/moveEnd doesn't return what we want
      // in those cases
      endRange = el.createTextRange();
      endRange.collapse(false);

      if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
        start = end = len;
      } else {
        start = -textInputRange.moveStart("character", -len);
        start += normalizedValue.slice(0, start).split("\n").length - 1;

        if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
          end = len;
        } else {
          end = -textInputRange.moveEnd("character", -len);
          end += normalizedValue.slice(0, end).split("\n").length - 1;
        }
      }
    }
  }

  return {
    start: start,
    end: end
  };
}

function offsetToRangeCharacterMove(el, offset) {
  return offset - (el.value.slice(0, offset).split("\r\n").length - 1);
}

function setInputSelection(el, startOffset, endOffset) {
  if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
    el.selectionStart = startOffset;
    el.selectionEnd = endOffset;
  } else {
    var range = el.createTextRange();
    var startCharMove = this.offsetToRangeCharacterMove(el, startOffset);
    range.collapse(true);
    if (startOffset == endOffset) {
      range.move("character", startCharMove);
    } else {
      range.moveEnd("character", this.offsetToRangeCharacterMove(el, endOffset));
      range.moveStart("character", startCharMove);
    }
    range.select();
  }

  // A little 'hack' to keep natural browser behavior while typing
  el.blur();
  el.focus();
}
