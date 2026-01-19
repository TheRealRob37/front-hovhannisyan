export interface MenuSubItem {
  label: string
  hasArrow: boolean
}

export interface MenuItem {
  label: string
  href: string
  submenu: MenuSubItem[]
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Demos",
    href: "#",
    submenu: [
      { label: "Demo 1", hasArrow: true },
      { label: "Demo 2", hasArrow: true },
      { label: "Demo 3", hasArrow: false },
    ],
  },
  {
    label: "Post",
    href: "#",
    submenu: [
      { label: "Post Header", hasArrow: true },
      { label: "Post Layout", hasArrow: true },
      { label: "Share Buttons", hasArrow: true },
      { label: "Gallery Post", hasArrow: true },
      { label: "Video Post", hasArrow: false },
    ],
  },
  {
    label: "Features",
    href: "#",
    submenu: [
      { label: "Post Header", hasArrow: true },
      { label: "Post Layout", hasArrow: true },
      { label: "Share Buttons", hasArrow: true },
      { label: "Gallery Post", hasArrow: true },
      { label: "Video Post", hasArrow: false },
    ],
  },
  {
    label: "Categories",
    href: "#",
    submenu: [
      { label: "Lifestyle", hasArrow: false },
      { label: "Style", hasArrow: false },
      { label: "Travel", hasArrow: false },
      { label: "Events", hasArrow: false },
      { label: "Music", hasArrow: false },
    ],
  },
  {
    label: "Shop",
    href: "#",
    submenu: [
      { label: "Products", hasArrow: true },
      { label: "Cart", hasArrow: false },
      { label: "Checkout", hasArrow: false },
    ],
  },
  {
    label: "Buy Now",
    href: "#",
    submenu: [],
  },
]
