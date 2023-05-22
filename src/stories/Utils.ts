export function getClickPosition(
  e: React.MouseEvent,
  element: HTMLElement | null | undefined
) {
  if (element == null) {
    throw new Error("element should not be null");
  }

  const rect = element.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}
