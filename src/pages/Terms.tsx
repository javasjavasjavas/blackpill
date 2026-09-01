import React from 'react';
import { LegalPage, type LegalSection } from '../components/legal/LegalPage';

const SECTIONS: LegalSection[] = [
  {
    title: 'About Black Pill',
    paragraphs: [
      'Black Pill is an independent editorial platform that curates and showcases experimental digital collectibles, artists and projects. The website is provided for informational, cultural and discovery purposes.',
      'Black Pill does not conduct mints, sales, swaps, transfers or other smart-contract interactions. Any mint or transaction takes place on an external platform operated by the relevant artist, project or third party.'
    ]
  },
  {
    title: 'Using the site',
    paragraphs: [
      'You may access and use the site for lawful, personal and non-commercial purposes. You must not interfere with the operation or security of the site, attempt to gain unauthorized access, use automated systems at an abusive rate, or misrepresent an affiliation with Black Pill.'
    ]
  },
  {
    title: 'External platforms and wallets',
    paragraphs: [
      'Project pages may link to third-party websites, marketplaces, wallets and blockchain applications. Those services are independent from Black Pill and are governed by their own terms, privacy policies, fees and security practices.',
      'If wallet connection is available, it is used only to read permitted public information in your browser. Black Pill will never ask for a private key or seed phrase, and showcase functionality does not require you to sign a transaction.'
    ]
  },
  {
    title: 'Artwork and intellectual property',
    paragraphs: [
      'Artists and rights holders retain ownership of their artwork, names and project materials. Black Pill retains ownership of its brand, editorial text, interface and original site materials.',
      'Viewing a work, owning a token or following an external mint link does not transfer copyright or other intellectual-property rights unless the artist expressly states otherwise.'
    ]
  },
  {
    title: 'Artist submissions',
    paragraphs: [
      'By submitting a project, you confirm that you have the right to share the material and that the information supplied is accurate. A submission does not guarantee review, selection, publication or a response.',
      'Submitted material may be used internally to evaluate the project. Publication, promotion or use beyond that review will require the artist’s approval or a separate agreement.'
    ]
  },
  {
    title: 'No financial advice',
    paragraphs: [
      'Nothing on Black Pill is investment, legal, tax or financial advice. Digital collectibles can be experimental, volatile and technically risky. You are responsible for researching any project and evaluating any external transaction before participating.'
    ]
  },
  {
    title: 'Availability and liability',
    paragraphs: [
      'The site and its content are provided on an “as is” and “as available” basis. We aim to keep project information accurate, but we do not guarantee that descriptions, dates, links, prices or external services will always be complete, current or available.',
      'To the extent permitted by law, Black Pill is not responsible for losses caused by external platforms, smart contracts, wallets, networks, artists, projects or decisions made using information displayed on the site.'
    ]
  },
  {
    title: 'Changes and contact',
    paragraphs: [
      'We may update these Terms when the platform or its practices change. The date above identifies the latest version. Questions may be sent through the official Black Pill channel listed in the site footer.'
    ]
  }
];

export const Terms: React.FC = () =>
  <LegalPage
    eyebrow="Institution — Legal"
    title="Terms of use"
    intro="The basic rules for accessing Black Pill, exploring its curated projects and using links to independent external platforms."
    updated="September 1, 2026"
    sections={SECTIONS}
  />;

