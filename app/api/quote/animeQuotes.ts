type quoteSchema={
    quote:string;
    character:string;
    anime:string;
}

const animeQuotes: quoteSchema[] = [
  {
    quote: "It is not the strong that win. The winners are the strong.",
    character: "Ayanokoji Kiyotaka",
    anime: "Classroom of the Elite"
  },
  {
    quote: "Talent is something you make bloom, instinct is something you polish.",
    character: "Horikita Suzune",
    anime: "Classroom of the Elite"
  },
  {
    quote: "Equality may be a fiction, but still one must believe in it. It’s most important not to have prejudices.",
    character: "Ayanokoji Kiyotaka",
    anime: "Classroom of the Elite"
  },
  {
    quote: "People with talent often misunderstand. With a little bit of work, they can accomplish things that others can’t. That’s why many don’t understand what it means to fail.",
    character: "Ayanokoji Kiyotaka",
    anime: "Classroom of the Elite"
  },
  {
    quote: "Dying to win and risking death to win are completely different, Megumi.",
    character: "Gojo Satoru",
    anime: "Jujutsu Kaisen"
  },
  {
    quote: "I don’t know how I’ll feel when I’m dead, but I don’t want to regret the way I lived.",
    character: "Yuji Itadori",
    anime: "Jujutsu Kaisen"
  },
  {
    quote: "Don’t go blaming yourself. You’re not perfect, so don’t act like it.",
    character: "Kento Nanami",
    anime: "Jujutsu Kaisen"
  },
  {
    quote: "I hate working overtime. So I’ll end this quickly.",
    character: "Kento Nanami",
    anime: "Jujutsu Kaisen"
  },
  {
    quote: "You can cry later. As long as you're still standing, save it for after you've done everything you can.",
    character: "Maki Zenin",
    anime: "Jujutsu Kaisen"
  },
  {
    quote: "The only ones allowed to talk about ideals are those prepared to die by them.",
    character: "Suguru Geto",
    anime: "Jujutsu Kaisen"
  },
  {
    quote: "No matter how many allies you have around you, when you die, you’ll be alone.",
    character: "Gojo Satoru",
    anime: "Jujutsu Kaisen"
  },
  {
    quote: "Power comes in response to a need, not a desire.",
    character: "Goku",
    anime: "Dragon Ball Z"
  },
  {
    quote: "When you give up, that's when the game is over.",
    character: "Misaki Ayuzawa",
    anime: "Kaichou wa Maid-sama!"
  },
  {
    quote: "Forgetting is like a wound. The wound may heal, but it has already left a scar.",
    character: "Monkey D. Luffy",
    anime: "One Piece"
  },
  {
    quote: "A lesson without pain is meaningless.",
    character: "Edward Elric",
    anime: "Fullmetal Alchemist: Brotherhood"
  },
  {
    quote: "A person grows up when he's able to overcome hardships.",
    character: "Jiraiya",
    anime: "Naruto"
  },
  {
    quote: "I'm not gonna run away, I never go back on my word! That's my nindō: my ninja way!",
    character: "Naruto Uzumaki",
    anime: "Naruto"
  },
  {
    quote: "Fear is not evil. It tells you what your weakness is.",
    character: "Gildarts Clive",
    anime: "Fairy Tail"
  },
  {
    quote: "A lesson you learned from pain is a lesson never forgotten.",
    character: "Holo",
    anime: "Spice and Wolf"
  },
  {
    quote: "I want to be the very best, like no one ever was.",
    character: "Ash Ketchum",
    anime: "Pokémon"
  },
  {
    quote: "Humankind cannot gain anything without first giving something in return.",
    character: "Alphonse Elric",
    anime: "Fullmetal Alchemist: Brotherhood"
  },
  {
    quote: "It's not the face that makes someone a monster; it's the choices they make with their lives.",
    character: "Naruto Uzumaki",
    anime: "Naruto"
  },
  {
    quote: "The world isn’t perfect. But it’s there for us, doing the best it can. That’s what makes it so damn beautiful.",
    character: "Roy Mustang",
    anime: "Fullmetal Alchemist: Brotherhood"
  },
  {
    quote: "To know sorrow is not terrifying. What is terrifying is to know you can't go back to happiness you could have.",
    character: "Matsumoto Rangiku",
    anime: "Bleach"
  },
  {
    quote: "In our society, letting others find out that you're a nice guy is a very risky move. Someone will take advantage of it.",
    character: "Hitagi Senjougahara",
    anime: "Monogatari Series"
  }
];


export function randomQuote(){
    const random:number=Math.floor(Math.random()*animeQuotes.length);
    return animeQuotes[random];
}