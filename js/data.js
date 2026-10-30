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
  marquee: ["One Experience. Many Perspectives.", "18–19 March 2027", "Design it. Build it. Step inside it.", "GCET, Hyderabad", "Posters · Demos · Installations", "Early bird till 31 January"],

  // The three things people come for. Shown on the home page.
  experiences: [
    {
      title: "Talks",
      kicker: "Keynotes, expert talks & a panel",
      text: "Two keynotes, four expert talks and a panel discussion on where interaction, interface and immersive design are heading.",
    },
    {
      title: "Workshops",
      kicker: "Students, educators & experts",
      text: "Hands-on workshops for students, and a participatory workshop where educators shape how HCI enters engineering curricula.",
    },
    {
      title: "Expo",
      kicker: "Posters, demos & installations",
      text: "Posters, live demos and installations you can walk up to, try out and question. Open all day on both days.",
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

  // Who each workshop lane is for. Lane A runs above the road, lane B below it.
  lanes: {
    A: { name: "Educators & experts" },
    B: { name: "Students" },
  },
  // Runs alongside the whole programme on both days.
  allDay: ["Posters", "Demos", "Installations"],

  // Programme, from the organisers' sheet (tentative). Tea breaks are left out on purpose.
  // kind: common | talk | split (different sessions per lane) | pause
  // A split stop lists its sessions per lane: a: [...] and b: [...]; tag says who it is for.
  schedule: [
    {
      day: "Day 1",
      date: "Thu, 18 March",
      theme: "Talks, then hands-on workshops",
      stops: [
        { time: "9:00–9:30", title: "Registration & Welcome", kind: "common" },
        { time: "9:30–10:30", title: "Inauguration & Opening Address", kind: "common" },
        { time: "10:30–11:15", title: "Keynote I", kind: "talk" },
        { time: "11:30–12:00", title: "Expert Talk I", kind: "talk" },
        { time: "12:00–12:30", title: "Expert Talk II", kind: "talk" },
        { time: "12:30–14:00", title: "Lunch", kind: "pause" },
        {
          time: "14:00–15:15",
          kind: "split",
          a: [{ title: "Integrating HCI/HMI Design with Engineering Curricula", tag: "Participatory workshop", link: "#workshop" }],
          b: [{ title: "Workshop I", tag: "Students" }, { title: "Workshop II", tag: "Students" }],
        },
        {
          time: "15:30–16:45",
          kind: "split",
          a: [{ title: "Integrating HCI/HMI Design with Engineering Curricula", tag: "Participatory workshop", link: "#workshop" }],
          b: [{ title: "Workshop I", tag: "Students" }, { title: "Workshop II", tag: "Students" }],
        },
        { time: "16:45–17:30", title: "High Tea & Networking", kind: "common" },
      ],
    },
    {
      day: "Day 2",
      date: "Fri, 19 March",
      theme: "Conversations, workshops and the competition",
      stops: [
        { time: "9:00–9:30", title: "Registration & Welcome", kind: "common" },
        { time: "9:30–10:15", title: "Keynote II", kind: "talk" },
        { time: "10:15–10:45", title: "Expert Talk III", kind: "talk" },
        { time: "10:45–11:15", title: "Expert Talk IV", kind: "talk" },
        { time: "11:30–12:00", title: "Interactive Session", kind: "common" },
        { time: "12:00–13:00", title: "Panel Discussion", kind: "common" },
        { time: "13:00–14:00", title: "Lunch", kind: "pause" },
        {
          time: "14:00–15:15",
          kind: "split",
          a: [{ title: "Workshop III", tag: "Educators & experts" }],
          b: [{ title: "Student Design Competition Jury", tag: "Competition", link: "#competition" }],
        },
        {
          time: "15:30–16:45",
          kind: "split",
          a: [{ title: "Workshop IV", tag: "Educators & experts" }],
          b: [{ title: "Student Design Competition Jury", tag: "Competition", link: "#competition" }],
        },
        { time: "16:45–17:30", title: "Closing", kind: "common" },
      ],
    },
  ],

  // Faculty workshop (details from the organisers' brief).
  workshop: {
    registerUrl: "https://docs.google.com/forms/d/1SiDkbFK1MY2DsGMlJ2VOxW2bPfllSGE7McmOGQfsZdw/viewform",
  },

  // Confirmed speakers. Add more as they are announced; "more to be announced" shows while moreToCome is true.
  // photo: square image in assets/images/people/.
  speakers: {
    moreToCome: true,
    list: [
      {
        name: "Rabindra Sah",
        session: "Keynote Speaker",
        designation: "Chief Technology Officer & Senior Vice President",
        org: "Indian Register of Shipping",
        photo: "assets/images/people/photo-01.jpg",
      },
    ],
  },

  // Organising committee. `rows` sets how many cards go on each line (always centred).
  committeeAnnounced: true,
  committee: [
    {
      group: "General Chairs",
      rows: [2],
      members: [
        { name: "Dr. Udaya Kumar Susarla", role: "General Chair", photo: "assets/images/people/photo-04.jpg" },
        { name: "Mr. R. Harishchandra Reddy", role: "General Chair", photo: "assets/images/people/photo-05.jpg" },
      ],
    },
    {
      group: "Program Chairs",
      rows: [3],
      members: [
        { name: "Dr. D. Sujatha", role: "Program Chair", photo: "assets/images/people/photo-03.jpg" },
        { name: "Dr. V. Madhusudan Rao", role: "Program Chair", photo: "assets/images/people/photo-06.jpg" },
        { name: "MD Akif", role: "Program Chair", photo: "assets/images/people/photo-02.jpg" },
      ],
    },
    {
      group: "Registration & Outreach",
      rows: [2],
      members: [
        { name: "Mrs. A. Jayasree", role: "Registration Chair", photo: "assets/images/people/photo-08.jpg" },
        { name: "Dr. Bhanu Mahesh", role: "Website & Outreach Chair", photo: "assets/images/people/photo-07.jpg" },
      ],
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
