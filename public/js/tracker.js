(function () {
  const currentScript = document.currentScript;

  const apiKey = currentScript.getAttribute("data-api-key");
  if (!apiKey) {
    console.error("API Key not provided");
    return;
  }

  const pagePath = window.location.pathname;

  fetch("http://localhost:9000/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apiKey, page: pagePath }),
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
