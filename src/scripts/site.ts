// Use Materialize's native API so the original interactions need no jQuery.
interface Initializer {
  init(elements: NodeListOf<Element>, options?: Record<string, unknown>): unknown;
}
declare global {
  interface Window {
    M: Record<"Sidenav" | "Slider" | "Tabs" | "ScrollSpy" | "Modal" | "Materialbox", Initializer>;
  }
}
const M = window.M;
const menuTrigger = document.querySelector(".sidenav-trigger");
M.Sidenav.init(document.querySelectorAll(".sidenav"), {
  onOpenStart: () => menuTrigger?.setAttribute("aria-expanded", "true"),
  onCloseEnd: () => menuTrigger?.setAttribute("aria-expanded", "false"),
});
const sliders = M.Slider.init(document.querySelectorAll(".slider")) as { pause(): void }[];
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) sliders.forEach((slider) => slider.pause());
M.Tabs.init(document.querySelectorAll(".tabs"), { swipeable: false });
M.ScrollSpy.init(document.querySelectorAll(".scrollspy"));
M.Modal.init(document.querySelectorAll(".modal"));
M.Materialbox.init(document.querySelectorAll(".materialboxed"));

const returnToTop = document.querySelector<HTMLAnchorElement>("#return-to-top");
if (returnToTop) {
  const updateVisibility = () => {
    const visible = window.scrollY >= 50;
    returnToTop.classList.toggle("is-visible", visible);
    returnToTop.tabIndex = visible ? 0 : -1;
  };
  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
  returnToTop.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  });
}
export {};
