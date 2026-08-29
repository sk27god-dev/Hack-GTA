import React, { useState, useRef, useEffect } from 'react';
import { Competition } from '../types';
import {
  X,
  Navigation,
  Compass,
  MapPin,
  Shield,
  Cpu,
  Terminal,
  Gamepad2,
  Zap,
  Sparkles,
  Trophy,
  Users,
  Calendar,
  Clock,
  ArrowRight,
  Plus,
  Minus,
  RotateCcw,
  Locate,
  Radio,
  ExternalLink,
  Flame,
  Search,
  CheckCircle2,
  Layers,
  Star
} from 'lucide-react';

export interface MapLocation {
  id: string;
  name: string;
  district: string;
  sectorTag: string;
  building: string;
  room: string;
  coordinates: { x: number; y: number };
  competitionId?: string;
  track?: string;
  bounty?: string;
  schedule?: string;
  teamSize?: number;
  securityRating: number; // 1 to 5 stars
  type: 'competition' | 'hq' | 'poi';
  iconType: 'shield' | 'cpu' | 'terminal' | 'gamepad' | 'zap' | 'sparkles' | 'trophy' | 'radio' | 'flame';
  color: string; // Hex or Tailwind color
  description: string;
}

const CITY_LOCATIONS: MapLocation[] = [
  {
    id: 'cyber-heist',
    name: 'The Data Vault',
    district: 'Downtown Core',
    sectorTag: 'SECTOR 01',
    building: 'Omni Cybernetics Tower',
    room: 'Underground Lab B (Sub-Level 3)',
    coordinates: { x: 380, y: 310 },
    competitionId: 'cyber-heist',
    track: 'Cybersecurity',
    bounty: '$120,000',
    schedule: 'May 16, 11:00 AM (24H Sprint)',
    teamSize: 4,
    securityRating: 5,
    type: 'competition',
    iconType: 'shield',
    color: '#00E5FF',
    description: 'High-security air-gapped server vault. Primary target for decentralized vault penetration and cryptographic capture-the-flag gauntlets.'
  },
  {
    id: 'neon-drift',
    name: 'Ocean Drive Circuit',
    district: 'Ocean Beach Strip',
    sectorTag: 'SECTOR 02',
    building: 'Vice Horizon Promenade',
    room: 'Sim Stage Alpha (Beachfront Arena)',
    coordinates: { x: 740, y: 430 },
    competitionId: 'neon-drift',
    track: 'Algorithms',
    bounty: '$90,000',
    schedule: 'May 16-17, 02:00 PM Finals',
    teamSize: 4,
    securityRating: 4,
    type: 'competition',
    iconType: 'flame',
    color: '#FF6FB5',
    description: 'Coastal autonomous racing track fitted with dynamic LiDAR sensors and multi-agent neural navigation benchmarks.'
  },
  {
    id: 'code-breach',
    name: 'The Bunker Matrix',
    district: 'Vice Docks Industrial',
    sectorTag: 'SECTOR 03',
    building: 'Cargo Terminal Row 04',
    room: 'Hardened Bunker Console Hub',
    coordinates: { x: 250, y: 550 },
    competitionId: 'code-breach',
    track: 'Cybersecurity',
    bounty: '$85,000',
    schedule: 'May 17, 09:00 AM - 09:00 PM',
    teamSize: 4,
    securityRating: 5,
    type: 'competition',
    iconType: 'terminal',
    color: '#00E5FF',
    description: 'Industrial mainframe terminal. Teams face live red/blue team adversarial injections and zero-day patching drills.'
  },
  {
    id: 'synth-city',
    name: 'Neural Studio B',
    district: 'Little Haiti / Neon Alley',
    sectorTag: 'SECTOR 04',
    building: 'Prism Holo Arcade',
    room: 'Holo Deck 02 (VR Render Lab)',
    coordinates: { x: 330, y: 190 },
    competitionId: 'synth-city',
    track: 'Game Dev',
    bounty: '$75,000',
    schedule: 'May 16-17, 36-Hour Jam',
    teamSize: 4,
    securityRating: 3,
    type: 'competition',
    iconType: 'gamepad',
    color: '#FFD54F',
    description: 'Next-gen real-time shader and physics rendering lab equipped with ultra-low latency spatial projection rings.'
  },
  {
    id: 'defi-infiltrator',
    name: 'Vice Trade Center',
    district: 'Starfish Island Financial',
    sectorTag: 'SECTOR 05',
    building: 'Financial Spire Tower 3',
    room: 'Floor 44 (Liquidity War Room)',
    coordinates: { x: 530, y: 360 },
    competitionId: 'defi-infiltrator',
    track: 'Web3 & Decentralization',
    bounty: '$100,000',
    schedule: 'May 16, 01:00 PM - May 17, 01:00 PM',
    teamSize: 4,
    securityRating: 4,
    type: 'competition',
    iconType: 'zap',
    color: '#00E5FF',
    description: 'High-rise trading penthouse hosting peer-to-peer liquidity protocol development and zero-knowledge rollup verifications.'
  },
  {
    id: 'metropolis-ai',
    name: 'Main Arena Stage',
    district: 'North Point Innovation Hub',
    sectorTag: 'SECTOR 06',
    building: 'Ocean View Auditorium',
    room: 'Grand Ampitheater Stage',
    coordinates: { x: 630, y: 170 },
    competitionId: 'metropolis-ai',
    track: 'Artificial Intelligence',
    bounty: '$110,000',
    schedule: 'May 17, 10:00 AM - 06:00 PM',
    teamSize: 4,
    securityRating: 4,
    type: 'competition',
    iconType: 'cpu',
    color: '#FF6FB5',
    description: 'The premier keynote arena hosting autonomous multi-agent demonstrations, LLM jailbreak defenses, and live jury evaluations.'
  },
  {
    id: 'ops-hq',
    name: 'Tech Fest Ops HQ',
    district: 'Vice Civic Center',
    sectorTag: 'BASE HQ',
    building: 'Central Municipal Concourse',
    room: 'Grand Hall Check-In & Badge Dispatch',
    coordinates: { x: 470, y: 260 },
    bounty: 'CENTRAL BASE',
    schedule: 'Open 24/7 Throughout Event',
    teamSize: 100,
    securityRating: 2,
    type: 'hq',
    iconType: 'trophy',
    color: '#FFD54F',
    description: 'Ground Zero. Hacker registration, NFC wristband syncing, hardware loot dispensing, and 24/7 command staff helpdesk.'
  },
  {
    id: 'malibu-club',
    name: 'The Malibu Club Lounge',
    district: 'Ocean Beach South',
    sectorTag: 'AFTER-HOURS',
    building: 'Malibu Palms Pavilion',
    room: 'Neon Terrace & Synth Bar',
    coordinates: { x: 770, y: 310 },
    schedule: 'Every Night from 09:00 PM',
    securityRating: 1,
    type: 'poi',
    iconType: 'sparkles',
    color: '#FF6FB5',
    description: 'Official syndicate chillout lounge, chillhop DJ sessions, sponsor networking mixers, and caffeine refill bar.'
  },
  {
    id: 'escobar-airfield',
    name: 'Escobar Air Cargo Hub',
    district: 'West Metropolis Border',
    sectorTag: 'LOGISTICS',
    building: 'Hangar 09 (Flight Apron)',
    room: 'Drone Launch Pad & Compute Cluster',
    coordinates: { x: 160, y: 370 },
    schedule: 'May 16, 04:00 PM Hardware Drop',
    securityRating: 4,
    type: 'poi',
    iconType: 'radio',
    color: '#00E5FF',
    description: 'Unmanned drone sensor staging area, edge computing server racks, and satellite uplink transport hub.'
  }
];

interface CityMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCompetition?: (comp: Competition) => void;
  onDeployCrew?: (compId: string) => void;
  competitions?: Competition[];
}

export const CityMapModal: React.FC<CityMapModalProps> = ({
  isOpen,
  onClose,
  onSelectCompetition,
  onDeployCrew,
  competitions = []
}) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>('cyber-heist');
  const [waypointLocationId, setWaypointLocationId] = useState<string>('cyber-heist');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isRadarSweepActive, setIsRadarSweepActive] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showWaypointToast, setShowWaypointToast] = useState<boolean>(false);

  const mapSvgRef = useRef<SVGSVGElement>(null);

  // Selected and waypoint location objects
  const selectedLocation = CITY_LOCATIONS.find(loc => loc.id === selectedLocationId) || CITY_LOCATIONS[0];
  const waypointLocation = CITY_LOCATIONS.find(loc => loc.id === waypointLocationId) || CITY_LOCATIONS[0];
  const hqLocation = CITY_LOCATIONS.find(loc => loc.id === 'ops-hq') || CITY_LOCATIONS[6];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter locations
  const filteredLocations = CITY_LOCATIONS.filter(loc => {
    const matchesFilter =
      activeFilter === 'ALL' ||
      (activeFilter === 'COMPETITIONS' && loc.type === 'competition') ||
      (activeFilter === 'CYBER' && loc.track === 'Cybersecurity') ||
      (activeFilter === 'AI' && (loc.track === 'Artificial Intelligence' || loc.track === 'Algorithms')) ||
      (activeFilter === 'WEB3' && loc.track === 'Web3 & Decentralization') ||
      (activeFilter === 'POIS' && (loc.type === 'poi' || loc.type === 'hq'));

    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (loc.track && loc.track.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => {
      const next = Math.min(Math.max(prev + delta, 0.8), 2.2);
      return Number(next.toFixed(2));
    });
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleSetWaypoint = (locId: string) => {
    setWaypointLocationId(locId);
    setSelectedLocationId(locId);
    setShowWaypointToast(true);
    setTimeout(() => setShowWaypointToast(false), 3000);
  };

  const handleLocationClick = (loc: MapLocation) => {
    setSelectedLocationId(loc.id);
  };

  // Pan controls
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only primary click
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Render icon based on iconType
  const renderLocationIcon = (type: MapLocation['iconType'], className = 'w-4 h-4') => {
    switch (type) {
      case 'shield':
        return <Shield className={className} />;
      case 'cpu':
        return <Cpu className={className} />;
      case 'terminal':
        return <Terminal className={className} />;
      case 'gamepad':
        return <Gamepad2 className={className} />;
      case 'zap':
        return <Zap className={className} />;
      case 'sparkles':
        return <Sparkles className={className} />;
      case 'trophy':
        return <Trophy className={className} />;
      case 'flame':
        return <Flame className={className} />;
      case 'radio':
      default:
        return <Radio className={className} />;
    }
  };

  // Calculate approximate straight-line distance
  const distanceMiles = (
    Math.hypot(
      (selectedLocation.coordinates.x - hqLocation.coordinates.x) * 0.008,
      (selectedLocation.coordinates.y - hqLocation.coordinates.y) * 0.008
    ) + 0.3
  ).toFixed(1);

  const travelTimeMins = Math.max(1, Math.round(Number(distanceMiles) * 2.5));

  // Find linked competition data if available
  const matchingComp = competitions.find(c => c.id === selectedLocation.competitionId);

  return (
    <div
      id="city-map-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md select-none animate-fadeIn"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-7xl h-[92vh] max-h-[900px] bg-[#0c1017] text-white comic-border-xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.25)]">
        {/* Top GTA HUD Header Bar */}
        <div className="bg-[#141419] border-b-4 border-black px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FF6FB5] border-2 border-black flex items-center justify-center font-headline text-2xl text-white transform -rotate-2">
              <Compass className="w-5 h-5 text-white animate-spin [animation-duration:12s]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline text-2xl sm:text-3xl tracking-wider text-white leading-none">
                  VICE SATELLITE <span className="text-[#00E5FF]">RADAR</span>
                </span>
                <span className="hidden sm:inline-block bg-black text-[#FFD54F] px-2 py-0.5 border border-zinc-700 text-[10px] font-bold uppercase tracking-widest font-mono">
                  LIVE GRID GPS
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 tracking-wider block">
                COORD: 25.7617° N, -80.1918° W // SECTOR: {selectedLocation.sectorTag}
              </span>
            </div>
          </div>

          {/* Quick Filters on Desktop */}
          <div className="hidden lg:flex items-center gap-1.5 bg-black/60 p-1 border border-zinc-800">
            {[
              { id: 'ALL', label: 'ALL BLIPS' },
              { id: 'COMPETITIONS', label: 'MISSIONS' },
              { id: 'CYBER', label: 'CYBER' },
              { id: 'AI', label: 'AI & ALGO' },
              { id: 'WEB3', label: 'WEB3' },
              { id: 'POIS', label: 'HUBS' }
            ].map(tab => (
              <button
                key={tab.id}
                id={`map-filter-${tab.id.toLowerCase()}`}
                onClick={() => setActiveFilter(tab.id)}
                className={`font-headline text-sm px-2.5 py-1 border transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#00E5FF] text-black border-black font-bold shadow-[2px_2px_0px_#000]'
                    : 'bg-transparent text-zinc-400 border-transparent hover:text-white hover:bg-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Action & Close Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="map-toggle-radar-btn"
              onClick={() => setIsRadarSweepActive(!isRadarSweepActive)}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold border-2 border-black transition-all cursor-pointer ${
                isRadarSweepActive
                  ? 'bg-[#FFD54F] text-black shadow-[2px_2px_0px_#000]'
                  : 'bg-zinc-800 text-zinc-400'
              }`}
              title="Toggle radar sweep beam"
            >
              <Radio className="w-3.5 h-3.5" />
              <span className="font-headline text-sm">RADAR {isRadarSweepActive ? 'ON' : 'OFF'}</span>
            </button>

            <button
              id="close-city-map-btn"
              onClick={onClose}
              className="bg-[#FF6FB5] hover:bg-[#00E5FF] hover:text-black text-white p-1.5 sm:px-3 sm:py-1 comic-border-sm transition-all flex items-center gap-1 cursor-pointer shadow-[3px_3px_0px_0px_#000]"
              aria-label="Close Map"
            >
              <X className="w-5 h-5" />
              <span className="hidden sm:inline font-headline text-lg">CLOSE [ESC]</span>
            </button>
          </div>
        </div>

        {/* Main Content Area: Map Canvas (Left/Center) + Tactical Location Dossier (Right) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {/* Map Viewport Area */}
          <div
            className="flex-1 relative overflow-hidden bg-[#090d16] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Dark Grid Lines Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#00E5FF_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF_1px,transparent_1px)] [background-size:40px_40px]" />

            {/* Tactical Scanlines & Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)] z-10" />

            {/* SVG MAP Canvas */}
            <svg
              ref={mapSvgRef}
              viewBox="0 0 1000 750"
              className="w-full h-full max-w-full max-h-full transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                transformOrigin: 'center center'
              }}
            >
              <defs>
                {/* Radial Glow for Radar Center */}
                <radialGradient id="radarCenterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                </radialGradient>

                {/* Radar Sweep Gradient Cone */}
                <linearGradient id="radarSweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
                  <stop offset="70%" stopColor="#00E5FF" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.45" />
                </linearGradient>

                {/* Water Pattern Waves */}
                <pattern id="waterWaves" width="40" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M 0 10 Q 10 5, 20 10 T 40 10"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="0.75"
                    strokeOpacity="0.15"
                  />
                </pattern>

                {/* Road Strip Pattern */}
                <pattern id="roadStrip" width="20" height="20" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="10" x2="20" y2="10" stroke="#1f293d" strokeWidth="6" />
                </pattern>
              </defs>

              {/* 1. Water Background with subtle animated waves */}
              <rect x="0" y="0" width="1000" height="750" fill="#070c16" />
              <rect x="0" y="0" width="1000" height="750" fill="url(#waterWaves)" />

              {/* Coastal Water Shoreline Glow Contours */}
              <path
                d="M 50,700 L 100,500 L 80,300 L 140,150 L 350,80 L 450,120 L 400,280 L 360,420 L 400,600 L 320,720 Z"
                fill="#00E5FF"
                fillOpacity="0.05"
              />
              <path
                d="M 680,680 L 820,680 L 860,400 L 780,180 L 590,90 L 560,220 L 640,380 L 650,560 Z"
                fill="#FF6FB5"
                fillOpacity="0.05"
              />

              {/* 2. Main Landmasses (West Mainland, Starfish Island, East Ocean Beach) */}
              {/* West Mainland (Downtown & Industrial) */}
              <path
                d="M 70,720 L 110,520 L 90,320 L 150,180 L 360,110 L 430,150 L 390,300 L 350,440 L 390,620 L 310,740 Z"
                fill="#121826"
                stroke="#00E5FF"
                strokeWidth="2.5"
                strokeOpacity="0.8"
              />

              {/* Starfish Island (Central High-Security Hub) */}
              <polygon
                points="490,290 560,300 580,380 540,430 470,410 460,340"
                fill="#161f30"
                stroke="#FFD54F"
                strokeWidth="2.5"
                strokeOpacity="0.9"
              />

              {/* East Island (Ocean Drive Strip & North Point) */}
              <path
                d="M 670,700 L 830,700 L 870,410 L 800,160 L 580,80 L 550,210 L 630,370 L 640,550 Z"
                fill="#121826"
                stroke="#FF6FB5"
                strokeWidth="2.5"
                strokeOpacity="0.8"
              />

              {/* Leaf Links Golf & Tech Island (North Center) */}
              <ellipse
                cx="490"
                cy="120"
                rx="60"
                ry="35"
                fill="#101724"
                stroke="#00E5FF"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* 3. Connecting Causeways & Highway Bridges */}
              {/* North Venetian Causeway */}
              <line x1="360" y1="150" x2="580" y2="120" stroke="#FFD54F" strokeWidth="7" />
              <line x1="360" y1="150" x2="580" y2="120" stroke="#000" strokeWidth="3" />

              {/* Starfish West Bridge */}
              <line x1="390" y1="350" x2="470" y2="350" stroke="#FF6FB5" strokeWidth="8" />
              <line x1="390" y1="350" x2="470" y2="350" stroke="#000" strokeWidth="4" />

              {/* Starfish East Bridge */}
              <line x1="570" y1="350" x2="650" y2="380" stroke="#00E5FF" strokeWidth="8" />
              <line x1="570" y1="350" x2="650" y2="380" stroke="#000" strokeWidth="4" />

              {/* South Washington Causeway */}
              <line x1="360" y1="580" x2="660" y2="600" stroke="#FFD54F" strokeWidth="7" />
              <line x1="360" y1="580" x2="660" y2="600" stroke="#000" strokeWidth="3" />

              {/* 4. Internal Street Grid & Highways */}
              {/* West Side Grid Lines */}
              <path
                d="M 120,240 L 370,240 M 130,340 L 370,340 M 160,440 L 350,440 M 200,540 L 350,540 M 220,170 L 220,640 M 290,140 L 290,680"
                stroke="#243147"
                strokeWidth="2.5"
              />

              {/* East Side Ocean Drive Strip Roads */}
              <path
                d="M 620,150 L 780,180 M 650,260 L 800,280 M 670,370 L 820,380 M 680,480 L 830,490 M 700,580 L 830,590 M 730,120 L 760,680 M 790,140 L 820,680"
                stroke="#243147"
                strokeWidth="2.5"
              />

              {/* Major Highway Expressway Rings */}
              <path
                d="M 140,200 Q 300,100 480,180 T 750,200 T 800,600 T 400,680 T 150,450 Z"
                fill="none"
                stroke="#374866"
                strokeWidth="4"
                strokeDasharray="6 4"
              />

              {/* District Labels */}
              <text x="210" y="270" fill="#4b5d7e" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="3">
                DOWNTOWN
              </text>
              <text x="180" y="580" fill="#4b5d7e" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="3">
                VICE DOCKS
              </text>
              <text x="260" y="160" fill="#4b5d7e" fontSize="12" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
                LITTLE HAITI
              </text>
              <text x="490" y="450" fill="#FFD54F" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="2" textAnchor="middle" opacity="0.8">
                STARFISH ISLE
              </text>
              <text x="750" y="230" fill="#4b5d7e" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="3">
                NORTH POINT
              </text>
              <text x="760" y="520" fill="#FF6FB5" fontSize="14" fontWeight="bold" fontFamily="monospace" letterSpacing="3" opacity="0.7">
                OCEAN BEACH
              </text>
              <text x="490" y="85" fill="#4b5d7e" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="2" textAnchor="middle">
                LEAF LINKS
              </text>

              {/* 5. Animated GPS Route Line from HQ to Waypoint / Selected Location */}
              {selectedLocation && selectedLocation.id !== hqLocation.id && (
                <g id="animated-gps-route">
                  {/* Outer Route Scrim */}
                  <path
                    d={`M ${hqLocation.coordinates.x} ${hqLocation.coordinates.y} Q ${
                      (hqLocation.coordinates.x + selectedLocation.coordinates.x) / 2
                    } ${
                      Math.min(hqLocation.coordinates.y, selectedLocation.coordinates.y) - 30
                    } ${selectedLocation.coordinates.x} ${selectedLocation.coordinates.y}`}
                    fill="none"
                    stroke="#000"
                    strokeWidth="8"
                  />
                  {/* Glowing Animated GPS Neon Flow */}
                  <path
                    d={`M ${hqLocation.coordinates.x} ${hqLocation.coordinates.y} Q ${
                      (hqLocation.coordinates.x + selectedLocation.coordinates.x) / 2
                    } ${
                      Math.min(hqLocation.coordinates.y, selectedLocation.coordinates.y) - 30
                    } ${selectedLocation.coordinates.x} ${selectedLocation.coordinates.y}`}
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="4"
                    className="animate-gps-flow"
                  />
                </g>
              )}

              {/* 6. Rotating Radar Sweep Beam (Toggleable) */}
              {isRadarSweepActive && (
                <g transform="translate(500, 375)">
                  <circle cx="0" cy="0" r="420" fill="url(#radarCenterGlow)" />
                  <circle cx="0" cy="0" r="140" fill="none" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.25" />
                  <circle cx="0" cy="0" r="280" fill="none" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.2" />
                  <circle cx="0" cy="0" r="420" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="6 6" />

                  {/* Sweep Cone */}
                  <path
                    d="M 0 0 L 420 0 A 420 420 0 0 1 297 297 Z"
                    fill="url(#radarSweepGrad)"
                    className="animate-radar-sweep pointer-events-none"
                  />
                </g>
              )}

              {/* 7. Active Waypoint Marker Pin (GTA Bouncing Style) */}
              {waypointLocation && (
                <g
                  transform={`translate(${waypointLocation.coordinates.x}, ${waypointLocation.coordinates.y - 32})`}
                  className="animate-waypoint-bounce pointer-events-none z-30"
                >
                  <polygon points="0,0 -9,-20 9,-20" fill="#FFD54F" stroke="#000" strokeWidth="2" />
                  <circle cx="0" cy="-25" r="11" fill="#FFD54F" stroke="#000" strokeWidth="2.5" />
                  <circle cx="0" cy="-25" r="4" fill="#000" />
                </g>
              )}

              {/* 8. Interactive Location Blips */}
              {filteredLocations.map(loc => {
                const isSelected = selectedLocationId === loc.id;
                const isWaypoint = waypointLocationId === loc.id;
                const isHQ = loc.type === 'hq';

                return (
                  <g
                    key={loc.id}
                    id={`map-blip-${loc.id}`}
                    transform={`translate(${loc.coordinates.x}, ${loc.coordinates.y})`}
                    onClick={() => handleLocationClick(loc)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing Radar Ring on Selected / Waypoint / HQ */}
                    {(isSelected || isWaypoint || isHQ) && (
                      <circle
                        cx="0"
                        cy="0"
                        r="18"
                        fill="none"
                        stroke={loc.color}
                        className="animate-[radar-pulse-ring_2s_infinite]"
                      />
                    )}

                    {/* Outer Blip Ring */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 18 : 14}
                      fill={isSelected ? loc.color : '#0c1017'}
                      stroke={isSelected ? '#FFFFFF' : loc.color}
                      strokeWidth={isSelected ? 3.5 : 2.5}
                      className="transition-all duration-200"
                    />

                    {/* Inner Blip Dot */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? '#000000' : loc.color}
                      className="animate-pulse"
                    />

                    {/* Blip Label Tag (Visible on Hover or Selected) */}
                    <g
                      transform={`translate(0, ${isSelected ? -28 : -22})`}
                      className={`transition-opacity duration-150 ${
                        isSelected ? 'opacity-100' : 'opacity-85 group-hover:opacity-100'
                      }`}
                    >
                      <rect
                        x="-55"
                        y="-14"
                        width="110"
                        height="20"
                        fill="#000000"
                        stroke={loc.color}
                        strokeWidth="1.5"
                        rx="2"
                      />
                      <text
                        x="0"
                        y="0"
                        fill="#FFFFFF"
                        fontSize="9.5"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="truncate"
                      >
                        {loc.name.length > 15 ? loc.name.substring(0, 15) + '..' : loc.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* Floating Zoom & Pan Controls on Map Canvas */}
            <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1.5 bg-[#141419]/90 p-1.5 border-2 border-black backdrop-blur-sm shadow-[4px_4px_0px_#000]">
              <button
                id="map-zoom-in-btn"
                onClick={() => handleZoom(0.2)}
                className="w-8 h-8 bg-black hover:bg-[#00E5FF] hover:text-black text-white flex items-center justify-center font-bold border border-zinc-700 transition-colors cursor-pointer"
                title="Zoom In (+)"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                id="map-zoom-out-btn"
                onClick={() => handleZoom(-0.2)}
                className="w-8 h-8 bg-black hover:bg-[#FF6FB5] hover:text-white text-white flex items-center justify-center font-bold border border-zinc-700 transition-colors cursor-pointer"
                title="Zoom Out (-)"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                id="map-recenter-btn"
                onClick={handleResetView}
                className="w-8 h-8 bg-black hover:bg-[#FFD54F] hover:text-black text-white flex items-center justify-center font-bold border border-zinc-700 transition-colors cursor-pointer"
                title="Reset View & Recenter"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Floating Compass Rose & Zoom Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#141419]/80 px-2.5 py-1 border border-zinc-700 backdrop-blur-sm">
              <Compass className="w-4 h-4 text-[#FFD54F]" />
              <span className="font-mono text-xs text-white font-bold">
                ZOOM: {zoomLevel.toFixed(1)}x
              </span>
              <span className="text-zinc-600">|</span>
              <span className="font-mono text-[10px] text-[#00E5FF]">
                GPS LOCK: STABLE
              </span>
            </div>

            {/* Waypoint Set Alert Toast */}
            {showWaypointToast && (
              <div className="absolute top-4 right-4 z-30 bg-[#FFD54F] text-black px-4 py-2 comic-border-sm font-headline text-lg flex items-center gap-2 animate-bounce shadow-[3px_3px_0px_#000]">
                <CheckCircle2 className="w-5 h-5 text-black" />
                <span>WAYPOINT SET TO {waypointLocation.name.toUpperCase()}!</span>
              </div>
            )}
          </div>

          {/* Right Side / Tactical Location Dossier Inspector */}
          <div className="w-full md:w-96 lg:w-[420px] bg-[#12161f] border-t-4 md:border-t-0 md:border-l-4 border-black flex flex-col justify-between overflow-y-auto shrink-0 z-20">
            {/* Dossier Header & Location Search */}
            <div className="p-4 sm:p-5 space-y-4 border-b-2 border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-[#FF6FB5] text-white px-2 py-0.5 border border-black font-headline text-xs tracking-wider">
                    {selectedLocation.sectorTag}
                  </span>
                  <span className="font-mono text-xs text-[#00E5FF] font-bold">
                    {selectedLocation.district}
                  </span>
                </div>

                {/* Security Stars */}
                <div className="flex items-center gap-0.5" title={`Security Rating: ${selectedLocation.securityRating}/5`}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= selectedLocation.securityRating
                          ? 'text-[#FFD54F] fill-[#FFD54F]'
                          : 'text-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Title & Icon */}
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 border-2 border-black flex items-center justify-center shrink-0 shadow-[3px_3px_0px_#000]"
                  style={{ backgroundColor: selectedLocation.color, color: '#000' }}
                >
                  {renderLocationIcon(selectedLocation.iconType, 'w-6 h-6')}
                </div>
                <div>
                  <h3 className="font-headline text-2xl sm:text-3xl text-white leading-none">
                    {selectedLocation.name}
                  </h3>
                  <span className="font-mono text-xs text-zinc-400 block mt-0.5">
                    {selectedLocation.building} • {selectedLocation.room}
                  </span>
                </div>
              </div>

              {/* Distance & GPS Route Readout */}
              <div className="grid grid-cols-2 gap-2 bg-black/60 p-2.5 border border-zinc-800 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">Distance from HQ:</span>
                  <span className="font-mono font-bold text-[#00E5FF]">{distanceMiles} Miles</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">Est. Travel Time:</span>
                  <span className="font-mono font-bold text-[#FFD54F]">~{travelTimeMins} Mins (Transit)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                {selectedLocation.description}
              </p>

              {/* Track & Bounty Badges if Competition */}
              {selectedLocation.track && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="bg-[#1a2333] text-[#00E5FF] px-2.5 py-1 text-xs font-bold border border-zinc-700">
                    Track: {selectedLocation.track}
                  </span>
                  {selectedLocation.bounty && (
                    <span className="bg-[#1a2333] text-[#FFD54F] px-2.5 py-1 text-xs font-bold border border-zinc-700">
                      Bounty: {selectedLocation.bounty}
                    </span>
                  )}
                </div>
              )}

              {/* Schedule & Team Size */}
              <div className="space-y-1.5 text-xs text-zinc-400 bg-[#0c1017] p-2.5 border border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Calendar className="w-3.5 h-3.5 text-[#FF6FB5]" />
                  <span>{selectedLocation.schedule || 'Scheduled at Event Time'}</span>
                </div>
                {selectedLocation.teamSize && (
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Users className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Squad Capacity: Up to {selectedLocation.teamSize} Operatives</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Location Directory List */}
            <div className="p-4 sm:p-5 flex-1 space-y-3 overflow-y-auto">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Select Landmark / Drop Zone:
                </span>
                <span className="font-mono text-[10px] text-zinc-500">
                  {filteredLocations.length} BLIPS
                </span>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {CITY_LOCATIONS.map(loc => {
                  const isSelected = loc.id === selectedLocationId;
                  const isWaypoint = loc.id === waypointLocationId;
                  return (
                    <button
                      key={loc.id}
                      id={`location-list-item-${loc.id}`}
                      onClick={() => handleLocationClick(loc)}
                      className={`w-full text-left px-2.5 py-1.5 border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#FF6FB5] text-white border-black font-bold shadow-[2px_2px_0px_#000]'
                          : 'bg-[#090d16] text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: loc.color }}
                        />
                        <span className="text-xs truncate font-medium">{loc.name}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {isWaypoint && (
                          <span className="bg-[#FFD54F] text-black text-[9px] px-1 font-bold">
                            GPS
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-zinc-400">
                          {loc.sectorTag}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: Set Waypoint & Inspect Track */}
            <div className="p-4 sm:p-5 border-t-2 border-zinc-800 bg-[#0c1017] space-y-2 shrink-0">
              <button
                id="set-gps-waypoint-btn"
                onClick={() => handleSetWaypoint(selectedLocation.id)}
                className="w-full bg-[#FFD54F] hover:bg-[#00E5FF] text-black font-headline text-lg sm:text-xl py-2.5 comic-border-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#000]"
              >
                <Navigation className="w-5 h-5 text-black" />
                <span>
                  {waypointLocationId === selectedLocation.id
                    ? 'WAYPOINT CURRENTLY LOCKED'
                    : 'LOCK GPS WAYPOINT'}
                </span>
              </button>

              {matchingComp && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="inspect-location-comp-btn"
                    onClick={() => {
                      if (onSelectCompetition) {
                        onSelectCompetition(matchingComp);
                        onClose();
                      }
                    }}
                    className="bg-[#00E5FF] hover:bg-white text-black font-headline text-base py-2 comic-border-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#000]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>INSPECT TRACK</span>
                  </button>

                  <button
                    id="deploy-crew-location-btn"
                    onClick={() => {
                      if (onDeployCrew) {
                        onDeployCrew(matchingComp.id);
                        onClose();
                      }
                    }}
                    className="bg-[#FF6FB5] hover:bg-[#FFD54F] hover:text-black text-white font-headline text-base py-2 comic-border-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#000]"
                  >
                    <Users className="w-4 h-4" />
                    <span>DEPLOY SQUAD</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
