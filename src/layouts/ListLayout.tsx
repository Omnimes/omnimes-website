"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { LuSearch } from "react-icons/lu"

import getFormattedDate from "@/lib/getFormattedDate"
import { CustomLink } from "@/components/Link"
import { ExtendedOstDocument } from "@/app/[locale]/(marketing)/blog/page"

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: ExtendedOstDocument[]
  title: string
  initialDisplayPosts?: ExtendedOstDocument[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const t = useTranslations("Pagination")
  const pathname = usePathname()
  const basePath = pathname?.split("/")[2]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <nav className="ol-pagination">
      {prevPage ? (
        <CustomLink
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
          className="ol-page-link"
        >
          ← {t("prev")}
        </CustomLink>
      ) : (
        <span className="ol-page-link ol-page-disabled">← {t("prev")}</span>
      )}

      <span className="ol-page-indicator">
        {currentPage} <span className="ol-page-sep">{t("of")}</span> {totalPages}
      </span>

      {nextPage ? (
        <CustomLink
          href={`/${basePath}/page/${currentPage + 1}`}
          rel="next"
          className="ol-page-link"
        >
          {t("next")} →
        </CustomLink>
      ) : (
        <span className="ol-page-link ol-page-disabled">{t("next")} →</span>
      )}
    </nav>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState("")
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.subtitle + post.keywords
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  const t = useTranslations("ListLayout")
  const lang = useLocale()
  const pathname = usePathname()
  const basePath = pathname?.split("/")[2]
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <div className="ol-root">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap"
      />

      <div className="ol-top-rule" />

      <header className="ol-header">
        <div className="ol-eyebrow">
          <span>Index</span>
        </div>
        <h1 className="ol-h1">{title}</h1>
        <div className="ol-search">
          <LuSearch aria-hidden />
          <input
            aria-label={t("search")}
            type="text"
            placeholder={t("search")}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </header>

      {!filteredBlogPosts.length ? (
        <div className="ol-empty">
          <LuSearch aria-hidden />
          <p>{t("NotFound")}</p>
        </div>
      ) : (
        <div className="ol-list">
          {displayPosts.map((post) => {
            const { title, description, tags, publishedAt, slug, coverImage } = post
            const tagList = Array.isArray(tags)
              ? (tags as { value: string; label: string }[])
              : []
            const primaryTag = tagList.length > 0 ? tagList[0]?.label : null
            const href = `/${basePath}/${slug}`

            return (
              <article key={slug} className="ol-card">
                <CustomLink href={href} className="ol-card-link">
                  {coverImage ? (
                    <div className="ol-card-cover">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={coverImage} alt={`Okładka: ${title}`} loading="lazy" />
                    </div>
                  ) : (
                    <div className="ol-card-cover ol-card-cover-empty">
                      <LuSearch aria-hidden />
                    </div>
                  )}
                </CustomLink>

                <div className="ol-card-body">
                  <div className="ol-card-meta">
                    <time dateTime={publishedAt}>{getFormattedDate(publishedAt, lang)}</time>
                    {primaryTag && (
                      <>
                        <span className="ol-meta-sep">·</span>
                        <span className="ol-meta-tag">{primaryTag}</span>
                      </>
                    )}
                  </div>

                  <h2 className="ol-card-title">
                    <CustomLink href={href}>{title}</CustomLink>
                  </h2>

                  {description && <p className="ol-card-desc">{description}</p>}

                  <CustomLink href={href} className="ol-card-cta">
                    {t("search") === "Search" ? "Read more" : "Czytaj więcej"} →
                  </CustomLink>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}

      <style>{`
        .ol-root {
          --ink:    #1a1714;
          --ink2:   #3d3a35;
          --ink3:   #7a756e;
          --paper:  #ffffff;
          --paper2: #fafafa;
          --paper3: #f2f2f2;
          --steel:  #1c3a5c;
          --copper: #db2777;
          --copper2:#ec4899;
          --teal:   #0e6b5e;
          --rule:   #e5e5e5;
          --serif:  'Playfair Display', 'Georgia', serif;
          --body:   'Libre Baskerville', 'Georgia', serif;
          --mono:   'IBM Plex Mono', ui-monospace, monospace;
          --sans:   'IBM Plex Sans', system-ui, sans-serif;

          background: var(--paper);
          color: var(--ink);
          font-family: var(--body);
          -webkit-font-smoothing: antialiased;
          max-width: 960px;
          margin: 0 auto;
          padding: 0 48px 64px;
        }
        .dark .ol-root, .ol-root.dark {
          --ink:    #f5f2ec;
          --ink2:   #d4cfc4;
          --ink3:   #8b857b;
          --paper:  #0f0e0d;
          --paper2: #1a1816;
          --paper3: #242120;
          --steel:  #8fb3dc;
          --copper: #f472b6;
          --copper2:#ec4899;
          --teal:   #5eead4;
          --rule:   #2e2a27;
        }

        .ol-top-rule {
          height: 3px;
          margin: 0 -48px 0;
          background: linear-gradient(90deg, var(--steel) 0%, var(--copper) 50%, var(--teal) 100%);
        }

        .ol-header {
          padding: 40px 0 28px;
          border-bottom: 1px solid var(--rule);
          margin-bottom: 12px;
        }
        .ol-eyebrow {
          font-family: var(--mono);
          font-size: .7rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--copper);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ol-eyebrow::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--rule);
        }
        .ol-h1 {
          font-family: var(--serif);
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -.02em;
          color: var(--ink);
          margin-bottom: 24px;
        }
        .ol-search {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border: 1px solid var(--rule);
          border-radius: 2px;
          background: var(--paper);
          max-width: 480px;
          transition: border-color .15s;
        }
        .ol-search:focus-within { border-color: var(--copper); }
        .ol-search svg { color: var(--ink3); flex-shrink: 0; }
        .ol-search input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--sans);
          font-size: .95rem;
          color: var(--ink);
        }
        .ol-search input::placeholder { color: var(--ink3); }

        .ol-list {
          display: flex;
          flex-direction: column;
        }
        .ol-card {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 32px;
          padding: 32px 0;
          border-bottom: 1px solid var(--rule);
          align-items: start;
        }
        .ol-card:first-child { padding-top: 32px; }
        .ol-card-link { display: block; }
        .ol-card-cover {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border: 1px solid var(--rule);
          border-radius: 2px;
          background: var(--paper2);
        }
        .ol-card-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .5s ease;
        }
        .ol-card-link:hover .ol-card-cover img {
          transform: scale(1.04);
        }
        .ol-card-cover-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink3);
        }
        .ol-card-cover-empty svg { width: 28px; height: 28px; }

        .ol-card-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ol-card-meta {
          font-family: var(--mono);
          font-size: .68rem;
          letter-spacing: .08em;
          color: var(--ink3);
          text-transform: uppercase;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }
        .ol-meta-sep { opacity: .5; }
        .ol-meta-tag { color: var(--copper); }

        .ol-card-title {
          font-family: var(--serif);
          font-size: 1.6rem;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -.015em;
          color: var(--ink);
          margin: 0;
        }
        .ol-card-title a {
          color: inherit;
          text-decoration: none;
          background-image: linear-gradient(var(--copper), var(--copper));
          background-size: 0 1px;
          background-repeat: no-repeat;
          background-position: 0 100%;
          transition: background-size .3s ease;
        }
        .ol-card-title a:hover {
          background-size: 100% 1px;
          color: var(--copper);
        }
        .ol-card-desc {
          font-family: var(--sans);
          font-size: .96rem;
          line-height: 1.6;
          color: var(--ink2);
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ol-card-cta {
          font-family: var(--mono);
          font-size: .7rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--copper);
          text-decoration: none;
          margin-top: 4px;
          transition: color .15s;
        }
        .ol-card-cta:hover { color: var(--copper2); }

        .ol-empty {
          padding: 80px 0;
          text-align: center;
          color: var(--ink3);
        }
        .ol-empty svg {
          width: 32px;
          height: 32px;
          margin: 0 auto 16px;
          display: block;
        }
        .ol-empty p {
          font-family: var(--sans);
          font-size: 1rem;
        }

        .ol-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          padding: 40px 0 16px;
          border-top: 1px solid var(--rule);
          margin-top: 24px;
          font-family: var(--mono);
          font-size: .74rem;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .ol-page-link {
          color: var(--ink2);
          text-decoration: none;
          padding: 6px 14px;
          border: 1px solid var(--rule);
          border-radius: 2px;
          transition: border-color .15s, color .15s;
        }
        .ol-page-link:hover { border-color: var(--copper); color: var(--copper); }
        .ol-page-disabled {
          color: var(--paper3);
          border-color: var(--paper3);
          cursor: not-allowed;
        }
        .dark .ol-page-disabled, .ol-root.dark .ol-page-disabled {
          color: var(--paper3);
          border-color: var(--rule);
          opacity: .4;
        }
        .ol-page-indicator {
          color: var(--copper);
          font-weight: 500;
        }
        .ol-page-sep { color: var(--ink3); margin: 0 4px; }

        @media (max-width: 900px) {
          .ol-root { padding: 0 24px 48px; }
          .ol-top-rule { margin: 0 -24px; }
          .ol-card {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .ol-card-cover { max-width: 100%; aspect-ratio: 16 / 9; }
          .ol-card-title { font-size: 1.35rem; }
        }
      `}</style>
    </div>
  )
}
