import { StoryNode } from "./gameTypes";

export const storyNodes: StoryNode[] = [
  {
    id: "opening",
    sceneVisual: "coronation",
    sceneIcon: "👑",
    sceneTitle: "Coronation",
    sceneSvgKey: "crown",
    dialogue: [
      "The Sistine Chapel falls silent.",
      "Cardinals have cast their votes. The smoke rises white.",
      "They have chosen you.",
      "You kneel before the altar as the papal tiara descends upon your head.",
      "The weight is heavier than you imagined.",
      "Outside, Europe burns. France and England tear each other apart. The Holy Roman Emperor schemes. Castile eyes new conquests.",
      "And now, all eyes turn to Rome.",
    ],
    choices: [
      {
        id: "humble",
        text: "Accept with humility. Promise reform.",
        statDeltas: { piety: 10, legitimacy: 5 },
        relationshipDeltas: {},
        nextNodeId: "first_council",
        consequence: "The faithful weep with hope.",
      },
      {
        id: "power",
        text: "Accept with authority. Promise order.",
        statDeltas: { legitimacy: 10, curia: 5 },
        relationshipDeltas: {},
        nextNodeId: "first_council",
        consequence: "The cardinals nod approvingly.",
      },
      {
        id: "reluctant",
        text: "Accept with visible reluctance.",
        statDeltas: { piety: 5, curia: -5 },
        relationshipDeltas: {},
        nextNodeId: "first_council",
        consequence: "Some question your resolve.",
      },
    ],
  },
  {
    id: "first_council",
    sceneVisual: "council",
    sceneIcon: "🕯️",
    sceneTitle: "Council",
    sceneSvgKey: "candles",
    dialogue: [
      "Days pass. Your first council convenes.",
      "Cardinal Orsini speaks first. His voice carries decades of ambition.",
      "\"Holy Father, the war between France and England threatens all Christendom. King Philip demands our blessing for his campaign.\"",
      "Cardinal de Luna interjects. \"And King Edward expects our neutrality. Both have... offered generous donations.\"",
      "The word 'donations' hangs in the air like incense.",
    ],
    choices: [
      {
        id: "bless_france",
        text: "Bless France's cause. Accept their gold.",
        statDeltas: { gold: 20, piety: -10 },
        relationshipDeltas: { france: 30, england: -30 },
        addFlags: ["blessed_france"],
        nextNodeId: "war_escalates",
        consequence: "Gold flows to Rome. So does blood.",
      },
      {
        id: "bless_england",
        text: "Support England. Their cause is equally just.",
        statDeltas: { gold: 15, piety: -10 },
        relationshipDeltas: { england: 30, france: -30 },
        addFlags: ["blessed_england"],
        nextNodeId: "war_escalates",
        consequence: "The French ambassador storms out.",
      },
      {
        id: "neutrality",
        text: "Declare papal neutrality. Refuse both.",
        statDeltas: { piety: 10, gold: -10 },
        relationshipDeltas: { france: -10, england: -10 },
        addFlags: ["stayed_neutral"],
        nextNodeId: "war_escalates",
        consequence: "Neither king is pleased.",
      },
    ],
  },
  {
    id: "war_escalates",
    sceneVisual: "war",
    sceneIcon: "⚔️",
    sceneTitle: "War",
    sceneSvgKey: "swords",
    dialogue: [
      "Months pass. The war grows worse.",
      "Messengers bring reports of burned villages. Massacred civilians. Churches desecrated.",
      "A letter arrives from the front. The army you blessed has committed atrocities.",
      "Witnesses speak of entire towns put to the sword. Women. Children.",
      "The cardinal who delivered the news waits for your response.",
    ],
    timedDecision: {
      timeLimit: 10,
      defaultChoiceIndex: 2,
    },
    choices: [
      {
        id: "condemn",
        text: "Condemn the atrocities publicly.",
        statDeltas: { piety: 15, legitimacy: -10 },
        relationshipDeltas: { france: -20, england: -20 },
        addFlags: ["condemned_atrocities"],
        nextNodeId: "famine_begins",
        consequence: "Your words echo across Europe.",
      },
      {
        id: "cover_up",
        text: "Suppress the reports. Protect the alliance.",
        statDeltas: { piety: -20, curia: 10 },
        addFlags: ["covered_atrocities"],
        nextNodeId: "famine_begins",
        consequence: "The truth is buried. For now.",
      },
      {
        id: "silence",
        text: "Say nothing. Let it pass.",
        statDeltas: { piety: -10, stability: -10 },
        addFlags: ["silent_on_atrocities"],
        nextNodeId: "famine_begins",
        consequence: "Your silence speaks volumes.",
      },
    ],
  },
  {
    id: "famine_begins",
    sceneVisual: "famine",
    sceneIcon: "🌾",
    sceneTitle: "Famine",
    sceneSvgKey: "wheat",
    dialogue: [
      "Winter comes early. Harvests fail across the continent.",
      "Refugees flood into Rome. Gaunt faces. Hollow eyes.",
      "The papal granaries hold enough to feed thousands. But not everyone.",
      "Cardinal Borgia approaches with a proposal.",
      "\"Holy Father, wealthy nobles seek indulgences. Their gold could feed many. But...\"",
      "He doesn't need to finish. You understand. Selling salvation.",
    ],
    choices: [
      {
        id: "sell_indulgences",
        text: "Sell indulgences. Use the gold for relief.",
        statDeltas: { gold: 25, piety: -15, stability: 10 },
        addFlags: ["sold_indulgences"],
        nextNodeId: "scandal_brewing",
        consequence: "The hungry are fed. At what cost?",
      },
      {
        id: "empty_granaries",
        text: "Empty the papal granaries. Give freely.",
        statDeltas: { gold: -20, piety: 20, stability: 5 },
        addFlags: ["gave_freely"],
        nextNodeId: "scandal_brewing",
        consequence: "The people call you a saint.",
      },
      {
        id: "ration_strictly",
        text: "Ration strictly. Prioritize the able-bodied.",
        statDeltas: { stability: 5, piety: -10, legitimacy: -5 },
        addFlags: ["rationed_food"],
        nextNodeId: "scandal_brewing",
        consequence: "Many still starve.",
      },
    ],
  },
  {
    id: "scandal_brewing",
    sceneVisual: "scandal",
    sceneIcon: "🎭",
    sceneTitle: "Scandal",
    sceneSvgKey: "mask",
    dialogue: [
      "Spring brings no relief. Only scandal.",
      "A young scribe discovers documents. Payments. Bribes. Secrets.",
      "Cardinal Orsini's personal ledger reveals decades of corruption.",
      "The scribe brings them to you, trembling.",
      "\"Holy Father, if this becomes known... the Church itself...\"",
      "Orsini controls a third of the Curia. His allies are everywhere.",
    ],
    timedDecision: {
      timeLimit: 10,
      defaultChoiceIndex: 1,
    },
    choices: [
      {
        id: "expose_orsini",
        text: "Expose Orsini. Begin a purge of corruption.",
        statDeltas: { piety: 20, curia: -30, legitimacy: 10 },
        addFlags: ["purged_corruption"],
        nextNodeId: "emperor_demands",
        consequence: "The Curia turns against you.",
      },
      {
        id: "blackmail_orsini",
        text: "Use the documents as leverage. Control him.",
        statDeltas: { curia: 15, piety: -15 },
        addFlags: ["blackmailed_orsini"],
        nextNodeId: "emperor_demands",
        consequence: "Now you are complicit.",
      },
      {
        id: "burn_documents",
        text: "Burn the documents. Protect the institution.",
        statDeltas: { stability: 10, piety: -20 },
        addFlags: ["protected_corruption"],
        nextNodeId: "emperor_demands",
        consequence: "The scribe looks at you differently now.",
      },
    ],
  },
  {
    id: "emperor_demands",
    sceneVisual: "council",
    sceneIcon: "🕯️",
    sceneTitle: "Council",
    sceneSvgKey: "candles",
    dialogue: [
      "The Holy Roman Emperor's ambassador arrives unannounced.",
      "He carries a demand. The Emperor wishes to appoint his own bishops.",
      "\"His Imperial Majesty believes the Church has grown... too independent.\"",
      "Behind the diplomatic language, a threat lurks.",
      "The Emperor's armies dwarf those of the Papal States.",
      "But to yield is to surrender the Church's authority.",
    ],
    choices: [
      {
        id: "refuse_emperor",
        text: "Refuse absolutely. The Church bows to no king.",
        statDeltas: { legitimacy: 15, stability: -20 },
        relationshipDeltas: { holyRomanEmpire: -40 },
        addFlags: ["defied_emperor"],
        nextNodeId: "castile_offer",
        consequence: "War clouds gather.",
      },
      {
        id: "negotiate",
        text: "Negotiate. Offer some concessions.",
        statDeltas: { stability: 10, legitimacy: -10 },
        relationshipDeltas: { holyRomanEmpire: 10 },
        addFlags: ["negotiated_emperor"],
        nextNodeId: "castile_offer",
        consequence: "A fragile compromise.",
      },
      {
        id: "submit",
        text: "Accept his terms. Survival demands flexibility.",
        statDeltas: { stability: 20, legitimacy: -25, piety: -10 },
        relationshipDeltas: { holyRomanEmpire: 30 },
        addFlags: ["submitted_emperor"],
        nextNodeId: "castile_offer",
        consequence: "The Church becomes a puppet.",
      },
    ],
  },
  {
    id: "castile_offer",
    sceneVisual: "council",
    sceneIcon: "🕯️",
    sceneTitle: "Council",
    sceneSvgKey: "candles",
    dialogue: [
      "Castile sends a different kind of offer.",
      "King Alfonso proposes an alliance. A crusade against the Moors.",
      "\"Reconquer the holy lands of Iberia,\" his letter reads. \"Unite Christendom behind a righteous cause.\"",
      "But you know the truth. Alfonso wants papal legitimacy for conquest.",
      "And his armies have their own reputation for... excess.",
    ],
    choices: [
      {
        id: "bless_crusade",
        text: "Bless the crusade. Channel Europe's violence outward.",
        statDeltas: { gold: 15, piety: -10, stability: 15 },
        relationshipDeltas: { castile: 40 },
        addFlags: ["blessed_crusade"],
        nextNodeId: "schism_threat",
        consequence: "Blood will flow in God's name.",
      },
      {
        id: "refuse_crusade",
        text: "Refuse. This is conquest, not holy war.",
        statDeltas: { piety: 15, gold: -10 },
        relationshipDeltas: { castile: -30 },
        addFlags: ["refused_crusade"],
        nextNodeId: "schism_threat",
        consequence: "Alfonso calls you a coward.",
      },
      {
        id: "delay_crusade",
        text: "Promise consideration. Buy time.",
        statDeltas: { stability: 5 },
        relationshipDeltas: { castile: -10 },
        addFlags: ["delayed_crusade"],
        nextNodeId: "schism_threat",
        consequence: "Alfonso's patience wears thin.",
      },
    ],
  },
  {
    id: "schism_threat",
    sceneVisual: "schism",
    sceneIcon: "✝️",
    sceneTitle: "Schism",
    sceneSvgKey: "split_cross",
    dialogue: [
      "The worst news arrives at midnight.",
      "A council of cardinals in Avignon has elected their own Pope.",
      "They call you illegitimate. A usurper. A heretic.",
      "The antipope has the backing of powerful interests.",
      "Christendom itself threatens to tear in two.",
      "Your advisors present options. None are good.",
    ],
    choices: [
      {
        id: "excommunicate",
        text: "Excommunicate the antipope and all who follow him.",
        statDeltas: { legitimacy: -10, piety: 10, stability: -15 },
        addFlags: ["excommunicated_antipope"],
        nextNodeId: "final_crisis",
        consequence: "The schism deepens.",
      },
      {
        id: "negotiate_schism",
        text: "Seek dialogue. Offer to share power.",
        statDeltas: { legitimacy: -20, stability: 10 },
        addFlags: ["negotiated_schism"],
        nextNodeId: "final_crisis",
        consequence: "Some call it wisdom. Others call it weakness.",
      },
      {
        id: "crush_opposition",
        text: "Use every tool. Bribery. Threats. Whatever it takes.",
        statDeltas: { curia: 20, piety: -25, gold: -20 },
        addFlags: ["crushed_opposition"],
        nextNodeId: "final_crisis",
        consequence: "Your hands grow darker.",
      },
    ],
  },
  {
    id: "final_crisis",
    sceneVisual: "war",
    sceneIcon: "⚔️",
    sceneTitle: "Final Crisis",
    sceneSvgKey: "swords",
    dialogue: [
      "A year of your papacy. It feels like a lifetime.",
      "War still rages. Famine still kills. The schism still threatens.",
      "But tonight, a new crisis demands your attention.",
      "The army of the Holy Roman Emperor marches on Rome.",
      "Your own generals estimate three days until they arrive.",
      "The people look to you. The cardinals look to you.",
      "One final choice.",
    ],
    choices: [
      {
        id: "flee",
        text: "Flee Rome. Preserve the papacy in exile.",
        statDeltas: { legitimacy: -30, stability: -20 },
        addFlags: ["fled_rome"],
        nextNodeId: "judgment",
        consequence: "You abandon the Eternal City.",
      },
      {
        id: "fight",
        text: "Stay and fight. Die a martyr if necessary.",
        statDeltas: { legitimacy: 20, piety: 20, stability: -10 },
        addFlags: ["stood_ground"],
        nextNodeId: "judgment",
        consequence: "Your courage inspires thousands.",
      },
      {
        id: "surrender",
        text: "Negotiate surrender. Save the city from destruction.",
        statDeltas: { stability: 20, legitimacy: -15, gold: -25 },
        relationshipDeltas: { holyRomanEmpire: 20 },
        addFlags: ["surrendered"],
        nextNodeId: "judgment",
        consequence: "Rome is spared. Your legacy is not.",
      },
      {
        id: "alliance",
        text: "Call upon your allies. Every debt, every favor.",
        statDeltas: { curia: -20, gold: -20 },
        addFlags: ["called_allies"],
        nextNodeId: "judgment",
        consequence: "Everything depends on who answers.",
      },
    ],
  },
  {
    id: "judgment",
    sceneVisual: "judgment",
    sceneIcon: "⚖️",
    sceneTitle: "Judgment",
    sceneSvgKey: "scales",
    dialogue: [
      "History will remember you.",
      "Every choice. Every compromise. Every soul saved or damned by your hand.",
      "You came to the throne in a time of chaos.",
      "And now...",
    ],
    isEnding: true,
  },
];

export function getNodeById(id: string): StoryNode | undefined {
  return storyNodes.find((node) => node.id === id);
}

export function calculateEnding(
  stats: { legitimacy: number; gold: number; piety: number; stability: number; curia: number },
  flags: string[]
): { title: string; text: string } {
  const { legitimacy, piety, stability, curia } = stats;
  
  const avgScore = (legitimacy + piety + stability + curia) / 4;
  
  if (flags.includes("stood_ground") && piety > 60 && legitimacy > 50) {
    return {
      title: "The Martyr Pope",
      text: "You stood when others fled. Whether Rome falls or not, your name becomes legend. Generations will speak of the Pope who faced death with faith unshaken. Your sacrifice inspires the faithful for centuries to come.",
    };
  }
  
  if (flags.includes("fled_rome") && stability < 30) {
    return {
      title: "The Exile",
      text: "You fled, and Rome burned. The antipope took your throne. History judges you harshly—a coward who abandoned his flock. Yet in exile, you preserved what you could. The true Church survived, if diminished.",
    };
  }
  
  if (flags.includes("covered_atrocities") && flags.includes("sold_indulgences")) {
    return {
      title: "The Corrupt Throne",
      text: "Your papacy became synonymous with everything wrong with the Church. You covered sins, sold salvation, and traded souls for gold. Reformers will speak your name as a curse for generations. The seeds of schism grow deep.",
    };
  }
  
  if (flags.includes("purged_corruption") && piety > 70) {
    return {
      title: "The Reformer",
      text: "Against all odds, you cleaned house. The corrupt feared you. The faithful praised you. Your reforms came at a cost—allies turned enemies, stability sacrificed for righteousness. But the Church emerges stronger.",
    };
  }
  
  if (curia > 70 && flags.includes("blackmailed_orsini")) {
    return {
      title: "The Puppetmaster",
      text: "You learned the game and played it better than anyone. Every cardinal dances on your strings. The Church is stable, if hollow. You have power, but at what cost to your soul?",
    };
  }
  
  if (flags.includes("surrendered") && stability > 60) {
    return {
      title: "The Pragmatist",
      text: "You saved Rome through surrender. The people live, even if they live under occupation. History will debate whether you were wise or weak. But children grow up in homes that would have burned. Perhaps that is enough.",
    };
  }
  
  if (avgScore > 60) {
    return {
      title: "The Steady Hand",
      text: "You navigated impossible choices with reasonable competence. The Church survives. Europe still burns, but no more than when you arrived. In these dark times, that may be the best anyone could achieve.",
    };
  }
  
  if (avgScore < 30) {
    return {
      title: "The Failed Papacy",
      text: "Everything crumbled under your reign. Wars worsened. Famine spread. The schism deepened. Whether through incompetence or malice, your papacy accelerated the Church's decline. Your name becomes a cautionary tale.",
    };
  }
  
  return {
    title: "The Forgotten Pope",
    text: "Your papacy was neither triumph nor disaster. You made choices, some good, some terrible. In time, your name fades from memory, just another Pope in an endless succession. Perhaps that is mercy.",
  };
}
