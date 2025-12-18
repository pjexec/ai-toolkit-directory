import React, { useState, useMemo } from 'react';

const tools = [
  // === CORE LLMs ===
  {
    name: "ChatGPT (Pro)",
    category: "Core LLM",
    rating: 5,
    capabilities: ["reasoning", "strategy", "ideation", "prompt engineering", "code scaffolding", "copywriting", "negotiation scripts", "design iteration", "PRDs", "legal structuring", "memory hub", "thinking", "synthesis", "image generation", "video generation"],
    notes: "Primary AI operating system. Co-founder level. Central memory hub. Image gen recently upgraded to Nano Banana level.",
    status: "primary"
  },
  {
    name: "Claude",
    category: "Core LLM",
    rating: 4,
    capabilities: ["deep reasoning", "long-form synthesis", "alternative perspective", "thinking", "analysis"],
    notes: "Strong at reasoning and synthesis. Secondary to ChatGPT but valued for different thinking style.",
    status: "active"
  },
  {
    name: "Gemini 3 Pro",
    category: "Core LLM",
    rating: 4,
    capabilities: ["reasoning", "image generation", "app building", "structured output"],
    notes: "Powers Nano Banana Pro. Strong execution engine.",
    status: "active"
  },
  {
    name: "Grok",
    category: "Core LLM",
    rating: 2,
    capabilities: ["comparative awareness", "ecosystem familiarity"],
    notes: "Not a core daily tool. More observational than relied upon.",
    status: "occasional"
  },
  // === IMAGE GENERATION ===
  {
    name: "Nano Banana Pro",
    category: "Image Generation",
    rating: 5,
    capabilities: ["AI image generation", "ad creative", "scroll-stopper visuals", "image prompting", "visual ads", "image from text"],
    notes: "Powered by Gemini 3 Pro. Primary for AI images. Has pros/cons vs ChatGPT—need both.",
    status: "primary"
  },
  {
    name: "ChatGPT Image Gen",
    category: "Image Generation",
    rating: 5,
    capabilities: ["AI image generation", "image from text", "image creation", "visual content"],
    notes: "Just upgraded (Dec 2024). Now competitive with Nano Banana. Has different strengths—need both.",
    status: "primary"
  },
  // === VIDEO GENERATION ===
  {
    name: "Veo3 (via Flow)",
    category: "Video Generation",
    rating: 5,
    capabilities: ["AI video generation", "video from text", "video from image", "image to video", "video creation"],
    notes: "Google's video gen. Accessed via Flow website. Has pros/cons vs Sora—need both.",
    status: "primary"
  },
  {
    name: "Sora (ChatGPT)",
    category: "Video Generation",
    rating: 5,
    capabilities: ["AI video generation", "video from text", "video from image", "image to video", "video creation"],
    notes: "ChatGPT's video gen. Has different strengths than Veo3—need both.",
    status: "primary"
  },
  // === APP / WEBSITE BUILDERS ===
  {
    name: "Google AI Studio (Anti-Gravity)",
    category: "App Builder",
    rating: 5,
    capabilities: ["app building", "web app generation", "CRM prototypes", "internal tools", "website apps", "website building", "Mac app"],
    notes: "Mac app. Primary for app building recently. Also proficient for websites. Execution engine.",
    status: "primary"
  },
  {
    name: "Lovable",
    category: "App Builder",
    rating: 5,
    capabilities: ["website design", "app UI generation", "vibe-coding", "rapid prototyping", "web development", "landing pages", "websites"],
    notes: "Fast with strong aesthetics. Primary for websites. Replaced Bolt and Netlify.",
    status: "primary"
  },
  {
    name: "Base44",
    category: "App Builder",
    rating: 3,
    capabilities: ["website building", "app building", "web development"],
    notes: "Recently tested. Has pros/cons. Still evaluating.",
    status: "testing"
  },
  {
    name: "Aura.build",
    category: "App Builder",
    rating: 3,
    capabilities: ["website building", "app building", "web development"],
    notes: "Recently tested. Has pros/cons. Still evaluating.",
    status: "testing"
  },
  {
    name: "Bolt.new",
    category: "App Builder",
    rating: 2,
    capabilities: ["site deployment", "hosting"],
    notes: "Moved away from. Not flexible enough long-term.",
    status: "abandoned"
  },
  // === VOICE AI ===
  {
    name: "Retell AI",
    category: "Voice AI Platform",
    rating: 5,
    capabilities: ["voice receptionist", "voice agent", "web call widgets", "hero demos", "restaurant AI", "HVAC AI", "phone answering", "voice AI"],
    notes: "Primary voice platform. Trusted for real sales demos. Strong UX control. Beats Vapi for production.",
    status: "primary"
  },
  {
    name: "Vapi.ai",
    category: "Voice AI Platform",
    rating: 3,
    capabilities: ["voice agent templates", "prototyping", "voice AI comparison"],
    notes: "Template-oriented. Useful for comparison but not primary stack.",
    status: "secondary"
  },
  // === MEMORY / TRANSCRIPTION ===
  {
    name: "Limitless AI",
    category: "Memory / Lifelogging",
    rating: 5,
    capabilities: ["life-logging", "meeting capture", "transcript generation", "memory ingestion", "conversation recording"],
    notes: "Primary raw memory tool. Highly valued. Beats Fathom for continuous capture.",
    status: "primary"
  },
  {
    name: "Fathom",
    category: "Meeting Transcription",
    rating: 3,
    capabilities: ["video meeting transcripts", "call summaries", "meeting recording"],
    notes: "Utility-focused. Secondary to Limitless.",
    status: "secondary"
  },
  // === AUTOMATION ===
  {
    name: "n8n",
    category: "Automation Platform",
    rating: 5,
    capabilities: ["advanced automation", "API-less workarounds", "POS integrations", "event-driven workflows", "complex logic", "custom automation"],
    notes: "Preferred when control is required. Systems-level tool. Beats Zapier for complex work.",
    status: "primary"
  },
  {
    name: "Zapier",
    category: "Automation Platform",
    rating: 4,
    capabilities: ["trigger automation", "quick connections", "data movement", "simple automation"],
    notes: "Reliable but limiting. Used when speed matters more than flexibility.",
    status: "active"
  },
  {
    name: "Pipedream",
    category: "Automation / Integration",
    rating: 4,
    capabilities: ["syncing transcripts", "custom pipelines", "API glue", "developer automation"],
    notes: "Developer-friendly. Useful glue between systems.",
    status: "active"
  },
  {
    name: "Rube",
    category: "Automation Platform",
    rating: 3,
    capabilities: ["automation triggers", "workflow experimentation"],
    notes: "Part of experimentation stack.",
    status: "experimental"
  },
  // === KNOWLEDGE / STORAGE ===
  {
    name: "Notion",
    category: "Knowledge Management",
    rating: 4,
    capabilities: ["knowledge storage", "project tracking", "reference material", "documentation"],
    notes: "Knowledge warehouse, not thinking engine. Wants AI-readable exports.",
    status: "active"
  },
  {
    name: "Google Docs / Sheets",
    category: "Documentation / Data",
    rating: 4,
    capabilities: ["transcripts", "spreadsheets", "CRM tracking", "exports", "data storage"],
    notes: "Chosen for interoperability. Neutral infrastructure.",
    status: "active"
  },
  {
    name: "NotebookLM",
    category: "AI Research Tool",
    rating: 3,
    capabilities: ["MD file ingestion", "secondary reasoning", "research synthesis"],
    notes: "Consumer of memory, not a source.",
    status: "planned"
  },
  // === EMAIL ===
  {
    name: "ManyReach",
    category: "Cold Email Platform",
    rating: 4,
    capabilities: ["cold email sending", "account warm-up", "throttle control", "outreach campaigns", "email outreach"],
    notes: "Extreme caution on deliverability. Focus on safe sending and reputation.",
    status: "primary"
  },
  {
    name: "Klaviyo",
    category: "Email Service Provider",
    rating: 5,
    capabilities: ["ESP integration", "email marketing", "flows", "automation", "deliverability"],
    notes: "Deep expertise. Infrastructure, not strategy tool.",
    status: "expert"
  },
  {
    name: "Mailchimp",
    category: "Email Service Provider",
    rating: 4,
    capabilities: ["ESP integration", "email marketing", "campaigns"],
    notes: "Deep familiarity. No tolerance for shallow deliverability advice.",
    status: "expert"
  },
  {
    name: "SendGrid",
    category: "Email Service Provider",
    rating: 4,
    capabilities: ["ESP integration", "transactional email", "sending infrastructure"],
    notes: "Treated as sending infrastructure.",
    status: "active"
  },
  // === DESIGN ===
  {
    name: "Canva",
    category: "Design Platform",
    rating: 4,
    capabilities: ["presentations", "documents", "social content", "visual assets", "quick design"],
    notes: "Utility-focused. Speed over design purity.",
    status: "active"
  },
  // === VIDEO OUTREACH ===
  {
    name: "Venna AI",
    category: "Personalized Video",
    rating: 4,
    capabilities: ["templated video", "personalized outreach video", "video prospecting", "cold outreach video"],
    notes: "Used for cold email video outreach.",
    status: "active"
  },
  // === HOSTING ===
  {
    name: "Netlify",
    category: "Hosting / Deployment",
    rating: 3,
    capabilities: ["hosting", "site deployment", "DNS"],
    notes: "Infrastructure-only. DNS/SSL friction experienced.",
    status: "secondary"
  },
  // === POS / RESTAURANT ===
  {
    name: "FoodTec POS",
    category: "POS System",
    rating: 2,
    capabilities: ["POS integration", "restaurant orders"],
    notes: "Closed ecosystem frustration. Actively seeking API-less hacks.",
    status: "problematic"
  },
  {
    name: "Chowly",
    category: "POS Middleware",
    rating: 3,
    capabilities: ["POS connectivity", "middleware bridge"],
    notes: "Considered a bridge, not ideal.",
    status: "evaluated"
  },
  // === MISC / MOCKUPS ===
  {
    name: "BotMockups",
    category: "Chat UI Mockup Tool",
    rating: 2,
    capabilities: ["web chat mockups", "chatbot previews"],
    notes: "Platform limitations. Template duplication issues. Building from scratch is easier.",
    status: "abandoned"
  },
  // === CONCEPTUAL ===
  {
    name: "Atlas",
    category: "Agent / OS Layer",
    rating: 3,
    capabilities: ["agent thinking", "AI OS concepts"],
    notes: "Conceptual OS thinking rather than finished product.",
    status: "conceptual"
  },
  {
    name: "QuickSilver OS",
    category: "Agent / OS Layer",
    rating: 3,
    capabilities: ["workflow acceleration", "agent orchestration"],
    notes: "Mental model more than concrete tool.",
    status: "conceptual"
  }
];

const categories = [...new Set(tools.map(t => t.category))].sort();

const statusColors = {
  primary: "bg-green-100 text-green-800 border-green-300",
  active: "bg-blue-100 text-blue-800 border-blue-300",
  secondary: "bg-gray-100 text-gray-600 border-gray-300",
  expert: "bg-purple-100 text-purple-800 border-purple-300",
  experimental: "bg-yellow-100 text-yellow-800 border-yellow-300",
  testing: "bg-amber-100 text-amber-700 border-amber-300",
  occasional: "bg-gray-100 text-gray-500 border-gray-200",
  planned: "bg-indigo-100 text-indigo-700 border-indigo-300",
  evaluated: "bg-orange-100 text-orange-700 border-orange-300",
  abandoned: "bg-red-100 text-red-700 border-red-300",
  problematic: "bg-red-100 text-red-600 border-red-300",
  conceptual: "bg-slate-100 text-slate-600 border-slate-300"
};

const StarRating = ({ rating, onRate }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate && onRate(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={`text-lg transition-colors ${
            star <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'
          } ${onRate ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const ToolCard = ({ tool, onUpdateRating }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{tool.name}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ml-2 ${statusColors[tool.status] || statusColors.active}`}>
          {tool.status}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <StarRating rating={tool.rating} onRate={(r) => onUpdateRating(tool.name, r)} />
        <span className="text-xs text-gray-500 truncate">{tool.category}</span>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-3">{tool.notes}</p>

      <button 
        onClick={() => setExpanded(!expanded)}
        className="text-xs text-blue-600 hover:text-blue-800"
      >
        {expanded ? '− Hide capabilities' : '+ Show capabilities'}
      </button>

      {expanded && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tool.capabilities.map((cap, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {cap}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default function AIToolkitDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minRating, setMinRating] = useState(1);
  const [showPrimaryOnly, setShowPrimaryOnly] = useState(false);
  const [toolRatings, setToolRatings] = useState({});

  const handleUpdateRating = (toolName, newRating) => {
    setToolRatings(prev => ({ ...prev, [toolName]: newRating }));
  };

  const getToolRating = (tool) => {
    return toolRatings[tool.name] ?? tool.rating;
  };

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) return false;
      if (getToolRating(tool) < minRating) return false;
      if (showPrimaryOnly && tool.status !== 'primary') return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(query);
        const matchesCapability = tool.capabilities.some(cap => 
          cap.toLowerCase().includes(query)
        );
        const matchesNotes = tool.notes.toLowerCase().includes(query);
        const matchesCategory = tool.category.toLowerCase().includes(query);

        if (!matchesName && !matchesCapability && !matchesNotes && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => getToolRating(b) - getToolRating(a));
  }, [searchQuery, selectedCategory, minRating, showPrimaryOnly, toolRatings]);

  const taskExamples = [
    "image to video",
    "voice receptionist",
    "app building", 
    "website",
    "automation",
    "image generation",
    "email outreach",
    "transcription"
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">AI Toolkit Directory</h1>
          <p className="text-gray-600 text-sm">Search by task. Click stars to update ratings. {tools.length} tools indexed.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What do you want to do?
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., create video from images, build landing page, automate workflow..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="mt-2 flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-500">Try:</span>
              {taskExamples.map((example) => (
                <button
                  key={example}
                  onClick={() => setSearchQuery(example)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Min Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value={1}>Any</option>
                <option value={3}>3+ ★</option>
                <option value={4}>4+ ★</option>
                <option value={5}>5 ★</option>
              </select>
            </div>

            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPrimaryOnly}
                  onChange={(e) => setShowPrimaryOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Primary only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-3 text-sm text-gray-600">
          {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
          {searchQuery && ` for "${searchQuery}"`}
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <ToolCard 
              key={tool.name} 
              tool={{...tool, rating: getToolRating(tool)}} 
              onUpdateRating={handleUpdateRating}
            />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No tools match your search. Try different keywords or clear filters.
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-xs font-medium text-gray-500 mb-2">STATUS KEY</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusColors).map(([status, colors]) => (
              <span key={status} className={`text-xs px-2 py-1 rounded-full border ${colors}`}>
                {status}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}