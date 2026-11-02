import { StudentProject, Program, CurriculumStep, ResourceItem, FAQItem, Testimonial } from '../types';
import superMario2dCoverImg from '../assets/images/super_mario_2d_cover.png';
import realizationAlbumArtImg from '../assets/images/realization_album_art.jpg';
import onlineVideoEditorImg from '../assets/images/online_video_editor_screenshot.png';
import foundersPhotoImg from '../assets/images/founders_exact_photo_1786064058231.jpg';
import aiAnimationBannerImg from '../assets/images/ai_animation_banner.jpg';
import aiAnimationYoutubeThumbImg from '../assets/images/ai_animation_youtube_thumb.jpg';
import aiCodingBannerImg from '../assets/images/ai_coding_banner.jpg';
import aiMusicBannerImg from '../assets/images/ai_music_banner.jpg';
import icebreakerPreviewImg from '../assets/images/icebreaker_screenshot.png';
import aiDiscussionPreviewImg from '../assets/images/ai_discussion_screenshot.png';
import teachingConceptPreviewImg from '../assets/images/teaching_concept_screenshot.png';
import conclusionPreviewImg from '../assets/images/conclusion_screenshot.png';
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
  { value: 4, suffix: ":1", label: "Student-to-Mentor Ratio", desc: "Small interactive cohorts" }
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
    desc: "Max 16 students per workshop for personalized guidance and peer collaboration.",
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
    gradient: "from-blue-600 via-indigo-600 to-purple-600"
  },
  {
    id: "weekend-explorers",
    title: "Weekend AI Explorer Camp",
    status: "Open for Registration",
    subtitle: "4-Week Creator Labs (2 Hours/Week)",
    description: "A recurring weekend program where students continue building advanced projects, exploring new generative models, and collaborating on multiplayer games during the school year.",
    duration: "4 Weeks (2 Hours/Week)",
    schedule: "4-6 PM PST",
    targetAudience: "Grades 5-9",
    highlights: [
      "1 animation, 1 song, 1 game, 1 avatar",
      "frequent blooket review games"
    ],
    iconName: "Calendar",
    gradient: "from-purple-600 to-pink-600"
  }
];

export const CURRICULUM_STEPS: CurriculumStep[] = [
  {
    stepNumber: 1,
    title: "Icebreaker",
    shortDesc: "To personally know a little bit more about each student!",
    detailedOutcome: "To personally know a little bit more about each student!",
    purpose: "To personally know a little bit more about each student!",
    toolsUsed: [],
    sampleProject: "",
    iconName: "Users",
    previewImage: icebreakerPreviewImg
  },
  {
    stepNumber: 2,
    title: "AI Discussion",
    shortDesc: "To build on the students knowledge of the topic, before actually exploring it!",
    detailedOutcome: "To build on the students knowledge of the topic, before actually exploring it!",
    purpose: "To build on the students knowledge of the topic, before actually exploring it!",
    toolsUsed: [],
    sampleProject: "",
    iconName: "Brain",
    previewImage: aiDiscussionPreviewImg
  },
  {
    stepNumber: 3,
    title: "Teaching the concept",
    shortDesc: "So the student knows how to make there project!",
    detailedOutcome: "So the student knows how to make there project!",
    purpose: "So the student knows how to make there project!",
    toolsUsed: [],
    sampleProject: "",
    iconName: "Sparkles",
    previewImage: teachingConceptPreviewImg
  },
  {
    stepNumber: 4,
    title: "Making your own",
    shortDesc: "So the student knows how to make there project!",
    detailedOutcome: "So the student knows how to make there project!",
    purpose: "So the student knows how to make there project!",
    toolsUsed: [],
    sampleProject: "",
    iconName: "Film",
    videoUrl: "https://www.youtube.com/watch?v=C3ilEGii8G4"
  },
  {
    stepNumber: 5,
    title: "Conclusion",
    shortDesc: "To show us that the student took some key takeaways from the session!",
    detailedOutcome: "To show us that the student took some key takeaways from the session!",
    purpose: "To show us that the student took some key takeaways from the session!",
    toolsUsed: [],
    sampleProject: "",
    iconName: "Trophy",
    previewImage: conclusionPreviewImg
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
    desc: "With max 16 students per session, every child gets personalized mentorship and encouraging feedback.",
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
    answer: "As a student-led non-profit, our camp fees differ by course. Currently, the cost for our summer program for the 2027 summer break is not decided. The cost for the 4-Week Weekend camp is $30, including the AI Tools. The recordings are free and you can watch them on youtube.",
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
    id: "how-to-make-ai-animations",
    title: "How to Make AI Animations",
    category: "Tutorials",
    format: "Video",
    summary: "Learn how to transform text prompts and character images into cinematic AI animations using video models, camera motions, and CapCut editing.",
    url: "https://www.youtube.com/watch?v=heaTgXNPrdA",
    thumbnailUrl: aiAnimationYoutubeThumbImg,
    badge: "Featured Masterclass",
    tags: ["YouTube Video", "AI Animation", "Video Generation", "CapCut"],
    isFeatured: true,
    readTime: "Video Tutorial",
    difficulty: "All Levels",
    linkText: "Watch on YouTube"
  },
  {
    id: "tool-kie-ai",
    title: "kie.ai",
    category: "Tools",
    format: "Tool",
    summary: "AI video generation and animation platform for turning character prompts and creative ideas into dynamic motion sequences.",
    url: "https://kie.ai",
    badge: "AI Animation & Video",
    tags: ["Video Generation", "Animation", "Creative AI"],
    difficulty: "All Levels",
    linkText: "Visit kie.ai"
  },
  {
    id: "tool-elevenlabs",
    title: "ElevenLabs",
    category: "Tools",
    format: "Tool",
    summary: "High-fidelity voice synthesis, AI voiceovers, character dialogues, and dynamic audio effects for storytelling and animation.",
    url: "https://elevenlabs.io/",
    badge: "Voice Synthesis & FX",
    tags: ["Voice AI", "Sound Effects", "Dialogue"],
    difficulty: "All Levels",
    linkText: "Visit elevenlabs.io"
  },
  {
    id: "tool-suno",
    title: "Suno",
    category: "Tools",
    format: "Tool",
    summary: "AI music generator that creates full songs, background tracks, vocal harmonies, and soundscapes from text prompts.",
    url: "https://suno.com",
    badge: "AI Music Studio",
    tags: ["Music Generation", "Soundtracks", "Audio"],
    difficulty: "All Levels",
    linkText: "Visit suno.com"
  },
  {
    id: "tool-google-ai-studio",
    title: "Google AI Studio",
    category: "Tools",
    format: "Tool",
    summary: "Google's developer sandbox to test Gemini models, craft system instructions, brainstorm storyboards, and generate game code.",
    url: "https://aistudio.google.com/",
    badge: "Gemini Playground",
    tags: ["Gemini AI", "Prompt Engineering", "Coding Logic"],
    difficulty: "Intermediate",
    linkText: "Visit aistudio.google.com"
  },
  {
    id: "tool-heygen",
    title: "HeyGen",
    category: "Tools",
    format: "Tool",
    summary: "State-of-the-art AI avatar video creator for generating realistic speaking avatars, video presentations, and animated presenters.",
    url: "https://app.heygen.com",
    badge: "AI Avatars & Presenters",
    tags: ["Digital Avatars", "Talking Video", "Presentations"],
    difficulty: "All Levels",
    linkText: "Visit app.heygen.com"
  },
  {
    id: "pdf-ethical-ai-principles",
    title: "5 Principles of Responsible & Ethical AI Use",
    category: "Safety",
    format: "PDF",
    summary: "A fundamental guide on ethical AI practices for middle schoolers: transparency, privacy protection, output verification, creator respect, and personal accountability.",
    url: "/resources/5%20Principles%20of%20Responsible%20%26%20Ethical%20AI%20Use.pdf",
    downloadUrl: "/resources/5%20Principles%20of%20Responsible%20%26%20Ethical%20AI%20Use.pdf",
    fileSize: "71 KB",
    badge: "Ethical AI Handout",
    tags: ["Ethics", "Safety", "Digital Citizenship", "PDF"],
    bulletPoints: [
      "1. Be Honest About How You Use AI",
      "2. Protect Privacy and Ask Permission",
      "3. Check Information Before Trusting It",
      "4. Treat People Fairly and Respect Their Work",
      "5. Stay Responsible for the Final Result"
    ],
    difficulty: "All Levels",
    readTime: "3 min read",
    linkText: "View PDF Handout"
  },
  {
    id: "pdf-prompt-cheat-code",
    title: "The Ultimate Cheat Code for writing an AI Prompt",
    category: "Tutorials",
    format: "PDF",
    summary: "Quick-reference prompt engineering cheat sheet that helps students craft clear, constraint-driven instructions for animations, music, games, and code.",
    url: "/resources/The%20Ultimate%20Cheat%20Code%20for%20writing%20an%20AI%20Prompt.pdf",
    downloadUrl: "/resources/The%20Ultimate%20Cheat%20Code%20for%20writing%20an%20AI%20Prompt.pdf",
    fileSize: "75 KB",
    badge: "Prompt Cheat Sheet",
    tags: ["Prompt Engineering", "Creative Prompts", "AI Crafting", "PDF"],
    bulletPoints: [
      "Start With the Result You Want",
      "Give Details That Change the Answer",
      "Show What You Mean",
      "Revise One Thing at a Time",
      "Keep Your Judgment Switched On"
    ],
    difficulty: "All Levels",
    readTime: "4 min read",
    linkText: "View Cheat Sheet"
  },
  {
    id: "pdf-supporting-ai-explorers",
    title: "Supporting AI Explorers: Helping Students Take the Lead",
    category: "Guides",
    format: "PDF",
    summary: "A supportive facilitation guide for mentors, parents, and teachers to nurture student independence, troubleshoot hallucinations, and build healthy tech habits.",
    url: "/resources/Supporting%20AI%20Explorers.pdf",
    downloadUrl: "/resources/Supporting%20AI%20Explorers.pdf",
    fileSize: "68 KB",
    badge: "Educator & Parent Guide",
    tags: ["Mentorship", "Student Agency", "Parent Support", "PDF"],
    bulletPoints: [
      "Ask Before Taking Over",
      "Make Big Ideas Manageable",
      "Treat Unexpected Results as Something to Investigate",
      "Build Responsible Habits Into the Activity",
      "Make Participation Comfortable"
    ],
    difficulty: "Mentors & Parents",
    readTime: "3 min read",
    linkText: "View Support Guide"
  }
];

