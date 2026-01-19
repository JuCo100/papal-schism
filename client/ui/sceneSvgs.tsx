import React from "react";
import Svg, { Path, Circle, Line, G } from "react-native-svg";
import { SceneSvgKey } from "@/data/gameTypes";
import { ViewStyle } from "react-native";

interface SceneSvgProps {
  width?: number;
  height?: number;
  style?: ViewStyle;
}

// Simple crown SVG
function CrownSvg({ width = 160, height = 90, style }: SceneSvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 90" style={style}>
      <Path
        d="M20 60 L40 30 L50 40 L60 25 L70 40 L80 25 L90 40 L100 25 L110 40 L120 30 L140 60 Z"
        fill="none"
        stroke="#C9A961"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="50" cy="20" r="5" fill="#C9A961" opacity="0.6" />
      <Circle cx="80" cy="15" r="5" fill="#C9A961" opacity="0.6" />
      <Circle cx="110" cy="20" r="5" fill="#C9A961" opacity="0.6" />
    </Svg>
  );
}

// Simple candles SVG
function CandlesSvg({ width = 160, height = 90, style }: SceneSvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 90" style={style}>
      {/* Left candle */}
      <Path d="M40 30 L50 30 L50 70 L40 70 Z" fill="#8B5A00" />
      <Circle cx="45" cy="25" r="3" fill="#FFD700" />
      <Path d="M43 22 Q45 20 47 22" stroke="#FFA500" strokeWidth="1.5" fill="none" />
      
      {/* Middle candle */}
      <Path d="M70 25 L80 25 L80 70 L70 70 Z" fill="#8B5A00" />
      <Circle cx="75" cy="20" r="3" fill="#FFD700" />
      <Path d="M73 17 Q75 15 77 17" stroke="#FFA500" strokeWidth="1.5" fill="none" />
      
      {/* Right candle */}
      <Path d="M100 30 L110 30 L110 70 L100 70 Z" fill="#8B5A00" />
      <Circle cx="105" cy="25" r="3" fill="#FFD700" />
      <Path d="M103 22 Q105 20 107 22" stroke="#FFA500" strokeWidth="1.5" fill="none" />
    </Svg>
  );
}

// Simple swords SVG
function SwordsSvg({ width = 160, height = 90, style }: SceneSvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 90" style={style}>
      {/* Left sword */}
      <Line x1="50" y1="20" x2="50" y2="70" stroke="#CCCCCC" strokeWidth="4" strokeLinecap="round" />
      <Path d="M45 25 L50 20 L55 25 L50 28 Z" fill="#8B0000" />
      
      {/* Right sword (crossed) */}
      <Line x1="110" y1="20" x2="110" y2="70" stroke="#CCCCCC" strokeWidth="4" strokeLinecap="round" />
      <Path d="M105 25 L110 20 L115 25 L110 28 Z" fill="#8B0000" />
      
      {/* Cross guard */}
      <Line x1="45" y1="50" x2="55" y2="50" stroke="#999999" strokeWidth="3" />
      <Line x1="105" y1="50" x2="115" y2="50" stroke="#999999" strokeWidth="3" />
    </Svg>
  );
}

// Simple wheat SVG
function WheatSvg({ width = 160, height = 90, style }: SceneSvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 90" style={style}>
      {/* Left stalk */}
      <Path d="M40 60 Q40 30 50 25" stroke="#DAA520" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Circle cx="50" cy="25" r="4" fill="#DAA520" opacity="0.7" />
      <Path d="M45 35 L55 35" stroke="#DAA520" strokeWidth="2" />
      <Path d="M45 45 L55 45" stroke="#DAA520" strokeWidth="2" />
      
      {/* Middle stalk */}
      <Path d="M80 60 Q80 25 85 20" stroke="#DAA520" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Circle cx="85" cy="20" r="4" fill="#DAA520" opacity="0.7" />
      <Path d="M80 35 L90 35" stroke="#DAA520" strokeWidth="2" />
      <Path d="M80 45 L90 45" stroke="#DAA520" strokeWidth="2" />
      
      {/* Right stalk */}
      <Path d="M120 60 Q120 30 130 25" stroke="#DAA520" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Circle cx="130" cy="25" r="4" fill="#DAA520" opacity="0.7" />
      <Path d="M125 35 L135 35" stroke="#DAA520" strokeWidth="2" />
      <Path d="M125 45 L135 45" stroke="#DAA520" strokeWidth="2" />
    </Svg>
  );
}

// Simple mask SVG
function MaskSvg({ width = 160, height = 90, style }: SceneSvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 90" style={style}>
      {/* Mask outline */}
      <Path
        d="M50 50 Q60 35 70 40 Q80 45 90 40 Q100 35 110 50 Q100 60 80 65 Q60 60 50 50"
        fill="none"
        stroke="#2F4F2F"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left eye */}
      <Circle cx="70" cy="45" r="6" fill="none" stroke="#1A2A1A" strokeWidth="2" />
      <Circle cx="70" cy="45" r="3" fill="#1A2A1A" />
      {/* Right eye */}
      <Circle cx="90" cy="45" r="6" fill="none" stroke="#1A2A1A" strokeWidth="2" />
      <Circle cx="90" cy="45" r="3" fill="#1A2A1A" />
      {/* Decorative lines */}
      <Path d="M65 55 Q80 50 95 55" stroke="#1A2A1A" strokeWidth="2" fill="none" />
    </Svg>
  );
}

// Simple split cross SVG
function SplitCrossSvg({ width = 160, height = 90, style }: SceneSvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 90" style={style}>
      {/* Left side cross */}
      <Line x1="50" y1="30" x2="50" y2="60" stroke="#C9A961" strokeWidth="5" strokeLinecap="round" />
      <Line x1="40" y1="45" x2="60" y2="45" stroke="#C9A961" strokeWidth="5" strokeLinecap="round" />
      
      {/* Right side cross */}
      <Line x1="110" y1="30" x2="110" y2="60" stroke="#8B0000" strokeWidth="5" strokeLinecap="round" />
      <Line x1="100" y1="45" x2="120" y2="45" stroke="#8B0000" strokeWidth="5" strokeLinecap="round" />
      
      {/* Split line */}
      <Line x1="80" y1="20" x2="80" y2="70" stroke="#666666" strokeWidth="2" strokeDasharray="4,4" />
    </Svg>
  );
}

// Simple scales SVG
function ScalesSvg({ width = 160, height = 90, style }: SceneSvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 90" style={style}>
      {/* Base */}
      <Path d="M70 75 L90 75" stroke="#CCCCCC" strokeWidth="4" strokeLinecap="round" />
      {/* Central pillar */}
      <Line x1="80" y1="75" x2="80" y2="45" stroke="#CCCCCC" strokeWidth="3" strokeLinecap="round" />
      {/* Beam */}
      <Line x1="50" y1="45" x2="110" y2="45" stroke="#CCCCCC" strokeWidth="3" strokeLinecap="round" />
      {/* Left pan */}
      <Path d="M50 45 Q45 50 45 55 Q45 60 50 60 Q55 60 55 55 Q55 50 50 45" 
            stroke="#999999" strokeWidth="2" fill="none" />
      <Line x1="50" y1="45" x2="50" y2="52" stroke="#999999" strokeWidth="2" />
      {/* Right pan */}
      <Path d="M110 45 Q105 50 105 55 Q105 60 110 60 Q115 60 115 55 Q115 50 110 45" 
            stroke="#999999" strokeWidth="2" fill="none" />
      <Line x1="110" y1="45" x2="110" y2="52" stroke="#999999" strokeWidth="2" />
      {/* Weights */}
      <Circle cx="50" cy="58" r="3" fill="#CCCCCC" />
      <Circle cx="110" cy="58" r="3" fill="#CCCCCC" />
    </Svg>
  );
}

const SVG_COMPONENTS: Record<SceneSvgKey, React.ComponentType<SceneSvgProps>> = {
  crown: CrownSvg,
  candles: CandlesSvg,
  swords: SwordsSvg,
  wheat: WheatSvg,
  mask: MaskSvg,
  split_cross: SplitCrossSvg,
  scales: ScalesSvg,
};

export function getSceneSvg(key: SceneSvgKey | undefined): React.ComponentType<SceneSvgProps> | null {
  if (!key) return null;
  return SVG_COMPONENTS[key] || null;
}

export function renderSceneSvg(key: SceneSvgKey | undefined, props?: SceneSvgProps) {
  const Component = getSceneSvg(key);
  if (!Component) return null;
  return <Component {...props} />;
}
