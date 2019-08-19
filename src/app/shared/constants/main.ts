export const MAIN_SECTIONS = [
    {name: 'Influence', link: '/home', tooltip: 'POLITICS,BUSINESS & OTHER INFLUENTIAL NEWS', dbName: 'Influence'},
    {name: 'Style And Sweat', link: '/road', tooltip: 'CINEMA,MUSIC,ARTS & SPORTS', dbName: 'StyleAndSweat'},
    {name: 'Hobbyist', link: '/hobbyist', tooltip: 'Bloggers', dbName: 'Hobbyist'},
    {name: 'Love Designs', link: '/deals', tooltip: 'Designs', dbName: 'LoveDesigns'},
    {name: 'Jump Startups', link: '/commerce', tooltip: 'Startup News', dbName: 'JumpStartups'},
    {name: 'Human Stories', link: '/travel', tooltip: 'Human Stories', dbName: 'HumanStories'},
    {name: 'Science', link: '/science', tooltip: 'Science & Tech', dbName: 'Science'},
    {name: 'Environment', link: '/environment', tooltip: 'Environment & Health', dbName: 'Environment'},
    {name: 'Public', link: '/public', tooltip: 'General News', dbName: 'Public'}
];


export const VOTE_TYPES = [
    {name: 'Important', displayName: 'Important', pages: ['Influence']},
    {name: 'Interesting', displayName: 'Interesting', pages: ['Influence', 'Public']},
    {name: 'Investigate', displayName: 'Investigate', pages: ['Influence']},
    {name: 'Protest', displayName: 'Protest', pages: ['Influence']},
    {name: 'Like', displayName: 'Like', pages: ['Videos']},
    // {name: 'Good', displayName: 'Good', pages: ['StyleAndSweat']},
    {name: 'Love', displayName: 'Love', pages: ['StyleAndSweat'], love: true},
    {name: 'TopClass', displayName: 'TopClass', pages: ['StyleAndSweat']},
    {name: 'Magic', displayName: 'Magic', pages: ['StyleAndSweat']},
    {name: 'LoveTheHuman', displayName: 'TheHuman', pages: ['HumanStories'], love: true},
    {name: 'Informative', displayName: 'Informative', pages: ['Hobbyist', 'Science']},
    {name: 'Protect', displayName: 'Protect', pages: ['Environment']},
    {name: 'Protest', displayName: 'Protest', pages: ['Environment']},
    {name: 'Inspiring', displayName: 'Inspiring', pages: ['HumanStories']},
    {name: 'Promising', displayName: 'Promising', pages: ['JumpStartups']},
    {name: 'ProblemSolver', displayName: 'ProblemSolver', pages: ['JumpStartups']},
    {name: 'LoveTheColor', displayName: 'TheColor', pages: ['LoveDesigns'], love: true},
    {name: 'Grand', displayName: 'Grand', pages: ['LoveDesigns']},
    {name: 'Creative', displayName: 'Creative', pages: ['LoveDesigns']}
];
