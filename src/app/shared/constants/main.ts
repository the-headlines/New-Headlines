export const MAIN_SECTIONS = [
    {name: 'Influence', link: '/home', tooltip: 'Politics and Business', dbName: 'Influence'},
    {name: 'Style And Sweat', link: '/road', tooltip: 'Cinema, Music, Sports & Arts', dbName: 'StyleAndSweat'},
    {name: 'Human Stories', link: '/travel', tooltip: 'Human Stories', dbName: 'HumanStories'},
    {name: 'Jump Startups', link: '/commerce', tooltip: 'Startup News', dbName: 'JumpStartups'},
    {name: 'Hobbyist', link: '/hobbyist', tooltip: 'Bloggers', dbName: 'Hobbyist'},
    {name: 'Love Designs', link: '/deals', tooltip: 'Designs', dbName: 'LoveDesigns'},
    {name: 'Science', link: '/science', tooltip: 'Science & Tech', dbName: 'Science'},
    {name: 'Environment', link: '/environment', tooltip: 'Environment & Health', dbName: 'Environment'},
    {name: 'Public', link: '/public', tooltip: 'General News', dbName: 'Public'}
];


export const VOTE_TYPES = [
    {name: 'Important', pages: ['Influence']},
    {name: 'Interesting', pages: ['Influence', 'Public']},
    {name: 'Investigate', pages: ['Influence']},
    {name: 'Protest', pages: ['Influence']},
    {name: 'Like', pages: ['Videos']},
    {name: 'Good', pages: ['StyleAndSweat']},
    {name: 'Love', pages: ['StyleAndSweat'], love: true},
    {name: 'TopClass', pages: ['StyleAndSweat']},
    {name: 'Magic', pages: ['StyleAndSweat']},
    {name: 'TheHuman', pages: ['HumanStories'], love: true},
    {name: 'Informative', pages: ['Hobbyist', 'Science']},
    {name: 'Protect', pages: ['Environment']},
    {name: 'Protest', pages: ['Environment']},
    {name: 'Inspiring', pages: ['HumanStories']},
    {name: 'Promising', pages: ['JumpStartups']},
    {name: 'ProblemSolver', pages: ['JumpStartups']},
    {name: 'TheColor', pages: ['LoveDesigns'], love: true},
    {name: 'Grand', pages: ['LoveDesigns']},
    {name: 'Creative', pages: ['LoveDesigns']}
];
