let interval = null;

function start(excludeList) {
    interval = setInterval(() => {
        // Array of strings to exclude (converted to lowercase)
        // const excludeStrings = ["epam anywhere", "epam systems", "turing"];

        // Get all the list items within the ul
        const listItems = document.querySelectorAll(
            ".scaffold-layout__list-container li"
        );

        console.log("****************************");
        if (!listItems) return;

        // Loop through each list item in reverse order to safely remove them
        for (let i = listItems.length - 1; i >= 0; i--) {
            const item = listItems[i];

            // Find the element with class 'job-card-container__primary-description' within the list item
            const primaryDescription = item.querySelector(
                ".job-card-container__primary-description"
            );

            // Check if the primary description element exists
            if (primaryDescription) {
                const descriptionText = primaryDescription.textContent
                    .trim()
                    .toLowerCase(); // Convert to lowercase

                // Check if the lowercase description contains any of the lowercase exclude strings
                if (
                    excludeList.some((exclude) =>
                        descriptionText.includes(exclude.toLowerCase())
                    )
                ) {
                    item.remove(); // Remove the list item from the DOM
                }
            }
        }
    }, 1000);
}

function stop() {
    clearInterval(interval);
    interval = null;
}
/* eslint-disable no-undef */

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("message received");
    if (request.message === "scriptRunning?") {
        if (interval == null) {
            sendResponse(false);
        } else {
            sendResponse(true);
        }
    } else if (request.message === "toggleScript") {
        if (interval == null) {
            console.log(request.excludeList);
            start(request.excludeList);
            sendResponse(true);
        } else {
            console.log("stop");
            stop();
            sendResponse(false);
        }
    } else if (request.message === "update") {
        // start(request.excludeList);
        sendResponse(true);
    }
    return true;
});
