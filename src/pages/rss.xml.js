import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

function convertSeasonToDate(seasonStr) {
  // Default to middle of the year if just a year is provided
  if (/^\d{4}$/.test(seasonStr)) {
    return new Date(parseInt(seasonStr), 6, 1);
  }
  
  // Handle date ranges like "2023 - 2025"
  if (seasonStr.includes("-")) {
    const [startYear] = seasonStr.split("-").map(s => s.trim());
    return new Date(parseInt(startYear), 0, 1);
  }

  // Handle season-based dates
  const [season, year] = seasonStr.split(" ");
  const months = {
    "Spring": 2,  // March
    "Summer": 5,  // June
    "Fall": 8,    // September
    "Winter": 11, // December
  };
  
  return new Date(parseInt(year), months[season] || 0, 1);
}

export async function GET(context) {
  const productPosts = await getCollection("product");
  const marketingPosts = await getCollection("marketing");
  const allPosts = [...productPosts, ...marketingPosts];
  
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: allPosts.map((post) => ({
      ...post.data,
      link: `/${post.collection}/${post.slug}/`,
      pubDate: convertSeasonToDate(post.data.pubDate),
    })),
  });
}
