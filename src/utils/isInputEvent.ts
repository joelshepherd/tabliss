/**
 * Check is a keyboard event is an input event.
 */
export function isInputEvent(event: KeyboardEvent) {
  return (
    event.target instanceof HTMLInputElement ||
    event.target instanceof HTMLTextAreaElement ||
    (event.target instanceof HTMLSpanElement && Boolean(event.target.contentEditable))
  );
}
