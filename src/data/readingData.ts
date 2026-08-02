export interface ReadingQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  answerText: string;
}

export interface UnitReadingData {
  unit: number;
  title: string;
  passage: string;
  questions: ReadingQuestion[];
}

export const READING_DATA: UnitReadingData[] = [
  {
    unit: 1,
    title: "My Friends",
    passage: "Hello! My name is Mai. I am nine years old and I live in Hanoi. I have two close friends, Tony and Akiko. Tony is from Australia and Akiko is from Japan. We like playing together after school. We are very happy to be good friends.",
    questions: [
      {
        id: 1,
        question: "Where does Mai live?",
        answerText: "She lives in Hanoi.",
        options: ["She lives in Hanoi.", "She lives in Tokyo.", "She lives in Sydney.", "She lives in London."],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Where is Akiko from?",
        answerText: "She is from Japan.",
        options: ["She is from Australia.", "She is from Japan.", "She is from Vietnam.", "She is from Britain."],
        correctAnswer: 1
      }
    ]
  },
  {
    unit: 2,
    title: "Time and Daily Routines",
    passage: "I get up at six o'clock every morning. I wash my face and brush my teeth. Then I have breakfast with my family at six thirty. I go to school at seven o'clock. In the evening, I do my homework and go to bed at nine p.m.",
    questions: [
      {
        id: 1,
        question: "What time does the writer get up?",
        answerText: "At six o'clock.",
        options: ["At five o'clock.", "At six o'clock.", "At seven o'clock.", "At eight o'clock."],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What time does the writer go to bed?",
        answerText: "At nine p.m.",
        options: ["At eight p.m.", "At nine p.m.", "At ten p.m.", "At eleven p.m."],
        correctAnswer: 1
      }
    ]
  },
  {
    unit: 3,
    title: "My Week",
    passage: "Today is Thursday. I go to school from Monday to Friday. On Wednesdays, I have a music class. On Saturdays, I stay at home and help my mother clean the house. On Sundays, I like riding my bike in the park with my father.",
    questions: [
      {
        id: 1,
        question: "What class does the writer have on Wednesdays?",
        answerText: "A music class.",
        options: ["An English class.", "A music class.", "An Art class.", "A Science class."],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What does the writer like doing on Sundays?",
        answerText: "Riding a bike in the park with father.",
        options: [
          "Riding a bike in the park with father.",
          "Cleaning the house with mother.",
          "Swimming in the pool with friends.",
          "Watching TV at home."
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    unit: 4,
    title: "My Birthday Party",
    passage: "My birthday is in May. I always have a big birthday party at home. My friends come to my house with nice gifts. We eat cake, ice cream, and drink juice. We sing birthday songs and play fun games together. I love my birthday party very much.",
    questions: [
      {
        id: 1,
        question: "When is the writer's birthday?",
        answerText: "In May.",
        options: ["In April.", "In May.", "In June.", "In July."],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What do they eat and drink at the party?",
        answerText: "They eat cake, ice cream, and drink juice.",
        options: [
          "They eat pizza and drink milk.",
          "They eat cake, ice cream, and drink juice.",
          "They eat fruit and drink tea.",
          "They eat bread and drink water."
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    unit: 5,
    title: "Things We Can Do",
    passage: "My friends have many talents. Nam can play football very well, but he cannot swim. Linh can dance and play the piano. I cannot dance, but I can sing nicely. We often practice our abilities together on weekends. It is always a lot of fun.",
    questions: [
      {
        id: 1,
        question: "What can Nam do?",
        answerText: "He can play football very well.",
        options: [
          "He can swim fast.",
          "He can play football very well.",
          "He can play the piano.",
          "He can dance gracefully."
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Can Linh play the piano?",
        answerText: "Yes, she can.",
        options: ["Yes, she can.", "No, she cannot.", "No, she can dance only.", "Yes, she plays guitar."],
        correctAnswer: 0
      }
    ]
  },
  {
    unit: 6,
    title: "Our School Facilities",
    passage: "Welcome to my primary school! It is big and clean. There is a large computer room and a big library. We read books in the library during break time. There is also a beautiful garden with many colorful flowers. I love my school very much.",
    questions: [
      {
        id: 1,
        question: "What do pupils do in the library during break time?",
        answerText: "They read books.",
        options: ["They play football.", "They read books.", "They draw pictures.", "They use computers."],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Is there a garden in the school?",
        answerText: "Yes, there is.",
        options: ["Yes, there is.", "No, there is not.", "No, there is only a pool.", "Yes, but it is small."],
        correctAnswer: 0
      }
    ]
  },
  {
    unit: 7,
    title: "Our Timetables",
    passage: "We have many interesting subjects at school. Today is Tuesday, so I have Maths, Vietnamese, English, and Art. English is my favorite subject because I like speaking with my teacher. My class has Art on Tuesday and Thursday afternoons. We enjoy painting pictures together.",
    questions: [
      {
        id: 1,
        question: "What is the writer's favorite subject?",
        answerText: "English.",
        options: ["Maths.", "Vietnamese.", "English.", "Art."],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "When does the class have Art?",
        answerText: "On Tuesday and Thursday afternoons.",
        options: [
          "On Monday and Wednesday mornings.",
          "On Tuesday and Thursday afternoons.",
          "On Friday mornings.",
          "On Saturday afternoons."
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    unit: 8,
    title: "My Favourite Subjects",
    passage: "My brother loves Science because he likes doing simple experiments. My sister likes Music because she wants to be a singer. As for me, my favorite subject is IT. I like learning how to use computers to draw pictures and play educational games.",
    questions: [
      {
        id: 1,
        question: "Why does the brother love Science?",
        answerText: "Because he likes doing simple experiments.",
        options: [
          "Because he likes playing numbers.",
          "Because he likes doing simple experiments.",
          "Because he wants to be a singer.",
          "Because he likes singing."
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What does the sister want to be?",
        answerText: "She wants to be a singer.",
        options: ["She wants to be a doctor.", "She wants to be a teacher.", "She wants to be a singer.", "She wants to be an artist."],
        correctAnswer: 2
      }
    ]
  },
  {
    unit: 9,
    title: "Our Sports Day",
    passage: "Sports Day is coming soon at our school. It will be in November. Many pupils are practicing hard on the playground. Nam will play football, and Mai will join the running race. I will play volleyball with my classmates. We hope to win medals.",
    questions: [
      {
        id: 1,
        question: "When will Sports Day be?",
        answerText: "In November.",
        options: ["In October.", "In November.", "In December.", "In September."],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What sport will Nam play?",
        answerText: "Football.",
        options: ["Volleyball.", "Football.", "Basketball.", "Badminton."],
        correctAnswer: 1
      }
    ]
  },
  {
    unit: 10,
    title: "Our Summer Holidays",
    passage: "Last summer holiday, my family went to Nha Trang. The weather was sunny and hot. We stayed in a nice hotel near the sea. We swam in the blue water, built sandcastles, and ate delicious seafood. It was a wonderful summer vacation for us.",
    questions: [
      {
        id: 1,
        question: "Where did the family go last summer holiday?",
        answerText: "Nha Trang.",
        options: ["Da Nang.", "Nha Trang.", "Phu Quoc.", "Ha Long."],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What was the weather like?",
        answerText: "It was sunny and hot.",
        options: ["It was rainy and cold.", "It was sunny and hot.", "It was windy and cloudy.", "It was cool and foggy."],
        correctAnswer: 1
      }
    ]
  },
  {
    unit: 11,
    title: "My Home",
    passage: "I live with my family in a small house in the countryside. There is a quiet lane in front of my house. Around the house, there is a green garden with many fruit trees. I like living here because it is peaceful and clean.",
    questions: [
      {
        id: 1,
        question: "Where is the writer's house located?",
        answerText: "In the countryside.",
        options: ["In the city centre.", "In the countryside.", "In a big town.", "Near the mountain."],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Why does the writer like living there?",
        answerText: "Because it is peaceful and clean.",
        options: [
          "Because it is busy and noisy.",
          "Because it is peaceful and clean.",
          "Because there are many big shops.",
          "Because it is near school."
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    unit: 12,
    title: "Jobs",
    passage: "There are four people in my family. My father is a doctor. He works in a big hospital and helps sick people. My mother is a primary school teacher. She teaches English to young children. I want to be a pilot when I grow up.",
    questions: [
      {
        id: 1,
        question: "What is the father's job?",
        answerText: "He is a doctor.",
        options: ["He is a teacher.", "He is a doctor.", "He is a pilot.", "He is a farmer."],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What does the writer want to be when growing up?",
        answerText: "A pilot.",
        options: ["A doctor.", "A teacher.", "A pilot.", "A nurse."],
        correctAnswer: 2
      }
    ]
  },
  {
    unit: 13,
    title: "Appearance",
    passage: "My best friend is Phong. He is tall and slim. He has short black hair and big brown eyes. He always wears a green T-shirt and blue shorts. Phong is very friendly and kind. Everyone in our class likes talking to him.",
    questions: [
      {
        id: 1,
        question: "What does Phong look like?",
        answerText: "He is tall and slim with short black hair and big brown eyes.",
        options: [
          "He is short and chubby with blonde hair.",
          "He is tall and slim with short black hair and big brown eyes.",
          "He is thin with long curly hair.",
          "He is tall with blue eyes and brown hair."
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What is Phong's personality like?",
        answerText: "He is friendly and kind.",
        options: ["He is quiet and shy.", "He is friendly and kind.", "He is strict and serious.", "He is noisy and impatient."],
        correctAnswer: 1
      }
    ]
  },
  {
    unit: 14,
    title: "Daily Activities",
    passage: "On Sundays, my family stays at home and does housework together. My father cleans the floor and waters the plants in the garden. My mother cooks delicious meals in the kitchen. I help my parents wash the dishes and fold the clothes.",
    questions: [
      {
        id: 1,
        question: "What does the father do on Sundays?",
        answerText: "He cleans the floor and waters the plants.",
        options: [
          "He cooks meals in the kitchen.",
          "He cleans the floor and waters the plants.",
          "He washes the dishes.",
          "He folds the clothes."
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "How does the writer help parents?",
        answerText: "By washing the dishes and folding the clothes.",
        options: [
          "By cleaning the floor.",
          "By cooking meals.",
          "By washing the dishes and folding the clothes.",
          "By watering plants."
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    unit: 15,
    title: "My Family's Weekends",
    passage: "My family usually goes to the park on Saturday afternoons. We bring a picnic basket with sandwiches, fruit, and orange juice. My father and I play badminton while my mother reads a book under a big tree. We always have a great time together.",
    questions: [
      {
        id: 1,
        question: "Where does the family go on Saturday afternoons?",
        answerText: "To the park.",
        options: ["To the beach.", "To the park.", "To the cinema.", "To the zoo."],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What do the father and the writer do?",
        answerText: "They play badminton.",
        options: ["They play football.", "They play badminton.", "They ride bikes.", "They swim in the lake."],
        correctAnswer: 1
      }
    ]
  },
  {
    unit: 16,
    title: "Weather",
    passage: "The weather in my city changes throughout the year. In summer, it is hot and sunny, so I wear shorts and T-shirts. In winter, it is cold and windy, so I wear a warm coat and a scarf. I like summer best because I can go swimming.",
    questions: [
      {
        id: 1,
        question: "What is the weather like in winter?",
        answerText: "It is cold and windy.",
        options: ["It is hot and sunny.", "It is cold and windy.", "It is warm and dry.", "It is foggy and hot."],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Why does the writer like summer best?",
        answerText: "Because the writer can go swimming.",
        options: [
          "Because the writer can wear coats.",
          "Because the writer can go swimming.",
          "Because school is closed.",
          "Because it is cold."
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    unit: 17,
    title: "In the City",
    passage: "My neighborhood is very busy. There is a bakery next to my house where I buy fresh bread. Across the street, there is a cinema and a large pharmacy. There is also a bus stop nearby, so it is easy to travel around the city.",
    questions: [
      {
        id: 1,
        question: "What is next to the writer's house?",
        answerText: "A bakery.",
        options: ["A cinema.", "A bakery.", "A pharmacy.", "A school."],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What is across the street?",
        answerText: "A cinema and a large pharmacy.",
        options: [
          "A park and a library.",
          "A cinema and a large pharmacy.",
          "A bakery and a bus stop.",
          "A supermarket and a hospital."
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    unit: 18,
    title: "At the Shopping Centre",
    passage: "On weekends, my mother and I go to the shopping centre near our house. It is very big with many shops. We buy fresh food, snacks, and clothes. I like looking at the toys in the toy store. Shopping with my mother is very fun.",
    questions: [
      {
        id: 1,
        question: "Who does the writer go to the shopping centre with?",
        answerText: "With mother.",
        options: ["With father.", "With mother.", "With friends.", "With brother."],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What does the writer like looking at in the toy store?",
        answerText: "Toys.",
        options: ["Books.", "Toys.", "Clothes.", "Snacks."],
        correctAnswer: 1
      }
    ]
  },
  {
    unit: 19,
    title: "The Animal World",
    passage: "I love visiting the zoo with my family. There are many animals there. I like monkeys because they can swing on trees quickly. My sister likes peacocks because they have beautiful colorful feathers. Tigers and lions are big, but they can be a bit scary.",
    questions: [
      {
        id: 1,
        question: "Why does the writer like monkeys?",
        answerText: "Because they can swing on trees quickly.",
        options: [
          "Because they are big and scary.",
          "Because they can swing on trees quickly.",
          "Because they have colorful feathers.",
          "Because they swim in water."
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Why does the sister like peacocks?",
        answerText: "Because they have beautiful colorful feathers.",
        options: [
          "Because they are scary.",
          "Because they have beautiful colorful feathers.",
          "Because they can run fast.",
          "Because they jump high."
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    unit: 20,
    title: "At Summer Camp",
    passage: "This summer, I am staying at a summer camp in the mountains. We pitch tents, sing songs around the campfire, and go hiking in the forest. I learn how to work in a team and make many new friends. Camping is an exciting adventure!",
    questions: [
      {
        id: 1,
        question: "Where is the summer camp?",
        answerText: "In the mountains.",
        options: ["On the beach.", "In the mountains.", "In the city.", "At school."],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What do they do around the campfire?",
        answerText: "They sing songs.",
        options: ["They sleep.", "They sing songs.", "They study maths.", "They cook dinner."],
        correctAnswer: 1
      }
    ]
  }
];

export function getUnitReadingData(unitNumber: number): UnitReadingData {
  const data = READING_DATA.find((r) => r.unit === unitNumber);
  if (data) return data;
  return READING_DATA[0];
}
