import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { ActionButton } from '../ui/ActionButton';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';

export const SubmitProjectCTA: React.FC = () => (
  <section aria-labelledby="submit-project-title" className="border-t border-ink/15 bg-paper text-ink">
    <div className="mx-auto grid max-w-frame gap-12 px-5 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
      <div className="lg:col-span-5">
        <Label className="text-ink/50">Submit your project</Label>
        <h2
          id="submit-project-title"
          className="mt-4 text-[clamp(2.25rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-tightest text-ink">
          Apply as
          <br />
          an artist.
        </h2>
      </div>

      <div className="lg:col-span-6 lg:col-start-7 lg:self-end">
        <Reveal>
          <p className="max-w-xl text-lg leading-relaxed text-ink/75 md:text-xl">
            Be part of Black Pill Labs and showcase your work for free. Share your project, your
            process, or the idea you want to bring to life. If it&apos;s something unique, we want to
            see it.
          </p>
          <ActionButton
            to="/about#submit"
            size="lg"
            className="mt-8 border-ink bg-ink text-paper hover:bg-carbon">
            Submit your project
            <ArrowRightIcon className="h-4 w-4" strokeWidth={1.5} />
          </ActionButton>
        </Reveal>
      </div>
    </div>
  </section>
);
