import React from 'react';
import { LegalPage, type LegalSection } from '../components/legal/LegalPage';

const SECTIONS: LegalSection[] = [
  {
    title: 'Scope',
    paragraphs: [
      'This Privacy Policy explains how Black Pill handles information when you browse the site, submit a project, contact us or choose to connect a wallet. It does not cover external websites or blockchain applications linked from project pages.'
    ]
  },
  {
    title: 'Information you provide',
    paragraphs: [
      'When you submit a project or contact Black Pill, we may receive the information you choose to provide, including an artist or studio name, email address, project links, technical references and a written description of the work.'
    ]
  },
  {
    title: 'Wallet and blockchain data',
    paragraphs: [
      'If you choose to connect a wallet, the site may read your public wallet address, selected network and publicly available blockchain data. Public blockchain records are not controlled by Black Pill and generally cannot be altered or deleted.',
      'We do not request or store private keys, seed phrases or wallet recovery information. Black Pill does not initiate mints or contract interactions.'
    ]
  },
  {
    title: 'Technical information',
    paragraphs: [
      'Basic technical information may be processed to deliver and protect the site, such as browser type, device information, IP address, requested pages, timestamps and error logs. Essential local storage may be used for interface preferences or temporary session state.',
      'Black Pill does not sell personal information or build advertising profiles from wallet activity.'
    ]
  },
  {
    title: 'How information is used',
    paragraphs: ['We use information only as reasonably necessary to:'],
    bullets: [
      'Operate, maintain and secure the website.',
      'Review project submissions and communicate with artists.',
      'Respond to questions and support requests.',
      'Improve site performance and correct technical problems.',
      'Comply with legal obligations and protect the rights of users, artists and Black Pill.'
    ]
  },
  {
    title: 'Sharing and external services',
    paragraphs: [
      'Information may be shared with service providers that help operate the site, when required by law, or when necessary to protect the platform and its users. These providers should receive only the information needed to perform their services.',
      'External mint pages, marketplaces, social networks and wallet providers process information under their own policies. Review those policies before using their services.'
    ]
  },
  {
    title: 'Retention and security',
    paragraphs: [
      'We keep personal information only for as long as needed for the purpose for which it was collected, to maintain necessary records or to meet legal obligations. We use reasonable safeguards, but no online system can guarantee absolute security.'
    ]
  },
  {
    title: 'Your choices',
    paragraphs: [
      'Depending on your location, you may have rights to request access, correction or deletion of personal information, or to object to certain processing. You may also choose not to submit personal information or connect a wallet.',
      'Privacy questions and requests may be sent through the official Black Pill channel listed in the site footer.'
    ]
  },
  {
    title: 'Policy updates',
    paragraphs: [
      'We may update this policy as the site and its practices evolve. The date above identifies the latest version, and material changes will be reflected on this page.'
    ]
  }
];

export const Privacy: React.FC = () =>
  <LegalPage
    eyebrow="Institution — Privacy"
    title="Privacy policy"
    intro="A plain-language overview of the information Black Pill may receive and how it is handled across the showcase and submission experience."
    updated="September 1, 2026"
    sections={SECTIONS}
  />;

