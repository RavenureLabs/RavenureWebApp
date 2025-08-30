import { Client, Events, GatewayIntentBits } from 'discord.js';


class DiscordBot {
  private static instance: Client | null = null;
  private static isConnecting = false;
  private static isReady = false;

private static eventsInitialized = false;

static async getClient(): Promise<Client> {
  if (DiscordBot.instance && DiscordBot.isReady) {
    return DiscordBot.instance;
  }

  if (DiscordBot.isConnecting) {
    return new Promise((resolve) => {
      const checkConnection = () => {
        if (DiscordBot.instance && DiscordBot.isReady) {
          resolve(DiscordBot.instance);
        } else {
          setTimeout(checkConnection, 100);
        }
      };
      checkConnection();
    });
  }

  if (!DiscordBot.instance) {
    DiscordBot.isConnecting = true;

    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMembers
      ],
    });

    client.once(Events.ClientReady, () => {
      console.log(`✅ Discord bot bağlandı: ${client.user?.tag}`);
      DiscordBot.isReady = true;
      DiscordBot.isConnecting = false;
    });

    client.on(Events.Error, (error) => {
      console.error('Discord bot hatası:', error);
      DiscordBot.isConnecting = false;
    });

    client.on(Events.ShardDisconnect, () => {
      console.log('Discord bot bağlantısı kesildi');
      DiscordBot.isReady = false;
    });

    try {
      await client.login(process.env.DISCORD_CLIENT_TOKEN);
      DiscordBot.instance = client;

      if (!DiscordBot.isReady) {
        await new Promise<void>((resolve) => {
          client.once(Events.ClientReady, () => resolve());
        });
      }

      return client;
    } catch (error) {
      console.error('Discord bot giriş hatası:', error);
      DiscordBot.isConnecting = false;
      throw error;
    }
  }

  return DiscordBot.instance;
}

  static isConnected(): boolean {
    return DiscordBot.instance?.isReady() ?? false;
  }

  static async disconnect(): Promise<void> {
    if (DiscordBot.instance) {
      await DiscordBot.instance.destroy();
      DiscordBot.instance = null;
      DiscordBot.isReady = false;
      DiscordBot.isConnecting = false;
    }
  }
}

export default DiscordBot;