// Team member avatar data
export const teamMembers = [
    { id: 1, name: 'Sarah Chen', initials: 'SC', color: '#6366f1', textColor: '#fff' },
    { id: 2, name: 'Alex Rivera', initials: 'AR', color: '#f59e0b', textColor: '#fff' },
    { id: 3, name: 'Jordan Lee', initials: 'JL', color: '#10b981', textColor: '#fff' },
    { id: 4, name: 'Taylor Kim', initials: 'TK', color: '#ef4444', textColor: '#fff' },
    { id: 5, name: 'Morgan Davis', initials: 'MD', color: '#8b5cf6', textColor: '#fff' },
    { id: 6, name: 'Casey Wright', initials: 'CW', color: '#ec4899', textColor: '#fff' },
];

export const defaultTasks = [
    {
        id: '1',
        title: 'Plan initial strategy',
        completed: true,
        status: 'Now',
        tags: [
            { label: '0', bg: 'rgba(99,102,241,0.12)', textColor: '#818cf8', border: 'rgba(99,102,241,0.2)' },
            { label: 'A', bg: 'rgba(245,158,11,0.12)', textColor: '#fbbf24', border: 'rgba(245,158,11,0.2)' },
        ],
        assignees: [1, 2],
        category: 'Project Tasks',
    },
    {
        id: '2',
        title: 'Begin front-end development',
        completed: false,
        status: 'Next',
        tags: [
            { label: 'S', bg: 'rgba(16,185,129,0.12)', textColor: '#34d399', border: 'rgba(16,185,129,0.2)' },
            { label: '3', bg: 'rgba(245,158,11,0.12)', textColor: '#fbbf24', border: 'rgba(245,158,11,0.2)' },
        ],
        assignees: [3, 4],
        category: 'Project Tasks',
    },
    {
        id: '3',
        title: 'Review UI components',
        completed: false,
        status: 'Later',
        tags: [
            { label: '1', bg: 'rgba(99,102,241,0.12)', textColor: '#818cf8', border: 'rgba(99,102,241,0.2)' },
            { label: 'T', bg: 'rgba(236,72,153,0.12)', textColor: '#f472b6', border: 'rgba(236,72,153,0.2)' },
        ],
        assignees: [5, 6],
        category: 'Project Tasks',
    },
    {
        id: '4',
        title: 'Set up CI/CD pipeline',
        completed: false,
        status: 'Next',
        tags: [
            { label: 'D', bg: 'rgba(139,92,246,0.12)', textColor: '#a78bfa', border: 'rgba(139,92,246,0.2)' },
        ],
        assignees: [1, 3, 5],
        category: 'Project Tasks',
    },
    {
        id: '5',
        title: 'Write API documentation',
        completed: false,
        status: 'Later',
        tags: [
            { label: '2', bg: 'rgba(99,102,241,0.12)', textColor: '#818cf8', border: 'rgba(99,102,241,0.2)' },
            { label: 'B', bg: 'rgba(245,158,11,0.12)', textColor: '#fbbf24', border: 'rgba(245,158,11,0.2)' },
        ],
        assignees: [2],
        category: 'Project Tasks',
    },
];

export const defaultNotesHTML = `<p>Discussion points and shared resources for our current hackathon project:</p>
<h2><strong>Discussion Points:</strong></h2>
<ul>
  <li>Define the main features we want to build.</li>
  <li>Discuss offline support strategy.</li>
  <li>Assign roles and responsibilities for each sprint.</li>
  <li>Review competitor analysis findings.</li>
</ul>
<h2><strong>Resources:</strong></h2>
<ul>
  <li>UI mockups for reference</li>
  <li>API endpoints list</li>
  <li>Offline storage documentation</li>
  <li>Design system component library</li>
</ul>`;

export const statusColors = {
    Now: { bg: 'rgba(59,130,246,0.12)', text: '#60a5fa', border: 'rgba(59,130,246,0.25)' },
    Next: { bg: 'rgba(245,158,11,0.12)', text: '#fbbf24', border: 'rgba(245,158,11,0.25)' },
    Later: { bg: 'rgba(139,92,246,0.12)', text: '#a78bfa', border: 'rgba(139,92,246,0.25)' },
};
