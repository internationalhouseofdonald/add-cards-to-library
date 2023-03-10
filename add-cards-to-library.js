// # Membership Portal - Add cards below Instructor Card

// 1. Set the URL of the 1st card.
let card1Url = "https://demo.imgfunnels.com/test";

// 2. Set the height of the 1st card.
let card1Height = "483.23";

// 3. Set the URL of the 2nd card.
let card2Url = "https://demo.imgfunnels.com/blank";

// 4. Set the height of the 2nd card.
let card2Height = "190";

// Optional: Set the margins (0.75rem by default)
let margins = "0.75rem";

const waitForElement = (selector) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
};

function reload() {
  console.log("Reloaded");
  waitForElement("#instructor-card")
    .then((element) => {
      let container = document.createElement("div");
      container.id = "prevent-reload-1";
      let iframe = document.createElement("iframe");

      // Frame #1
      iframe.src = card1Url;
      let height = card1Height; // px

      // Optional: Set the margin on the frame.
      container.style.marginTop = margins;
      container.style.marginBottom = margins;

      // Don't worry about the rest of this.
      iframe.style.height = height + "px";
      iframe.height = height;
      container.className = "bg-white rounded py-5 px-5 shadow instructor-card";

      iframe.width = "100%";
      iframe.style.width = "100%";
      iframe.className = "_resize";
      if (!document.querySelector("#prevent-reload-1")) {
        container.append(iframe);
        element.parentElement.append(container);
      }
      return element;
    })
    .then((element) => {
      let container = document.createElement("div");
      container.id = "prevent-reload-2";
      let iframe = document.createElement("iframe");

      // Frame #2
      iframe.src = card2Url;
      let height = card2Height; // px

      // Optional: Set the margin on the frame.
      container.style.marginTop = margins;
      container.style.marginBottom = margins;

      // Don't worry about the rest of this.
      iframe.style.height = height + "px";
      iframe.height = height;
      container.className = "bg-white rounded py-5 px-5 shadow instructor-card";
      iframe.width = "100%";
      iframe.style.width = "100%";
      iframe.className = "_resize";
      if (!document.querySelector("#prevent-reload-2")) {
        container.append(iframe);
        element.parentElement.append(container);
      }

      return element;
    })
    .finally(() => {
      const callback = (mutationList, observer) => {
        reload();
        observer.disconnect();
      };
      const observer = new MutationObserver(callback);
      const target = document.getElementById("app");
      observer.observe(target, { childList: true, subtree: true });
    });
}

// Leave this...
reload();
