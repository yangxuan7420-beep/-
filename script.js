const tierData = {
  starter: {
    name: "Starter Pack",
    copy: "A low-cost entry tier for supporters who want the planning system in digital form and a practical set of AI prompts.",
    items: [
      "Printable planner PDF",
      "Prompt starter sheet",
      "Project update emails"
    ]
  },
  study: {
    name: "Study Kit",
    copy: "The core physical version for students who want the planner in hand and a small set of visual accessories.",
    items: [
      "Printed planner",
      "Prompt starter sheet",
      "Sticker set",
      "Project update emails"
    ]
  },
  focus: {
    name: "Focus Bundle",
    copy: "A fuller study support tier that adds review cards and a simple accountability template for weekly use.",
    items: [
      "Printed planner",
      "Prompt starter sheet",
      "Weekly review cards",
      "Accountability template"
    ]
  },
  supporter: {
    name: "Supporter Circle",
    copy: "The community-support tier for backers who want the full bundle and a visible thank-you credit on the final page.",
    items: [
      "Everything in Focus Bundle",
      "Name on supporter thank-you page",
      "Early access to future revision files",
      "Extra project progress update"
    ]
  }
};

const cards = document.querySelectorAll(".tier-card");
const tierName = document.getElementById("tier-name");
const tierCopy = document.getElementById("tier-copy");
const tierItems = document.getElementById("tier-items");

function renderTier(key) {
  const tier = tierData[key];
  if (!tier) {
    return;
  }

  tierName.textContent = tier.name;
  tierCopy.textContent = tier.copy;
  tierItems.innerHTML = tier.items.map((item) => `<li>${item}</li>`).join("");
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
    renderTier(card.dataset.tier);
  });
});
