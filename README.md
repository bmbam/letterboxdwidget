# Letterboxd Discord Widget

Automatically sync your Letterboxd activity with Discord Profile Widgets.

This script updates your Discord widget with data from your Letterboxd profile, including:

* Latest watched film
* Letterboxd avatar
* Films watched
* Films watched this year
* Following count
* Followers count

## Example



![Widget Preview](https://cdn.discordapp.com/attachments/964592222492315712/1514394862081015979/image.png?ex=6a2b359f&is=6a29e41f&hm=26b315c99f91c8cba2e1ee796f97acd69f99e0d6a8aed0ee843520c5d2dfcac2&)

The widget can automatically display:

* Username
* Latest watched film
* Total films watched
* Films watched this year
* Following
* Followers

## Requirements

Before using this project, you must already have:

* A Discord application
* A published Discord Profile Widget
* A Bot Token
* Your Application ID
* Your Discord User ID
* A Letterboxd account

This project does **not** create the Discord widget for you. It only updates an existing widget.

## Widget Fields

Your Discord widget must contain the following fields:

| Name         | Type   |
| ------------ | ------ |
| avatar       | Media  |
| films        | String |
| last_watched | String |
| this_year    | String |
| following    | String |
| followers    | String |

The script will automatically populate these fields.

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

Add the following repository secrets:

* BOT_TOKEN
* APPLICATION_ID
* USER_ID
* LETTERBOXD_USER

Then create a scheduled workflow to automatically update your widget.

## How It Works

1. Reads your Letterboxd RSS feed.
2. Scrapes your Letterboxd profile.
3. Extracts:

   * Avatar
   * Latest watched film
   * Films watched
   * Films watched this year
   * Following
   * Followers
4. Updates your Discord Profile Widget through Discord's Application Identities API.

  
## Disclaimer

This project relies on:

* Letterboxd's public website structure
* Discord's experimental Application Identities API

Future changes by either service may affect functionality.
