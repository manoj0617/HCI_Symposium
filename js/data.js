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
    dates: "March 18–19, 2027",
    startDate: "2027-03-18T09:00:00+05:30",
    venueShort: "GCET, Hyderabad",
    registerUrl: "#", // TODO: registration link from HCI
  },

  pricing: {
    currency: "₹",
    // TODO: early-bird deadline (YYYY-MM-DD). While null, early-bird prices are shown with "Deadline TBA".
    earlyBirdEnds: null,
    note: "Proposed fees — subject to confirmation. GST details to be announced.", // TODO
    tiers: [
      {
        name: "Students",
        earlyBird: 1000,
        regular: 1500,
        perks: ["Access to both days", "Workshops & interactive zones", "Certificate of participation"], // TODO
      },
      {
        name: "Professionals / Academicians",
        earlyBird: 1500,
        regular: 2000,
        featured: true,
        perks: ["Access to both days", "Workshops & interactive zones", "Certificate of participation"], // TODO
      },
      {
        name: "HCIPAI Members",
        flat: 1000,
        perks: ["Access to both days", "Workshops & interactive zones", "Certificate of participation"], // TODO
      },
    ],
  },

  // TODO: placeholder schedule — replace once finalised.
  // type: keynote | panel | workshop | zone | break | general
  schedule: [
    {
      day: "Day 1",
      date: "Thursday, 18 March 2027",
      sessions: [
        { time: "09:00 – 10:00", title: "Registration & Welcome Kit", type: "general" },
        { time: "10:00 – 10:30", title: "Inauguration Ceremony", type: "general" },
        { time: "10:30 – 11:30", title: "Keynote Address", type: "keynote", speaker: "Speaker Name" },
        { time: "11:30 – 11:45", title: "Tea Break", type: "break" },
        { time: "11:45 – 13:00", title: "Panel Discussion: Session Title", type: "panel", speaker: "Panelists TBA" },
        { time: "13:00 – 14:00", title: "Lunch", type: "break" },
        { time: "14:00 – 16:00", title: "Workshop: Session Title", type: "workshop", speaker: "Facilitator Name" },
        { time: "16:00 – 17:30", title: "Interactive Zones Open", type: "zone" },
      ],
    },
    {
      day: "Day 2",
      date: "Friday, 19 March 2027",
      sessions: [
        { time: "09:30 – 10:30", title: "Keynote Address", type: "keynote", speaker: "Speaker Name" },
        { time: "10:30 – 12:30", title: "Workshop: Session Title", type: "workshop", speaker: "Facilitator Name" },
        { time: "12:30 – 13:30", title: "Lunch", type: "break" },
        { time: "13:30 – 14:45", title: "Panel Discussion: Session Title", type: "panel", speaker: "Panelists TBA" },
        { time: "14:45 – 16:00", title: "Interactive Zones & Showcase", type: "zone" },
        { time: "16:00 – 17:00", title: "Valedictory & Closing Remarks", type: "general" },
      ],
    },
  ],

  // TODO: placeholder profiles. photo: path like "assets/images/speakers/name.jpg", or "" for initials.
  speakers: {
    keynote: [
      { name: "Speaker Name", designation: "Designation, Organisation", bio: "Short bio of two or three lines about the speaker's work and background in HCI.", photo: "" },
      { name: "Speaker Name", designation: "Designation, Organisation", bio: "Short bio of two or three lines about the speaker's work and background in HCI.", photo: "" },
    ],
    workshop: [
      { name: "Facilitator Name", designation: "Designation, Organisation", bio: "Short bio of two or three lines about the facilitator and the workshop topic.", photo: "" },
      { name: "Facilitator Name", designation: "Designation, Organisation", bio: "Short bio of two or three lines about the facilitator and the workshop topic.", photo: "" },
      { name: "Facilitator Name", designation: "Designation, Organisation", bio: "Short bio of two or three lines about the facilitator and the workshop topic.", photo: "" },
    ],
  },

  // TODO: placeholder committee.
  committee: [
    {
      group: "Patrons",
      members: [
        { name: "Member Name", role: "Role / Designation", photo: "" },
        { name: "Member Name", role: "Role / Designation", photo: "" },
      ],
    },
    {
      group: "Convenors",
      members: [
        { name: "Member Name", role: "Role / Designation", photo: "" },
        { name: "Member Name", role: "Role / Designation", photo: "" },
        { name: "Member Name", role: "Role / Designation", photo: "" },
      ],
    },
    {
      group: "Organising Team",
      members: [
        { name: "Member Name", role: "Role / Designation", photo: "" },
        { name: "Member Name", role: "Role / Designation", photo: "" },
        { name: "Member Name", role: "Role / Designation", photo: "" },
        { name: "Member Name", role: "Role / Designation", photo: "" },
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
    email: "contact@example.com", // TODO
    phone: "+91 00000 00000", // TODO
    socials: [
      // TODO: { label: "Instagram", url: "https://..." }
    ],
  },
};
