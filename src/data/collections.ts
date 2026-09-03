import type { Collection } from '../types';

export const collections: Collection[] = [
{
  id: 'BP-001',
  index: 1,
  slug: 'latent-machines',
  title: 'Latent Machines',
  artistSlug: 'ivo-marchetti',
  concept: 'A fully on-chain generative system that evolves after every transfer.',
  summary:
  'Five hundred and twelve autonomous machines living in contract storage. Each transfer mutates the rule set that draws them, so provenance is not recorded beside the artwork — it is the artwork.',
  tech: ['Fully On-Chain', 'Generative', 'Dynamic'],
  categories: ['on-chain', 'generative', 'dynamic'],
  status: 'Live',
  supply: 512,
  minted: 388,
  price: 0.14,
  currency: 'ETH',
  floor: 0.31,
  year: 2026,
  dropDate: '2026-08-12T17:00:00.000Z',
  spec: {
    chain: 'Ethereum',
    contract: '0x7B4c9E1aD3f8C05b2E77a6F1D9c4B8e0A5F31c62',
    tokenStandard: 'ERC-721',
    storage: 'Fully On-Chain',
    metadataLocation: 'Contract storage — base64 data URI',
    format: 'SVG / on-chain',
    rendering: 'Deterministic SVG assembled in Solidity at call time',
    dynamicBehavior: 'Rule set mutates on every transfer event; state is irreversible',
    license: 'CC BY-NC 4.0',
    royalty: '5% — enforced on-chain',
    releaseDate: '12 Aug 2026'
  },
  story: {
    idea: 'Latent Machines began as a question about custody. If a blockchain records every hand an object passes through, why does the object itself remain indifferent to that history? Marchetti built a system where the ledger is not documentation but circulation — the machine is bent slightly out of shape by each person who holds it.',
    howItWorks:
    'Each token holds a 32-byte genome in contract storage. On mint, the genome seeds a set of drawing instructions — density, tension, bias, decay — that are assembled into SVG by the contract itself when tokenURI is called. There is no image file anywhere. On every transfer, the contract folds the recipient address into the genome, permanently altering two of the four parameters.',
    innovation:
    'Most dynamic NFTs simulate change through an off-chain renderer reading a mutable pointer. Latent Machines has no renderer and no pointer: the drawing logic, the state machine and the output are all inside a single 24kb contract. The piece cannot break unless Ethereum stops.',
    ownership:
    'Holding is a passive act; trading is an authored one. A machine held since mint remains close to its original geometry. One that has moved through twelve wallets is dense, scarred and unrepeatable. Collectors have begun to treat low transfer counts and high transfer counts as two entirely separate aesthetics.',
    process:
    'The contract was written over fourteen months, largely as an exercise in byte economy. Curve construction is handled with a fixed-point library of Marchetti\'s own design; the palette is derived from a 96-byte lookup table. Deployment cost 4.1 ETH in gas — a figure the artist publishes as part of the work.',
    artistStatement:
    'I did not want to make a picture of a system. I wanted to release the system and accept the pictures it gives me.'
  },
  traits: [
  { name: 'Density', values: ['Sparse', 'Measured', 'Dense', 'Saturated'] },
  { name: 'Tension', values: ['Slack', 'Held', 'Critical'] },
  { name: 'Decay', values: ['None', 'Partial', 'Advanced', 'Terminal'] },
  { name: 'Generation', values: ['G0', 'G1', 'G2', 'G3', 'G4+'] }],

  art: { variant: 'lattice', accent: '#FF3B00', accentAlt: '#F2F1ED' },
  featured: 'primary'
},
{
  id: 'BP-002',
  index: 2,
  slug: 'weather-protocol',
  title: 'Weather Protocol',
  artistSlug: 'mieko-arai',
  concept: 'Dynamic NFTs connected to real-time climate data.',
  summary:
  'One thousand tokens bound to forty atmospheric stations across the Pacific rim. Pressure, humidity and wind are written into the token every six hours by a signed oracle.',
  tech: ['Dynamic', 'Live Data'],
  categories: ['dynamic', 'data-driven'],
  status: 'Upcoming',
  supply: 1000,
  minted: 0,
  price: 0.03,
  currency: 'ETH',
  year: 2026,
  dropDate: '2026-09-08T15:00:00.000Z',
  spec: {
    chain: 'Base',
    contract: '0x2eD1f6B4a90C7E35bB8c1A4f27D6e0938Ac54B71',
    tokenStandard: 'ERC-721',
    storage: 'Partially On-Chain',
    metadataLocation: 'Traits on-chain, renderer pinned to IPFS + Arweave mirror',
    format: 'Canvas / JS',
    rendering: 'Client-side canvas driven by on-chain state variables',
    dynamicBehavior: 'Oracle write every 6h; token greys out if its station goes offline',
    license: 'CC BY 4.0',
    royalty: '7.5%',
    releaseDate: '08 Sep 2026'
  },
  story: {
    idea: 'Arai spent five years reading instruments at a marine observation station and became convinced that the raw measurement was already more articulate than any visualisation of it. Weather Protocol assigns each token a real station and refuses to smooth the result.',
    howItWorks:
    'A signed oracle publishes a compact atmospheric reading for all forty stations every six hours. The contract stores the latest reading per station; each token resolves its own station index and renders pressure as field spacing, humidity as opacity and wind as directional shear.',
    innovation:
    'The work makes failure legible. When a station stops reporting for more than 72 hours the token desaturates to grey and displays its last reading date. Roughly nine per cent of tokens are expected to be grey at any moment — a condition the artist regards as the honest content of the piece.',
    ownership:
    'Owners can request a station reassignment exactly once, permanently. Several collectors have used it to bind a token to the station nearest their home, converting the collection into a distributed personal weather archive.',
    process:
    'Station selection was drawn from public marine and terrestrial networks with at least a decade of continuous record. The renderer is 6kb and deliberately unaccelerated so it behaves identically on a phone and a wall display.',
    artistStatement:
    'A grey token is not broken. It means a machine somewhere stopped speaking, and I think you should be able to see that.'
  },
  traits: [
  { name: 'Station', values: ['Osaka', 'Sitka', 'Valparaíso', 'Hobart', 'Kodiak', 'Callao'] },
  { name: 'Regime', values: ['Stable', 'Frontal', 'Cyclonic'] },
  { name: 'Signal', values: ['Reporting', 'Delayed', 'Offline'] }],

  art: { variant: 'atmosphere', accent: '#1E5BFF' },
  featured: 'secondary'
},
{
  id: 'BP-003',
  index: 3,
  slug: 'dead-channel',
  title: 'Dead Channel',
  artistSlug: 'dell-harrow',
  concept: 'Interactive HTML artefacts exploring obsolete interfaces and corrupted memory.',
  summary:
  'Two hundred and fifty-six playable artefacts, each a single HTML file under 18kb, each stored entirely in contract storage. Click anything. Most of it responds.',
  tech: ['Interactive HTML', 'Fully On-Chain'],
  categories: ['interactive', 'on-chain'],
  status: 'Sold Out',
  supply: 256,
  minted: 256,
  price: 0.18,
  currency: 'ETH',
  floor: 0.44,
  year: 2025,
  dropDate: '2025-11-14T18:00:00.000Z',
  spec: {
    chain: 'Ethereum',
    contract: '0x9C0aE4b71D2f83a56Bc4E19f0d7A28e3F6b5C904',
    tokenStandard: 'ERC-721',
    storage: 'Fully On-Chain',
    metadataLocation: 'SSTORE2 blob — HTML returned as data URI',
    format: 'HTML / on-chain',
    rendering: 'Self-contained HTML document, no external requests',
    dynamicBehavior: 'Interactive only — visual state is not persisted',
    license: 'Artist licence — non-commercial display',
    royalty: '5%',
    releaseDate: '14 Nov 2025'
  },
  story: {
    idea: 'Harrow builds interfaces for machines that never existed, assembled from fragments of ones that did: airport kiosks, answering machines, hospital paging systems, a bank terminal from 1994. Each artefact is a room you can operate but never quite understand.',
    howItWorks:
    'Every token returns a complete HTML document from the contract. There are no images, fonts or scripts loaded from anywhere — all visuals are drawn with CSS and inline SVG. Interaction is handled by around 40 lines of vanilla JavaScript per artefact.',
    innovation:
    'Fitting a fully interactive document into on-chain storage required a shared 4kb CSS library deployed once and concatenated at read time, giving each artefact roughly 14kb of individual code. It remains one of the smallest interactive on-chain works released.',
    ownership:
    'Nothing is saved. Each visit restarts the artefact, which means the work resists the collector impulse to optimise a state. What you own is a machine, not a result.',
    process:
    'Harrow sourced reference material from decommissioned hardware bought at municipal auctions in Michigan and Ohio, photographing and re-typesetting the interfaces before rebuilding them in code.',
    artistStatement:
    'These machines used to tell people things that mattered. Now they only respond. I find that dignified.'
  },
  traits: [
  { name: 'Artefact', values: ['Kiosk', 'Pager', 'Terminal', 'Answerphone', 'Signboard'] },
  { name: 'Corruption', values: ['Clean', 'Bit rot', 'Heavy'] },
  { name: 'Audio', values: ['Silent', 'Tone', 'Static'] }],

  art: { variant: 'channel', accent: '#00E5A0' },
  featured: 'secondary'
},
{
  id: 'BP-004',
  index: 4,
  slug: 'consensus-garden',
  title: 'Consensus Garden',
  artistSlug: 'runa-bergstrom',
  concept: 'A collaborative artwork transformed by wallet activity.',
  summary:
  'An open edition with no fixed composition. The garden grows from what its holders do on-chain — every transaction anywhere is water, light or drought.',
  tech: ['Dynamic', 'Fully On-Chain', 'Experimental Contract'],
  categories: ['dynamic', 'on-chain', 'experimental-contracts'],
  status: 'Live',
  supply: 0,
  minted: 2412,
  price: 0.008,
  currency: 'ETH',
  floor: 0.019,
  year: 2026,
  dropDate: '2026-03-21T12:00:00.000Z',
  spec: {
    chain: 'Base',
    contract: '0x4F81cA2e07b9D6538aE1f4C09b73D2a6E85B01f3',
    tokenStandard: 'ERC-721 — open edition',
    storage: 'Fully On-Chain',
    metadataLocation: 'Contract storage — SVG data URI',
    format: 'SVG / on-chain',
    rendering: 'Solidity SVG composition from shared garden state',
    dynamicBehavior: 'Holder nonce and balance changes alter growth every block',
    license: 'CC0',
    royalty: '0%',
    releaseDate: '21 Mar 2026'
  },
  story: {
    idea: 'Bergström wanted a work with no author-defined image, only conditions. Consensus Garden reads the ordinary on-chain behaviour of everyone holding a token and composes a single shared landscape from it.',
    howItWorks:
    'Each token contributes a plot. Plot growth is a function of the holder\'s transaction nonce, the age of the token in their wallet and the number of distinct plots they hold. Neighbouring plots exchange influence, so a dormant wallet slowly desaturates the plots around it.',
    innovation:
    'The contract stores a global garden state rather than per-token images, meaning gas cost per mint stays flat while the composition becomes more complex with every participant. It is one of very few works where a token you do not own changes what you see.',
    ownership:
    'Selling a token does not remove your influence — it transfers it. Several groups have coordinated to hold plots adjacent to one another, producing dense flowering regions that are visible in every token in the neighbourhood.',
    process:
    'Developed over a nine-month open testnet with 300 volunteer participants. Roughly forty per cent of the growth rules were proposed by testers and adopted verbatim.',
    artistStatement: 'I make conditions, then I stay out of the way. The garden is not mine.'
  },
  traits: [
  { name: 'Plot', values: ['Edge', 'Inner', 'Centre'] },
  { name: 'Growth', values: ['Dormant', 'Sprouting', 'Flowering', 'Overgrown'] },
  { name: 'Neighbours', values: ['0', '1–2', '3–5', '6+'] }],

  art: { variant: 'garden', accent: '#7CFF3B' },
  featured: 'secondary'
},
{
  id: 'BP-005',
  index: 5,
  slug: 'the-last-save-point',
  title: 'The Last Save Point',
  artistSlug: 'tobi-okonkwo',
  concept: 'A playable, single-file blockchain game stored as an NFT.',
  summary:
  'A complete game in 14kb of contract storage. Progress writes back to the token, so every cartridge carries the record of how its owner played it.',
  tech: ['Game', 'Fully On-Chain', 'Interactive HTML'],
  categories: ['playable', 'on-chain', 'interactive'],
  status: 'Live',
  supply: 128,
  minted: 96,
  price: 0.25,
  currency: 'ETH',
  floor: 0.29,
  year: 2026,
  dropDate: '2026-07-02T16:00:00.000Z',
  spec: {
    chain: 'Ethereum',
    contract: '0x1a8B47cE09f2D6b35aC7e1F480d9B62c3E5a7D08',
    tokenStandard: 'ERC-721',
    storage: 'Fully On-Chain',
    metadataLocation: 'SSTORE2 blob — game returned as data URI',
    format: 'HTML / on-chain',
    rendering: 'Canvas game loop, 64×64 internal resolution',
    dynamicBehavior: 'Save state committed to token; one burnable checkpoint per run',
    license: 'Artist licence — commercial play permitted',
    royalty: '6%',
    releaseDate: '02 Jul 2026'
  },
  story: {
    idea: 'Okonkwo grew up with cartridges that could not be patched and servers that never existed. The Last Save Point is an argument that the constraint produced better objects: a game that is finished the day it ships and playable for as long as the chain exists.',
    howItWorks:
    'The full game — physics, level data, sprite atlas and audio synthesis — is stored on-chain and rendered from a data URI. Reaching a checkpoint prompts an optional transaction that writes your position, inventory and death count into the token.',
    innovation:
    'The save mechanic makes the token a genuine game state rather than a key to one. Because saves cost gas, the game creates real tension around when a run is worth committing — a design constraint that only exists because it is on-chain.',
    ownership:
    'Buying a cartridge on the secondary market means inheriting a stranger\'s run. Owners may burn their save exactly once, resetting the token to a factory cartridge; the burn is recorded permanently in the token history.',
    process:
    'Written in hand-minified JavaScript over eight months. Level data is procedural from a 12-byte seed. The sprite atlas is a single 1-bit bitfield unpacked at runtime.',
    artistStatement: 'No servers. No patches. If it is broken in ten years, it is broken exactly the same way.'
  },
  traits: [
  { name: 'Cartridge', values: ['Factory', 'Played', 'Completed', 'Burned save'] },
  { name: 'Seed', values: ['Cavern', 'Foundry', 'Reactor', 'Vault'] },
  { name: 'Deaths', values: ['0', '1–9', '10–49', '50+'] }],

  art: { variant: 'savepoint', accent: '#FFD400' },
  featured: 'secondary'
},
{
  id: 'BP-006',
  index: 6,
  slug: 'districts',
  title: 'Districts',
  artistSlug: 'javier-damico',
  concept: 'Districts explores generative-coded districts as a living digital system rather than a fixed image. Each work combines architecture, atmosphere and information to create a place that feels active, local and continuously connected to the world outside the screen.',
  summary:
  'Districts explores generative-coded districts as a living digital system rather than a fixed image. Each work combines architecture, atmosphere and information to create a place that feels active, local and continuously connected to the world outside the screen.',
  tech: ['Generative', 'Animated', 'Interactive', 'Live Data'],
  categories: ['generative', 'interactive', 'data-driven'],
  status: 'Allowlist',
  supply: 5000,
  minted: 0,
  price: 0.01,
  currency: 'ETH',
  year: 2026,
  dropDate: '2026-09-09T15:32:00.000Z',
  spec: {
    chain: 'Ethereum',
    contract: '0x6Bd3F02aC17e94b58Ac1d7E306f2B84a9C05E1D7',
    tokenStandard: 'ERC-721',
    storage: 'Off-chain',
    metadataLocation: 'Off-chain metadata and interactive renderer',
    format: 'Interactive HTML / Canvas',
    rendering: 'Browser-based generative HTML and JavaScript renderer',
    dynamicBehavior: 'Live weather, time and market data alter the city at every viewing',
    license: 'CC BY-NC 4.0',
    royalty: '10% — split with two collaborators',
    releaseDate: '09 Sep 2026'
  },
  story: {
    idea: 'Districts explores the city as a living digital system rather than a fixed image. Each work combines architecture, atmosphere and information to create a place that feels active, local and continuously connected to the world outside the screen.',
    howItWorks:
    'Each District is generated in the browser from code. Procedural architecture defines the city while animation and live inputs—including time, local weather and market prices—change its light, mood and visible information whenever it is viewed.',
    innovation:
    'Live information is not presented as a separate dashboard placed over an artwork; it becomes part of the artwork itself. The city uses changing data as a creative material, allowing the same composition to remain recognizable while never appearing exactly the same twice.',
    ownership:
    'Each edition represents a distinct coded city with its own visual identity. Its underlying composition persists, while real-world conditions introduce new moments, colors and rhythms every time the work is opened.',
    process:
    'Districts is built as an interactive HTML experience using a custom JavaScript renderer. Parametric buildings, layered animation, a neon visual system and live data sources are composed in real time directly in the viewer’s browser.',
    artistStatement: 'A city is never a still image. It is a system of structures, signals and changing conditions.'
  },
  traits: [
  { name: 'Patch', values: ['Drone', 'Pulse', 'Bell', 'Voice'] },
  { name: 'Tuning', values: ['Equal', 'Just', 'Carnatic', 'Broken'] },
  { name: 'Sessions', values: ['0', '1', '2–5', '6+'] }],

  art: { variant: 'signal', accent: '#FF00A8', htmlPreview: 'artworks/districts.html' },
  featured: 'secondary'
},
{
  id: 'BP-007',
  index: 7,
  slug: 'null-object',
  title: 'Null Object',
  artistSlug: 'ivo-marchetti',
  concept: 'A contract that deletes one token from itself every seven days.',
  summary:
  'One hundred and eleven achromatic objects. The contract holds a scheduled burn nobody controls, including the artist. Ninety-two remain.',
  tech: ['Experimental Contract', 'Fully On-Chain'],
  categories: ['experimental-contracts', 'on-chain'],
  status: 'Closed',
  supply: 111,
  minted: 111,
  price: 120,
  currency: 'XTZ',
  floor: 340,
  year: 2025,
  dropDate: '2025-06-06T14:00:00.000Z',
  spec: {
    chain: 'Tezos',
    contract: 'KT1Q9mZ7bR4vX2nL8kD3fY6sT1wA5cH0gJ2p',
    tokenStandard: 'FA2',
    storage: 'Fully On-Chain',
    metadataLocation: 'Contract storage — SVG data URI',
    format: 'SVG / on-chain',
    rendering: 'Michelson-generated SVG, achromatic by construction',
    dynamicBehavior: 'Autonomous burn every 168 hours, selected pseudorandomly',
    license: 'CC0',
    royalty: '0%',
    releaseDate: '06 Jun 2025'
  },
  story: {
    idea: 'A collection that becomes smaller on a schedule, with no human able to intervene. Null Object asks what a market does with an object that is being actively removed from the world.',
    howItWorks:
    'The contract exposes a public burn function callable once per 168-hour window. Anyone may call it; the token selected is derived from the block hash. The caller receives nothing. So far every window has been claimed within four minutes.',
    innovation:
    'Scarcity in NFTs is almost always fixed at deployment. Here it is a live process with a rate, which makes the remaining supply a genuinely moving number and the burn a public event with its own audience.',
    ownership:
    'Owning a Null Object is owning a countdown you cannot see. Nineteen have been destroyed. Holders of burned tokens keep a permanent "witness" record in the contract — the only trace the object leaves.',
    process:
    'Written directly in Michelson to keep the burn logic auditable in under 200 instructions. Marchetti published the contract unverified for 24 hours, as with all his releases.',
    artistStatement: 'I wanted to make a work that could not be preserved by loving it.'
  },
  traits: [
  { name: 'Form', values: ['Bar', 'Void', 'Aperture', 'Slab'] },
  { name: 'Status', values: ['Extant', 'Burned'] },
  { name: 'Witnesses', values: ['0', '1–3', '4+'] }],

  art: { variant: 'null', accent: '#F2F1ED' }
},
{
  id: 'BP-008',
  index: 8,
  slug: 'model-collapse',
  title: 'Model Collapse',
  artistSlug: 'elias-vondra',
  concept: 'Fifteen generations of a model trained only on its own output.',
  summary:
  'A recursive AI system documented as it loses coherence. Each token holds a generation number; later generations are almost entirely texture.',
  tech: ['AI', 'Generative', 'Dynamic'],
  categories: ['generative', 'dynamic'],
  status: 'Live',
  supply: 333,
  minted: 121,
  price: 0.09,
  currency: 'ETH',
  floor: 0.11,
  year: 2026,
  dropDate: '2026-05-19T17:00:00.000Z',
  spec: {
    chain: 'Ethereum',
    contract: '0x8fA3b21C7dE45c9AbE0117d3F62aB8c4d9E5c110',
    tokenStandard: 'ERC-721',
    storage: 'Partially On-Chain',
    metadataLocation: 'Generation + seed on-chain, weights archived on Arweave',
    format: 'WebGL / GLSL',
    rendering: 'Checkpoint reconstruction in a WebGL fragment shader',
    dynamicBehavior: 'Generation advances once per quarter until G15, then freezes',
    license: 'CC BY-NC-SA 4.0',
    royalty: '7.5%',
    releaseDate: '19 May 2026'
  },
  story: {
    idea: 'Vondra was reading papers on synthetic-data degradation and decided the collapse itself was the interesting image. Model Collapse trains a small diffusion model on its own outputs, fifteen times, and publishes every generation.',
    howItWorks:
    'Each token stores a seed and a generation pointer. The renderer loads the archived checkpoint for that generation and reconstructs the output in a shader. Every quarter the pointer advances by one, so the artwork you own visibly degrades on a known schedule until it reaches G15.',
    innovation:
    'The piece uses scheduled degradation rather than accumulation as its dynamic behaviour, and it archives every intermediate model publicly — an unusually complete record of a process the industry usually treats as a defect.',
    ownership:
    'Holders vote each quarter on whether to advance or hold the generation pointer. A held quarter is recorded as an intervention in the token history. Two quarters have been held so far, both narrowly.',
    process:
    'Training ran on two consumer GPUs over eleven weeks. Weights for all fifteen generations, 1.4TB in total, are archived and referenced from the contract.',
    artistStatement: 'Everyone shows the first output. I am interested in the fourteenth.'
  },
  traits: [
  { name: 'Generation', values: ['G1', 'G3', 'G5', 'G8', 'G12', 'G15'] },
  { name: 'Coherence', values: ['Legible', 'Faltering', 'Texture'] },
  { name: 'Interventions', values: ['0', '1', '2'] }],

  art: { variant: 'collapse', accent: '#00C2FF' },
  featured: 'secondary'
},
{
  id: 'BP-009',
  index: 9,
  slug: 'hard-fork',
  title: 'Hard Fork',
  artistSlug: 'runa-bergstrom',
  concept: 'Every token splits into two irreconcilable versions of itself.',
  summary:
  'Six hundred tokens, each of which will fork exactly once. Holders choose a branch; the branch they abandon keeps existing in someone else\'s wallet.',
  tech: ['Experimental Contract', 'Dynamic'],
  categories: ['experimental-contracts', 'dynamic'],
  status: 'Upcoming',
  supply: 600,
  minted: 0,
  price: 12,
  currency: 'MATIC',
  year: 2026,
  dropDate: '2026-09-19T16:00:00.000Z',
  spec: {
    chain: 'Polygon',
    contract: '0x0E7a29Bc31f5D648aA0b7c1E93d5F82a4B6c7D15',
    tokenStandard: 'ERC-721 + fork extension',
    storage: 'Fully On-Chain',
    metadataLocation: 'Contract storage — SVG data URI per branch',
    format: 'SVG / on-chain',
    rendering: 'Branch-aware Solidity SVG renderer',
    dynamicBehavior: 'One irreversible fork per token; abandoned branch is airdropped',
    license: 'CC0',
    royalty: '5%',
    releaseDate: '19 Sep 2026'
  },
  story: {
    idea: 'Bergström takes the governance failure mode of blockchains — the chain split — and makes it a personal decision. Every token contains two futures and can only keep one.',
    howItWorks:
    'At any point a holder may call fork(), which mints a second token representing the branch not taken and airdrops it to a random holder of the collection. Both branches render from the same genome but diverge visually and can never be recombined.',
    innovation:
    'The mechanic makes an irreversible choice the core interaction rather than a feature, and it distributes the consequence to a stranger. Supply is a function of collective indecision: the collection can double, but only if everyone forks.',
    ownership:
    'Receiving someone else\'s abandoned branch is unavoidable if you hold. The collection becomes a record of paths that were declined, held by people who did not decline them.',
    process:
    'Two years of governance research condensed into a 180-line extension. The fork function was deliberately left free of any incentive.',
    artistStatement: 'A split is not a bug in a community. It is the moment it tells the truth.'
  },
  traits: [
  { name: 'Branch', values: ['Origin', 'Kept', 'Abandoned'] },
  { name: 'Divergence', values: ['None', 'Slight', 'Total'] },
  { name: 'Origin holder', values: ['Self', 'Stranger'] }],

  art: { variant: 'fork', accent: '#FF2D55' }
},
{
  id: 'BP-010',
  index: 10,
  slug: 'grey-room',
  title: 'Grey Room',
  artistSlug: 'dell-harrow',
  concept: 'A single interactive room, rendered differently for every holder.',
  summary:
  'Four hundred views of one architecture. The room is identical for everyone; the light, sound and decay are derived from your address.',
  tech: ['Interactive HTML', 'Audio', 'Generative'],
  categories: ['interactive', 'audiovisual', 'generative'],
  status: 'Closed',
  supply: 400,
  minted: 400,
  price: 0.06,
  currency: 'ETH',
  floor: 0.08,
  year: 2024,
  dropDate: '2024-10-31T20:00:00.000Z',
  spec: {
    chain: 'Base',
    contract: '0x3C6bE05fA71d29c48B0a7e1F506d3B92c8A4f7E6',
    tokenStandard: 'ERC-721',
    storage: 'IPFS',
    metadataLocation: 'IPFS with Arweave mirror',
    format: 'HTML / on-chain',
    rendering: 'CSS 3D architecture with generated room tone',
    dynamicBehavior: 'Lighting and reverb derived from holder address; static otherwise',
    license: 'Artist licence — non-commercial display',
    royalty: '5%',
    releaseDate: '31 Oct 2024'
  },
  story: {
    idea: 'One room, drawn once, seen four hundred ways. Harrow\'s earliest release on Black Pill and the origin of their interest in interfaces that respond without explaining themselves.',
    howItWorks:
    'The architecture is a fixed CSS 3D model. The holder\'s address seeds light temperature, surface decay and a generated room tone, so the same geometry reads as a warm office or a flooded basement depending on who owns it.',
    innovation:
    'Rather than generating different objects, Grey Room generates different perception of one object — an approach that has since become a recognisable line in Harrow\'s practice.',
    ownership:
    'On transfer the room re-derives from the new owner\'s address. Nothing is preserved. Collectors describe buying a Grey Room as arriving somewhere rather than acquiring something.',
    process:
    'Built in six weeks with no framework. The room tone is a single WebAudio noise source through three biquad filters.',
    artistStatement: 'You are not the first person in the room. You are just the one holding the key now.'
  },
  traits: [
  { name: 'Light', values: ['Cold', 'Neutral', 'Sodium', 'None'] },
  { name: 'Decay', values: ['Maintained', 'Neglected', 'Flooded'] },
  { name: 'Tone', values: ['Hum', 'Drip', 'Wind', 'Silence'] }],

  art: { variant: 'greyroom', accent: '#9AA0A6' }
},
{
  id: 'BP-011',
  index: 11,
  slug: 'blotters',
  title: 'Blotters',
  artistSlug: 'arbo',
  concept: 'An animated collection by Arbo Vonderwald.',
  summary: 'An animated collection by Arbo Vonderwald.',
  tech: ['Generative'],
  categories: ['generative'],
  status: 'Live',
  supply: 0,
  minted: 0,
  price: 0,
  currency: 'ETH',
  year: 2026,
  dropDate: '2026-09-03T00:00:00.000Z',
  spec: {
    chain: 'TBA',
    contract: 'TBA',
    tokenStandard: 'TBA',
    storage: 'TBA',
    metadataLocation: 'TBA',
    format: 'GIF',
    rendering: 'Animated image preview',
    dynamicBehavior: 'TBA',
    license: 'TBA',
    royalty: 'TBA',
    releaseDate: 'TBA'
  },
  story: {
    idea: 'Blotters is an animated collection by Arbo Vonderwald.',
    howItWorks: 'Technical details will be published soon.',
    innovation: 'Additional curatorial notes will be published soon.',
    ownership: 'Collection and ownership details will be published soon.',
    process: 'Process notes will be published soon.',
    artistStatement: 'Artist statement coming soon.'
  },
  traits: [],
  marketplaceUrl: 'https://opensea.io/collection/blotters',
  openSeaSlug: 'blotters',
  art: {
    variant: 'signal',
    accent: '#B7FF00',
    imagePreview: '/images/blotters.gif'
  }
}];


export const getCollection = (slug: string): Collection | undefined =>
collections.find((c) => c.slug === slug);

export const collectionsByArtist = (artistSlug: string): Collection[] =>
collections.filter((c) => c.artistSlug === artistSlug);
