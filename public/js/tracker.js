(function () {
  const currentScript = document.currentScript;

  const projectName = currentScript.getAttribute("data-website-url");
  if (!projectName) {
    console.error("Website url not provided");
    return;
  }

  const url = window.location.href;
  if (url.startsWith("http://localhost:")) {
    console.error("Cannot track visits on localhost, skipping");
    return;
  }

  const pagePath = window.location.pathname;
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get("ref");

  const bodyData = {
    projectName,
    page: pagePath,
    referrer: ref || "Direct",
  };

  fetch("https://pixeltrackapi.startgrid.xyz/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Visit logged successfully");
      } else {
        console.error("Error logging visit");
      }
    })
    .catch((error) => console.error("Network error logging visit:", error));
})();
