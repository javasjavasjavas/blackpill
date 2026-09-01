import React, { useState } from 'react';
import { CheckIcon, LoaderIcon } from 'lucide-react';
import { Label } from '../components/ui/Label';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ActionButton } from '../components/ui/ActionButton';
import { Reveal } from '../components/ui/Reveal';
import { categories } from '../data/categories';

const POLICY = [
{
  k: 'Innovation first',
  v: 'The only requirement is creativity and innovation. We look for NFTs that go beyond static images — animated, generative, interactive, evolving, playable, data-driven, or otherwise shaped by code and on-chain mechanics.'
},
{
  k: 'Artists with a track record',
  v: 'We look for artists with an established body of work and a visible track record in the digital art or NFT space. Artists should either have a recognized history in the ecosystem or be publicly doxxed.'
},
{
  k: 'One artist, one idea',
  v: 'We release a small number of collections each year. Nothing is listed to fill a calendar, and we do not aggregate secondary listings from other platforms.'
},
{
  k: 'Disclosure',
  v: 'Black Pill is a curated showcase. No mints or contract interactions take place on this site. Every mint happens externally through the artist’s or project’s official platform, clearly linked from each project page.'
}];

const INDEX_CATEGORIES = [
  ...categories.filter((category) =>
    ['dynamic', 'interactive', 'generative'].includes(category.slug)
  ),
  categories.find((category) => category.slug === 'on-chain'),
  ...categories.filter((category) =>
    !['dynamic', 'interactive', 'generative', 'on-chain'].includes(category.slug)
  )
].filter((category): category is (typeof categories)[number] => Boolean(category));


export const About: React.FC = () => {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');

  return (
    <div className="mx-auto max-w-frame px-5 pb-24 pt-10 lg:px-10">
      <header className="border-b bp-rule pb-12">
        <Label>About — Black Pill Labs</Label>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-tightest text-paper">
          A curated platform for digital work that refuses to remain static.
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-bone">
          We showcase artists using blockchain as a medium — not merely as a distribution channel.
          Different technology. Different mechanics. Different possibilities.
        </p>
      </header>

      <section id="policy" className="scroll-mt-32 py-16">
        <SectionHeading
          index="Policy"
          title="Curatorial policy"
          className="border-t-0" />
        
        <dl className="mt-8 grid gap-x-10 md:grid-cols-2">
          {POLICY.map((item, i) =>
          <Reveal key={item.k} delay={i * 0.03}>
              <div className="border-t bp-rule py-6">
                <dt className="text-lg font-bold uppercase tracking-tight text-paper">{item.k}</dt>
                <dd className="mt-3 max-w-lg text-[15px] leading-relaxed text-bone">{item.v}</dd>
              </div>
            </Reveal>
          )}
        </dl>
      </section>

      <section className="border-t bp-rule py-16">
        <SectionHeading index="Method" title="What we index" />
        <ul className="mt-8 flex flex-wrap gap-2">
          {INDEX_CATEGORIES.map((c) =>
          <li key={c.slug}>
              <span className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone">
                {c.slug === 'experimental-contracts' ? 'Experimental' : c.label}
              </span>
            </li>
          )}
        </ul>
      </section>

      <section id="submit" className="scroll-mt-32 border-t bp-rule py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Label as="div">Submissions</Label>
            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,3rem)] font-extrabold uppercase leading-[0.94] tracking-tightest text-paper">
              Submit a project
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-bone">
              Send a contract, a prototype, or a written description of the mechanism. We read
              everything and reply within two weeks. Finished artwork is not required — the idea is.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {state === 'sent' ?
            <div className="flex items-center gap-3 border bp-rule p-6">
                <CheckIcon className="h-5 w-5 shrink-0 text-volt" strokeWidth={1.75} />
                <p className="text-[15px] text-bone">
                  Submission received. You will hear from the curatorial desk within two weeks.
                </p>
              </div> :

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setState('sending');
                window.setTimeout(() => setState('sent'), 900);
              }}
              className="space-y-6">
              
                {[
              { id: 'sub-name', label: 'Artist or studio', type: 'text' },
              { id: 'sub-email', label: 'Email', type: 'email' },
              { id: 'sub-link', label: 'Contract, repo or prototype URL', type: 'text' }].
              map((field) =>
              <div key={field.id}>
                    <label
                  htmlFor={field.id}
                  className="font-mono text-10 uppercase tracking-label text-steel">
                  
                      {field.label}
                    </label>
                    <input
                  id={field.id}
                  type={field.type}
                  required
                  className="mt-2 h-11 w-full border border-white/20 bg-transparent px-3 font-mono text-11 text-paper focus:border-paper focus:outline-none" />
                
                  </div>
              )}
                <div>
                  <label
                  htmlFor="sub-idea"
                  className="font-mono text-10 uppercase tracking-label text-steel">
                  
                    What does the work do that a static file cannot?
                  </label>
                  <textarea
                  id="sub-idea"
                  rows={4}
                  required
                  className="mt-2 w-full border border-white/20 bg-transparent p-3 font-mono text-11 leading-relaxed text-paper focus:border-paper focus:outline-none" />
                
                </div>
                <ActionButton type="submit" size="lg" disabled={state === 'sending'}>
                  {state === 'sending' ?
                <>
                      <LoaderIcon className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                      Sending
                    </> :

                'Send submission'
                }
                </ActionButton>
              </form>
            }
          </div>
        </div>
      </section>

    </div>);

};
