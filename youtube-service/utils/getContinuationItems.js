export default async function(feed, items, maxResults) {
  const results = [];
  if (!feed || !feed.contents) return results;
  let next;

  if (items) {
    do {
      items.contents.forEach(item => results.push(item));

      if (feed.has_continuation) {
        next = await feed.getContinuation();
        items = next.contents;
      } else {
        break;
      }
    } while (feed.has_continuation && results.length < maxResults);
  }
  return results;
}