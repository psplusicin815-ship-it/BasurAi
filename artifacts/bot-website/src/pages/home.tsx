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
                Powered by Gemini 2.5 Flash
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
                Your Server's New <br className="hidden md:block" />
                <span className="text-primary">Smartest Member</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                BasurAi is an electric, clever, and highly capable Discord bot for Turkish communities. Chat, moderate, generate images, and more.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a 
                  href="https://discord.com/oauth2/authorize?client_id=1487520589722685551&permissions=8&scope=bot%20applications.commands"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
                >
                  Add to Discord
                </a>
                <a 
                  href="#features"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background/50 backdrop-blur px-8 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
                >
                  View Features
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
                alt="Cybernetic glowing AI bot" 
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
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Not just a chatbot. BasurAi is a complete toolkit for your server.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MessageSquare, title: "AI Chat", desc: "Lightning fast responses powered by Gemini 2.5 Flash." },
              { icon: ImageIcon, title: "Image Vision", desc: "Generate images and analyze photos instantly." },
              { icon: Shield, title: "Auto Moderation", desc: "Keep your server safe with smart AI filtering." },
              { icon: Search, title: "Web Search", desc: "Pull facts from Wikipedia, News, and DuckDuckGo." },
              { icon: Volume2, title: "Voice TTS", desc: "Turkish text-to-speech directly in voice channels." },
              { icon: Gamepad2, title: "Fun & Games", desc: "Trivia, 8-ball, word chains, and roasts." },
              { icon: Zap, title: "Server Setup", desc: "Reaction roles, welcomes, and channel management." },
              { icon: Sparkles, title: "Image Tools", desc: "Remove backgrounds and edit media fast." },
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent opacity-50 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Trusted by Communities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary">{stats?.totalGuilds?.toLocaleString() || "..."}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Servers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary">{stats?.totalUsers?.toLocaleString() || "..."}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary">{stats?.totalMessages?.toLocaleString() || "..."}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Messages</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary">{stats?.totalCommands?.toLocaleString() || "..."}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Commands</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/10 border-t border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to upgrade your server?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users experiencing the smartest Discord bot for Turkish communities.
          </p>
          <a 
            href="https://discord.com/oauth2/authorize?client_id=1487520589722685551&permissions=8&scope=bot%20applications.commands"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-md bg-primary px-10 text-lg font-bold text-primary-foreground shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all hover:bg-primary/90 hover:scale-105"
          >
            Add BasurAi to Server
          </a>
        </div>
      </section>
    </Layout>
  );
}
