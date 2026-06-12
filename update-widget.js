require("dotenv").config();

const Parser = require("rss-parser");
const axios = require("axios");
const cheerio = require("cheerio");

const parser = new Parser();

async function updateWidget() {
const username = process.env.LETTERBOXD_USER;

if (!username) {
throw new Error("LETTERBOXD_USER missing");
}

// RSS Feed
const feed = await parser.parseURL(
`https://letterboxd.com/${username}/rss/`
);

const latestItem = feed.items?.[0];

const rawTitle =
  latestItem?.title?.trim() || "No recent film";

const ratingMatch = rawTitle.match(
  /(★★★★★|★★★★½|★★★★|★★★½|★★★|★★½|★★|★½|★)$/
);

const rating =
  ratingMatch?.[1] || "N/A";

const latestMovie = rawTitle
  .replace(
    /\s*-\s*(★★★★★|★★★★½|★★★★|★★★½|★★★|★★½|★★|★½|★)$/,
    ""
  )
  .trim();

// Profile Page
const { data } = await axios.get(
`https://letterboxd.com/${username}/`,
{
headers: {
"User-Agent":
"Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}
}
);

const $ = cheerio.load(data);

// Avatar
const avatar =
(
$('meta[property="og:image"]').attr("content") ||
"https://a.ltrbxd.com/static/img/default-avatar-0-1000.png"
) + `?v=${Date.now()}`;

console.log("Avatar URL:", avatar);

// Stats
const stats = [];

$(".profile-statistic").each((i, el) => {
const text = $(el).text().trim();
const number = text.match(/\d+/)?.[0] || "0";
stats.push(number);
});

const films = stats[0] || "0";
const thisYear = stats[1] || "0";
const following = stats[2] || "0";
const followers = stats[3] || "0";

const payload = {
username,
data: {
dynamic: [
{
type: 3,
name: "avatar",
value: {
url: avatar
}
},
{
type: 1,
name: "films",
value: films
},
{
type: 1,
name: "last_rating",
value: rating
},
{
type: 1,
name: "last_watched",
value: latestMovie
},
{
type: 1,
name: "this_year",
value: thisYear
},
{
type: 1,
name: "following",
value: following
},
{
type: 1,
name: "followers",
value: followers
}
]
}
};

await axios.patch(
`https://discord.com/api/v9/applications/${process.env.APPLICATION_ID}/users/${process.env.USER_ID}/identities/0/profile`,
payload,
{
headers: {
Authorization: `Bot ${process.env.BOT_TOKEN}`,
"Content-Type": "application/json",
"User-Agent":
"DiscordBot (https://github.com/discord/discord-api-docs, 1.0.0)"
}
}
);

console.log("✅ Widget updated");
console.log("👤 User:", username);
console.log("🎬 Movie:", latestMovie);
console.log("⭐ Rating:", rating);
console.log("🎞 Films:", films);
console.log("📅 This Year:", thisYear);
console.log("➡️ Following:", following);
console.log("👥 Followers:", followers);
}

updateWidget().catch(err => {
console.error(
err.response?.data || err.message
);
});
