import { useEffect, useState } from "react";
import { useTranslations } from "../../i18n/utils";
import { DefaultLang } from "../../i18n/translations";

function getLangFromPath(): "en" | "fi" {
  const path = window.location.pathname;
  const langMatch = path.match(/^\/(en|fi)/);
  return (langMatch?.[1] as "en" | "fi") || DefaultLang;
}

interface ScrollIndicatorProps {
  isSceneLoaded: boolean;
}

export function ScrollIndicator({ isSceneLoaded }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lang] = useState(getLangFromPath());
  const t = useTranslations(lang);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
      console.log("scroll");
    };

    window.addEventListener("wheel", handleScroll, { once: true });
    window.addEventListener("touchstart", handleScroll, { once: true });
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleScroll);
    };
  }, []);

  if (!isSceneLoaded) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        right: "40px",
        color: "white",
        textAlign: "center",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-out",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <div style={{ fontSize: "14px", marginBottom: "8px" }}>{t("scrollIndicator")}</div>
      <div
        style={{
          width: "20px",
          height: "30px",
          border: "2px solid white",
          borderRadius: "10px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "4px",
            height: "8px",
            backgroundColor: "white",
            borderRadius: "2px",
            position: "absolute",
            left: "50%",
            top: "6px",
            transform: "translateX(-50%)",
            animation: "scrollAnimation 1.5s ease-in-out infinite",
          }}
        />
      </div>
      <style>
        {`
          @media (hover: hover) {
            @keyframes scrollAnimation {
              0% { transform: translate(-50%, 0); opacity: 1; }
              75% { transform: translate(-50%, 8px); opacity: 0; }
              100% { transform: translate(-50%, 0); opacity: 0; }
            }
          }

          @media (hover: none) and (pointer: coarse) {
            @keyframes scrollAnimation {
              0% { transform: translate(-50%, 8px); opacity: 1; }
              75% { transform: translate(-50%, 0); opacity: 0; }
              100% { transform: translate(-50%, 8px); opacity: 0; }
            }
          }
        `}
      </style>
    </div>
  );
}
