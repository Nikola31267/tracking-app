let projectName, projectId, modal;

document.addEventListener("DOMContentLoaded", function () {
  const scriptTag =
    document.currentScript ||
    Array.from(document.querySelectorAll("script")).find((s) =>
      s.src.includes("issues.js")
    );

  if (!scriptTag) {
    console.error("Script tag not found.");
    return;
  }

  projectName = scriptTag.getAttribute("data-website-url");
  projectId = scriptTag.getAttribute("data-project-id");

  if (!projectName || !projectId) {
    console.error("Missing required data attributes in the script tag.");
    return;
  }

  const button = document.createElement("button");
  button.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-help"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
</div>`;
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
  `;
  document.body.appendChild(button);

  modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
    <div class="p-4 bg-primary text-primary-foreground">
      <h2 class="text-lg font-semibold">Have an issue?</h2>
    </div>
    <form id="supportForm" class="p-4 space-y-4">
      <div class="flex flex-col space-y-2">
        <label for="email">Email</label>
        <input
          id="email"
          placeholder="Your email"
          class="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
          type="email"
          required
        />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="title">Title</label>
        <input
          id="title"
          type="text"
          class="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
          placeholder="Issue Title"
          required
        />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="message">Message</label>
        <textarea
          id="message"
          class="flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
          placeholder="What is the issue?"
          required
        ></textarea>
      </div>
      <button type="submit" class="w-full bg-black p-1.5 rounded-lg text-white" id="submitButton">Submit</button>
    </form>
  `;
  document.body.appendChild(modal);

  const modalStyles = document.createElement("style");
  modalStyles.innerHTML = `
    /* Media Queries for responsiveness */
    @media (max-width: 768px) {
      .modal {
        width: 90%;  /* Adjust width for tablets and smaller devices */
        right: 0;
        bottom: 80px;  /* Adjust for larger screens */
      }
    }
    @media (max-width: 480px) {
      .modal {
        width: 95%;  /* Adjust width for mobile devices */
        bottom: 80px;  /* Adjust for mobile screens */
      }
    }

    /* Styling for the modal */
    .modal {
      display: none;
      position: fixed;
      bottom: 72px;
      right: 16px;
      width: 320px;
      background: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
      z-index: 1000;
      max-width: 100%;
      box-sizing: border-box;
    }

    /* Styling for close button */
    .modal-close {
      font-size: 24px;
      color: #000;
      cursor: pointer;
    }

    /* Disabled Button Styles */
    .disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(modalStyles);

  if (button) {
    button.addEventListener("click", function () {
      modal.style.display = modal.style.display === "none" ? "block" : "none";
    });
  } else {
    console.error("Button element not found!");
  }

  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  const supportForm = document.getElementById("supportForm");
  supportForm.addEventListener("submit", handleSubmit);
});

function handleSubmit(e) {
  e.preventDefault();

  const submitButton = document.getElementById("submitButton");
  submitButton.disabled = true;
  submitButton.classList.add("disabled");
  submitButton.textContent = "Submitting...";

  const email = document.getElementById("email").value;
  const title = document.getElementById("title").value;
  const message = document.getElementById("message").value;

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
    .then((data) => {
      console.log(data);
      alert("Issue sent successfully.");
      modal.style.display = "none";
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.classList.remove("disabled");
      submitButton.textContent = "Submit";
    });
}
