console.log("Popup script loaded.");

document.addEventListener('DOMContentLoaded', function() {
    const autoOpenAdsCheckbox = document.getElementById('autoOpenAds');

    // Load the saved toggle state from cookies
    const autoOpenAdsState = getCookie('autoOpenAds');
    autoOpenAdsCheckbox.checked = autoOpenAdsState === 'true';

    // Handle the toggle switch change
    autoOpenAdsCheckbox.addEventListener('change', function() {
        const isChecked = autoOpenAdsCheckbox.checked;

        // Save the toggle state in cookies
        setCookie('autoOpenAds', isChecked);

        // If auto open is enabled, log and open links
        if (isChecked) {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                const tab = tabs[0];
                const tabId = tab.id;
                chrome.scripting.executeScript({
                    target: { tabId },
                    function: openAndLogLinks
                });
            });
        }
    });

    // Function to open and log links
    function openAndLogLinks() {
        const links = document.querySelectorAll('a.btnInfoMetaLink');
        for (const link of links) {
            console.log("Opening link:", link.href);
            window.open(link.href, '_blank');
        }
    }

    // Function to set a cookie
    function setCookie(name, value) {
        document.cookie = `${name}=${value}; path=/`;
    }

    // Function to get a cookie
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }
});
