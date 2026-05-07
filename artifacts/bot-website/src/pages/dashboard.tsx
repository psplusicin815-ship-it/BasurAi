import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { useGetBotGuilds, getGetBotGuildsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiDiscord } from "react-icons/si";

export default function Dashboard() {
  const { data: guilds, isLoading } = useGetBotGuilds({ query: { queryKey: getGetBotGuildsQueryKey() } });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Select a Server</h1>
          <p className="text-muted-foreground">Choose a server to manage BasurAi settings.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-muted mb-4" />
                  <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : !guilds || guilds.length === 0 ? (
          <Card className="p-12 text-center border-dashed bg-muted/5">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <SiDiscord className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No servers found</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              BasurAi is not in any of your servers yet. Add the bot to your server to start managing it here.
            </p>
            <a 
              href="https://discord.com/oauth2/authorize?client_id=1487520589722685551&permissions=8&scope=bot%20applications.commands"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Add to Server
            </a>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guilds.map((guild) => (
              <Link key={guild.guildId} href={`/dashboard/${guild.guildId}`}>
                <Card className="hover:border-primary/50 hover:bg-muted/10 transition-all cursor-pointer h-full border-border/50 bg-background/50 backdrop-blur-sm group">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20 group-hover:scale-105 transition-transform">
                        <span className="font-semibold text-primary">{guild.guildName.charAt(0)}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg line-clamp-1">{guild.guildName}</CardTitle>
                        <CardDescription>{guild.messageCount} messages</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
