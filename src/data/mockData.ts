import { StudentProject, Program, CurriculumStep, ResourceItem, FAQItem, Testimonial } from '../types';
import superMario2dCoverImg from '../assets/images/super_mario_2d_cover.png';
import realizationAlbumArtImg from '../assets/images/realization_album_art.jpg';
import onlineVideoEditorImg from '../assets/images/online_video_editor_screenshot.png';
import foundersPhotoImg from '../assets/images/founders_exact_photo_1786064058231.jpg';
import aiAnimationBannerImg from '../assets/images/ai_animation_banner.jpg';
import aiAnimationYoutubeThumbImg from '../assets/images/ai_animation_youtube_thumb.jpg';
import aiCodingBannerImg from '../assets/images/ai_coding_banner.jpg';
import aiMusicBannerImg from '../assets/images/ai_music_banner.jpg';
import curriculumModule1PreviewImg from '../assets/images/curriculum_module1_preview.png';
import curriculumModule2PreviewImg from '../assets/images/curriculum_module2_preview.png';
import curriculumModule3PreviewImg from '../assets/images/curriculum_module3_preview.png';
import curriculumModule4PreviewImg from '../assets/images/curriculum_module4_preview.png';
import curriculumModule5PreviewImg from '../assets/images/curriculum_module5_preview.png';
import curriculumModule6PreviewImg from '../assets/images/curriculum_module6_preview.png';
import curriculumModule7PreviewImg from '../assets/images/curriculum_module7_preview.png';
import realizationAudio from '../assets/audio/Realization.m4a';
import realizationScreenshotImg from '../assets/images/realization_screenshot.png';
import ghostTownCoverImg from '../assets/images/ghost_town_cover.png';
import laughingInTheLightAudio from '../assets/audio/Laughing_in_the_Light.m4a';
import theOnlyTacoCoverImg from '../assets/images/the_only_taco_cover.png';

export const FOUNDERS_INFO = {
  names: "Ameya Gupta & Pranay Gupta",
  title: "Founders & Student Instructors",
  bio: "Founded in 2026 by Ameya Gupta (a High School student) and Pranay Gupta (a Middle School student) passionate about computer science, artificial intelligence, and creative technology. Ameya and Pranay realized that while middle schoolers use AI daily for quick answers, few understand how AI works or how to harness it to make original animations, music, games, and code ethically.",
  image: foundersPhotoImg,
};

export const STATISTICS = [
  { value: 100, suffix: "+", label: "Student Projects Created", desc: "Original animations, games & tracks" },
  { value: 10, suffix: "+", label: "AI Tools Introduced", desc: "Ethical & age-appropriate platforms" },
  { value: 100, suffix: "%", label: "Project-Based Learning", desc: "Every student builds a portfolio" },
  { value: 2, suffix: ":1", label: "Student-to-Mentor Ratio", desc: "Small interactive cohorts" }
];

export const WHY_US_FEATURES = [
  {
    title: "Creative Learning",
    desc: "Students build original artwork, songs, and code instead of passively consuming screen content.",
    icon: "Palette",
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Project-Based",
    desc: "Every single session ends with a tangible project that students present and take home.",
    icon: "Rocket",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Ethical AI First",
    desc: "Critical thinking, copyright awareness, and responsible AI usage are integrated into every lesson.",
    icon: "ShieldCheck",
    color: "from-teal-400 to-emerald-600"
  },
  {
    title: "Small Class Sizes",
    desc: "Max 10 students per workshop for personalized guidance and peer collaboration.",
    icon: "Users",
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "Hands-On Tinkering",
    desc: "Students learn by experimenting with prompts, code blocks, audio stems, and visual layers.",
    icon: "Cpu",
    color: "from-cyan-500 to-blue-600"
  },
  {
    title: "Future Ready",
    desc: "Build computational literacy, prompt logic, and digital confidence for high school & beyond.",
    icon: "Sparkles",
    color: "from-violet-500 to-purple-600"
  }
];

export const PROGRAMS: Program[] = [
  {
    id: "summer-camp",
    title: "Summer AI Explorer Camp",
    status: "Completed",
    subtitle: "1-Week Intensive Hands-On Creative AI Workshop.",
    description: "Our flagship program! Middle schoolers dive into AI animation, music synthesis, prompt engineering, storytelling, and coding games. Includes peer presentations on Friday.",
    duration: "1 Week (Mon-Fri, 2:00 PM - 4:00 PM)",
    schedule: "Cohort A: July 6-10 | Cohort B: Aug 3-7",
    targetAudience: "Rising 6th - 9th Graders",
    highlights: [
      "1 animation, 1 song, 1 game",
      "End-of-camp Showcase Exhibition for parents"
    ],
    iconName: "Sun",
    badge: "Completed",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    signupText: "COMPLETED, new link will be released before the summer of 2027",
    showQrCode: false
  },
  {
    id: "weekend-explorers",
    title: "Weekend AI Explorers",
    status: "Open for Registration",
    subtitle: "8-Week Saturday & Sunday Creator Labs (1 Hour/Week)",
    description: "A recurring weekend program where students continue building advanced projects, exploring new generative models, and collaborating on multiplayer games during the school year.",
    duration: "8 Weeks (1 Hour/Week, Saturday & Sunday options)",
    schedule: "2026-2027 school year",
    targetAudience: "Grades 5-9",
    highlights: [],
    iconName: "Calendar",
    badge: "2026-2027",
    gradient: "from-purple-600 to-pink-600",
    signupUrl: "https://forms.gle/nS32w1b1BCvaJoDr8"
  },
  {
    id: "school-workshops",
    title: "Online Video Recordings to Master AI Like a Pro",
    status: "Available Now",
    subtitle: "Self-Paced On-Demand AI Video Masterclass",
    description: "Self-paced video recordings covering generative AI tools, prompt engineering, digital media creation, and hands-on projects to master AI like a pro.",
    duration: "3 hours in total recordings",
    schedule: "On-demand self-paced",
    targetAudience: "5th to 12th Graders",
    highlights: [],
    iconName: "Video",
    badge: "Masterclass Videos",
    gradient: "from-teal-500 to-cyan-600",
    videoItems: [
      {
        id: "ai-animations",
        header: "AI Animations",
        videoUrl: "https://www.youtube.com/watch?v=heaTgXNPrdA",
        thumbnailUrl: aiAnimationYoutubeThumbImg,
        status: "available",
        badge: "Watch on YouTube"
      },
      {
        id: "ai-coding",
        header: "AI Coding",
        thumbnailUrl: aiCodingBannerImg,
        status: "coming-soon",
        badge: "Coming Soon"
      },
      {
        id: "ai-music",
        header: "AI Music",
        thumbnailUrl: aiMusicBannerImg,
        status: "coming-soon",
        badge: "Coming Soon"
      }
    ]
  }
];

export const CURRICULUM_STEPS: CurriculumStep[] = [
  {
    stepNumber: 1,
    title: "Introduction to AI",
    shortDesc: "Demystifying artificial intelligence, machine learning & neural networks.",
    detailedOutcome: "Students learn how AI processes pattern recognition vs human imagination, play interactive classifier games, and establish safety guidelines.",
    toolsUsed: [],
    sampleProject: "",
    iconName: "Brain",
    previewImage: curriculumModule1PreviewImg
  },
  {
    stepNumber: 2,
    title: "Prompt Engineering",
    shortDesc: "Mastering clear, descriptive, and imaginative instructions.",
    detailedOutcome: "Discover how adjectives, perspectives, lighting cues, and constraints transform generic AI responses into highly focused creative outputs.",
    toolsUsed: ["Prompt Canvas", "ChatGPT"],
    sampleProject: "",
    iconName: "Terminal",
    previewImage: curriculumModule2PreviewImg
  },
  {
    stepNumber: 3,
    title: "Image Generation",
    shortDesc: "Turning text concepts into vivid digital illustration & concept art.",
    detailedOutcome: "Explore style parameters, lighting, brushstrokes, and ethics regarding artist attribution and original creation.",
    toolsUsed: ["KIE.ai", "Nano Banana 2"],
    sampleProject: "",
    iconName: "Image",
    previewImage: curriculumModule3PreviewImg
  },
  {
    stepNumber: 4,
    title: "Animation & Motion",
    shortDesc: "Breathing life into static graphics with frame AI interpolation.",
    detailedOutcome: "Learn keyframing basics, camera motion prompts, and looping background synthesis for digital storytelling.",
    toolsUsed: ["KIE.ai", "Seedance 1.5 Pro", "ElevenLabs", "CapCut"],
    sampleProject: "",
    iconName: "Film",
    previewImage: curriculumModule4PreviewImg
  },
  {
    stepNumber: 5,
    title: "Music & Audio Stems",
    shortDesc: "Composing original melodies, ambient tracks, and sound effects.",
    detailedOutcome: "Understand tempo, mood tags, verse/chorus structures, and combining generated stems with human digital audio workstation edits.",
    toolsUsed: ["Suno", "ChatGPT", "Claude"],
    sampleProject: "",
    iconName: "Music",
    previewImage: curriculumModule5PreviewImg
  },
  {
    stepNumber: 6,
    title: "Coding with AI",
    shortDesc: "Using AI co-pilots to write, debug, and expand Scratch & JavaScript logic.",
    detailedOutcome: "Students write natural language prompts that AI translates into executable game loops, score variables, and particle effects.",
    toolsUsed: ["Google AI Studio", "Grok", "Replit"],
    sampleProject: "You can develop games with AI Code.",
    iconName: "Code",
    previewImage: curriculumModule6PreviewImg
  },
  {
    stepNumber: 7,
    title: "Creative Final Project",
    shortDesc: "Designing and presenting a capstone portfolio piece.",
    detailedOutcome: "Students pitch their project idea, iterate with high school student mentors, write a short creator statement on ethical usage, and present live to families.",
    toolsUsed: ["Google Slides", "Canva"],
    sampleProject: "",
    iconName: "Trophy",
    previewImage: curriculumModule7PreviewImg
  }
];

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: "proj-1",
    title: "The Backpack Portal",
    studentName: "Student Creator",
    studentGrade: "Middle School Student",
    category: "Animation",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    tools: ["ElevenLabs", "Kie.ai", "Seedance 1.5 Pro"],
    description: "A short fiction animation of a kid discovering a new adventure hidden inside his backpack!",
    featured: true,
    showcaseAvailable: false,
    fullContent: {
      keyFeatures: ["Audio generation", "Stable Frame"],
      teacherNotes: "The student did a great job in writing a creative prompt!"
    }
  },
  {
    id: "proj-7",
    title: "Homework Hero 3000",
    studentName: "Created as a class",
    studentGrade: "Class Project",
    category: "Animation",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    tools: ["ElevenLabs", "Kie.ai", "Seedance 1.5 Pro", "Nano Banana 2", "Pixabay", "Capcut"],
    description: "An animation advertisement sponsoring a robot called the 'Homework Hero 3000.'",
    featured: true,
    showcaseAvailable: false,
    fullContent: {
      keyFeatures: ["Audio generation", "Stable Frame"]
    }
  },
  {
    id: "proj-11",
    title: "The Only Taco",
    studentName: "Created as a class",
    studentGrade: "Class Project",
    category: "Animation",
    thumbnailUrl: theOnlyTacoCoverImg,
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    tools: ["ElevenLabs", "Kie.ai", "Seedance 1.5 Pro", "Nano Banana 2", "Pixabay", "Capcut"],
    description: "An animation about how a boy ate the first and last ever taco.",
    featured: true,
    showcaseAvailable: true,
    youtubeUrl: "https://www.youtube.com/watch?v=C3ilEGii8G4",
    fullContent: {
      keyFeatures: ["Audio generation", "Stable Frame", "YouTube Video Release"]
    }
  },
  {
    id: "proj-2",
    title: "Super Mario 2D",
    studentName: "Student Creator",
    studentGrade: "Middle School Student",
    category: "Games",
    thumbnailUrl: superMario2dCoverImg,
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    tools: ["Google AI Studio", "Mario Instructions"],
    description: "An interactive browser platformer where students pick a character and jump through obstacles, up until the last level to defeat Bowser and save Princess Peach!",
    featured: true,
    showcaseAvailable: true,
    isInteractiveGame: true,
    gameId: "mario",
    fullContent: {
      keyFeatures: [
        "Playable 2D Platformer Engine with 60 FPS Canvas Physics",
        "6 Playable Characters (Mario, Luigi, Toad, Peach, Yoshi, Wario)",
        "4 Themed Worlds + Secret Bonus Pipe Level",
        "Bowser Boss Battle with Fireballs & Bridge Collapse",
        "Interactive HUD with Lives, Coins, Score, and Character Shop",
        "Chiptune BGM and Retro Sound Effects Engine"
      ],
      teacherNotes: "Made prompt within 30 mins, and generated a game with full collision mechanics, animations, and sound effects."
    }
  },
  {
    id: "proj-9",
    title: "Harry Potter 2D",
    studentName: "Student Creator",
    studentGrade: "Middle School Student",
    category: "Games",
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    tools: ["Google AI Studio"],
    description: "An interactive Harry Potter inspired game. Showcase not available.",
    featured: true,
    showcaseAvailable: false,
    fullContent: {
      keyFeatures: ["Music", "Instructions", "Interactive", "Showcase not available"]
    }
  },
  {
    id: "proj-3",
    title: "Realization",
    studentName: "Created as a class",
    studentGrade: "Class Project",
    category: "Music",
    thumbnailUrl: realizationScreenshotImg,
    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    tools: ["Suno AI", "ChatGPT", "Claude"],
    description: "A song made about how others feelings don't make you happy.",
    featured: true,
    audioUrl: realizationAudio,
    showcaseAvailable: true,
    fullContent: {
      keyFeatures: ["Copyright-free student release", "Custom album cover art"]
    }
  },
  {
    id: "proj-10",
    title: "Ghost Town",
    studentName: "Created as a class",
    studentGrade: "Class Project",
    category: "Music",
    thumbnailUrl: ghostTownCoverImg,
    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    tools: ["ChatGPT Plus", "Claude Pro", "Suno AI"],
    description: "A song about how a creepy beginning can become a joyful ending.",
    featured: true,
    audioUrl: laughingInTheLightAudio,
    showcaseAvailable: true,
    fullContent: {
      keyFeatures: ["Copyright-free student release", "Custom album cover art", "Original student lyrics & composition"]
    }
  },
  {
    id: "proj-6",
    title: "Online video editor.",
    studentName: "Student Creator",
    studentGrade: "Middle School Student",
    category: "Coding",
    thumbnailUrl: onlineVideoEditorImg,
    badgeColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
    tools: ["Google AI Studio", "ChatGPT"],
    description: "An online video editor, designed to build animations, videos, or anything of your imagination.",
    featured: true,
    showcaseAvailable: true,
    isInteractiveEditor: true,
    editorId: "video-editor",
    fullContent: {
      keyFeatures: ["Transitions & Effects", "High Video Quality", "Timeline Control", "Web Application Build", "Browser-based Multi-track Timeline", "Procedural Audio Synthesizer"]
    }
  },
  {
    id: "proj-8",
    title: "Sushi Restaurant",
    studentName: "Student Creator",
    studentGrade: "Middle School Student",
    category: "Coding",
    badgeColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
    tools: ["Google AI Studio"],
    description: "A virtual dining place, where you can take your own order, and create your own food!",
    featured: true,
    showcaseAvailable: false,
    fullContent: {
      keyFeatures: ["Music", "Instructions"]
    }
  }
];

export const PARENT_WHY_REASONS = [
  {
    title: "Creativity Over Passive Screen Time",
    desc: "Instead of mindlessly scrolling algorithms, students become active creators who code, draw, and compose.",
    icon: "Lightbulb"
  },
  {
    title: "Safe & Responsible AI Practices",
    desc: "We prioritize safety, data privacy, bias identification, and ethical boundaries from day one.",
    icon: "Shield"
  },
  {
    title: "Small Interactive Cohorts",
    desc: "With max 10 students per session, every child gets personalized mentorship and encouraging feedback.",
    icon: "Heart"
  },
  {
    title: "Gains Confidence & Public Speaking Skills",
    desc: "Every Friday, students demonstrate their projects to peers and families in a supportive environment.",
    icon: "Award"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Ameya and Pranay did a great job. They made sure each kid is at the same page as they are. I liked how they called on each kid to check if they had reached the same spot as them.",
    parentName: "Verified Parent",
    studentDetail: "AI Explorers Family",
    avatarBg: "bg-blue-500",
    rating: 5
  },
  {
    id: "t2",
    quote: "Thank you Pranay and Ameya for this wonderful initiative! Seeing this innovation, I think you are doing a great job encouraging the kids to develop these projects! Thank you!",
    parentName: "Verified Parent",
    studentDetail: "AI Explorers Family",
    avatarBg: "bg-purple-500",
    rating: 5
  },
  {
    id: "t3",
    quote: "A very good program to introduce the kids to AI tools, and that was wonderful! Although, the account sign up process needs parental support, the program is still great!",
    parentName: "Verified Parent",
    studentDetail: "AI Explorers Family",
    avatarBg: "bg-teal-500",
    rating: 5
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Who can join AI Explorers programs?",
    answer: "Our workshops are designed specifically for middle school students (typically 5th to 9th graders, ages 10-14). The soon-to-be-released video recordings are recommended for kids from 5th-12th grade.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "Do students need prior coding or AI experience?",
    answer: "For all of our programs, no prior coding or computer science experience is required!",
    category: "General"
  },
  {
    id: "faq-3",
    question: "What computer or equipment is required?",
    answer: "Students only need a modern laptop (Chromebook, Mac, or Windows PC) with a Google Chrome browser and a stable internet connection. All software used is web-based.",
    category: "Tech Requirements"
  },
  {
    id: "faq-4",
    question: "Which AI tools are introduced in the curriculum?",
    answer: "We curate age-appropriate, kid-safe AI tools including KIE.ai, Nano Banana 2, Seedance 1.5 Pro, ElevenLabs, Suno AI, Google AI Studio, etc.",
    category: "Tech Requirements"
  },
  {
    id: "faq-5",
    question: "How much does the program cost?",
    answer: "As a student-led non-profit, our camp fees differ by course. Currently, our summer program for the 2027 summer break is not decided. The cost for the 8-Week Weekend camp is estimated at $25, plus around $15 more for the AI tools. When the recordings are released, they are planned to be free.",
    category: "Enrollment"
  },
  {
    id: "faq-6",
    question: "How do you handle AI safety, privacy, and ethics?",
    answer: "Safety is our core foundation. We teach students how to identify misinformation, respect digital copyright, avoid plagiarism, and use AI ethically.",
    category: "Safety & Ethics"
  }
];

export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: "res-1",
    title: "Parent's Guide to Generative AI in Middle School",
    category: "Beginner AI Guides",
    summary: "A practical guide explaining what AI tools your middle schooler is encountering and how to encourage safe exploration.",
    readTime: "5 min read",
    difficulty: "Beginner",
    format: "Article",
    contentSnippet: "Generative AI is transforming how middle schoolers learn and play. Rather than banning these tools, guided hands-on creation builds critical literacy...",
    linkText: "Read Complete Guide",
    downloadable: true
  },
  {
    id: "res-2",
    title: "The Ultimate Prompt Engineering Cheat Sheet for Kids",
    category: "Recommended AI Tools",
    summary: "10 clear prompt formulas (Role + Task + Context + Style) for crafting awesome illustrations, stories, and code hints.",
    readTime: "3 min read",
    difficulty: "Beginner",
    format: "Cheatsheet",
    contentSnippet: "Formula: [Act as a digital artist] + [Draw a futuristic turtle] + [In neon cyberpunk style with dramatic volumetric lighting].",
    linkText: "Download Cheat Sheet PDF",
    downloadable: true
  },
  {
    id: "res-3",
    title: "5 Principles of Responsible & Ethical AI Use",
    category: "Responsible AI",
    summary: "Our official AI Explorers student pledge: Honesty, Attribution, Safety, Bias Awareness, and Human Originality.",
    readTime: "4 min read",
    difficulty: "All Ages",
    format: "Article",
    contentSnippet: "Principle 1: Always credit AI assistance when used. Principle 2: Never input private personal info into public models...",
    linkText: "View Student Safety Pledge"
  },
  {
    id: "res-4",
    title: "Top 7 Kid-Friendly AI Creative Tools for 2026",
    category: "Recommended AI Tools",
    summary: "A curated list of safe, ad-free, web-based tools where students can build animations, music, and games without paywalls.",
    readTime: "6 min read",
    difficulty: "Intermediate",
    format: "Interactive",
    contentSnippet: "1. Google Teachable Machine (Free, instant machine vision in browser). 2. Scratch AI Blocks. 3. BandLab Education...",
    linkText: "Explore Tool Registry"
  },
  {
    id: "res-5",
    title: "How to Build Your First Scratch Computer Vision Game",
    category: "Student Tutorials",
    summary: "Step-by-step video & text tutorial to build a hand-tracking game using machine learning models in Scratch.",
    readTime: "10 min tutorial",
    difficulty: "Intermediate",
    format: "Video Guide",
    contentSnippet: "Step 1: Open the Teachable Machine extension. Step 2: Record 30 samples of 'hand open' vs 'fist closed'...",
    linkText: "Start Tutorial"
  },
  {
    id: "res-6",
    title: "Cyberbullying & Privacy Protections for Young Creators",
    category: "Internet Safety",
    summary: "Essential advice for keeping student personal details, face scans, and voice samples secure online.",
    readTime: "4 min read",
    difficulty: "All Ages",
    format: "Article",
    contentSnippet: "Protecting identity in the AI era means teaching children to never upload unverified photo portraits or private home addresses...",
    linkText: "Read Safety Advisory"
  }
];
