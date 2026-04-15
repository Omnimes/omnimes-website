"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

import getFormattedDate from "@/lib/getFormattedDate"
import { CustomLink } from "@/components/Link"
import MDXComponent from "@/components/mdx/MdxComponent"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"
import { ExtendedOstDocument } from "@/app/[locale]/(marketing)/blog/page"

interface LayoutProps {
  post: ExtendedOstDocument
  backPath?: string
  showBackLinks?: boolean
}

export default function PostLayout({
  post,
  backPath = "/blog",
  showBackLinks = true,
}: LayoutProps) {
  const t = useTranslations("PostLayout")
  const { title, publishedAt, content, tags, author, coverImage, description } = post
  const lang = useLocale()

  const getShareUrl = () => {
    const url = new URL(window.location.href)
    url.searchParams.set("xcache", "2")
    return encodeURIComponent(url.toString())
  }

  const handleTwitterShare = () => {
    const url = getShareUrl()
    const text = encodeURIComponent(`${title} - sprawdź ten artykuł!`)
    window.open(
      `https://x.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${getShareUrl()}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${getShareUrl()}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  const eyebrowDate = (() => {
    try {
      return new Date(publishedAt).toLocaleDateString(lang, {
        month: "long",
        year: "numeric",
      })
    } catch {
      return getFormattedDate(publishedAt, lang)
    }
  })()

  const primaryTag = Array.isArray(tags) && tags.length > 0 ? tags[0]?.label : null

  return (
    <div className="oe-root">
      <ScrollTopAndComment />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap"
      />

      <div className="oe-top-rule" />

      <nav className="oe-nav">
        <span className="oe-brand">Technologia · Przemysł · AI</span>
        {primaryTag && <span className="oe-nav-tag">{primaryTag}</span>}
      </nav>

      <section className="oe-hero">
        {showBackLinks && (
          <div className="oe-back-row">
            <CustomLink href={backPath} className="oe-back">
              ← {t("back")}
            </CustomLink>
          </div>
        )}
        <div className="oe-eyebrow">
          <span>{eyebrowDate}</span>
        </div>
        <h1 className="oe-h1">{title}</h1>
        {description && <p className="oe-deck">{description}</p>}
        <div className="oe-meta">
          <span>📅 {getFormattedDate(publishedAt, lang)}</span>
          {primaryTag && <span>🏭 {primaryTag}</span>}
          {author?.name && <span>✒ {author.name}</span>}
        </div>
      </section>

      {coverImage && (
        <div className="oe-cover-wrap">
          <div className="oe-cover">
            <Image
              src={coverImage}
              alt={title}
              fill
              priority
              sizes="(max-width: 820px) 100vw, 820px"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      )}

      <div className="oe-article-wrap">
        <article className="oe-article-body">
          <MDXComponent content={content} />
        </article>

        <aside className="oe-sidebar">
          {author && (
            <div className="oe-sb-block">
              <div className="oe-sb-label">{t("author")}</div>
              <div className="oe-sb-author">
                {author.picture && (
                  <Image
                    src={author.picture}
                    width={44}
                    height={44}
                    alt={author.name || ""}
                    className="oe-sb-avatar"
                  />
                )}
                <div>
                  <div className="oe-sb-author-name">{author.name}</div>
                  <div className="oe-sb-author-meta">
                    {t("publishedOn")} {getFormattedDate(publishedAt, lang)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {Array.isArray(tags) && tags.length > 0 && (
            <div className="oe-sb-block">
              <div className="oe-sb-label">{t("tags")}</div>
              <ul className="oe-sb-tags">
                {tags.map((tag) => (
                  <li key={tag.value}>{tag.label}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="oe-sb-block">
            <div className="oe-sb-label">{t("shareMessage")}</div>
            <div className="oe-share">
              <button
                type="button"
                onClick={handleTwitterShare}
                className="oe-share-btn oe-share-x"
                aria-label={t("shareOnTwitter")}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleLinkedInShare}
                className="oe-share-btn oe-share-li"
                aria-label={t("shareOnLinkedIn")}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleFacebookShare}
                className="oe-share-btn oe-share-fb"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>
          </div>
        </aside>
      </div>

      <footer className="oe-footer">
        {Array.isArray(tags) && tags.length > 0 && (
          <div className="oe-footer-tags">
            {tags.map((tag) => (
              <span key={tag.value} className="oe-ftag">
                {tag.label}
              </span>
            ))}
          </div>
        )}
        {showBackLinks && (
          <CustomLink href={backPath} className="oe-back oe-back-bottom">
            ← {t("backToBlog")}
          </CustomLink>
        )}
      </footer>

      <style>{`
        .oe-root {
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
          font-weight: 400;
          line-height: 1.75;
          -webkit-font-smoothing: antialiased;
        }
        html.dark .oe-root,
        .dark .oe-root,
        .oe-root.dark {
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
        .oe-root,
        .oe-root .oe-h1,
        .oe-root .oe-article-body h1,
        .oe-root .oe-article-body h2,
        .oe-root .oe-article-body h4 {
          color: var(--ink);
        }
        .oe-top-rule {
          height: 4px;
          background: linear-gradient(90deg, var(--steel) 0%, var(--copper) 50%, var(--teal) 100%);
        }
        .oe-nav {
          border-bottom: 1px solid var(--rule);
          padding: 14px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--paper);
        }
        .oe-brand {
          font-family: var(--mono);
          font-size: .72rem;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--ink3);
        }
        .oe-nav-tag {
          font-family: var(--mono);
          font-size: .68rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--copper);
          border: 1px solid var(--copper);
          padding: 3px 10px;
          border-radius: 2px;
        }

        .oe-hero {
          max-width: 960px;
          margin: 0 auto;
          padding: 48px 48px 40px;
          border-bottom: 1px solid var(--rule);
        }
        .oe-back-row { margin-bottom: 24px; }
        .oe-back {
          font-family: var(--mono);
          font-size: .7rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--ink3);
          text-decoration: none;
          transition: color .15s;
        }
        .oe-back:hover { color: var(--copper); }
        .oe-eyebrow {
          font-family: var(--mono);
          font-size: .7rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--copper);
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .oe-eyebrow::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--rule);
        }
        .oe-h1 {
          font-family: var(--serif);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -.02em;
          color: var(--ink);
          margin-bottom: 10px;
        }
        .oe-deck {
          font-family: var(--sans);
          font-size: 1.05rem;
          font-weight: 300;
          color: var(--ink2);
          line-height: 1.65;
          max-width: 620px;
          margin: 24px 0 32px;
          padding-left: 18px;
          border-left: 3px solid var(--copper2);
          white-space: pre-line;
        }
        .oe-meta {
          display: flex;
          gap: 24px;
          font-family: var(--mono);
          font-size: .68rem;
          color: var(--ink3);
          letter-spacing: .06em;
          flex-wrap: wrap;
        }
        .oe-meta span { display: flex; align-items: center; gap: 6px; }

        .oe-cover-wrap {
          max-width: 960px;
          margin: 0 auto;
          padding: 32px 48px 0;
        }
        .oe-cover {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border: 1px solid var(--rule);
          border-radius: 2px;
        }

        .oe-article-wrap {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 60px;
          align-items: start;
        }

        .oe-article-body {
          padding: 52px 0 80px;
          counter-reset: oe-section;
        }
        .oe-article-body > p:first-of-type::first-letter {
          font-family: var(--serif);
          font-size: 4.2rem;
          font-weight: 700;
          line-height: .82;
          float: left;
          margin-right: 6px;
          margin-top: 5px;
          color: var(--steel);
        }
        .oe-article-body p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--ink2);
          margin-bottom: 1.35em;
        }
        .oe-article-body p strong { font-weight: 700; color: var(--ink); }
        .oe-article-body p em { color: var(--copper); font-style: italic; }
        .oe-article-body a {
          color: var(--steel);
          text-decoration: underline;
          text-decoration-color: var(--rule);
          text-underline-offset: 3px;
          transition: text-decoration-color .15s;
        }
        .oe-article-body a:hover { text-decoration-color: var(--copper); }

        .oe-article-body h2 {
          font-family: var(--serif);
          font-size: 1.7rem;
          font-weight: 600;
          color: var(--ink);
          margin: 2.8em 0 .65em;
          letter-spacing: -.015em;
          line-height: 1.2;
          padding-bottom: 10px;
          border-bottom: 2px solid var(--rule);
          counter-increment: oe-section;
        }
        .oe-article-body h2::before {
          content: counter(oe-section, decimal-leading-zero);
          display: block;
          font-family: var(--mono);
          font-size: .65rem;
          color: var(--copper);
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 6px;
          font-weight: 400;
        }
        .oe-article-body h3 {
          font-family: var(--sans);
          font-size: .9rem;
          font-weight: 500;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--steel);
          margin: 2em 0 .5em;
        }
        .oe-article-body h4 {
          font-family: var(--serif);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--ink);
          margin: 1.8em 0 .5em;
        }
        .oe-article-body ul, .oe-article-body ol {
          margin: 0 0 1.35em 1.4em;
          font-size: .97rem;
          line-height: 1.75;
          color: var(--ink2);
        }
        .oe-article-body li { margin-bottom: .4em; }
        .oe-article-body ul li::marker { color: var(--copper); }
        .oe-article-body ol li::marker { color: var(--copper); font-family: var(--mono); }

        .oe-article-body blockquote {
          border-top: 2px solid var(--ink);
          border-bottom: 1px solid var(--rule);
          border-left: none;
          padding: 20px 0 18px;
          margin: 2.2em 0;
          font-family: var(--serif);
          font-size: 1.28rem;
          font-style: italic;
          font-weight: 400;
          color: var(--ink);
          line-height: 1.4;
        }
        .oe-article-body blockquote p { margin: 0; font-size: inherit; color: inherit; }

        .oe-article-body code {
          font-family: var(--mono);
          font-size: .85em;
          background: var(--paper2);
          padding: 1px 6px;
          border-radius: 2px;
          color: var(--steel);
        }
        .oe-article-body pre {
          background: var(--paper2);
          border: 1px solid var(--rule);
          padding: 16px 20px;
          border-radius: 2px;
          overflow-x: auto;
          margin: 1.5em 0;
        }
        .oe-article-body pre code { background: none; padding: 0; color: var(--ink2); }

        .oe-article-body img {
          max-width: 100%;
          height: auto;
          border: 1px solid var(--rule);
          border-radius: 2px;
          margin: 1.5em 0;
        }

        .oe-article-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.8em 0;
          font-family: var(--sans);
          font-size: .85rem;
          border: 1px solid var(--rule);
        }
        .oe-article-body th {
          background: var(--steel);
          color: #c8d8e8;
          font-family: var(--mono);
          font-size: .68rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: 10px 14px;
          text-align: left;
          border-right: 1px solid #2a4a6a;
        }
        .oe-article-body td {
          padding: 10px 14px;
          border-right: 1px solid var(--rule);
          border-bottom: 1px solid var(--rule);
          color: var(--ink2);
        }
        .oe-article-body tr:nth-child(even) td { background: var(--paper2); }

        .oe-article-body hr {
          border: none;
          border-top: 1px solid var(--rule);
          margin: 2.4em 0;
        }

        .oe-sidebar {
          padding: 52px 0 80px;
          position: sticky;
          top: 28px;
        }
        .oe-sb-block {
          margin-bottom: 28px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--rule);
        }
        .oe-sb-block:last-child { border-bottom: none; }
        .oe-sb-label {
          font-family: var(--mono);
          font-size: .62rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--ink3);
          margin-bottom: 12px;
        }
        .oe-sb-author {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .oe-sb-avatar {
          border-radius: 50%;
          object-fit: cover;
        }
        .oe-sb-author-name {
          font-family: var(--sans);
          font-size: .82rem;
          font-weight: 500;
          color: var(--ink);
        }
        .oe-sb-author-meta {
          font-family: var(--mono);
          font-size: .58rem;
          color: var(--ink3);
          margin-top: 2px;
          letter-spacing: .04em;
        }
        .oe-sb-tags {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .oe-sb-tags li {
          font-family: var(--sans);
          font-size: .76rem;
          color: var(--ink2);
          padding: 5px 0;
          border-bottom: 1px solid var(--paper3);
        }
        .oe-sb-tags li:last-child { border-bottom: none; }

        .oe-share {
          display: flex;
          gap: 8px;
        }
        .oe-share-btn {
          width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--rule);
          background: var(--paper);
          color: var(--ink2);
          border-radius: 2px;
          cursor: pointer;
          transition: background .15s, color .15s, border-color .15s;
        }
        .oe-share-btn svg { width: 16px; height: 16px; }
        .oe-share-btn:hover { background: var(--ink); color: var(--paper); border-color: var(--ink); }
        .oe-share-x:hover { background: #000; border-color: #000; }
        .oe-share-li:hover { background: #0a66c2; border-color: #0a66c2; }
        .oe-share-fb:hover { background: #1877f2; border-color: #1877f2; }

        .oe-footer {
          max-width: 960px;
          margin: 0 auto;
          padding: 24px 48px 48px;
          border-top: 2px solid var(--ink);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 32px;
          flex-wrap: wrap;
        }
        .oe-footer-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .oe-ftag {
          font-family: var(--mono);
          font-size: .62rem;
          letter-spacing: .06em;
          padding: 4px 10px;
          border: 1px solid var(--rule);
          border-radius: 2px;
          color: var(--ink3);
          text-transform: uppercase;
        }
        .oe-back-bottom { align-self: center; }

        @keyframes oeFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .oe-hero, .oe-cover-wrap, .oe-article-wrap {
          animation: oeFadeUp .6s ease both;
        }
        .oe-cover-wrap  { animation-delay: .08s; }
        .oe-article-wrap { animation-delay: .16s; }

        @media (max-width: 900px) {
          .oe-nav { padding: 12px 24px; }
          .oe-hero { padding: 32px 24px; }
          .oe-cover-wrap { padding: 24px 24px 0; }
          .oe-article-wrap {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 0 24px;
          }
          .oe-sidebar {
            position: static;
            padding: 0 0 48px;
            border-top: 1px solid var(--rule);
            margin-top: 12px;
          }
          .oe-footer { padding: 24px; }
        }
      `}</style>
    </div>
  )
}
