"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { LuCalendar, LuSearch } from "react-icons/lu"

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
        <div className="ol-grid">
          {displayPosts.map((post) => {
            const { title, description, tags, publishedAt, slug, coverImage } = post
            const tagList = Array.isArray(tags)
              ? (tags as { value: string; label: string }[])
              : []
            const href = `/${basePath}/${slug}`

            return (
              <article key={slug} className="ol-card">
                <CustomLink href={href} className="ol-card-cover-link">
                  {coverImage ? (
                    <div className="ol-card-cover">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={coverImage} alt={`Okładka: ${title}`} loading="lazy" />
                      <div className="ol-card-date">
                        <LuCalendar aria-hidden />
                        <time dateTime={publishedAt}>
                          {getFormattedDate(publishedAt, lang)}
                        </time>
                      </div>
                    </div>
                  ) : (
                    <div className="ol-card-cover ol-card-cover-empty">
                      <LuSearch aria-hidden />
                    </div>
                  )}
                </CustomLink>

                <div className="ol-card-body">
                  {tagList.length > 0 && (
                    <div className="ol-card-tags">
                      {tagList.map((tag, i) => (
                        <span key={`${slug}-${tag.value}-${i}`} className="ol-card-tag">
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  )}

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

          color: var(--ink);
          font-family: var(--body);
          -webkit-font-smoothing: antialiased;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px 64px;
        }
        html.dark .ol-root,
        .dark .ol-root,
        .ol-root.dark {
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
        .ol-root,
        .ol-root .ol-h1,
        .ol-root .ol-card-title {
          color: var(--ink);
        }

        .ol-header {
          padding: 40px 0 28px;
          margin-bottom: 20px;
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
          margin-bottom: 24px;
        }
        .ol-search {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border: 1px solid var(--rule);
          border-radius: 999px;
          background: var(--paper);
          max-width: 520px;
          transition: border-color .15s, box-shadow .15s;
        }
        .ol-search:focus-within {
          border-color: var(--copper);
          box-shadow: 0 0 0 3px rgba(219, 39, 119, 0.12);
        }
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

        .ol-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
        }
        .ol-card {
          background: var(--paper);
          border: 1px solid var(--rule);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color .2s, transform .3s, box-shadow .3s;
        }
        .ol-card:hover {
          border-color: var(--copper);
          transform: translateY(-3px);
          box-shadow: 0 14px 36px -18px rgba(219, 39, 119, 0.25);
        }

        .ol-card-cover-link { display: block; }
        .ol-card-cover {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--paper2);
        }
        .ol-card-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .6s ease;
        }
        .ol-card:hover .ol-card-cover img {
          transform: scale(1.06);
        }
        .ol-card-cover-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink3);
        }
        .ol-card-cover-empty svg { width: 28px; height: 28px; }

        .ol-card-date {
          position: absolute;
          top: 14px;
          left: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(6px);
          font-family: var(--mono);
          font-size: .65rem;
          letter-spacing: .05em;
          color: var(--ink);
        }
        html.dark .ol-card-date,
        .dark .ol-card-date {
          background: rgba(15, 14, 13, 0.82);
          color: var(--ink);
        }
        .ol-card-date svg { color: var(--copper); width: 12px; height: 12px; }

        .ol-card-body {
          padding: 22px 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .ol-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .ol-card-tag {
          font-family: var(--mono);
          font-size: .6rem;
          letter-spacing: .06em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(219, 39, 119, 0.08);
          color: var(--copper);
          border: 1px solid rgba(219, 39, 119, 0.25);
        }
        html.dark .ol-card-tag,
        .dark .ol-card-tag {
          background: rgba(244, 114, 182, 0.12);
          border-color: rgba(244, 114, 182, 0.3);
        }

        .ol-card-title {
          font-family: var(--serif);
          font-size: 1.3rem;
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: -.01em;
          margin: 0;
        }
        .ol-card-title a {
          color: inherit;
          text-decoration: none;
          transition: color .2s;
        }
        .ol-card-title a:hover { color: var(--copper); }
        .ol-card-desc {
          font-family: var(--sans);
          font-size: .92rem;
          line-height: 1.55;
          color: var(--ink2);
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0;
        }
        .ol-card-cta {
          font-family: var(--mono);
          font-size: .68rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--copper);
          text-decoration: none;
          margin-top: auto;
          padding-top: 6px;
          transition: color .15s, gap .15s;
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
          padding: 48px 0 16px;
          margin-top: 36px;
          font-family: var(--mono);
          font-size: .74rem;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .ol-page-link {
          color: var(--ink2);
          text-decoration: none;
          padding: 8px 18px;
          border: 1px solid var(--rule);
          border-radius: 999px;
          transition: border-color .15s, color .15s, background .15s;
        }
        .ol-page-link:hover {
          border-color: var(--copper);
          color: var(--copper);
          background: rgba(219, 39, 119, 0.06);
        }
        .ol-page-disabled {
          color: var(--ink3);
          border-color: var(--rule);
          opacity: .45;
          cursor: not-allowed;
        }
        .ol-page-disabled:hover {
          border-color: var(--rule);
          color: var(--ink3);
          background: transparent;
        }
        .ol-page-indicator {
          color: var(--copper);
          font-weight: 500;
        }
        .ol-page-sep { color: var(--ink3); margin: 0 4px; }

        @media (max-width: 1024px) {
          .ol-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
        }
        @media (max-width: 640px) {
          .ol-root { padding: 0 20px 48px; }
          .ol-grid { grid-template-columns: 1fr; gap: 20px; }
          .ol-card-title { font-size: 1.2rem; }
        }
      `}</style>
    </div>
  )
}
