import { useState, useEffect, useRef } from "react"
import { Menu, ChevronDown, ChevronRight, X } from "lucide-react"
import { MobileMenu } from "./mobile-menu"
import { Logo } from "./logo"
import { MENU_ITEMS } from "../constants/menuItems"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [menuHidden, setMenuHidden] = useState(false)
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const headerHeight = headerRef.current?.offsetHeight || 0

          if (currentScrollY > headerHeight + 200) {
            if (currentScrollY > lastScrollY.current) {
              setMenuHidden(true)
            } else {
              setMenuHidden(false)
            }
          } else {
            setMenuHidden(false)
          }

          lastScrollY.current = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mobileMenuItems = MENU_ITEMS.map((item) => ({
    ...item,
    submenu: item.submenu.map((sub) => sub.label),
  }))

  return (
    <>
      <header ref={headerRef} className="site-header">
        <div className="site-header__container">
          <button
            className="site-header__menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="icon--medium" />
          </button>

          <div className="site-header__spacer" />

          <a href="#" className="site-header__logo">
            <Logo />
          </a>

          <button
            className="site-header__search-btn"
            onClick={() => setShowSearch(!showSearch)}
            aria-label={showSearch ? "Close search" : "Open search"}
          >
            {showSearch ? <X className="icon--small" /> : <img src="/W.png" alt="Search" className="icon--small" style={{ width: '1.25rem', height: '1.25rem' }} />}
          </button>
        </div>

        <div className={`search-bar ${showSearch ? "search-bar--open" : ""}`}>
          <div className="search-bar__container">
            <div className="search-bar__input-wrapper">
              <img src="/W.png" alt="" className="search-bar__icon" style={{ width: '1rem', height: '1rem' }} />
              <input
                type="text"
                placeholder="Search posts by title or description..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-bar__input"
              />
            </div>
          </div>
        </div>
      </header>

      <nav
        className={`desktop-nav ${menuHidden ? "desktop-nav--hidden" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="desktop-nav__container">
          <ul className="desktop-nav__list">
            {MENU_ITEMS.map((item) => (
              <li key={item.label} className="desktop-nav__item">
                <a href={item.href} className="desktop-nav__link">
                  {item.label}
                  {item.submenu.length > 0 && <ChevronDown className="desktop-nav__chevron" />}
                </a>

                {item.submenu.length > 0 && (
                  <div className="submenu">
                    <ul className="submenu__list">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.label}>
                          <a href="#" className="submenu__link">
                            <span>{subItem.label}</span>
                            {subItem.hasArrow && <ChevronRight className="submenu__arrow" />}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        menuItems={mobileMenuItems}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
    </>
  )
}
