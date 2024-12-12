import { Task, TaskCategory, TaskState } from "./task.model";
import { User } from "./user.model";

export const fakeUsers: User[] = [
  {
      "id": "0RY0r4XrlubHaBV0PTFo6FDXrKI2",
      "role": "Product Manager | UX Advocate",
      "userRole": "user",
      "bio": "Experienced product manager with a strong focus on user experience and delivering products that customers love. Passionate about driving business growth through innovation.",
      "email": "sarahsmith@example.com",
      "nickname": "Sarah Smith"
  },
  {
      "id": "8O9neIbuUZUHVGn882tpwjYaI7w1",
      "nickname": "James Wilson",
      "bio": "Expert in cloud infrastructure and backend development. Passionate about creating robust and scalable APIs and services using cloud platforms like AWS and Google Cloud.",
      "email": "jamesw@example.com",
      "role": "Backend Developer | Cloud Computing Enthusiast",
  },
  {
      "id": "OBSXIzSP1lONHK8a9DApje0cmaX2",
      "email": "michaelb@example.com",
      "role": "Quality Assurance Engineer | Detail-Oriented",
      "bio": "Focused on delivering bug-free software by meticulously testing every feature. Passionate about finding issues before they reach the user. Always striving for perfection in every release.",
      "nickname": "Michael Brown",
      "userRole": "user"
  },
  {
      "id": "UXbIFs3xS8XJaZ9ECtuJ2Xje1Ys2",
      "email": "olivialee@example.com",
      "bio": "Specializing in test automation to streamline software quality assurance processes. Constantly seeking ways to improve test coverage, efficiency, and the overall testing strategy.",
      "nickname": "Olivia Lee",
      "userRole": "user",
      "role": "Test Automation Engineer | Continuous Improvement"
  },
  {
      "id": "VLcytYIROvSQxSh1lkCoVtHuF143",
      "nickname": "John Doe",
      "userRole": "user",
      "bio": "Passionate about building scalable web applications. Skilled in Angular, React, Node.js, and Python. Always exploring new technologies and optimizing user experiences.",
      "email": "johndoe@example.com",
      "role": "Full-Stack Developer | Tech Enthusiast",
  },
  {
      "id": "errWpgAOsKaQoUp0OfmfwlygUS92",
      "email": "emmawhite@example.com",
      "role": "UI/UX Designer | Creative Thinker",
      "nickname": "Emma White",
      "bio": "Designing user-centric interfaces and seamless experiences. I combine creativity with research to make products both beautiful and functional. Always striving to bring the user’s vision to life.",
      "userRole": "user"
  },
  {
      "id": "iXrykZX7Q9dAusSUTCJYUoBKfBY2",
      "email": "test2@test.com",
      "linkedin": "https://test2.linkedin.com",
      "facebook": "https://test2.facebook.com",
      "userRole": "admin",
      "nickname": "Testor",
      "twitter": "https://test2.twitter.com",
      "role": "Testeur | Quality Assurance Specialist | Bug Hunter Extraordinaire",
      "bio": "Passionate about ensuring software quality, I specialize in identifying bugs, improving user experiences, and making sure every feature works as intended. "
  },
  {
      "id": "jBKn4PXLKESC1ktcYPV6Y0FkD7u1",
      "userRole": "admin",
      "nickname": "Testo",
      "role": "Testeur | Quality Assurance Specialist | Bug Hunter Extraordinaire",
      "email": "test@test.com",
      "bio": "Passionate about ensuring software quality, I specialize in identifying bugs, improving user experiences, and making sure every feature works as intended. With a keen eye for detail and a strong understanding of testing methodologies, I work to ensure that applications are reliable, functional, and user-friendly. Whether manual or automated, I thrive on the challenge of finding issues before they reach users, helping teams deliver flawless products."
  },
  {
      "id": "mV2KtjaaXjTvdQL0Hwqrg7byU623",
      "email": "danielc@example.com",
      "nickname": "Daniel Clark",
      "bio": "Passionate about creating dynamic, interactive web applications using JavaScript and modern frameworks like Angular, React, and Vue.js. Always learning and experimenting with new web technologies.",
      "userRole": "user",
      "role": "Frontend Developer | JavaScript Pro"
  }
]

export const fakeTaskCategories: TaskCategory[] = [
  { name: "Bug", color: "#E57373" },
  { name: "Feature", color: "#81C784" },
  { name: "Improvement", color: "#64B5F6" },
  { name: "Documentation", color: "#A1887F" },
  { name: "Testing", color: "#9575CD" }, 
  { name: "Research", color: "#4CAF50" }, 
  { name: "Design", color: "#42A5F5" }, 
  { name: "Deployment", color: "#F44336" },
  { name: "Maintenance", color: "#FFB74D" },
  { name: "Support", color: "#F06292" },
];

export const fakeTasks2 = [
    {
      assigneeId: "0RY0r4XrlubHaBV0PTFo6FDXrKI2", 
      categoryName: "Bug",
      reporterId: "iXrykZX7Q9dAusSUTCJYUoBKfBY2", 
      reporterName: "Testor",
      title: "Enhance login security features",
      description: "Improve the security protocols of the login process to ensure a more secure user experience.",
      state: "DONE",
      startDate: new Date('2024-12-01T08:00:00Z'),
      endDate: new Date('2024-12-01T12:00:00Z'),
      createdAt: new Date('2024-12-01T07:45:00Z')
    },
    {
      assigneeId: "8O9neIbuUZUHVGn882tpwjYaI7w1", 
      categoryName: "Deployment",
      reporterId: "VLcytYIROvSQxSh1lkCoVtHuF143", 
      reporterName: "John Doe",
      title: "Deploy latest backend update",
      description: "Deploy the latest set of updates to the backend infrastructure for improved performance.",
      state: "DONE",
      startDate: new Date('2024-12-02T09:00:00Z'),
      endDate: new Date('2024-12-02T13:00:00Z'),
      createdAt: new Date('2024-12-02T08:30:00Z')
    },
    {
      assigneeId: "OBSXIzSP1lONHK8a9DApje0cmaX2", 
      categoryName: "Design",
      reporterId: "mV2KtjaaXjTvdQL0Hwqrg7byU623", 
      reporterName: "Daniel Clark",
      title: "Design new user dashboard UI",
      description: "Create the wireframes and initial design concepts for the new user dashboard interface.",
      state: "DONE",
      startDate: new Date('2024-12-03T10:00:00Z'),
      endDate: new Date('2024-12-03T14:00:00Z'),
      createdAt: new Date('2024-12-03T09:50:00Z')
    },
    {
      assigneeId: "UXbIFs3xS8XJaZ9ECtuJ2Xje1Ys2", 
      categoryName: "Documentation",
      reporterId: "errWpgAOsKaQoUp0OfmfwlygUS92", 
      reporterName: "Emma White",
      title: "Update API documentation for v2",
      description: "Revise and update the API documentation to reflect changes made in version 2.",
      state: "DOING",
      startDate: new Date('2024-12-04T08:30:00Z'),
      endDate: new Date('2024-12-04T12:30:00Z'),
      createdAt: new Date('2024-12-04T08:00:00Z')
    },
    {
      assigneeId: "VLcytYIROvSQxSh1lkCoVtHuF143", 
      categoryName: "Feature",
      reporterId: "jBKn4PXLKESC1ktcYPV6Y0FkD7u1", 
      reporterName: "Testo",
      title: "Implement search feature for users",
      description: "Develop and implement a search functionality for users to find other members easily.",
      state: "DONE",
      startDate: new Date('2024-12-05T10:00:00Z'),
      endDate: new Date('2024-12-05T14:00:00Z'),
      createdAt: new Date('2024-12-05T09:45:00Z')
    },
    {
      assigneeId: "errWpgAOsKaQoUp0OfmfwlygUS92", 
      categoryName: "Improvement", 
      reporterId: "0RY0r4XrlubHaBV0PTFo6FDXrKI2", 
      reporterName: "Sarah Smith",
      title: "Improve mobile responsiveness for homepage",
      description: "Enhance the homepage design to be fully responsive across all mobile devices.",
      state: "DONE",
      startDate: new Date('2024-12-06T09:00:00Z'),
      endDate: new Date('2024-12-06T13:00:00Z'),
      createdAt: new Date('2024-12-06T08:45:00Z')
    },
    {
      assigneeId: "iXrykZX7Q9dAusSUTCJYUoBKfBY2", 
      categoryName: "Maintenance", 
      reporterId: "8O9neIbuUZUHVGn882tpwjYaI7w1", 
      reporterName: "James Wilson",
      title: "Fix performance issues in the login screen",
      description: "Investigate and fix any performance problems on the login screen that affect user experience.",
      state: "TODO",
      startDate: new Date('2024-12-07T11:00:00Z'),
      endDate: new Date('2024-12-07T15:00:00Z'),
      createdAt: new Date('2024-12-07T10:45:00Z')
    },
    {
      assigneeId: "mV2KtjaaXjTvdQL0Hwqrg7byU623", 
      categoryName: "Research", 
      reporterId: "UXbIFs3xS8XJaZ9ECtuJ2Xje1Ys2", 
      reporterName: "Olivia Lee",
      title: "Conduct user research for new feature",
      description: "Gather user feedback and insights to inform the development of the upcoming new feature.",
      state: "CANCELLED",
      startDate: new Date('2024-12-08T13:00:00Z'),
      endDate: new Date('2024-12-08T17:00:00Z'),
      createdAt: new Date('2024-12-08T12:30:00Z')
    },
    {
      assigneeId: "8O9neIbuUZUHVGn882tpwjYaI7w1", 
      categoryName: "Support", 
      reporterId: "0RY0r4XrlubHaBV0PTFo6FDXrKI2", 
      reporterName: "Sarah Smith",
      title: "Provide technical support for integration issues",
      description: "Assist the integration team with resolving any technical support issues that arise during integration.",
      state: "DONE",
      startDate: new Date('2024-12-09T09:00:00Z'),
      endDate: new Date('2024-12-09T13:00:00Z'),
      createdAt: new Date('2024-12-09T08:45:00Z')
    },
    {
      assigneeId: "8O9neIbuUZUHVGn882tpwjYaI7w1",
      categoryName: "Bug", 
      reporterId: "iXrykZX7Q9dAusSUTCJYUoBKfBY2",
      reporterName: "Testor",
      title: "Fix intermittent login issue",
      description: "Investigate and resolve the bug causing sporadic login failures for certain users.",
      state: "DONE",
      startDate: new Date('2024-12-05T08:30:00Z'),
      endDate: new Date('2024-12-05T11:30:00Z'),
      createdAt: new Date('2024-12-03T14:00:00Z')
    },
    {
      assigneeId: "errWpgAOsKaQoUp0OfmfwlygUS92",
      categoryName: "Design", 
      reporterId: "iXrykZX7Q9dAusSUTCJYUoBKfBY2",
      reporterName: "Testor",
      title: "Redesign the landing page",
      description: "Enhance the visual appeal of the landing page by updating the layout and color scheme.",
      state: "DONE",
      startDate: new Date('2024-12-07T10:00:00Z'),
      endDate: new Date('2024-12-07T15:00:00Z'),
      createdAt: new Date('2024-12-06T12:00:00Z')
    },
    {
      assigneeId: "VLcytYIROvSQxSh1lkCoVtHuF143",
      categoryName: "Documentation", 
      reporterId: "iXrykZX7Q9dAusSUTCJYUoBKfBY2",
      reporterName: "Testor",
      title: "Update API documentation",
      description: "Ensure that the API documentation is accurate and includes examples for all endpoints.",
      state: "DOING",
      startDate: new Date('2024-12-10T09:00:00Z'),
      endDate: new Date('2024-12-10T17:00:00Z'),
      createdAt: new Date('2024-12-09T10:00:00Z')
    },
    {
      assigneeId: "UXbIFs3xS8XJaZ9ECtuJ2Xje1Ys2",
      categoryName: "Maintenance", 
      reporterId: "iXrykZX7Q9dAusSUTCJYUoBKfBY2",
      reporterName: "Testor",
      title: "Optimize database performance",
      description: "Improve query efficiency and database indexing to enhance application performance.",
      state: "TODO",
      startDate: new Date('2024-12-12T11:00:00Z'),
      endDate: new Date('2024-12-12T15:00:00Z'),
      createdAt: new Date('2024-12-10T16:00:00Z')
    }
  ];

  export const fakeComments2 = [
    // Task 1: Enhance login security features (2 comments)
    { taskName: "Enhance login security features", authorName: "Sarah Smith", content: "Great progress on this task!" },
    { taskName: "Enhance login security features", authorName: "Michael Brown", content: "Have you considered adding two-factor authentication?" },
  
    // Task 2: Deploy latest backend update (7 comments)
    { taskName: "Deploy latest backend update", authorName: "James Wilson", content: "Deployment went smoothly. Excellent work!" },
    { taskName: "Deploy latest backend update", authorName: "Olivia Lee", content: "Let's monitor the logs for any errors post-deployment." },
    { taskName: "Deploy latest backend update", authorName: "Daniel Clark", content: "The release notes are detailed. Great job!" },
    { taskName: "Deploy latest backend update", authorName: "Emma White", content: "Have we checked the roll-back plan just in case?" },
    { taskName: "Deploy latest backend update", authorName: "Michael Brown", content: "I noticed a minor issue in staging. Will fix it ASAP." },
    { taskName: "Deploy latest backend update", authorName: "Sarah Smith", content: "Do we have any logs for performance metrics?" },
    { taskName: "Deploy latest backend update", authorName: "John Doe", content: "Fantastic coordination during deployment!" },
  
    // Task 3: Design new user dashboard UI (0 comments)
    // (No comments for this task)
  
    // Task 4: Update API documentation for v2 (12 comments)
    { taskName: "Update API documentation for v2", authorName: "Testor", content: "Ensure all new endpoints are covered comprehensively." },
    { taskName: "Update API documentation for v2", authorName: "John Doe", content: "Can we add more examples for the complex APIs?" },
    { taskName: "Update API documentation for v2", authorName: "Sarah Smith", content: "Great details on endpoint descriptions!" },
    { taskName: "Update API documentation for v2", authorName: "Michael Brown", content: "We should include common use cases too." },
    { taskName: "Update API documentation for v2", authorName: "Emma White", content: "Let's add error response codes to the documentation." },
    { taskName: "Update API documentation for v2", authorName: "James Wilson", content: "Fantastic work. Documentation looks very clear." },
    { taskName: "Update API documentation for v2", authorName: "Daniel Clark", content: "Could we include a changelog for this version?" },
    { taskName: "Update API documentation for v2", authorName: "Olivia Lee", content: "I spotted a typo in the authentication section." },
    { taskName: "Update API documentation for v2", authorName: "Sarah Smith", content: "I've pushed edits for the query examples." },
    { taskName: "Update API documentation for v2", authorName: "Michael Brown", content: "Can we format the examples in a consistent style?" },
    { taskName: "Update API documentation for v2", authorName: "Emma White", content: "The updated flowchart is a helpful addition." },
    { taskName: "Update API documentation for v2", authorName: "James Wilson", content: "Double-checked and all endpoints are listed. Great job!" },
  
    // Task 5: Implement search feature for users (1 comment)
    { taskName: "Implement search feature for users", authorName: "Sarah Smith", content: "The search function is very intuitive. Great job!" },
  
    // Task 6: Improve mobile responsiveness for homepage (4 comments)
    { taskName: "Improve mobile responsiveness for homepage", authorName: "Emma White", content: "Responsive design is spot on! Well done." },
    { taskName: "Improve mobile responsiveness for homepage", authorName: "Daniel Clark", content: "Could we test this on more devices?" },
    { taskName: "Improve mobile responsiveness for homepage", authorName: "Michael Brown", content: "Looks great on most devices but breaks on iPhone SE." },
    { taskName: "Improve mobile responsiveness for homepage", authorName: "James Wilson", content: "Have you tried testing with lower network speeds?" },
  
    // Task 7: Fix performance issues in the login screen (5 comments)
    { taskName: "Fix performance issues in the login screen", authorName: "Olivia Lee", content: "Identified a query that's slowing down the page load." },
    { taskName: "Fix performance issues in the login screen", authorName: "John Doe", content: "Have we tested this fix on the staging environment?" },
    { taskName: "Fix performance issues in the login screen", authorName: "Emma White", content: "The page feels faster. Great optimization!" },
    { taskName: "Fix performance issues in the login screen", authorName: "Daniel Clark", content: "Could caching be causing this delay?" },
    { taskName: "Fix performance issues in the login screen", authorName: "James Wilson", content: "I've added logs to pinpoint the exact slowdown." },
  
    // Task 8: Conduct user research for new feature (2 comments)
    { taskName: "Conduct user research for new feature", authorName: "Sarah Smith", content: "Collected valuable insights from the recent user interviews." },
    { taskName: "Conduct user research for new feature", authorName: "Michael Brown", content: "We should analyze these insights further before implementing." },
  
    // Task 9: Provide technical support for integration issues (0 comments)
    // (No comments for this task)
  
    // Task 10: Redesign the landing page (9 comments)
    { taskName: "Redesign the landing page", authorName: "Emma White", content: "Love the new color scheme. It looks vibrant and modern!" },
    { taskName: "Redesign the landing page", authorName: "Michael Brown", content: "Let's A/B test this design before finalizing." },
    { taskName: "Redesign the landing page", authorName: "Sarah Smith", content: "The typography is much improved!" },
    { taskName: "Redesign the landing page", authorName: "James Wilson", content: "The new layout is more intuitive. Great job!" },
    { taskName: "Redesign the landing page", authorName: "Daniel Clark", content: "Could we add a feedback form for visitors?" },
    { taskName: "Redesign the landing page", authorName: "Olivia Lee", content: "Looks great! Could we optimize images for faster load times?" },
    { taskName: "Redesign the landing page", authorName: "Emma White", content: "The hero section really grabs attention. Nicely done!" },
    { taskName: "Redesign the landing page", authorName: "Michael Brown", content: "Let's run a final browser compatibility test." },
    { taskName: "Redesign the landing page", authorName: "Sarah Smith", content: "The new call-to-action is very effective!" },
  
    // Task 11: Update API documentation (3 comments)
    { taskName: "Update API documentation", authorName: "John Doe", content: "I've added examples for the most used endpoints." },
    { taskName: "Update API documentation", authorName: "Sarah Smith", content: "Let's include common error responses as well." },
    { taskName: "Update API documentation", authorName: "Michael Brown", content: "Added a section for legacy API details." },
  
    // Task 12: Optimize database performance (1 comment)
    { taskName: "Optimize database performance", authorName: "James Wilson", content: "Indexed the most queried fields. Performance is better now." },
  
    // Task 13: (No comments)
  ];
  
export const fakeComments: { taskName: string; commentCount: number }[] = [
  { taskName: "Task 1", commentCount: 10 },
  { taskName: "Task 2", commentCount: 20 },
  { taskName: "Task 3", commentCount: 30 },
  { taskName: "Task 4", commentCount: 40 },
];
