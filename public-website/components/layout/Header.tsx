
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity, Menu, X, ArrowUpRight,
  GraduationCap, UserRound, ChevronDown,
  BookOpen, BrainCircuit, Code,
  Briefcase, Globe, FileText
} from "lucide-react";

import ThemeToggle from "../ui/ThemeToggle";
import { navigation, researchNavigation } from "../../lib/navigation";

const studyLinks = [
  { label: "Study Dashboard", href: "/study", icon: GraduationCap },
  { label: "Courses & Learning", href: "/study#courses", icon: BookOpen },
  { label: "AI & Machine Learning", href: "/study#ai", icon: BrainCircuit },
  { label: "Study Notes", href: "/study#notes", icon: FileText },
];

const profileLinks = [
  {
    label: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/mdhabiburrahmanpapel/",
    icon: Briefcase
  },
  {
    label: "GitHub Portal",
    href: "https://github.com/papelmdhabiburrahman",
    icon: Code
  },
  {
    label: "Personal Portfolio",
    href: "https://papelmdhabiburrahman.github.io/medical-ai-portfolio/",
    icon: Globe
  },
];

type NavItem = {
  label: string;
  href: string;
  icon: typeof Activity;
};

function PortalLink({ item, close }: {
  item: NavItem;
  close: () => void;
}) {
  const Icon = item.icon;
  const external = item.href.startsWith("https://");

  const content = (
    <>
      <Icon size={18} className="text-teal-600"/>
      <span>{item.label}</span>
      {external && <ArrowUpRight size={13} className="ml-auto"/>}
    </>
  );

  if (!item.href) {
    return (
      <span className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm opacity-50">
        {content}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={close}
      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-teal-500/10 hover:text-primary"
    >
      {content}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState("");

  const close = () => {
    setOpen(false);
    setDropdown("");
  };

  return (
    <header
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
      className="sticky top-0 z-50 border-b border-teal-500/20 bg-background/95 shadow-sm backdrop-blur-xl"
    >
      <div className="mx-auto flex min-h-20 max-w-[1600px] items-center justify-between gap-4 px-6">

        {/* Brand */}
        <Link href="/" onClick={close}
          className="flex shrink-0 items-center gap-3"
        >
          <div className="rounded-xl bg-[#009295] p-3 text-white shadow-lg shadow-teal-500/20">
            <Activity size={25}/>
          </div>

          <div>
            <span className="block text-xl font-bold tracking-tight">
              PAPEL AI
            </span>
            <span className="block text-[10px] tracking-widest text-muted">
              MEDICAL ASSISTANT
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 2xl:flex"
        >
          {navigation.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          {/* Portal dropdowns */}
          {[
            {
              id: "study",
              label: "Study Portal",
              icon: GraduationCap,
              items: studyLinks
            },
            {
              id: "profile",
              label: "My Profile",
              icon: UserRound,
              items: profileLinks
            }
          ].map(({ id, label, icon: Icon, items }) => (
            <div
              key={id}
              className="relative"
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setDropdown(current => current === id ? "" : current);
                }
              }}
            >
              <button
                type="button"
                aria-expanded={dropdown === id}
                aria-controls={`${id}-dropdown`}
                onClick={() =>
                  setDropdown(current => current === id ? "" : id)
                }
                className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-teal-600 hover:text-primary"
              >
                <Icon size={18}/>
                {label}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${dropdown === id ? "rotate-180" : ""}`}
                />
              </button>

              {dropdown === id && (
                <div
                  id={`${id}-dropdown`}
                  className="absolute right-0 top-full mt-5 w-64 rounded-2xl border border-teal-500/20 bg-background p-3 shadow-xl"
                >
                  {items.map(item => (
                    <PortalLink
                      key={item.label}
                      item={item}
                      close={close}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Header actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/workspace"
            onClick={close}
            className="hidden items-center gap-2 whitespace-nowrap rounded-xl bg-[#008589] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#007478] xl:flex"
          >
            Launch Workspace
            <ArrowUpRight size={17}/>
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
            className="rounded-xl border border-border p-2 2xl:hidden"
          >
            {open ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="max-h-[75vh] overflow-y-auto border-t border-border bg-background px-6 py-5 2xl:hidden"
        >
          {Array.from(
            new Map(
              [...navigation, ...researchNavigation]
                .map(item => [item.href, item])
            ).values()
          ).map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="block rounded-lg px-4 py-3 text-sm hover:bg-teal-500/10 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-2 px-3 text-xs font-bold tracking-widest text-teal-600">
              STUDY PORTAL
            </p>

            {studyLinks.map(item => (
              <PortalLink key={item.label} item={item} close={close}/>
            ))}
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-2 px-3 text-xs font-bold tracking-widest text-teal-600">
              MY PROFILE
            </p>

            {profileLinks.map(item => (
              <PortalLink key={item.label} item={item} close={close}/>
            ))}
          </div>

          <Link
            href="/workspace"
            onClick={close}
            className="mt-5 block rounded-xl bg-[#008589] p-3 text-center font-semibold text-white"
          >
            Launch Workspace
          </Link>
        </nav>
      )}
    </header>
  );
}
