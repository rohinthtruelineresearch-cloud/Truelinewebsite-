import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function ScrollPageControls() {
  const [showControls, setShowControls] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const maxScroll = scrollHeight - clientHeight;

      setShowControls(maxScroll > 400 && scrollTop > 120);
      setIsAtBottom(scrollTop >= maxScroll - 4);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!showControls) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[1100] flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0f172a] text-white shadow-[0_14px_30px_-18px_rgba(15,23,42,0.75)] transition hover:translate-y-[-2px] hover:bg-[#00A99D]"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
        disabled={isAtBottom}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white text-[#0f172a] shadow-[0_14px_30px_-18px_rgba(15,23,42,0.55)] transition hover:translate-y-[-2px] hover:bg-[#00A99D] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </div>
  );
}
