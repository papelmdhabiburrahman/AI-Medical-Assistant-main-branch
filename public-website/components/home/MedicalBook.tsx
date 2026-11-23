
"use client";

import { useEffect, useRef } from "react";
import { PageFlip } from "page-flip";
import styles from "./MedicalBook.module.css";

const images = ["xray", "mri", "brain", "heart", "lungs", "ct"];

export default function MedicalBook() {
  const book = useRef<HTMLDivElement>(null);
  const flip = useRef<PageFlip | null>(null);

  useEffect(() => {
    if (!book.current) return;

    const element = document.createElement("div");
    book.current.appendChild(element);

    const pages = [
      `<div class="${styles.cover}">
        <small>MEDICAL ATLAS</small>
        <h1>PAPEL AI</h1>
        <p>Medical Intelligence</p>
        <span>2030 EDITION</span>
      </div>`,

      ...images.flatMap((name, i) => [
        `<div class="${styles.page}">
          <small>PAPEL AI | IMAGING LAB</small>
          <h2>${name.toUpperCase()}</h2>
          <p>Medical Intelligence</p>
          <span>CHAPTER 0${i + 1}</span>
        </div>`,

        `<div class="${styles.imagePage}">
          <img src="/images/medical/${name}.jpg" alt="${name}" />
        </div>`
      ]),

      `<div class="${styles.cover}">
        <h1>PAPEL AI</h1>
        <p>Medical Research Atlas</p>
      </div>`
    ];

    element.innerHTML = pages.map((page, i) =>
      `<div data-density="${
        i === 0 || i === pages.length - 1 ? "hard" : "soft"
      }">${page}</div>`
    ).join("");

    const instance = new PageFlip(element, {
      width: 300,
      height: 400,
      size: "stretch",
      minWidth: 140,
      maxWidth: 350,
      minHeight: 200,
      maxHeight: 470,
      startPage: 0,
      showCover: true,
      flippingTime: 4000,
      drawShadow: true,
      maxShadowOpacity: 0.6,
      useMouseEvents: true,
      mobileScrollSupport: true
    });

    instance.loadFromHTML(
      element.querySelectorAll<HTMLElement>(":scope > div")
    );

    flip.current = instance;

    const opening = setTimeout(() => {
      instance.flipNext();
    }, 1500);

    const autoplay = setInterval(() => {
      if (instance.getState() !== "read") return;

      if (instance.getCurrentPageIndex() >= pages.length - 1) {
        instance.turnToPage(0);
      } else {
        instance.flipNext();
      }
    }, 12000);

    return () => {
      clearTimeout(opening);
      clearInterval(autoplay);
      instance.destroy();
      flip.current = null;
    };
  }, []);

  return (
    <div className={styles.container}>
      <div ref={book} className={styles.book} />

      <div className={styles.controls}>
        <button onClick={() => flip.current?.flipPrev()}>
          ← Previous
        </button>  
<br />
        <button onClick={() => flip.current?.flipNext()}>
          Next →
        </button>
      </div>
    </div>
  );
}
