const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const revealItems = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const campaignVideos = [
  {
    src: "assets/videos/convenience-store-night.mp4",
    kicker: "Campaign reel 01",
    title: "Closing-time shelves",
  },
  {
    src: "assets/videos/closing-leftovers.mp4",
    kicker: "Campaign reel 02",
    title: "Leftovers still worth noticing",
  },
  {
    src: "assets/videos/campus-waste-seen.mp4",
    kicker: "Campaign reel 03",
    title: "Tomorrow's waste, seen today",
  },
];

const campaignVideo = document.querySelector("#campaign-video");
const videoKicker = document.querySelector("#video-kicker");
const videoTitle = document.querySelector("#video-title");
const videoDots = document.querySelectorAll(".video-dot");
let currentCampaignVideo = 0;

const setCampaignVideo = (index, shouldPlay = true) => {
  const nextVideo = campaignVideos[index];
  currentCampaignVideo = index;

  if (campaignVideo && campaignVideo.getAttribute("src") !== nextVideo.src) {
    campaignVideo.setAttribute("src", nextVideo.src);
    campaignVideo.load();
  }

  if (videoKicker) {
    videoKicker.textContent = nextVideo.kicker;
  }

  if (videoTitle) {
    videoTitle.textContent = nextVideo.title;
  }

  videoDots.forEach((dot) => {
    const isActive = Number(dot.dataset.videoIndex) === index;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });

  if (campaignVideo && shouldPlay && !reducedMotion.matches) {
    campaignVideo.play().catch(() => {
      campaignVideo.controls = true;
    });
  }
};

if (campaignVideo) {
  if (reducedMotion.matches) {
    campaignVideo.removeAttribute("autoplay");
    campaignVideo.controls = true;
  }

  campaignVideo.addEventListener("ended", () => {
    const nextIndex = (currentCampaignVideo + 1) % campaignVideos.length;
    setCampaignVideo(nextIndex);
  });

  videoDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      setCampaignVideo(Number(dot.dataset.videoIndex));
    });
  });
}

const workflowSteps = [
  {
    label: "Step 01",
    title: "List the batch",
    copy: "Stores submit the food name, quantity, source, photo, shelf-life details, storage needs, and pickup window.",
    ai: "Turning messy messages into a standard intake record.",
    human: "That the source, package, time, and storage information are complete.",
    output: "One clear batch record ready for review.",
  },
  {
    label: "Step 02",
    title: "Check the rules",
    copy: "The system flags missing details, refrigeration needs, urgent timing, allergy notes, and cases that need manual review.",
    ai: "Spotting incomplete fields and drafting a safety checklist.",
    human: "Whether the food fits the pilot boundary and should move forward.",
    output: "Accepted, rejected, or manual-review status.",
  },
  {
    label: "Step 03",
    title: "Match the pickup",
    copy: "Volunteers see practical pickup suggestions based on location, time window, remaining shelf-life, and availability.",
    ai: "Suggesting pickup priority and reducing empty trips.",
    human: "Whether a volunteer can safely complete the route on time.",
    output: "A confirmed pickup window and responsible volunteer.",
  },
  {
    label: "Step 04",
    title: "Label clearly",
    copy: "Each accepted batch receives a readable label with source, pickup time, storage note, consumption suggestion, and allergen reminder.",
    ai: "Drafting consistent labels from intake records.",
    human: "Whether the printed label matches the actual batch.",
    output: "A traceable label attached before distribution.",
  },
  {
    label: "Step 05",
    title: "Publish the outcome",
    copy: "Daily or weekly summaries show what was collected, shared, rejected, and learned during the pilot.",
    ai: "Preparing report drafts and category summaries.",
    human: "Whether the report is accurate, fair, and honest about limits.",
    output: "A public pilot record supporters can check.",
  },
];

const workflowTabs = document.querySelectorAll(".workflow-tab");
const workflowLabel = document.querySelector("#workflow-label");
const workflowTitle = document.querySelector("#workflow-title");
const workflowCopy = document.querySelector("#workflow-copy");
const workflowAi = document.querySelector("#workflow-ai");
const workflowHuman = document.querySelector("#workflow-human");
const workflowOutput = document.querySelector("#workflow-output");

workflowTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const step = workflowSteps[Number(tab.dataset.step)];
    workflowTabs.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    workflowLabel.textContent = step.label;
    workflowTitle.textContent = step.title;
    workflowCopy.textContent = step.copy;
    workflowAi.textContent = step.ai;
    workflowHuman.textContent = step.human;
    workflowOutput.textContent = step.output;
  });
});

const pledgeData = {
  19: {
    amount: "¥19 pledge",
    title: "Print the first label",
    copy: "Your pledge helps one batch receive a proper source record, pickup time, storage note, and public entry.",
  },
  49: {
    amount: "¥49 pledge",
    title: "Cover one pickup",
    copy: "Your pledge supports short-distance transport and the basic sorting materials used during one rescue run.",
  },
  99: {
    amount: "¥99 pledge",
    title: "Pack the safety kit",
    copy: "Your pledge funds gloves, sealing bags, alcohol wipes, thermometers, and label paper for careful handling.",
  },
  299: {
    amount: "¥299 pledge",
    title: "Bring one store on board",
    copy: "Your pledge helps one food source join the pilot with intake forms, clear signs, label templates, and a simple routine staff can actually use.",
  },
  999: {
    amount: "¥999 pledge",
    title: "Set up the sorting corner",
    copy: "Your pledge helps provide a label printer, insulated box, sorting crates, and public display materials.",
  },
  4999: {
    amount: "¥4999 pledge",
    title: "Run the full 30 days",
    copy: "Your pledge supports one complete campus or community trial and the final transparent pilot report.",
  },
};

const pledgeCards = document.querySelectorAll(".pledge-card");
const pledgeAmount = document.querySelector("#pledge-amount");
const pledgeTitle = document.querySelector("#pledge-title");
const pledgeCopy = document.querySelector("#pledge-copy");

pledgeCards.forEach((card) => {
  card.addEventListener("click", () => {
    const pledge = pledgeData[card.dataset.pledge];
    pledgeCards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
    pledgeAmount.textContent = pledge.amount;
    pledgeTitle.textContent = pledge.title;
    pledgeCopy.textContent = pledge.copy;
  });
});

const checkerData = {
  bread: {
    status: "Accepted",
    className: "accepted",
    copy: "Sealed bread can enter the pilot if the source, package, remaining shelf life, and pickup window are documented.",
  },
  dairy: {
    status: "Manual review",
    className: "review",
    copy: "Traceable yogurt needs confirmed cold-chain information and a short pickup window before it can move forward.",
  },
  meal: {
    status: "Rejected",
    className: "rejected",
    copy: "Prepared meals are outside the first pilot because storage history and food-safety risk are harder to verify.",
  },
  unknown: {
    status: "Rejected",
    className: "rejected",
    copy: "Unknown-source food cannot enter the pilot because recipients and volunteers need a visible trail of trust.",
  },
};

const checkerOptions = document.querySelectorAll(".checker-option");
const checkerResult = document.querySelector("#checker-result");
const checkerStatus = document.querySelector("#checker-status");
const checkerCopy = document.querySelector("#checker-copy");

checkerOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const result = checkerData[option.dataset.food];
    checkerOptions.forEach((item) => item.classList.remove("is-active"));
    option.classList.add("is-active");
    checkerResult.className = `checker-result ${result.className}`;
    checkerStatus.textContent = result.status;
    checkerCopy.textContent = result.copy;
  });
});
