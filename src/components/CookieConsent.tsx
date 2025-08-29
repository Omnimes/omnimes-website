// app/components/CookieConsent.tsx
"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type ConsentState = {
  functional: boolean;        
  security: boolean;          
  analytics: boolean;
  ad: boolean;
  personalization: boolean;   
};

const LS_KEY = "cookie-consent";

export default function CookieConsent() {
  const t = useTranslations("cookie");

  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [state, setState] = useState<ConsentState>({
    functional: true,
    security: true,
    analytics: false,
    ad: false,
    personalization: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (!saved) {
        setOpen(true);
        return;
      }
    } catch {}
  }, []);

  const applyConsent = (s: ConsentState) => {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({
        analytics: s.analytics,
        ad: s.ad,
        personalization: s.personalization,
        functional: s.functional
      })
    );

    if (typeof window !== "undefined") {
      (window as any).gtag?.("consent", "update", {
        ad_storage: s.ad ? "granted" : "denied",
        analytics_storage: s.analytics ? "granted" : "denied",
        personalization_storage: s.personalization ? "granted" : "denied",
        functionality_storage: s.functional ? "granted" : "denied",
      });
    }
  };

  const acceptAll = () => {
    const s: ConsentState = {
      functional: true,
      security: true,
      analytics: true,
      ad: true,
      personalization: true,
    };
    setState(s);
    applyConsent(s);
    setOpen(false);
  };

  const rejectAll = () => {
    const s: ConsentState = {
      functional: true,
      security: true,
      analytics: false,
      ad: false,
      personalization: false,
    };
    setState(s);
    applyConsent(s);
    setOpen(false);
  };

  const saveChoices = () => {
    applyConsent(state);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-3xl rounded-t-2xl bg-white p-4 shadow-lg ring-1 ring-black/10 md:rounded-2xl md:bottom-6 md:p-6">
      <div className="mb-3 text-sm text-gray-700">
        {t("message")}
      </div>

      {showDetails && (
        <div className="mb-4 grid grid-cols-1 gap-3 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked disabled />
            <span>{t("details.functional")}</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked disabled />
            <span>{t("details.security")}</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.analytics}
              onChange={(e) => setState((p) => ({ ...p, analytics: e.target.checked }))}
            />
            <span>{t("details.analytics")}</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.ad}
              onChange={(e) => setState((p) => ({ ...p, ad: e.target.checked }))}
            />
            <span>{t("details.ads")}</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.personalization}
              onChange={(e) => setState((p) => ({ ...p, personalization: e.target.checked }))}
            />
            <span>{t("details.personalization")}</span>
          </label>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <button
            className="rounded-md bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200"
            onClick={() => setShowDetails((v) => !v)}
          >
            {showDetails ? t("buttons.hideSettings") : t("buttons.settings")}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-md bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200"
            onClick={rejectAll}
          >
            {t("buttons.reject")}
          </button>
          <button
            className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
            onClick={saveChoices}
          >
            {t("buttons.save")}
          </button>
          <button
            className="rounded-md bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-700"
            onClick={acceptAll}
          >
            {t("buttons.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
