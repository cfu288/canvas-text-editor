import { scroll, requestRender } from "../app";

export function handleScroll(e: WheelEvent) {
  const scrollValue = e.deltaY;
  if (scrollValue > 0) {
    scroll.scrollDown(Math.abs(scrollValue));
  } else {
    scroll.scrollUp(Math.abs(scrollValue));
  }
  requestRender();
}
