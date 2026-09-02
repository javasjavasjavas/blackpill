import React from 'react';
import { Label } from '../components/ui/Label';
import { ActionButton } from '../components/ui/ActionButton';

interface NotFoundProps {
  title?: string;
  message?: string;
}

export const NotFound: React.FC<NotFoundProps> = ({
  title = 'Page not found',
  message = 'This route is not part of the platform. The index, drops and artist registry are all reachable below.'
}) =>
<div className="mx-auto flex max-w-frame flex-col items-start px-5 py-24 lg:px-10 lg:py-32">
    <Label>Error 404 — no record</Label>
    <h1 className="mt-6 max-w-2xl text-mega font-extrabold uppercase leading-[0.86] tracking-tightest text-paper">
      {title}
    </h1>
    <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone">{message}</p>
    <div className="mt-10 flex flex-wrap gap-3">
      <ActionButton to="/collections">
        Browse collections
      </ActionButton>
      <ActionButton to="/" variant="outline">
        Return home
      </ActionButton>
    </div>
  </div>;
