export function handleToggleNavMenu(
  menuToToggle: "fileMenu" | "preferencesMenu"
) {
  const els = document.getElementsByClassName("menu");
  const menu = document.getElementById(menuToToggle);
  // Toggle other menus off
  for (const el of els) {
    if (!el.classList.contains("hidden") && el.id != menuToToggle) {
      el.classList.add("hidden");
    }
  }
  // Toggle current menu
  if (menu) {
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  }
}
