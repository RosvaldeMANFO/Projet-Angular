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
      id: "5LzYk2TmhObthua2rQ9c",
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
      id: "6rPkcDSIfy7WzQ7xXbK1",
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
      id: "9v17mV6jf4aARAR7lbza",
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
      id: "AHgLLOGQySZGlKe7JUX6",
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
      id: "EuzUypPgigy5vE9JqbNj",
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
      id: "FQcbdNOKYWGjwIIOx9tp",
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
      id: "IOXYle4ZubYhWy2xuSLH",
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
      id: "MNnqClrVzBW4Nxk9Tvzh",
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
      id: "PuWrpuLQdmpxNHhMBx26",
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
      id: "RDmZBbajd5ColFdiioVr",
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
      id: "RtIV4ngHqFFNsp247xsF",
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
      id: "TRZSbaAs0lxnoMFOyE1O",
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
      id: "YNTfjSpGs0seBYvIil0b",
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
    { taskId: "5LzYk2TmhObthua2rQ9c", authorId: "0RY0r4XrlubHaBV0PTFo6FDXrKI2", content: "Great progress on this task!" },
    { taskId: "5LzYk2TmhObthua2rQ9c", authorId: "OBSXIzSP1lONHK8a9DApje0cmaX2", content: "Have you considered adding two-factor authentication?" },
    { taskId: "6rPkcDSIfy7WzQ7xXbK1", authorId: "8O9neIbuUZUHVGn882tpwjYaI7w1", content: "Deployment went smoothly. Excellent work!" },
    { taskId: "6rPkcDSIfy7WzQ7xXbK1", authorId: "UXbIFs3xS8XJaZ9ECtuJ2Xje1Ys2", content: "Let's monitor the logs for any errors post-deployment." },
    { taskId: "6rPkcDSIfy7WzQ7xXbK1", authorId: "mV2KtjaaXjTvdQL0Hwqrg7byU623", content: "The release notes are detailed. Great job!" },
    { taskId: "6rPkcDSIfy7WzQ7xXbK1", authorId: "errWpgAOsKaQoUp0OfmfwlygUS92", content: "Have we checked the roll-back plan just in case?" },
    { taskId: "6rPkcDSIfy7WzQ7xXbK1", authorId: "OBSXIzSP1lONHK8a9DApje0cmaX2", content: "I noticed a minor issue in staging. Will fix it ASAP." },
    { taskId: "6rPkcDSIfy7WzQ7xXbK1", authorId: "0RY0r4XrlubHaBV0PTFo6FDXrKI2", content: "Do we have any logs for performance metrics?" },
    { taskId: "6rPkcDSIfy7WzQ7xXbK1", authorId: "VLcytYIROvSQxSh1lkCoVtHuF143", content: "Fantastic coordination during deployment!" },
    { taskId: "AHgLLOGQySZGlKe7JUX6", authorId: "iXrykZX7Q9dAusSUTCJYUoBKfBY2", content: "Ensure all new endpoints are covered comprehensively." },
    { taskId: "AHgLLOGQySZGlKe7JUX6", authorId: "VLcytYIROvSQxSh1lkCoVtHuF143", content: "Can we add more examples for the complex APIs?" },
    { taskId: "AHgLLOGQySZGlKe7JUX6", authorId: "0RY0r4XrlubHaBV0PTFo6FDXrKI2", content: "Great details on endpoint descriptions!" },
    { taskId: "AHgLLOGQySZGlKe7JUX6", authorId: "OBSXIzSP1lONHK8a9DApje0cmaX2", content: "We should include common use cases too." },
    { taskId: "AHgLLOGQySZGlKe7JUX6", authorId: "errWpgAOsKaQoUp0OfmfwlygUS92", content: "Let's add error response codes to the documentation." },
    { taskId: "AHgLLOGQySZGlKe7JUX6", authorId: "8O9neIbuUZUHVGn882tpwjYaI7w1", content: "Fantastic work. Documentation looks very clear." },
    { taskId: "AHgLLOGQySZGlKe7JUX6", authorId: "mV2KtjaaXjTvdQL0Hwqrg7byU623", content: "Could we include a changelog for this version?" },
    { taskId: "AHgLLOGQySZGlKe7JUX6", authorId: "UXbIFs3xS8XJaZ9ECtuJ2Xje1Ys2", content: "I spotted a typo in the authentication section." },
    { taskId: "AHgLLOGQySZGlKe7JUX6", authorId: "0RY0r4XrlubHaBV0PTFo6FDXrKI2", content: "I've pushed edits for the query examples." },
    { taskId: "AHgLLOGQySZGlKe7JUX6", authorId: "OBSXIzSP1lONHK8a9DApje0cmaX2", content: "Can we format the examples in a consistent style?" },
    { taskId: "AHgLLOGQySZGlKe7JUX6", authorId: "errWpgAOsKaQoUp0OfmfwlygUS92", content: "The updated flowchart is a helpful addition." },
    { taskId: "AHgLLOGQySZGlKe7JUX6", authorId: "8O9neIbuUZUHVGn882tpwjYaI7w1", content: "Double-checked and all endpoints are listed. Great job!" },
    { taskId: "EuzUypPgigy5vE9JqbNj", authorId: "0RY0r4XrlubHaBV0PTFo6FDXrKI2", content: "The search function is very intuitive. Great job!" },
    { taskId: "FQcbdNOKYWGjwIIOx9tp", authorId: "errWpgAOsKaQoUp0OfmfwlygUS92", content: "Responsive design is spot on! Well done." },
    { taskId: "FQcbdNOKYWGjwIIOx9tp", authorId: "mV2KtjaaXjTvdQL0Hwqrg7byU623", content: "Could we test this on more devices?" },
    { taskId: "FQcbdNOKYWGjwIIOx9tp", authorId: "OBSXIzSP1lONHK8a9DApje0cmaX2", content: "Looks great on most devices but breaks on iPhone SE." },
    { taskId: "FQcbdNOKYWGjwIIOx9tp", authorId: "8O9neIbuUZUHVGn882tpwjYaI7w1", content: "Have you tried testing with lower network speeds?" },
    { taskId: "IOXYle4ZubYhWy2xuSLH", authorId: "UXbIFs3xS8XJaZ9ECtuJ2Xje1Ys2", content: "Identified a query that's slowing down the page load." },
    { taskId: "IOXYle4ZubYhWy2xuSLH", authorId: "VLcytYIROvSQxSh1lkCoVtHuF143", content: "Have we tested this fix on the staging environment?" },
    { taskId: "IOXYle4ZubYhWy2xuSLH", authorId: "errWpgAOsKaQoUp0OfmfwlygUS92", content: "The page feels faster. Great optimization!" },
    { taskId: "IOXYle4ZubYhWy2xuSLH", authorId: "mV2KtjaaXjTvdQL0Hwqrg7byU623", content: "Could caching be causing this delay?" },
    { taskId: "IOXYle4ZubYhWy2xuSLH", authorId: "8O9neIbuUZUHVGn882tpwjYaI7w1", content: "I've added logs to pinpoint the exact slowdown." },
    { taskId: "MNnqClrVzBW4Nxk9Tvzh", authorId: "0RY0r4XrlubHaBV0PTFo6FDXrKI2", content: "Collected valuable insights from the recent user interviews." },
    { taskId: "MNnqClrVzBW4Nxk9Tvzh", authorId: "OBSXIzSP1lONHK8a9DApje0cmaX2", content: "We should analyze these insights further before implementing." },
    { taskId: "RtIV4ngHqFFNsp247xsF", authorId: "errWpgAOsKaQoUp0OfmfwlygUS92", content: "Love the new color scheme. It looks vibrant and modern!" },
    { taskId: "RtIV4ngHqFFNsp247xsF", authorId: "OBSXIzSP1lONHK8a9DApje0cmaX2", content: "Let's A/B test this design before finalizing." },
    { taskId: "RtIV4ngHqFFNsp247xsF", authorId: "0RY0r4XrlubHaBV0PTFo6FDXrKI2", content: "The typography is much improved!" },
    { taskId: "RtIV4ngHqFFNsp247xsF", authorId: "8O9neIbuUZUHVGn882tpwjYaI7w1", content: "The new layout is more intuitive. Great job!" },
    { taskId: "RtIV4ngHqFFNsp247xsF", authorId: "mV2KtjaaXjTvdQL0Hwqrg7byU623", content: "Could we add a feedback form for visitors?" },
    { taskId: "RtIV4ngHqFFNsp247xsF", authorId: "UXbIFs3xS8XJaZ9ECtuJ2Xje1Ys2", content: "Looks great! Could we optimize images for faster load times?" },
    { taskId: "RtIV4ngHqFFNsp247xsF", authorId: "errWpgAOsKaQoUp0OfmfwlygUS92", content: "The hero section really grabs attention. Nicely done!" },
    { taskId: "RtIV4ngHqFFNsp247xsF", authorId: "OBSXIzSP1lONHK8a9DApje0cmaX2", content: "Let's run a final browser compatibility test." },
    { taskId: "RtIV4ngHqFFNsp247xsF", authorId: "0RY0r4XrlubHaBV0PTFo6FDXrKI2", content: "The new call-to-action is very effective!" },
    { taskId: "TRZSbaAs0lxnoMFOyE1O", authorId: "VLcytYIROvSQxSh1lkCoVtHuF143", content: "I've added examples for the most used endpoints." },
    { taskId: "TRZSbaAs0lxnoMFOyE1O", authorId: "0RY0r4XrlubHaBV0PTFo6FDXrKI2", content: "Let's include common error responses as well." },
    { taskId: "TRZSbaAs0lxnoMFOyE1O", authorId: "OBSXIzSP1lONHK8a9DApje0cmaX2", content: "Added a section for legacy API details." },
    { taskId: "YNTfjSpGs0seBYvIil0b", authorId: "8O9neIbuUZUHVGn882tpwjYaI7w1", content: "Indexed the most queried fields. Performance is better now." },
  ];
  
export const fakeComments: { taskName: string; commentCount: number }[] = [
  { taskName: "Task 1", commentCount: 10 },
  { taskName: "Task 2", commentCount: 20 },
  { taskName: "Task 3", commentCount: 90 },
  { taskName: "Task 4", commentCount: 40 },
];
