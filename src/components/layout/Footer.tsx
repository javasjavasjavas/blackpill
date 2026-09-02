import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wordmark } from '../brand/Wordmark';
import { Label } from '../ui/Label';
import { SocialIcon, type SocialNetwork } from '../ui/SocialIcon';
import { SubmitProjectCTA } from './SubmitProjectCTA';

const COLUMNS: {title: string;links: {label: string;to: string;}[];}[] = [
{
  title: 'Platform',
  links: [
  { label: 'Collections', to: '/collections' },
  { label: 'Artists', to: '/artists' },
  { label: 'Drops', to: '/drops' },
  { label: 'Submit a Project', to: '/about#submit' }]

},
{
  title: 'Institution',
  links: [
  { label: 'About', to: '/about' },
  { label: 'Curatorial Policy', to: '/about#policy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Privacy', to: '/privacy' }]

}];


const SOCIALS: {network: SocialNetwork;label: string;href: string;}[] = [
{ network: 'x', label: '@BlackPillLabs', href: 'https://x.com/BlackPillLabs' }];


export const Footer: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      {!['/about', '/terms', '/privacy'].includes(pathname) && <SubmitProjectCTA />}
      <footer className="border-t bp-rule bg-void">
        <div className="mx-auto max-w-frame px-5 py-14 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Wordmark variant="stacked" />
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-smoke">
                An independent gallery and marketplace for experimental digital objects. Curated,
                not aggregated.
              </p>
            </div>

            {COLUMNS.map((col) =>
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
                <Label as="div">{col.title}</Label>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) =>
                <li key={link.label}>
                      <Link
                    to={link.to}
                    className="bp-underline-hover text-[15px] text-bone transition-colors duration-150 hover:text-paper">
                    
                        {link.label}
                      </Link>
                    </li>
                )}
                </ul>
              </nav>
            )}

            <div className="lg:col-span-3">
              <Label as="div">Channels</Label>
              <ul className="mt-5 space-y-3">
                {SOCIALS.map((s) =>
                <li key={s.label}>
                    <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-3 text-[15px] text-bone transition-colors duration-150 hover:text-paper">
                    
                      <SocialIcon network={s.network} className="h-4 w-4 text-smoke transition-colors duration-150 group-hover:text-paper" />
                      {s.label}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-14 flex items-center justify-between border-t bp-rule pt-5">
            <p className="font-mono text-10 tracking-label text-smoke">
              © 2026 Black Pill Labs
            </p>
            <p className="font-mono text-10 tracking-label text-smoke">
              Take the Pill.
            </p>
          </div>
        </div>
      </footer>
    </>);

};
