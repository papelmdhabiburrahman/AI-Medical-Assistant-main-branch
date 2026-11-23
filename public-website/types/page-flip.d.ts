
declare module "page-flip" {
  export interface PageFlipSettings {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    startPage?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
  }

  export class PageFlip {
    constructor(
      element: HTMLElement,
      settings: PageFlipSettings
    );

    loadFromHTML(
      items: NodeListOf<HTMLElement> | HTMLElement[]
    ): void;

    loadFromImages(images: string[]): void;

    updateFromHtml(
      items: NodeListOf<HTMLElement> | HTMLElement[]
    ): void;

    updateFromImages(images: string[]): void;

    flipNext(corner?: "top" | "bottom"): void;

    flipPrev(corner?: "top" | "bottom"): void;

    flip(
      page: number,
      corner?: "top" | "bottom"
    ): void;

    turnToPage(page: number): void;

    turnToNextPage(): void;

    turnToPrevPage(): void;

    getPageCount(): number;

    getCurrentPageIndex(): number;

    getOrientation(): string;
    getState(): "read" | "flipping" | "user_fold" | "fold_corner";

    on(
      event: string,
      callback: (event: {
        data: any;
        object: PageFlip;
      }) => void
    ): void;

    off(event: string): void;

    update(): void;

    destroy(): void;
  }
}
