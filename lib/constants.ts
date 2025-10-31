export type EventItem = {
  title: string;
  image: string; // path under /images (served from public)
  slug: string;
  location: string;
  date: string; //e.g., "2024-12-31"
  time: string; // e.g., "09:00 AM"
};

export const events: EventItem[] = [
  {
    title: "Next.js Conf 2026",
    image: "/images/event1.png",
    slug: "nextjs-conf-2026",
    location: "San Francisco, CA, USA",
    date: "2026-02-15",
    time: "09:00 AM",
  },
  {
    title: "Global Hackathon Week",
    image: "/images/event2.png",
    slug: "global-hackathon-2026",
    location: "Online (Virtual Event)",
    date: "2026-03-20",
    time: "10:00 AM",
  },
  {
    title: "React Summit Europe",
    image: "/images/event3.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands",
    date: "2026-04-06",
    time: "09:30 AM",
  },
  {
    title: "AI Developer Days",
    image: "/images/event4.png",
    slug: "ai-dev-days-2026",
    location: "New York City, NY",
    date: "2026-01-15",
    time: "08:00 AM",
  },
  {
    title: "Web3 World Conference",
    image: "/images/event5.png",
    slug: "web3-world-2026",
    location: "Singapore",
    date: "2026-05-20",
    time: "10:00 AM",
  },
  {
    title: "DevOps Evolution Summit",
    image: "/images/event6.png",
    slug: "devops-evolution-2026",
    location: "London, UK",
    date: "2026-06-12",
    time: "09:00 AM",
  },
];

