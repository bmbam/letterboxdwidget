# Letterboxd Discord Widget

Automatically sync your Letterboxd profile with Discord Profile Widgets.

This project updates a Discord widget with data from your Letterboxd profile, including:

* Latest watched film
* Letterboxd avatar
* Films watched
* Films watched this year
* Following count
* Followers count

## Preview

![Widget Preview](https://cdn.discordapp.com/attachments/964592222492315712/1514394862081015979/image.png?ex=6a2b359f\&is=6a29e41f\&hm=26b315c99f91c8cba2e1ee796f97acd69f99e0d6a8aed0ee843520c5d2dfcac2&)

## Features

* Automatic Letterboxd profile syncing
* Dynamic avatar support
* Latest watched film from RSS feed
* Profile statistics scraping
* GitHub Actions support
* No self-hosting required

## Requirements

Before using this project, you must already have:

* A Discord application
* A published Discord Profile Widget
* A Bot Token
* Your Application ID
* Your Discord User ID
* A Letterboxd account

> This project does **not** create Discord widgets. It only updates an existing widget.

## Creating a Discord Profile Widget

Before using this project, you need to create and publish a Discord Profile Widget.

Follow Chloe Cinders' guide:

https://chloecinders.com/blog/discord-widgets

The guide covers:

* Creating a Discord application
* Enabling the Social SDK
* Creating widget fields
* Publishing the widget
* Authorizing the application
* Adding the widget to your Discord profile

Once your widget is set up, return here and configure the required fields below.

## Widget Configuration

Create the following fields in your Discord widget:

| Name         | Type   |
| ------------ | ------ |
| avatar       | Media  |
| films        | String |
| last_watched | String |
| this_year    | String |
| following    | String |
| followers    | String |

### Important

For the image field, make sure:

```txt
Value Type: User Data
Data Field: avatar
```

Do **not** use `Application Asset`, otherwise the avatar will not update dynamically.

## Installation

Install dependencies:

```bash
npm install
```

## Configuration

Create a `.env` file:

```env
BOT_TOKEN=YOUR_BOT_TOKEN
APPLICATION_ID=YOUR_APPLICATION_ID
USER_ID=YOUR_DISCORD_USER_ID
LETTERBOXD_USER=YOUR_LETTERBOXD_USERNAME
```

Example:

```env
BOT_TOKEN=xxxxxxxx
APPLICATION_ID=123456789012345678
USER_ID=987654321098765432
LETTERBOXD_USER=Punx_
```

## Usage

Run manually:

```bash
node update-widget.js
```

## GitHub Actions

Create the following repository secrets:

* BOT_TOKEN
* APPLICATION_ID
* USER_ID
* LETTERBOXD_USER

Then create a workflow that runs:

```bash
node update-widget.js
```

on your preferred schedule.

## How It Works

The script:

1. Reads your Letterboxd RSS feed.
2. Scrapes your Letterboxd profile.
3. Extracts:

   * Avatar
   * Latest watched film
   * Films watched
   * Films watched this year
   * Following
   * Followers
4. Updates your Discord Profile Widget using Discord's Application Identities API.

## Troubleshooting

### Avatar does not update

Make sure the widget image is configured as:

```txt
Value Type: User Data
Data Field: avatar
```

Using `Application Asset` will display a static image instead of the dynamic avatar.

### Stats are not updating

Verify:

* BOT_TOKEN is valid
* APPLICATION_ID is correct
* USER_ID is correct
* LETTERBOXD_USER exists
* GitHub Actions secrets are configured properly

## Disclaimer

This project relies on:

* Letterboxd's public website structure
* Discord's experimental Application Identities API

Future changes by either service may affect functionality.

## Credits

Created by **Punx**.

Special thanks to Chloe Cinders for her Discord Profile Widgets guide:

https://chloecinders.com/blog/discord-widgets
