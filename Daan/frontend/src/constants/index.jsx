// Corrected imports for lucide-react icons
import { MonitorSmartphone, LayoutDashboard, HeartHandshake, ShieldCheck, Users, Globe } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "features" },
  { label: "Workflow", href: "workflow" },
  // { label: "Pricing", href: "pricing" },
  { label: "Testimonials", href: "testimonials" },
];


export const testimonials = [
  {
    user: "Sarah Miller",
    company: "Hope Foundation",
    image: user1,
    text: "Donating to this cause has been a truly rewarding experience. The team is dedicated, transparent, and has made a significant impact on the lives of many. I'm proud to contribute.",
  },
  {
    user: "James Anderson",
    company: "Global Outreach",
    image: user2,
    text: "I'm incredibly moved by the work being done here. Every donation counts, and it's clear that the team uses resources wisely to create lasting change in the community.",
  },
  {
    user: "Linda Roberts",
    company: "Green Earth Initiative",
    image: user3,
    text: "The mission of this organization is close to my heart. It’s inspiring to see how much positive change can happen with the help of people coming together to donate and make a difference.",
  },
  {
    user: "Mark Thompson",
    company: "Charity Now",
    image: user4,
    text: "It’s an honor to support this cause. The team’s efforts to provide aid and create awareness are truly commendable. Every contribution helps and makes a tangible impact in the lives of those in need.",
  },
  {
    user: "Olivia Green",
    company: "Future Foundations",
    image: user5,
    text: "I’ve seen firsthand the amazing work that this team does. They are genuine, passionate, and committed to their mission of making the world a better place, one donation at a time.",
  },
  {
    user: "David Carter",
    company: "Hands Together Project",
    image: user6,
    text: "This organization makes it easy to donate and know that your contribution is making a real difference. Their transparency and dedication to the cause are truly inspiring.",
  },
];


export const features = [
  {
    icon: <MonitorSmartphone />,
    text: "Cross-Platform Accessibility",
    description:
      "Ensure accessibility by supporting multiple platforms, allowing users to donate from any device—mobile, desktop, or tablet.",
  },
  {
    icon: <LayoutDashboard />,
    text: "Pre-Designed Donation Templates",
    description:
      "Jumpstart your campaigns with customizable templates tailored for different fundraising needs and donation types.",
  },
  {
    icon: <HeartHandshake />,
    text: "Real-Time Impact Updates",
    description:
      "Provide donors with real-time updates on the impact of their contributions, encouraging continued engagement and support.",
  },
  {
    icon: <Users />,
    text: "Collaborative Campaign Management",
    description:
      "Empower your team with tools to manage donation campaigns collaboratively, enabling efficient teamwork and idea sharing.",
  },
  {
    icon: <LayoutDashboard />,
    text: "Donor Analytics Dashboard",
    description:
      "Gain insights into donor behavior and campaign performance with an integrated analytics dashboard to improve future fundraising efforts.",
  },
  {
    icon: <ShieldCheck />,
    text: "Secure Payment Processing",
    description:
      "Ensure donor confidence with secure, encrypted payment processing that protects personal and financial information.",
  },
];

// Rest of the code remains the same
export const checklistItems = [
  {
    title: "Empower Change Through Donations",
    description:
      "Your contributions make a difference in lives and bring positive change to communities.",
  },
  {
    title: "Transparent Donation Process",
    description:
      "Track how your donations are used to ensure they create meaningful impact.",
  },
  {
    title: "AI Assistance for Smart Giving",
    description:
      "Get personalized suggestions on causes you care about using AI-driven insights.",
  },
  {
    title: "Quick and Secure Transactions",
    description:
      "Easily donate in minutes with our secure and user-friendly platform.",
  },
];


export const pricingOptions = [
  
  {
    title: "Supporter",
    price: "$0",
    features: [
      "Access to general donation campaigns",
      "Receive monthly impact reports",
      "Email notifications for updates",
    ],
  },
  {
    title: "Advocate",
    price: "$10",
    features: [
      "Priority access to new campaigns",
      "Exclusive impact stories and updates",
      "Monthly personalized campaign suggestions",
      "Direct support from our team",
    ],
  },
  {
    title: "Champion",
    price: "$200",
    features: [
      "Unlimited access to all donation tools",
      "Customized impact reports for causes you support",
      "Exclusive webinars with our partner NGOs",
      "Dedicated account manager for assistance",
    ],
  },
];


export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
