import { useEffect, useRef, useState } from "react"
import { X, ChevronDown } from "lucide-react"
import { Logo } from "./logo"

interface MenuItem {
  label: string
  href: string
  submenu: string[]
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export function MobileMenu({ isOpen, onClose, menuItems }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label)
  }

  return (
    <>
      <div className={`mobile-overlay ${isOpen ? "mobile-overlay--open" : ""}`} onClick={onClose} aria-hidden="true" />

      <div ref={menuRef} className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}>
        <div className="mobile-menu__header">
          <Logo />
          <button onClick={onClose} className="mobile-menu__close-btn" aria-label="Close navigation menu">
            <X className="icon--medium" />
          </button>
        </div>

        <div className="mobile-menu__content">
          <ul className="mobile-menu__nav-list">
            {menuItems.map((item) => (
              <li key={item.label} className="mobile-menu__nav-item">
                {item.submenu.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="mobile-menu__nav-btn"
                      aria-expanded={openSubmenu === item.label}
                      aria-controls={`submenu-${item.label}`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`mobile-menu__chevron ${openSubmenu === item.label ? "mobile-menu__chevron--open" : ""
                          }`}
                      />
                    </button>

                    <div
                      id={`submenu-${item.label}`}
                      className={`mobile-submenu ${openSubmenu === item.label ? "mobile-submenu--open" : ""}`}
                      role="region"
                      aria-hidden={openSubmenu !== item.label}
                    >
                      <ul className="mobile-submenu__list">
                        {item.submenu.map((subItem) => (
                          <li key={subItem}>
                            <a href="#" className="mobile-submenu__link">
                              {subItem}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <a href={item.href} className="mobile-menu__nav-btn">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
