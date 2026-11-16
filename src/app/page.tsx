import { Search } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col">
      {/* ── Header ─────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-muted/10 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="text-xl font-bold tracking-tight text-primary">
            AutoBazaar
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
            <a href="/listings" className="hover:text-ink transition-colors">
              Browse Cars
            </a>
            <a href="/sell" className="hover:text-ink transition-colors">
              Sell Your Car
            </a>
            <a href="/about" className="hover:text-ink transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/auth/signin"
              className="text-sm font-medium text-muted hover:text-ink transition-colors"
            >
              Sign in
            </a>
            <a
              href="/sell"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 transition-colors"
            >
              Sell a car
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero Search Section ────────────────────────── */}
      <section className="relative flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-canvas px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Find your perfect{" "}
            <span className="text-primary">used car</span>
          </h1>
          <p className="mt-4 text-lg text-muted sm:text-xl">
            Search thousands of quality vehicles from trusted sellers.
            Compare prices, check history, and buy with confidence.
          </p>

          {/* ── Search Bar ──────────────────────────────── */}
          <form
            action="/listings"
            className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                type="text"
                name="q"
                placeholder="Search by make, model, or keyword…"
                className="w-full rounded-xl border border-muted/20 bg-surface py-3.5 pl-11 pr-4 text-ink shadow-sm placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-primary px-8 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-primary-600"
            >
              Search
            </button>
          </form>

          {/* ── Quick Filters ──────────────────────────── */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-muted">Popular:</span>
            {["Toyota Camry", "Honda Civic", "Tesla Model 3", "Ford F-150", "BMW 3 Series"].map(
              (car) => (
                <a
                  key={car}
                  href={`/listings?q=${encodeURIComponent(car)}`}
                  className="rounded-full border border-muted/20 bg-surface px-3 py-1 text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  {car}
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Stats Section ──────────────────────────────── */}
      <section className="border-t border-muted/10 bg-surface py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 text-center sm:grid-cols-4">
          {[
            { label: "Vehicles listed", value: "25,000+" },
            { label: "Trusted sellers", value: "4,200+" },
            { label: "Cities covered", value: "150+" },
            { label: "Happy buyers", value: "18,000+" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-primary sm:text-3xl">
                {value}
              </p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-muted/10 bg-surface py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted">
          © {new Date().getFullYear()} AutoBazaar. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
