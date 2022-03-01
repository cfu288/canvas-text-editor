import { renderScreen } from "../renderers/render-screen";
import {
  textContent,
  cursor,
  canvas,
  context,
  scroller,
  requestRender,
} from "../app";
import { TextRow } from "../models/text-row";
import { FileRegistry } from "../services/file-registry";

export function handleScroll(e: WheelEvent) {
  const yscroll = e.deltaY;
  if (yscroll > 0) {
    scroller.scrollDown(Math.abs(yscroll));
  } else {
    scroller.scrollUp(Math.abs(yscroll));
  }
  requestRender();
}
