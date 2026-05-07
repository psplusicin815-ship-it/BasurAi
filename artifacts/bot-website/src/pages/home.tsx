import { Layout } from "@/components/layout";
import { useGetBotStats, getGetBotStatsQueryKey } from "@workspace/api-client-react";
import heroBotImg from "@/assets/hero-bot.png";
import { motion } from "framer-motion";
import { Shield, Sparkles, MessageSquare, Zap, ImageIcon, Search, Volume2, Gamepad2 } from "lucide-react";

export default function Home() {
  const { data: stats } = useGetBotStats({ query: { queryKey: getGetBotStatsQueryKey() } });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-primary/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
                <Sparkles className="mr-2 h-4 w-4" />
                Gemini 2.5 Flash ile Güçlendirildi
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
                Sunucunun Yeni <br className="hidden md:block" />
                <span className="text-primary">En Zeki Üyesi</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                BasurAi, Türk Discord toplulukları için geliştirilmiş elektrik gibi çarpar, zekidir ve son derece yeteneklidir. Sohbet et, modere et, görsel oluştur ve çok daha fazlası.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a 
                  href="https://discord.com/oauth2/authorize?client_id=1487520589722685551&permissions=8&scope=bot%20applications.commands"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="button-add-to-discord"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
                >
                  Discord'a Ekle
                </a>
                <a 
                  href="#features"
                  data-testid="link-view-features"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background/50 backdrop-blur px-8 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
                >
                  Özellikleri Gör
                </a>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 relative"
            >
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
              <img 
                src={heroBotImg} 
                alt="Parlayan siber yapay zeka botu" 
                className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl rounded-2xl object-cover aspect-video"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">İhtiyacın Olan Her Şey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Sıradan bir sohbet botu değil. BasurAi, sunucun için eksiksiz bir araç setidir.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MessageSquare, title: "Yapay Zeka Sohbet", desc: "Gemini 2.5 Flash ile yıldırım hızında akıllı yanıtlar." },
              { icon: ImageIcon, title: "Görsel Analizi", desc: "Anında görsel oluştur ve fotoğrafları analiz et." },
              { icon: Shield, title: "Otomatik Moderasyon", desc: "Akıllı yapay zeka filtresiyle sunucunu güvende tut." },
              { icon: Search, title: "Web Arama", desc: "Wikipedia, Haberler ve DuckDuckGo'dan bilgi çek." },
              { icon: Volume2, title: "Sesli TTS", desc: "Ses kanallarında doğrudan Türkçe metin okuma." },
              { icon: Gamepad2, title: "Eğlence ve Oyunlar", desc: "Trivia, 8-top, kelime zinciri ve roast komutları." },
              { icon: Zap, title: "Sunucu Kurulumu", desc: "Reaction roller, hoşgeldin mesajları ve kanal yönetimi." },
              { icon: Sparkles, title: "Görsel Araçlar", desc: "Arka plan kaldır ve medyaları hızlıca düzenle." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border/50 bg-background/50 hover:bg-primary/5 hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent opacity-50 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Topluluklara Emanet</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary" data-testid="stat-total-guilds">{stats?.totalGuilds?.toLocaleString("tr-TR") || "..."}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Sunucu</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary" data-testid="stat-total-users">{stats?.totalUsers?.toLocaleString("tr-TR") || "..."}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Kullanıcı</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary" data-testid="stat-total-messages">{stats?.totalMessages?.toLocaleString("tr-TR") || "..."}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Mesaj</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary" data-testid="stat-total-commands">{stats?.totalCommands?.toLocaleString("tr-TR") || "..."}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Komut</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/10 border-t border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Sunucunu yükseltmeye hazır mısın?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Türk Discord topluluklarının en zeki botunu kullanan binlerce kullanıcıya katıl.
          </p>
          <a 
            href="https://discord.com/oauth2/authorize?client_id=1487520589722685551&permissions=8&scope=bot%20applications.commands"
            target="_blank"
            rel="noreferrer"
            data-testid="button-cta-add"
            className="inline-flex h-14 items-center justify-center rounded-md bg-primary px-10 text-lg font-bold text-primary-foreground shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all hover:bg-primary/90 hover:scale-105"
          >
            BasurAi'yi Sunucuya Ekle
          </a>
        </div>
      </section>
    </Layout>
  );
}
