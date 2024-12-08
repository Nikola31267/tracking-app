(function () {
  const currentScript = document.currentScript;

  const apiKey = currentScript.getAttribute("data-api-key");
  if (!apiKey) {
    console.error("API Key not provided");
    return;
  }

  const pagePath = window.location.pathname;
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get("ref");

  const bodyData = { apiKey, page: pagePath };
  if (ref) {
    bodyData.referrer = ref;
  }

  fetch("http://localhost:9000/track", {
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
