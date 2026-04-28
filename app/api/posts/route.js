let posts = [
  {
    id: 1,
    title: "Getting Started with React 🚀",

    content: `# Introduction to React

React is a powerful JavaScript library used to build modern user interfaces. It allows developers to create fast, dynamic, and interactive web applications.

---

# Why React is Popular

• Component-based architecture  
• Fast performance using Virtual DOM  
• Strong community support  
• Reusable code structure  

---

# What are Components?

Components are the building blocks of a React application.

Example:
• Navbar  
• Button  
• Card  

Each component is reusable and independent.

---

# Understanding JSX

JSX stands for JavaScript XML.

It allows you to write HTML-like code inside JavaScript.

Example:
<div>Hello World</div>

---

# State and Props

State:
• Stores dynamic data  
• Controlled inside component  

Props:
• Used to pass data between components  

---

# React Hooks (Important)

Hooks allow functional components to use state and lifecycle features.

Common hooks:
• useState → manage data  
• useEffect → handle side effects  

---

# Key Points to Remember

• React uses Virtual DOM  
• Components make code reusable  
• Hooks simplify logic  
• React builds Single Page Applications  

---

# Conclusion

React is a must-learn technology for modern web development.`,

    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    ],

    video: "https://www.youtube.com/embed/bMknfKXIFA8",

    // ✅ FAQ ADDED
    faq: [
      { question: "What is React?", answer: "React is a JavaScript library used to build UI." },
      { question: "Why use React?", answer: "It provides reusable components and fast performance." },
      { question: "What is JSX?", answer: "JSX allows writing HTML inside JavaScript." },
      { question: "What is Virtual DOM?", answer: "A lightweight copy of real DOM for performance." },
      { question: "What are components?", answer: "Reusable building blocks of UI." },
      { question: "What is state?", answer: "Stores dynamic data in a component." },
      { question: "What are props?", answer: "Used to pass data between components." },
      { question: "What is useState?", answer: "Hook to manage state." },
      { question: "What is useEffect?", answer: "Hook for side effects." },
      { question: "What are hooks?", answer: "Functions that let you use state & lifecycle." },
      { question: "Is React frontend?", answer: "Yes, it is mainly a frontend library." },
      { question: "What is SPA?", answer: "Single Page Application loads once." },
      { question: "What is key in React?", answer: "Helps identify list elements." },
      { question: "What is event handling?", answer: "Handling user actions like clicks." },
      { question: "What is conditional rendering?", answer: "Render UI based on conditions." },
      { question: "What is lifting state up?", answer: "Sharing state between components." },
      { question: "What is React Router?", answer: "Used for navigation." },
      { question: "What is controlled component?", answer: "Managed by React state." },
      { question: "What is functional component?", answer: "JS function returning JSX." },
      { question: "Why learn React?", answer: "It is widely used in modern apps." }
    ]
  },

  {
    id: 2,
    title: "Learning Next.js – Full Guide ⚡",

    content: `# Introduction to Next.js

Next.js is a powerful React framework used to build fast applications.

---

# Why Use Next.js?

• Built on React  
• Supports SSR & SSG  
• SEO friendly  

---

# Key Features

1. Routing  
2. SSR  
3. API Routes  

---

# Conclusion

Next.js is powerful for real-world apps.`,

    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72"
    ],

    video: "https://www.youtube.com/embed/1WmNXEVia8I",

    // ✅ FAQ ADDED
    faq: [
      { question: "What is Next.js?", answer: "Next.js is a React framework." },
      { question: "Why use Next.js?", answer: "It improves performance and SEO." },
      { question: "What is SSR?", answer: "Server-side rendering loads pages faster." },
      { question: "What is SSG?", answer: "Static pages built at build time." },
      { question: "What is ISR?", answer: "Updates static pages dynamically." },
      { question: "What is routing?", answer: "File-based navigation system." },
      { question: "What is API route?", answer: "Backend inside frontend." },
      { question: "What is App Router?", answer: "New routing system." },
      { question: "What is layout?", answer: "Shared UI structure." },
      { question: "What is middleware?", answer: "Runs before request." },
      { question: "What is image optimization?", answer: "Improves image performance." },
      { question: "What is Link component?", answer: "Client-side navigation." },
      { question: "What is dynamic routing?", answer: "Routes with parameters." },
      { question: "Is Next.js full stack?", answer: "Yes." },
      { question: "What is SEO?", answer: "Search engine optimization." },
      { question: "Client vs server component?", answer: "Client runs browser, server runs backend." },
      { question: "Why faster?", answer: "Pre-rendering improves speed." },
      { question: "What is fetch?", answer: "Used for data fetching." },
      { question: "React vs Next?", answer: "React = library, Next = framework." },
      { question: "Why learn Next.js?", answer: "Used in real-world apps." }
    ]
  }
];
export async function GET() {
  return Response.json(posts);
}

export async function POST(req) {
  const body = await req.json();

  const newPost = {
    id: posts.length + 1,
    title: body.title,
    content: body.content,
    images: body.images,
    video: body.video,
    faq: body.faq
  };

  posts.push(newPost);

  return Response.json(newPost);
}