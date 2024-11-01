chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showAlert") {
      const currentSite = new URL(sender.tab.url).hostname;
      const visitTime = new Date().toLocaleString();

      chrome.storage.local.get({ visits: [] }, (data) => {
          const visits = data.visits;
          visits.push({ site: currentSite, time: visitTime });
          chrome.storage.local.set({ visits });
      });

      chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
  }
});
