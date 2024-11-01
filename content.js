let adultSites = [];

fetch(chrome.runtime.getURL('sites.txt'))
    .then(response => response.text())
    .then(data => {
        adultSites = data.split('\n').map(site => site.trim());
        console.log('Loaded adult sites:', adultSites);
    });

window.onload = () => {
    const currentUrl = window.location.href;
    console.log('Current URL:', currentUrl);
    if (adultSites.some(site => currentUrl.includes(site))) {
        console.log('Adult site detected. Sending alert message.');
        chrome.runtime.sendMessage({ action: "showAlert" });
    }
};
