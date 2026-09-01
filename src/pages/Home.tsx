import React from 'react';
import { Hero } from '../components/home/Hero';
import { Manifesto } from '../components/home/Manifesto';
import { NextDrops } from '../components/home/NextDrops';
import { featuredDrop } from '../data/drops';

interface HomeProps {
  heroVariant: 'split' | 'full-bleed';
}

export const Home: React.FC<HomeProps> = ({ heroVariant }) => (
  <>
    <Hero nextDrop={featuredDrop} variant={heroVariant} />
    <Manifesto />
    <NextDrops />
  </>
);
