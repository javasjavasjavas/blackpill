import type { Artist } from '../types';

export const artists: Artist[] = [
{
  slug: 'javier-damico',
  name: "Javier D'Amico",
  location: 'Buenos Aires, Argentina',
  verified: false,
  disciplines: ['Digital Artist', 'UX/UI Designer', 'Front-End Developer'],
  focus: 'Digital Artist · UX/UI Designer · Front-End Developer',
  bio: "Javier D'Amico is a Buenos Aires–based digital artist, UX/UI designer and front-end developer with more than 20 years of experience.",
  longBio: [
    "Javier D'Amico is a Buenos Aires–based digital artist, UX/UI designer and front-end developer with more than 20 years of experience creating digital products. His work explores the dialogue between human creativity and an increasingly digital world, resulting in immersive and visually striking experiences.",
    'As an artist, he works with atmosphere and nostalgia, blending Japanese aesthetics, typography and retro-futurist elements. As a builder, he brings functionality and aesthetics together to create clean digital experiences that are robust, efficient and visually refined.',
    'A crypto-native creator and active member of the Web3 community since 2019, he has contributed to the space as an artist, founder and builder.'
  ],
  statement: 'Digital art, interface design and front-end development are one continuous practice.',
  links: { website: 'javstuff.com', x: '@javpixel_art' },
  wallet: '—',
  ens: '—',
  joined: '2026-09-01',
  externalWork: [{ title: 'Districts', venue: 'Black Pill Labs', year: 2026 }],
  portraitImage: '/images/javier-damico.jpg',
  portraitSeed: 96,
  accent: '#FF00A8'
},
{
  slug: 'ivo-marchetti',
  name: 'Ivo Marchetti',
  location: 'Turin, IT',
  verified: true,
  disciplines: ['On-chain systems', 'Generative art', 'Contract design'],
  focus: 'Autonomous systems that rewrite themselves through use.',
  bio: 'Writes contracts that behave like organisms. Every artwork Marchetti releases is a machine whose output nobody — including the artist — can fully predict.',
  longBio: [
  'Ivo Marchetti (b. 1988) began as a compiler engineer before turning to the blockchain as a computational canvas. His work treats the smart contract as the artwork itself: the visual output is a by-product of a rule system that continues to execute long after the mint has closed.',
  'Since 2021 he has released six systems, four of them stored entirely on-chain with no external dependency. Marchetti refuses to host any renderer off-chain, an insistence he describes as "a practical form of optimism about the archive".',
  'He works alone from a converted print shop in Turin, publishing his contracts unaudited and unverified for the first 24 hours — a window he calls "the honest period".'],

  statement:
  'A file is a promise someone else has to keep. A contract is a promise the network keeps for you. I would rather work in the second material.',
  links: {
    website: 'ivomarchetti.systems',
    x: '@ivo_onchain',
    farcaster: 'ivo',
    foundation: 'foundation.app/@ivo'
  },
  wallet: '0x7B4c9E1aD3f8C05b2E77a6F1D9c4B8e0A5F31c62',
  ens: 'ivo.eth',
  joined: '2024-03-11',
  externalWork: [
  { title: 'Instruction Set', venue: 'Kunsthalle Zürich — Screen Program', year: 2025 },
  { title: 'Nine Contracts', venue: 'Ars Electronica, Linz', year: 2024 },
  { title: 'Compiler Studies I–XII', venue: 'Fondazione Merz, Turin', year: 2023 }],

  notes: [
  {
    question: 'Why does the work need to live on-chain?',
    answer:
    'Because the piece has a body. If the renderer sits on a server, the body is rented. Latent Machines evolves for as long as Ethereum produces blocks, and not one second longer. That is a real lifespan, and I can describe it honestly to a collector.'
  },
  {
    question: 'You let collectors change the work by trading it.',
    answer:
    'The transfer is the brush. Ownership is usually treated as a receipt attached to an object. I wanted ownership to be an event inside the object — something that leaves a mark whether you intended it or not.'
  },
  {
    question: 'What are you building next?',
    answer:
    'A contract that can only be minted from by another contract. No human interface at all. I am curious what a market does with an artwork it cannot reach directly.'
  }],

  portraitSeed: 17,
  accent: '#FF3B00'
},
{
  slug: 'mieko-arai',
  name: 'Mieko Arai',
  location: 'Osaka, JP',
  verified: true,
  disciplines: ['Data sculpture', 'Dynamic metadata', 'Environmental research'],
  focus: 'Artworks wired directly into planetary measurement.',
  bio: 'Arai builds tokens that read the world. Her pieces are permanently connected to sensor feeds, treating climate data as pigment rather than subject.',
  longBio: [
  'Mieko Arai trained as an atmospheric scientist and spent five years at a marine observation station before her first release. Her practice inverts the usual relationship between data and art: the dataset is not visualised after the fact, it is the live material of the piece.',
  'Weather Protocol, her largest work to date, pulls from 40 stations across the Pacific rim through a signed oracle. When a station goes offline the corresponding token quietly turns grey — a behaviour she considers essential rather than a failure state.'],

  statement:
  'The measurement is already the drawing. My job is to stop translating it into something more comfortable.',
  links: { website: 'arai.observatory', x: '@miekoarai', instagram: '@mieko.arai' },
  wallet: '0x2eD1f6B4a90C7E35bB8c1A4f27D6e0938Ac54B71',
  ens: 'mieko.eth',
  joined: '2024-09-02',
  externalWork: [
  { title: 'Pacific Index', venue: 'Mori Art Museum, Tokyo', year: 2025 },
  { title: 'Station 40', venue: 'ZKM Karlsruhe', year: 2024 }],

  portraitSeed: 42,
  accent: '#1E5BFF'
},
{
  slug: 'dell-harrow',
  name: 'Dell Harrow',
  location: 'Detroit, US',
  verified: true,
  disciplines: ['Interactive HTML', 'Interface archaeology', 'Sound'],
  focus: 'Dead software as a medium for memory.',
  bio: 'Harrow reconstructs interfaces that no longer exist. Each artefact is a single HTML file, playable, breakable, and permanently stored on-chain.',
  longBio: [
  'Dell Harrow collects abandoned software the way others collect prints. Their work rebuilds obsolete operating systems, kiosk terminals and answering machines as interactive HTML artefacts small enough to fit in contract storage.',
  'Dead Channel, released in 2025, sold out in eleven minutes and remains one of the most technically constrained collections on Black Pill: 256 artefacts, each under 18kb, each fully interactive.'],

  statement: 'Nostalgia is lazy. I am interested in what an interface forgot on purpose.',
  links: { website: 'deadchannel.tv', x: '@dellharrow', farcaster: 'harrow' },
  wallet: '0x9C0aE4b71D2f83a56Bc4E19f0d7A28e3F6b5C904',
  ens: 'harrow.eth',
  joined: '2024-11-19',
  externalWork: [
  { title: 'Terminal Room', venue: 'MOCAD, Detroit', year: 2025 },
  { title: 'Soft Static', venue: 'Rhizome / New Museum', year: 2023 }],

  portraitSeed: 88,
  accent: '#00E5A0'
},
{
  slug: 'runa-bergstrom',
  name: 'Runa Bergström',
  location: 'Malmö, SE',
  verified: true,
  disciplines: ['Collective systems', 'Dynamic NFTs', 'Governance design'],
  focus: 'Works that only exist because of what holders do.',
  bio: 'Bergström designs artworks with no fixed image, only a set of social rules. The output is a portrait of a community, redrawn every block.',
  longBio: [
  'Runa Bergström comes from participatory theatre and applies its logic to token design. Her collections have no artist-defined composition; the piece renders whatever the collective activity of its holders produces.',
  'Consensus Garden is an open edition that has been mutating continuously since launch, with over 2,400 participants contributing state through ordinary wallet activity.'],

  statement: 'I do not make images. I make conditions and then I stay out of the way.',
  links: { website: 'runa.garden', x: '@runab', farcaster: 'runa' },
  wallet: '0x4F81cA2e07b9D6538aE1f4C09b73D2a6E85B01f3',
  ens: 'runa.eth',
  joined: '2025-01-27',
  externalWork: [{ title: 'Common Ground', venue: 'Moderna Museet Malmö', year: 2025 }],
  portraitSeed: 5,
  accent: '#7CFF3B'
},
{
  slug: 'tobi-okonkwo',
  name: 'Tobi Okonkwo',
  location: 'Lagos, NG',
  verified: true,
  disciplines: ['Blockchain games', 'Constraint programming', 'Pixel systems'],
  focus: 'Playable objects that fit inside a transaction.',
  bio: 'Okonkwo compresses entire games into contract storage. No servers, no updates, no patch notes — the cartridge is the token.',
  longBio: [
  'Tobi Okonkwo builds games under extreme constraint. The Last Save Point is a complete side-scrolling game written in 14kb of hand-optimised JavaScript, stored on-chain in a single SSTORE2 blob and rendered directly from the contract.',
  'Progress is written back to the token, meaning every copy of the game carries the history of how its owner played it. Once a save point is burned, it cannot be recovered.'],

  statement: 'A game with a server has an expiry date. I am shipping cartridges again.',
  links: { website: 'savepoint.gg', x: '@tobiplays', instagram: '@tobi.okonkwo' },
  wallet: '0x1a8B47cE09f2D6b35aC7e1F480d9B62c3E5a7D08',
  ens: 'tobi.eth',
  joined: '2025-04-08',
  externalWork: [
  { title: 'Cartridge', venue: 'A MAZE. Berlin', year: 2026 },
  { title: 'Small Machines', venue: 'Lagos Biennial', year: 2024 }],

  portraitSeed: 61,
  accent: '#FFD400'
},
{
  slug: 'priya-nandan',
  name: 'Priya Nandan',
  location: 'Bengaluru, IN',
  verified: true,
  disciplines: ['Audio-reactive systems', 'Network sonification', 'Live coding'],
  focus: 'Listening to infrastructure.',
  bio: 'Nandan turns raw network activity into sound. Her tokens are instruments whose score is written by mempool congestion.',
  longBio: [
  'Priya Nandan performs with the blockchain as a live instrument. Signal / Noise synthesises audio from pending transaction volume, gas volatility and block timing, producing a composition that is different at every playback.',
  'Each token holds its own synthesis parameters on-chain; the audio is generated in the browser at render time and never stored as a file.'],

  statement: 'The chain is already making a sound. I only built the room where you can hear it.',
  links: { website: 'signalnoise.audio', x: '@priyanandan', farcaster: 'priya' },
  wallet: '0x6Bd3F02aC17e94b58Ac1d7E306f2B84a9C05E1D7',
  ens: 'nandan.eth',
  joined: '2025-06-30',
  externalWork: [
  { title: 'Mempool Suite', venue: 'CTM Festival, Berlin', year: 2026 },
  { title: 'Gas / Voice', venue: 'Serendipity Arts, Goa', year: 2025 }],

  portraitSeed: 33,
  accent: '#FF00A8'
},
{
  slug: 'elias-vondra',
  name: 'Elias Vondra',
  location: 'Prague, CZ',
  verified: false,
  disciplines: ['AI systems', 'Model archaeology', 'Print'],
  focus: 'Machine learning models observed as they decay.',
  bio: 'Vondra trains models exclusively on their own outputs and records the collapse. The work is a document of a system losing coherence.',
  longBio: [
  'Elias Vondra treats generative models as unstable materials. Model Collapse is a fifteen-generation recursive training experiment where each generation of images is used as the sole training data for the next.',
  'The token stores the generation number and a seed; the renderer reconstructs the corresponding checkpoint output on demand. Later generations are almost entirely texture.'],

  statement: 'Everyone shows the first output. I am interested in the fourteenth.',
  links: { website: 'vondra.works', x: '@eliasvondra', instagram: '@elias.vondra' },
  wallet: '0x8fA3b21C7dE45c9AbE0117d3F62aB8c4d9E5c110',
  ens: 'vondra.eth',
  joined: '2025-10-14',
  externalWork: [{ title: 'Fifteen Generations', venue: 'Futura, Prague', year: 2026 }],
  portraitSeed: 74,
  accent: '#00C2FF'
}];


export const getArtist = (slug: string): Artist | undefined => artists.find((a) => a.slug === slug);

export const registryArtists = artists.filter((artist) => artist.slug === 'javier-damico');
