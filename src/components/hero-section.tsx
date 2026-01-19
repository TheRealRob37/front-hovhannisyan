export function HeroSection() {
  return (
    <section className="hero-section" aria-label="Featured Collections">
      <div className="hero-panel hero-panel--accent">
        <img
          src="/hero_photo_1.png"
          alt="Woman in yellow sweater - New Summer Collection"
          className="hero-panel__img"
        />
        <div className="hero-panel__overlay">
          <span className="hero-panel__label">New Collection</span>
          <h2 className="hero-panel__title">
            Eget Tortor,<br />Mollis Habitasse.
          </h2>
        </div>
      </div>

      <div className="hero-panel hero-panel--center">
        <div className="hero-panel__center-content">
          <span className="hero-panel__label">Sale Up To 50%</span>
          <h2 className="hero-panel__title hero-panel__title--dark">
            Pulvinar Amet Morbi<br />Efficitur Justo
          </h2>
          <div className="hero-panel__featured-img">
            <img src="/hero_photo_2.jpg" alt="Featured Knitwear" />
          </div>
          <p className="hero-panel__desc">
            Nunc venenatis adipiscing mauris lorem non risus molestie ut.
          </p>
          <a href="#" className="hero-panel__link">Shop All</a>
        </div>
      </div>

      <div className="hero-panel hero-panel--seasonal">
        <img
          src="/hero_photo_3.png"
          alt="Outdoor Fashion - Seasonal Sale"
          className="hero-panel__img"
        />
        <div className="hero-panel__overlay hero-panel__overlay--right">
          <span className="hero-panel__label">Sale Up To 50%</span>
          <h2 className="hero-panel__title">
            Molestie Cursus
          </h2>
        </div>
      </div>
    </section>
  )
}
