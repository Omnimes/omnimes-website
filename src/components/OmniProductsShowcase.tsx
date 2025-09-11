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
  FaTachometerAlt
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
      default: "https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/introduction-98dAKUj3hP"
    }
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
      icon: <FaIndustry className="text-white text-3xl" />,
      link: productLinks.omnimes,
      buttonText: "Zwiększ efektywność produkcji o 30%",
      features: [
        {
          icon: <FaTachometerAlt className="text-blue-500 text-lg" />,
          text: t("omnimes.features.monitoring")
        },
        {
          icon: <FaChartLine className="text-blue-500 text-lg" />,
          text: t("omnimes.features.efficiency")
        },
        {
          icon: <FaCogs className="text-blue-500 text-lg" />,
          text: t("omnimes.features.production")
        },
        {
          icon: <FaDatabase className="text-blue-500 text-lg" />,
          text: t("omnimes.features.reporting")
        }
      ]
    },
    {
      id: "omnienergy",
      title: "OmniEnergy",
      subtitle: t("omnienergy.subtitle"),
      statistic: t("omnienergy.statistic"),
      description: t("omnienergy.description"),
      gradient: "from-green-500 to-emerald-400",
      icon: <FaLeaf className="text-white text-3xl" />,
      link: productLinks.omnienergy,
      buttonText: "Zmniejsz zużycie energii i innych mediów o 20%",
      features: [
        {
          icon: <FaShieldAlt className="text-green-500 text-lg" />,
          text: t("omnienergy.features.iso")
        },
        {
          icon: <FaBolt className="text-green-500 text-lg" />,
          text: t("omnienergy.features.optimization")
        },
        {
          icon: <FaChartLine className="text-green-500 text-lg" />,
          text: t("omnienergy.features.analysis")
        },
        {
          icon: <FaTachometerAlt className="text-green-500 text-lg" />,
          text: t("omnienergy.features.reporting")
        }
      ]
    }
  ]

  const deploymentOptions = [
    {
      id: "cloud",
      title: "OmniCloud",
      icon: <FaCloud className="text-white text-3xl" />,
      gradient: "from-purple-500 to-pink-400",
      link: productLinks.omnicloud,
      features: [
        t("deployment.cloud.management"),
        t("deployment.cloud.saas"),
        t("deployment.cloud.installation"),
        t("deployment.cloud.system")
      ]
    },
    {
      id: "premise",
      title: "On-premise",
      icon: <FaServer className="text-white text-3xl" />,
      gradient: "from-orange-500 to-amber-400",
      link: getOnPremiseLink(),
      readMoreText: "Czytaj więcej by poznać różnicę",
      features: [
        t("deployment.premise.infrastructure"),
        t("deployment.premise.storage"),
        t("deployment.premise.control"),
        t("deployment.premise.integration")
      ]
    }
  ]

  return (
    <section className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Main Title */}
      <div className="text-center mb-16">
        <Heading text={t("title")} />
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Main Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {mainProducts.map((product, index) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
            style={{
              animationDelay: `${index * 200}ms`
            }}
          >
            {/* Header with Gradient */}
            <div className={`bg-gradient-to-r ${product.gradient} p-6 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                    {product.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{product.title}</h3>
                    <p className="text-white/90 text-sm">{product.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Button with Statistics */}
              <div className="mb-6 text-center">
                <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r ${product.gradient} text-white font-semibold text-sm shadow-lg`}>
                  <FaRocket className="mr-2" />
                  {product.buttonText}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {product.features.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">
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
                  className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${product.gradient} text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 group`}
                >
                  Zobacz więcej
                  <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%]"></div>
          </div>
        ))}
      </div>

      {/* Deployment Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4">
          {t("deployment.title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t("deployment.subtitle")}
        </p>
      </div>

      {/* Deployment Options - Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {deploymentOptions.map((option, index) => (
          <div
            key={option.id}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
          >
            {/* Horizontal Header - ikona obok tekstu */}
            <div className={`bg-gradient-to-r ${option.gradient} p-6 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl">
                    {option.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">{option.title}</h3>
                  {option.readMoreText && (
                    <p className="text-white/80 text-sm mt-1">
                      {option.readMoreText}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                {option.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex}
                    className="flex items-start space-x-3 text-gray-700 dark:text-gray-200"
                  >
                    <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
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
                  className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${option.gradient} text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 group`}
                >
                  {option.id === 'cloud' ? 'Przejdź do OmniCloud' : 'Dowiedz się więcej'}
                  <FaExternalLinkAlt className="ml-2 transform group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  )
}