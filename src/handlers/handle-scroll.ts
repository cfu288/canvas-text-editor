import { scroller, requestRender } from "../app";

export function handleScroll(e: WheelEvent) {
  const yscroll = e.deltaY;
  if (yscroll > 0) {
    scroller.scrollDown(Math.abs(yscroll));
  } else {
    scroller.scrollUp(Math.abs(yscroll));
  }
  requestRender();
}
