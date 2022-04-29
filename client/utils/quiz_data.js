export const categories = {
  personality: { name: 'Personality', courageous: 'Courageous', smart: 'Smart' },
  likes: { name: 'Likes', jock: 'Jock', gamer: 'Gamer' },
  morals: { name: 'Morals', evil: 'Evil', righteous: 'Righteous' },
  physical: { name: 'Physical', strong: 'Strong', weak: 'Weak' },
};

const { personality, likes, morals, physical } = categories;

export const questions = [
  {
    category: null,
    prompt: 'Are you a boy or a girl?',
    options: [{ text: 'boy' }, { text: 'girl' }],
  },
  {
    category: null,
    prompt: 'What is  your birthday?',
  },
  {
    category: physical.name,
    prompt: 'Out of these activities, which is your favorite?',
    options: [
      { text: 'working out', result: physical.strong },
      { text: 'video games', result: physical.weak },
      { text: 'playing or watching sports', result: physical.strong },
      { text: 'board games', result: physical.weak },
    ],
  },
  {
    category: personality.name,
    prompt: 'Out of these foods, which is your favorite?',
    options: [
      { text: 'Cheese', result: personality.smart },
      { text: 'Sushi', result: personality.courageous },
      { text: 'Curry', result: personality.courageous },
      { text: 'Sandwiches', result: personality.smart },
      { text: 'Escargo', result: personality.courageous },
      { text: 'Salad', result: personality.smart },
      { text: 'Tacos', result: personality.smart },
      { text: 'Steak', result: personality.courageous },
      { text: 'I prefer smoothies', result: personality.smart },
    ],
  },
  {
    category: personality.name,
    prompt: 'Pick your house',
    options: [
      { text: 'Huge cabin in the woods', result: personality.courageous },
      { text: 'Penthouse apartment in NYC', result: personality.smart },
      { text: 'New construction in a suburban neighborhood', result: personality.smart },
      { text: 'Whatever is cheapest', result: personality.smart },
      { text: 'A beach house on the coast', result: personality.courageous },
      { text: 'Underground bunker (for the zombie apocalypse)', result: personality.smart },
      { text: 'A van', result: personality.courageous },
    ],
  },
  {
    category: likes.name,
    prompt: 'Which of these genres is best?',
    options: [
      { text: 'Rock', result: likes.jock },
      { text: 'Country', result: likes.gamer },
      { text: 'Jazz', result: likes.gamer },
      { text: 'Indie', result: likes.gamer },
      { text: 'Pop', result: likes.jock },
      { text: 'Rap', result: likes.jock },
      { text: 'Movie soundtracks', result: likes.gamer },
      { text: 'Whatever is on the radio', result: physical.jock },
    ],
  },
  {
    category: likes.name,
    prompt: 'Which of these consoles was the best?',
    options: [
      { text: 'Gamecube', result: likes.gamer },
      { text: 'Gameboy advance', result: likes.gamer },
      { text: 'Playstation', result: likes.gamer },
      { text: 'Xbox', result: likes.jock },
      { text: 'Nintendo DS', result: likes.gamer },
      { text: 'Nintendo Switch', result: likes.gamer },
      { text: 'Xbox 360', result: likes.jock },
      { text: 'Xbox One', result: likes.jock },
      { text: 'Xbox Series X/S', result: likes.jock },
      { text: 'PS2', result: likes.gamer },
      { text: 'PS3', result: likes.gamer },
      { text: 'PS4', result: likes.jock },
      { text: 'PS5', result: likes.jock },
      { text: "I didn't use any of those", result: likes.jock },
    ],
  },
  {
    category: morals.name,
    prompt: 'If you saw someone steal your bike, what would you do?',
    options: [
      { text: 'Let it go to avoid confrontation', result: morals.righteous },
      { text: 'Chase after them in a car', result: morals.evil },
      { text: 'Call the police and report the theft', result: morals.righteous },
      { text: 'Call someone I know and complain to them', result: morals.evil },
      { text: 'give them my car keys too', result: morals.righteous },
      {
        text: 'Stalk them to their destination, and when the time is right, steal my bike and their wallet',
        result: morals.evil,
      },
    ],
  },
  {
    category: physical.name,
    prompt: 'Which is closest to your dream job?',
    options: [
      { text: 'Professional athlete', result: physical.strong },
      { text: 'Researcher', result: physical.weak },
      { text: 'Anything where I get my own cubicle', result: physical.weak },
      { text: 'Social media influencer', result: physical.weak },
      { text: 'Astronaut', result: physical.strong },
      { text: 'Pilot', result: physical.strong },
      { text: 'Firefighter', result: physical.strong },
      { text: 'President', result: physical.weak },
      { text: 'Chicken farmer', result: physical.strong },
      { text: 'Actor', result: physical.strong },
      { text: 'Doctor', result: physical.weak },
    ],
  },
];
