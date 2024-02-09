# Mr. Carte (Diem) Slack Bot

![Mr. Carte profile img](https://github.com/cartina-tech/mr-carte-slack-bot/blob/main/assets/Mr_Carte_Diem.png?raw=true)

Meet Mr. Carte (Diem). He is a friendly Slack bot, a helper with a mustasche. He enjoys helping by providing asked for information, and he tries to cheer you up by telling jokes and by giving advice.

## Usage

### Current features
Hey! It works like this: Write a word in the channel or directly to Mr. Carte.

The currently supported 'trigger words' in the channel are:

- `wifi` (To get information about wifi)
- `week` or `vecka` (Returns the current week from vecka.nu)
- `cheermeup` (Carte tells a dry joke to lift the mood)
- `tacoparty` (Generates a random tacoparty gif)
- `zen` (Carte responds with various wisdoms)
- `:disappointed:` or `:cry:` emoji (Carte repsonds with proverbs)

You can also mention me @Mr.Carte and send messages in the channel, and Mr. Carte will try to find information about what you're wondering about.

### Triggers

#### Events
`[EVENT]` Carte Mention Trigger (executes if someone mentions carte)
`[EVENT]` Carte Channel Trigger (responds to trigger words in the channel)
#### Reminders
`[SCHEDULED]` Carte Time Report Trigger (scheduled trigger reminding about time reporting every Friday at 16:00)
`[SCHEDULED]` Carte Friday Breakfast Trigger (scheduled trigger reminding about Friday breakfast every Wednesday at 10:00)"

### Get quickly started with local development

1. Install Deno: https://docs.deno.com/runtime/manual/getting_started/installation
2. Install Slack CLI: https://api.slack.com/automation/cli/install
3. Add .env file with needed info to the root of the project directory:
"
CHANNEL_ID="%add the channel id here for were you plan to run/develop the bot locally%"
USER_ID="%user_id of administrator%"
DATASTORE_ID="%name of the datastore%"
TICTAC_LOGIN_URL="%url to tictac login%"
WEEK_REST_API_URL="https://vecka.nu"
"
4. In the terminal from project directory: `slack run`
5. 

## Maintainer(s)
Alexander Forrest / Cartina [[Cartina web](https://www.cartina.se/)] [@abulerforrest](https://www.github.com/abulerforrest)