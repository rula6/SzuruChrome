import { NeoScraper, ScrapeResults } from "neo-scraper";
import { BrowserCommand } from "~/models";
import { cfg } from "~/stores";

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  function grabPost(taggingServer: string): ScrapeResults {
    const scraper = new NeoScraper(taggingServer);
    return scraper.scrapeDocument(document, true);
  }

  async function messageHandler(cmd: BrowserCommand): Promise<any> {
    switch (cmd.name) {
      case "grab_post":
        let posts = grabPost(cfg.value.taggingServer);
        await posts.awaitAllResults();
        return posts
    }
  }

  browser.runtime.onMessage.addListener(messageHandler);
})();
