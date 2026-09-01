import React from 'react';
import { Label } from '../ui/Label';

export interface LegalSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

export const LegalPage: React.FC<LegalPageProps> = ({
  eyebrow,
  title,
  intro,
  updated,
  sections
}) =>
  <div className="mx-auto max-w-frame px-5 pb-24 pt-10 lg:px-10">
    <header className="border-b bp-rule pb-12">
      <Label>{eyebrow}</Label>
      <h1 className="mt-6 text-[clamp(2.75rem,7vw,6.5rem)] font-extrabold uppercase leading-[0.86] tracking-tightest text-paper">
        {title}
      </h1>
      <p className="mt-8 max-w-3xl text-xl leading-relaxed text-bone">{intro}</p>
      <p className="mt-6 font-mono text-10 uppercase tracking-label text-steel">
        Last updated — {updated}
      </p>
    </header>

    <div className="grid gap-12 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-32">
          <Label as="div">Index</Label>
          <ol className="mt-5 space-y-3">
            {sections.map((section, index) =>
              <li key={section.title}>
                <a
                  href={`#section-${index + 1}`}
                  className="group flex items-baseline gap-3 text-[13px] text-smoke transition-colors duration-150 hover:text-paper">
                  <span className="font-mono text-10 tabular-nums text-steel">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{section.title}</span>
                </a>
              </li>
            )}
          </ol>
        </div>
      </aside>

      <div className="lg:col-span-8 lg:col-start-5">
        {sections.map((section, index) =>
          <section
            id={`section-${index + 1}`}
            key={section.title}
            className="scroll-mt-32 border-t bp-rule py-9 first:pt-7">
            <div className="grid gap-4 sm:grid-cols-[3rem_1fr] sm:gap-6">
              <span className="font-mono text-10 tabular-nums tracking-label text-steel">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="text-2xl font-extrabold uppercase leading-none tracking-tightest text-paper lg:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-bone">
                  {section.paragraphs.map((paragraph) =>
                    <p key={paragraph}>{paragraph}</p>
                  )}
                  {section.bullets &&
                    <ul className="space-y-3 border-l bp-rule pl-5">
                      {section.bullets.map((bullet) =>
                        <li key={bullet}>{bullet}</li>
                      )}
                    </ul>
                  }
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  </div>;

