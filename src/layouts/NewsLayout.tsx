"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { OstDocument } from "outstatic"

import getFormattedDate from "@/lib/getFormattedDate"
import { CustomLink } from "@/components/Link"
import MDXComponent from "@/components/mdx/MdxComponent"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"

interface LayoutProps {
  post: OstDocument
  backPath?: string
  showBackLinks?: boolean
}

export default function NewsLayout({
  post,
  backPath = "/news",
  showBackLinks = true,
}: LayoutProps) {
  const t = useTranslations("PostLayout")
  const { title, publishedAt, content, tags, author, coverImage, description } = post
  const lang = useLocale()

  const tagList = (tags as unknown as { value: string; label: string }[]) ?? []

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

  const primaryTag = tagList.length > 0 ? tagList[0]?.label : null

  return (
    <div className="on-root">
      <ScrollTopAndComment />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap"
      />

      <div className="on-top-rule" />

      <nav className="on-nav">
        <span className="on-brand">Aktualności · OmniMES</span>
        {primaryTag && <span className="on-nav-tag">{primaryTag}</span>}
      </nav>

      <section className="on-hero">
        {showBackLinks && (
          <div className="on-back-row">
            <CustomLink href={backPath} className="on-back">
              ← {t("back")}
            </CustomLink>
          </div>
        )}
        <div className="on-eyebrow">
          <span>{getFormattedDate(publishedAt, lang)}</span>
        </div>
        <h1 className="on-h1">{title}</h1>
        {description && <p className="on-deck">{description}</p>}
        <div className="on-meta">
          {author?.name && <span>✒ {author.name}</span>}
          {primaryTag && <span>🏷 {primaryTag}</span>}
        </div>
      </section>

      {coverImage && (
        <div className="on-cover-wrap">
          <div className="on-cover">
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

      <article className="on-article-body">
        <MDXComponent content={content} />
      </article>

      <div className="on-share-strip">
        <span className="on-share-label">{t("shareMessage")}</span>
        <div className="on-share">
          <button
            type="button"
            onClick={handleTwitterShare}
            className="on-share-btn on-share-x"
            aria-label={t("shareOnTwitter")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleLinkedInShare}
            className="on-share-btn on-share-li"
            aria-label={t("shareOnLinkedIn")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleFacebookShare}
            className="on-share-btn on-share-fb"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
        </div>
      </div>

      <footer className="on-footer">
        {tagList.length > 0 && (
          <div className="on-footer-tags">
            {tagList.map((tag) => (
              <span key={tag.value} className="on-ftag">
                {tag.label}
              </span>
            ))}
          </div>
        )}
        {showBackLinks && (
          <CustomLink href={backPath} className="on-back on-back-bottom">
            ← {t("backToNews")}
          </CustomLink>
        )}
      </footer>

      <style>{`
        .on-root {
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
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
        }
        html.dark .on-root,
        .dark .on-root,
        .on-root.dark {
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
        .on-root,
        .on-root .on-h1,
        .on-root .on-article-body h1,
        .on-root .on-article-body h2,
        .on-root .on-article-body h3,
        .on-root .on-article-body h4 {
          color: var(--ink);
        }
        .on-top-rule {
          height: 4px;
          background: linear-gradient(90deg, var(--steel) 0%, var(--copper) 50%, var(--teal) 100%);
        }
        .on-nav {
          border-bottom: 1px solid var(--rule);
          padding: 12px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--paper);
        }
        .on-brand {
          font-family: var(--mono);
          font-size: .7rem;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--ink3);
        }
        .on-nav-tag {
          font-family: var(--mono);
          font-size: .66rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--copper);
          border: 1px solid var(--copper);
          padding: 3px 10px;
          border-radius: 2px;
        }

        .on-hero {
          max-width: 820px;
          margin: 0 auto;
          padding: 40px 40px 32px;
        }
        .on-back-row { margin-bottom: 20px; }
        .on-back {
          font-family: var(--mono);
          font-size: .68rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--ink3);
          text-decoration: none;
        }
        .on-back:hover { color: var(--copper); }
        .on-eyebrow {
          font-family: var(--mono);
          font-size: .68rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--copper);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .on-eyebrow::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--rule);
        }
        .on-h1 {
          font-family: var(--serif);
          font-size: clamp(1.6rem, 3.4vw, 2.4rem);
          font-weight: 700;
          line-height: 1.18;
          letter-spacing: -.015em;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .on-deck {
          font-family: var(--sans);
          font-size: 1rem;
          font-weight: 300;
          color: var(--ink2);
          line-height: 1.6;
          margin: 16px 0 20px;
          padding-left: 14px;
          border-left: 3px solid var(--copper2);
          white-space: pre-line;
        }
        .on-meta {
          display: flex;
          gap: 20px;
          font-family: var(--mono);
          font-size: .66rem;
          color: var(--ink3);
          letter-spacing: .06em;
          flex-wrap: wrap;
          padding-top: 14px;
          border-top: 1px solid var(--rule);
        }

        .on-cover-wrap {
          max-width: 820px;
          margin: 0 auto;
          padding: 16px 40px 0;
        }
        .on-cover {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border: 1px solid var(--rule);
          border-radius: 2px;
        }

        .on-article-body {
          max-width: 820px;
          margin: 0 auto;
          padding: 40px 40px 32px;
        }
        .on-article-body p {
          font-size: .97rem;
          line-height: 1.78;
          color: var(--ink2);
          margin-bottom: 1.25em;
        }
        .on-article-body p strong { font-weight: 700; color: var(--ink); }
        .on-article-body p em { color: var(--copper); font-style: italic; }
        .on-article-body a {
          color: var(--steel);
          text-decoration: underline;
          text-decoration-color: var(--rule);
          text-underline-offset: 3px;
        }
        .on-article-body a:hover { text-decoration-color: var(--copper); }
        .on-article-body h2 {
          font-family: var(--serif);
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--ink);
          margin: 2em 0 .5em;
          line-height: 1.25;
          letter-spacing: -.01em;
        }
        .on-article-body h3 {
          font-family: var(--sans);
          font-size: .85rem;
          font-weight: 500;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--ink);
          margin: 1.6em 0 .4em;
        }
        .on-article-body ul, .on-article-body ol {
          margin: 0 0 1.25em 1.4em;
          font-size: .97rem;
          line-height: 1.7;
          color: var(--ink2);
        }
        .on-article-body li { margin-bottom: .35em; }
        .on-article-body ul li::marker { color: var(--copper); }
        .on-article-body ol li::marker { color: var(--copper); font-family: var(--mono); }
        .on-article-body blockquote {
          border-left: 3px solid var(--copper);
          padding: 4px 0 4px 18px;
          margin: 1.6em 0;
          font-family: var(--serif);
          font-style: italic;
          color: var(--ink);
          font-size: 1.08rem;
          line-height: 1.5;
        }
        .on-article-body blockquote p { margin: 0; font-size: inherit; color: inherit; }
        .on-article-body code {
          font-family: var(--mono);
          font-size: .85em;
          background: var(--paper2);
          padding: 1px 6px;
          border-radius: 2px;
          color: var(--steel);
        }
        .on-article-body pre {
          background: var(--paper2);
          border: 1px solid var(--rule);
          padding: 14px 18px;
          border-radius: 2px;
          overflow-x: auto;
          margin: 1.4em 0;
        }
        .on-article-body pre code { background: none; padding: 0; color: var(--ink2); }
        .on-article-body img {
          max-width: 100%;
          height: auto;
          border: 1px solid var(--rule);
          border-radius: 2px;
          margin: 1.4em 0;
        }
        .on-article-body hr {
          border: none;
          border-top: 1px solid var(--rule);
          margin: 2em 0;
        }

        .on-share-strip {
          max-width: 820px;
          margin: 0 auto;
          padding: 20px 40px;
          border-top: 1px solid var(--rule);
          border-bottom: 1px solid var(--rule);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .on-share-label {
          font-family: var(--mono);
          font-size: .68rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--ink3);
        }
        .on-share { display: flex; gap: 8px; }
        .on-share-btn {
          width: 34px;
          height: 34px;
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
        .on-share-btn svg { width: 15px; height: 15px; }
        .on-share-x:hover { background: #000; color: var(--paper); border-color: #000; }
        .on-share-li:hover { background: #0a66c2; color: var(--paper); border-color: #0a66c2; }
        .on-share-fb:hover { background: #1877f2; color: var(--paper); border-color: #1877f2; }

        .on-footer {
          max-width: 820px;
          margin: 0 auto;
          padding: 24px 40px 48px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          flex-wrap: wrap;
        }
        .on-footer-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .on-ftag {
          font-family: var(--mono);
          font-size: .6rem;
          letter-spacing: .06em;
          padding: 4px 10px;
          border: 1px solid var(--rule);
          border-radius: 2px;
          color: var(--ink3);
          text-transform: uppercase;
        }
        .on-back-bottom { align-self: center; }

        @keyframes onFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .on-hero, .on-cover-wrap, .on-article-body {
          animation: onFadeUp .5s ease both;
        }
        .on-cover-wrap { animation-delay: .06s; }
        .on-article-body { animation-delay: .12s; }

        @media (max-width: 900px) {
          .on-nav { padding: 10px 20px; }
          .on-hero { padding: 28px 20px 24px; }
          .on-cover-wrap { padding: 12px 20px 0; }
          .on-article-body { padding: 32px 20px 24px; }
          .on-share-strip { padding: 16px 20px; }
          .on-footer { padding: 20px; }
        }
      `}</style>
    </div>
  )
}
