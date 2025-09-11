"use client"

import { useLocale, useTranslations } from "next-intl"
import {
  FaArrowRight,
  FaBolt,
  FaChartLine,
  FaCloud,
  FaCogs,
  FaDatabase,
  FaExternalLinkAlt,
  FaIndustry,
  FaLeaf,
  FaRocket,
  FaServer,
  FaShieldAlt,
  FaTachometerAlt,
} from "react-icons/fa"

import { Heading } from "./ui/Heading"

export const OmniProductsShowcase = () => {
  const t = useTranslations("OmniProducts")
  const locale = useLocale()

  // Konfiguracja linków - łatwe do edycji
  const productLinks = {
    omnimes: "https://www.omnimes.com/#whatIsOmnimes",
    omnienergy: "https://www.omnienergy.pl",
    omnicloud: "https://www.cloud.omnimes.com",
    onpremise: {
      pl: "https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/omnimes-jako-saas-vs-on-premise-na-czym-polega-roznica-GtutTGFR2a",
      default:
        "https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/introduction-98dAKUj3hP",
    },
  }

  // Funkcja do pobierania linku on-premise w zależności od języka
  const getOnPremiseLink = () => {
    if (locale === "pl") {
      return productLinks.onpremise.pl
    }
    return productLinks.onpremise.default
  }

  const mainProducts = [
    {
      id: "omnimes",
      title: "OmniMES",
      subtitle: t("omnimes.subtitle"),
      statistic: t("omnimes.statistic"),
      description: t("omnimes.description"),
      gradient: "from-blue-500 to-cyan-400",
      icon: <FaIndustry className="text-3xl text-white" />,
      link: productLinks.omnimes,
      buttonText: "Zwiększ efektywność produkcji o 30%",
      features: [
        {
          icon: <FaTachometerAlt className="text-lg text-blue-500" />,
          text: t("omnimes.features.monitoring"),
        },
        {
          icon: <FaChartLine className="text-lg text-blue-500" />,
          text: t("omnimes.features.efficiency"),
        },
        {
          icon: <FaCogs className="text-lg text-blue-500" />,
          text: t("omnimes.features.production"),
        },
        {
          icon: <FaDatabase className="text-lg text-blue-500" />,
          text: t("omnimes.features.reporting"),
        },
      ],
    },
    {
      id: "omnienergy",
      title: "OmniEnergy",
      subtitle: t("omnienergy.subtitle"),
      statistic: t("omnienergy.statistic"),
      description: t("omnienergy.description"),
      gradient: "from-green-500 to-emerald-400",
      icon: <FaLeaf className="text-3xl text-white" />,
      link: productLinks.omnienergy,
      buttonText: "Zmniejsz zużycie energii i innych mediów o 20%",
      features: [
        {
          icon: <FaShieldAlt className="text-lg text-green-500" />,
          text: t("omnienergy.features.iso"),
        },
        {
          icon: <FaBolt className="text-lg text-green-500" />,
          text: t("omnienergy.features.optimization"),
        },
        {
          icon: <FaChartLine className="text-lg text-green-500" />,
          text: t("omnienergy.features.analysis"),
        },
        {
          icon: <FaTachometerAlt className="text-lg text-green-500" />,
          text: t("omnienergy.features.reporting"),
        },
      ],
    },
  ]

  const deploymentOptions = [
    {
      id: "cloud",
      title: "OmniCloud",
      icon: <FaCloud className="text-3xl text-white" />,
      gradient: "from-purple-500 to-pink-400",
      link: productLinks.omnicloud,
      features: [
        t("deployment.cloud.management"),
        t("deployment.cloud.saas"),
        t("deployment.cloud.installation"),
        t("deployment.cloud.system"),
      ],
    },
    {
      id: "premise",
      title: "On-premise",
      icon: <FaServer className="text-3xl text-white" />,
      gradient: "from-orange-500 to-amber-400",
      link: getOnPremiseLink(),
      readMoreText: "Czytaj więcej by poznać różnicę",
      features: [
        t("deployment.premise.infrastructure"),
        t("deployment.premise.storage"),
        t("deployment.premise.control"),
        t("deployment.premise.integration"),
      ],
    },
  ]

  return (
    <section className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Main Title */}
      <div className="mb-16 text-center">
        <Heading text={t("title")} />
        <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
          {t("subtitle")}
        </p>
      </div>

      {/* Main Products Grid */}
      <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {mainProducts.map((product, index) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
            style={{
              animationDelay: `${index * 200}ms`,
            }}
          >
            {/* Header with Gradient */}
            <div className={`bg-gradient-to-r ${product.gradient} relative overflow-hidden p-6`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">{product.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{product.title}</h3>
                    <p className="text-sm text-white/90">{product.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Button with Statistics */}
              <div className="mb-6 text-center">
                <div
                  className={`inline-flex items-center rounded-full bg-gradient-to-r px-6 py-3 ${product.gradient} text-sm font-semibold text-white shadow-lg`}
                >
                  <FaRocket className="mr-2" />
                  {product.buttonText}
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-6 space-y-3">
                {product.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-3 rounded-xl bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700"
                  >
                    <div className="shrink-0">{feature.icon}</div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Zobacz więcej Button */}
              <div className="flex justify-center">
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center bg-gradient-to-r px-6 py-3 ${product.gradient} group rounded-xl font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
                >
                  Zobacz więcej
                  <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:translate-x-[-200%] group-hover:opacity-100"></div>
          </div>
        ))}
      </div>

      {/* Deployment Section */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-white dark:via-blue-200 dark:to-purple-200">
          {t("deployment.title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">{t("deployment.subtitle")}</p>
      </div>

      {/* Deployment Options - Horizontal Layout */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {deploymentOptions.map((option, index) => (
          <div
            key={option.id}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            {/* Horizontal Header - ikona obok tekstu */}
            <div className={`bg-gradient-to-r ${option.gradient} relative overflow-hidden p-6`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <div className="shrink-0">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                    {option.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">{option.title}</h3>
                  {option.readMoreText && (
                    <p className="mt-1 text-sm text-white/80">{option.readMoreText}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="p-6">
              <ul className="mb-6 space-y-3">
                {option.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start space-x-3 text-gray-700 dark:text-gray-200"
                  >
                    <div className="mt-2 size-2 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <div className="flex justify-center">
                <a
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center bg-gradient-to-r px-6 py-3 ${option.gradient} group rounded-xl font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
                >
                  {option.id === "cloud" ? "Przejdź do OmniCloud" : "Dowiedz się więcej"}
                  <FaExternalLinkAlt className="ml-2 transition-transform duration-300 group-hover:scale-110" />
                </a>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300 group-hover:scale-x-100"></div>
          </div>
        ))}
      </div>
    </section>
  )
}
