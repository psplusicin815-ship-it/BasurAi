import { ReactNode } from "react";
import { Link } from "wouter";
import { SiDiscord } from "react-icons/si";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/30">
              <SiDiscord className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold tracking-tight text-xl">BasurAi</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Özellikler
            </a>
            <a href="#stats" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              İstatistikler
            </a>
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Yönetim Paneli
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://discord.com/oauth2/authorize?client_id=1487520589722685551&permissions=8&scope=bot%20applications.commands"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Sunucuya Ekle
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border/40 bg-background py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">&copy; {new Date().getFullYear()} BasurAi. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
