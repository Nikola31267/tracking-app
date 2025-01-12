(() => {
  let projectName, projectId, modal;

  document.addEventListener("DOMContentLoaded", () => {
    const scriptTag =
      document.currentScript ||
      Array.from(document.querySelectorAll("script")).find((s) =>
        s.src.includes("issues.js")
      );

    if (!scriptTag) {
      console.error("Script tag not found.");
      return;
    }

    // Extract attributes
    projectName = scriptTag.getAttribute("data-website-url");
    projectId = scriptTag.getAttribute("data-project-id");

    if (!projectName || !projectId) {
      console.error("Missing required data attributes in the script tag.");
      return;
    }

    // Create the help button
    const button = document.createElement("button");
    button.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-help"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg></div>`;
    button.style.cssText = `
      position: fixed;
      bottom: 16px;
      right: 16px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: black;
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 9999;
    `;
    document.body.appendChild(button);

    // Create the modal
    modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="p-4 bg-white text-black">
        <h2 class="text-lg font-semibold">Have an issue?</h2>
      </div>
      <form id="supportForm" class="p-4 space-y-4">
        <div class="flex flex-col space-y-2">
          <label for="email" class="text-black">Email</label>
          <input id="email" class="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-black ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" placeholder="Your Email" type="email" required />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="title" class="text-black">Title</label>
          <input id="title" class="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-black ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" placeholder="Issue Title" type="text" required />
        </div>
        <div class="flex flex-col space-y-2">
          <label class="text-black" for="message">Message</label>
          <textarea id="message"
           class="flex h-28 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-black ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none" placeholder="What is the issue?" required></textarea>
        </div>
        <button type="submit" class="bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 p-2 w-full rounded-md" id="submitButton">Submit</button>
      </form>
    `;
    modal.style.cssText = `
      display: none;
      position: fixed;
      bottom: 72px;
      right: 16px;
      width: 320px;
      max-width: 90%;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      overflow: hidden;
    `;
    document.body.appendChild(modal);

    // Add button toggle functionality
    button.addEventListener("click", () => {
      modal.style.display = modal.style.display === "none" ? "block" : "none";
    });

    // Add form submission logic
    const supportForm = modal.querySelector("#supportForm");
    supportForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitButton = modal.querySelector("#submitButton");
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";

      const email = modal.querySelector("#email").value;
      const title = modal.querySelector("#title").value;
      const message = modal.querySelector("#message").value;

      fetch("https://pixeltrackapi.startgrid.xyz/issues/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          title,
          description: message,
          projectName,
          id: projectId,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          alert("Issue sent successfully.");
          modal.style.display = "none";
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to send issue.");
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.textContent = "Submit";
        });
    });
  });
})();
