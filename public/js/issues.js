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
<div style="padding: 1rem;">
  <h2 style="font-size: 1.125rem; font-weight: 600;">Have an issue?</h2>
</div>
<style>
  #email:focus, #title:focus, #message:focus {
    outline: 2px solid black;
    outline-offset: 2px;
  }
</style>
<form id="supportForm" style="padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <label for="email">Email</label>
    <input
      id="email"
      type="email"
      placeholder="Your email"
      required
      style="height: 2.5rem; width: 100%; border-radius: 0.375rem; border: 1px solid #e5e5e5; background-color: white; padding: 0.5rem 0.75rem; font-size: 1rem; color: black; box-sizing: border-box;"
    />
  </div>
  <div style="display: flex; flex-direction: column; gap: 0.25rem;">
    <label for="title">Title</label>
    <input
      id="title"
      type="text"
      placeholder="Issue Title"
      required
      style="height: 2.5rem; width: 100%; border-radius: 0.375rem; border: 1px solid #e5e5e5; background-color: white; padding: 0.5rem 0.75rem; font-size: 1rem; color: black; box-sizing: border-box;"
    />
  </div>
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <label for="message">Message</label>
    <textarea
      id="message"
      required
      placeholder="What is the issue?"
      style="width: 100%; border-radius: 0.375rem; border: 1px solid #e5e5e5; background-color: white; padding: 0.5rem 0.75rem; font-size: 1rem; color: black; box-sizing: border-box; resize: vertical;"
    ></textarea>
    <button
      type="submit"
      id="submitButton"
      style="background-color: black; color: white; width: 100%; padding: 0.3rem; border-radius: 6px; font-size: 1rem; border: none; cursor: pointer;"
    >
      Submit
    </button>
  </div>
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
