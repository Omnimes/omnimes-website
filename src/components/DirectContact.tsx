"use client";

import { Avatar, Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LuPhone, LuUser } from "react-icons/lu";

export const DirectContact = () => {
  const t = useTranslations("Form");
  const [showPhone, setShowPhone] = useState(false);

  return (
    <div className="mx-auto mt-2 max-w-4xl px-6 text-center mb-10">
      <p className="text-default-500 my-12 text-xl font-medium">
        {t("OrContactDirectly")}
      </p>

      <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-center sm:justify-center">
        {/* Avatar */}
        <Avatar
          size="lg"
          icon={<LuUser className="text-6xl text-white" />}
          classNames={{
            base: "bg-primary-600 text-white w-32 h-32",
          }}
        />

        {/* Dane kontaktowe */}
        <div className="text-left sm:text-left">
          <p className="text-primary-600 dark:text-primary-400 text-2xl font-bold">
            Szymon Rewilak
          </p>
          <p className="text-default-500 mb-4 mt-1 text-lg">
            Project Manager — Specjalista ds. Przemysłu 4.0.
          </p>

          {showPhone ? (
            <div className="text-default-700 dark:text-default-500 inline-flex items-center gap-3 text-xl font-medium">
              <LuPhone className="text-2xl" />
              <a href="tel:+48730002118" className="hover:underline">
                +48 730 002 118
              </a>
            </div>
          ) : (
            <Button
              type="button" // ważne: zapobiega submitowi formularza
              variant="bordered"
              size="sm"
              startContent={<LuPhone />}
              className="transition-all duration-200 hover:bg-primary-50"
              onClick={(e) => {
                e.preventDefault();
                console.log("Button clicked → pokazuję numer telefonu");
                setShowPhone(true);
              }}
            >
              {t("showPhone") || "Pokaż numer"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
