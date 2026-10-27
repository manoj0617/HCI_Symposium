/*
 * ALL editable site content lives here.
 * Edit this file to update pricing, schedule, speakers, committee and contact
 * details — no HTML changes needed.
 *
 * Anything marked TODO is a placeholder waiting on the organisers.
 */
const SITE = {
  event: {
    name: "HCIPAI Symposium 2027",
    tagline: "HCI for Interactive & Immersive Experience",
    subTagline: "One Experience. Many Perspectives.",
    dates: "18–19 March 2027",
    startDate: "2027-03-18T09:00:00+05:30",
    venueShort: "GCET, Hyderabad",
    registerUrl: "#", // TODO: registration link from HCI
  },

  pricing: {
    currency: "₹",
    // Early bird runs to the end of this day (IST). Cards switch to regular prices afterwards.
    earlyBirdEnds: "2027-01-31",
    note: "All fees are exclusive of GST.",
    tiers: [
      {
        name: "Students",
        earlyBird: 1000,
        regular: 1500,
        perks: ["Both days", "Workshop track of your choice", "Certificate"], // TODO: confirm inclusions
      },
      {
        name: "Professionals & Academicians",
        earlyBird: 1500,
        regular: 2000,
        featured: true,
        perks: ["Both days", "Workshop track of your choice", "Certificate"], // TODO: confirm inclusions
      },
      {
        name: "HCIPAI Members",
        flat: 1000,
        perks: ["Both days", "Workshop track of your choice", "Certificate"], // TODO: confirm inclusions
      },
    ],
  },

  // Scrolling strip under the banner.
  marquee: ["One Experience. Many Perspectives.", "18–19 March 2027", "Design it. Build it. Step inside it.", "GCET, Hyderabad", "Two tracks · UI/UX & HCI · VR & Immersive", "Early bird till 31 January"],

  // The three things people come for. Shown on the home page.
  experiences: [
    {
      title: "Talks",
      kicker: "Keynotes & expert talk",
      text: "Day one opens with two keynotes and an expert talk on where interaction, interface and immersive design are heading.",
    },
    {
      title: "Workshops",
      kicker: "Two tracks, two days",
      text: "Pick a track and spend your afternoons building, testing and breaking prototypes with the people who facilitate them.",
    },
    {
      title: "Expo",
      kicker: "Stalls & live demos",
      text: "Projects, prototypes and stalls you can walk up to, try out and question. Open on both evenings.",
    },
  ],

  // Workshop tracks. TODO: topics and facilitators per track.
  tracks: [
    {
      id: "A",
      name: "UI/UX & HCI",
      text: "Understand people first, then design for them: research, flows, interface prototyping and usability testing.",
      topics: ["User research", "Interaction design", "Prototyping", "Usability testing"], // TODO: confirm
    },
    {
      id: "B",
      name: "VR & Immersive",
      text: "Build for headsets and spatial interfaces, from first scene to a demo other people can step into.",
      topics: ["Immersive design", "VR development", "Spatial interaction", "Prototype demos"], // TODO: confirm
    },
  ],

  // Roadmap. Breaks are left out on purpose.
  // kind: common | talk | split (different session per track) | parallel (same session in both tracks) | pause | expo
  schedule: [
    {
      day: "Day 1",
      date: "Thu, 18 March",
      theme: "HCI, Design & Immersive Experiences",
      stops: [
        { time: "9:00 – 9:30 AM", title: "Registration & Welcome", kind: "common" },
        { time: "9:30 – 10:00 AM", title: "Inauguration & Opening Address", kind: "common" },
        { time: "10:00 – 10:45 AM", title: "Keynote Address I", topic: "HCI and the Future of Human–Technology Interaction", kind: "talk" },
        { time: "11:00 – 11:45 AM", title: "Keynote Address II", topic: "Designing Interactive & Immersive Experiences", kind: "talk" },
        { time: "11:45 AM – 12:30 PM", title: "Expert Talk", topic: "Emerging Trends in HCI, UI/UX & Immersive Technologies", kind: "talk" },
        { time: "12:30 – 1:30 PM", title: "Lunch", kind: "pause" },
        { time: "1:30 – 3:00 PM", title: "Workshop Session", kind: "split", a: "UI/UX & HCI", b: "VR & Immersive Technologies" },
        { time: "3:15 – 5:00 PM", title: "Workshop Session", kind: "split", a: "UI/UX & HCI", b: "VR & Immersive Technologies" },
        // Overlaps the 3:15–5:00 workshop on purpose (confirmed by organisers).
        { time: "4:00 – 5:30 PM", title: "Networking & Stall Exploration", topic: "Exhibition, demonstrations and informal conversations", kind: "expo" },
      ],
    },
    {
      day: "Day 2",
      date: "Fri, 19 March",
      theme: "Hands-on HCI & Immersive Development",
      stops: [
        { time: "9:00 – 9:15 AM", title: "Workshop Orientation", kind: "parallel" },
        { time: "9:15 – 11:00 AM", title: "Panel Discussion", kind: "parallel" },
        { time: "11:15 AM – 12:30 PM", title: "Interactive Session", kind: "parallel" },
        { time: "12:30 – 1:30 PM", title: "Lunch", kind: "pause" },
        { time: "1:30 – 3:00 PM", title: "Workshop", kind: "parallel" },
        { time: "3:15 – 5:00 PM", title: "Prototype Demonstrations & Wrap-up", kind: "parallel" },
        { time: "5:00 – 5:30 PM", title: "Networking & Stall Exploration", kind: "expo" },
      ],
    },
  ],

  // TODO: names, photos. photo: "assets/images/speakers/name.jpg" (square, ≥ 400×400), or "" for a placeholder.
  // Set announced: true once names are in, to show speaker cards instead of "To be announced".
  speakers: {
    announced: false,
    keynote: [
      { name: "To be announced", session: "Keynote I", topic: "HCI and the Future of Human–Technology Interaction", photo: "" },
      { name: "To be announced", session: "Keynote II", topic: "Designing Interactive & Immersive Experiences", photo: "" },
      { name: "To be announced", session: "Expert Talk", topic: "Emerging Trends in HCI, UI/UX & Immersive Technologies", photo: "" },
    ],
    workshop: [
      { name: "To be announced", session: "Track A", topic: "UI/UX & HCI workshop", photo: "" },
      { name: "To be announced", session: "Track B", topic: "VR & Immersive workshop", photo: "" },
    ],
  },

  // TODO: placeholder committee. `rows` sets how many cards go on each line,
  // e.g. [1] → 1, [2] → 2, [3, 2, 3] → 3 / 2 / 3. Leave it out to fill rows of 3.
  committeeAnnounced: false, // true = show the member cards below instead of "To be announced"
  committee: [
    { group: "Chief Patron", rows: [1], members: [{ name: "Member Name", role: "Role / Designation", photo: "" }] },
    {
      group: "Patrons",
      rows: [2],
      members: [
        { name: "Member Name", role: "Role / Designation", photo: "" },
        { name: "Member Name", role: "Role / Designation", photo: "" },
      ],
    },
    {
      group: "Convenors",
      rows: [3],
      members: [
        { name: "Member Name", role: "Role / Designation", photo: "" },
        { name: "Member Name", role: "Role / Designation", photo: "" },
        { name: "Member Name", role: "Role / Designation", photo: "" },
      ],
    },
    {
      group: "Organising Committee",
      rows: [3, 2, 3],
      members: Array.from({ length: 8 }, () => ({ name: "Member Name", role: "Role / Designation", photo: "" })),
    },
  ],

  // TODO: confirm all venue/contact details with organisers.
  venue: {
    name: "Geethanjali College of Engineering and Technology (GCET)",
    address: "Sy. No. 33 & 34, Cheeryal (V), Keesara (M), Medchal District, Hyderabad, Telangana 501301", // from gcet.edu.in
    mapQuery: "Geethanjali College of Engineering and Technology, Cheeryal, Hyderabad",
  },
  contact: {
    email: "xrresearchlab@gcet.edu.in", // XR Research Lab, GCET
    socials: [{ label: "Instagram", handle: "@ar.vr.researchlab", url: "https://www.instagram.com/ar.vr.researchlab/" }],
  },
};
