import { Layout } from "@/components/layout";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { Link } from "wouter";

const settingsSchema = z.object({
  welcomeEnabled: z.boolean().default(false),
  welcomeChannelId: z.string().nullable().optional(),
  welcomeMessage: z.string().nullable().optional(),
  autoRoleEnabled: z.boolean().default(false),
  autoRoleId: z.string().nullable().optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function GuildSettings() {
  const { guildId } = useParams<{ guildId: string }>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cache, isLoading: cacheLoading } = useQuery({
    queryKey: ["guild-cache", guildId],
    queryFn: async () => {
      const res = await fetch(`/api/bot/guild/${guildId}/cache`);
      if (!res.ok) throw new Error("Failed to fetch guild cache");
      return res.json();
    },
    enabled: !!guildId,
  });

  const { data: settings, isLoading: settingsLoading } = useQuery({
    queryKey: ["guild-settings", guildId],
    queryFn: async () => {
      const res = await fetch(`/api/bot/guild/${guildId}/settings`);
      if (!res.ok) throw new Error("Failed to fetch guild settings");
      return res.json();
    },
    enabled: !!guildId,
  });

  const updateSettings = useMutation({
    mutationFn: async (data: SettingsFormValues) => {
      const res = await fetch(`/api/bot/guild/${guildId}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update settings");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Settings saved",
        description: "Server settings have been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["guild-settings", guildId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      welcomeEnabled: false,
      welcomeChannelId: "",
      welcomeMessage: "",
      autoRoleEnabled: false,
      autoRoleId: "",
    },
    values: settings || undefined,
  });

  const onSubmit = (data: SettingsFormValues) => {
    updateSettings.mutate(data);
  };

  const isLoading = cacheLoading || settingsLoading;

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-3xl flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" asChild className="shrink-0">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{cache?.guildName || "Server Settings"}</h1>
            <p className="text-muted-foreground">Manage modules and configuration for this server.</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Welcome System</CardTitle>
                <CardDescription>
                  Configure welcome messages for new members.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="welcomeEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Welcome Messages</FormLabel>
                        <FormDescription>
                          Send a message when a user joins the server.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("welcomeEnabled") && (
                  <>
                    <FormField
                      control={form.control}
                      name="welcomeChannelId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Welcome Channel</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || undefined}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a channel" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cache?.channels?.map((c: any) => (
                                <SelectItem key={c.id} value={c.id}>
                                  #{c.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The channel where welcome messages will be sent.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="welcomeMessage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Welcome Message</FormLabel>
                          <FormControl>
                            <Input placeholder="Welcome {user} to {server}!" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormDescription>
                            Variables available: {`{user}, {server}`}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Auto Role</CardTitle>
                <CardDescription>
                  Automatically assign a role to new members.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="autoRoleEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Auto Role</FormLabel>
                        <FormDescription>
                          Assign a role immediately when users join.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("autoRoleEnabled") && (
                  <FormField
                    control={form.control}
                    name="autoRoleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role to Assign</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || undefined}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cache?.roles?.map((r: any) => (
                              <SelectItem key={r.id} value={r.id}>
                                @{r.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Make sure the bot's role is higher than this role.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
              <CardFooter className="pt-6">
                <Button type="submit" disabled={updateSettings.isPending} className="w-full sm:w-auto">
                  {updateSettings.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
