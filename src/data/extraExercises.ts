import { UnitExercisesData } from '../types';

export const EXTRA_EXERCISES_DATA: UnitExercisesData[] = [
  {
    unit_id: 1,
    unit_title: "My Friends",
    sentence_unscramble: [
      {
        id: 1,
        words: ["is", "Where", "from?", "he"],
        correct_answer: "Where is he from?"
      },
      {
        id: 2,
        words: ["from", "I", "Viet Nam.", "am"],
        correct_answer: "I am from Viet Nam."
      },
      {
        id: 3,
        words: ["She", "Britain.", "is", "from"],
        correct_answer: "She is from Britain."
      },
      {
        id: 4,
        words: ["you", "Where", "from?", "are"],
        correct_answer: "Where are you from?"
      },
      {
        id: 5,
        words: ["Japan.", "My", "is", "friend", "from"],
        correct_answer: "My friend is from Japan."
      },
      {
        id: 6,
        words: ["from", "America.", "They", "are"],
        correct_answer: "They are from America."
      },
      {
        id: 7,
        words: ["Is", "Australia?", "he", "from"],
        correct_answer: "Is he from Australia?"
      },
      {
        id: 8,
        words: ["from", "She", "Singapore.", "isn't"],
        correct_answer: "She isn't from Singapore."
      },
      {
        id: 9,
        words: ["do", "come", "Where", "from?", "you"],
        correct_answer: "Where do you come from?"
      },
      {
        id: 10,
        words: ["friend,", "This", "my", "Akiko.", "is"],
        correct_answer: "This is my friend, Akiko."
      }
    ],
    fill_in_blanks: {
      word_bank: ["from", "Where", "is", "am", "friend", "nationality", "Viet Nam", "Japan", "are", "America"],
      questions: [
        { id: 1, sentence: "Where _______ you from?", correct_answer: "are" },
        { id: 2, sentence: "I am _______ Viet Nam.", correct_answer: "from" },
        { id: 3, sentence: "She _______ from Britain.", correct_answer: "is" },
        { id: 4, sentence: "_______ is he from?", correct_answer: "Where" },
        { id: 5, sentence: "My _______ is from Tokyo, Japan.", correct_answer: "friend" },
        { id: 6, sentence: "He is from _______, so he is American.", correct_answer: "America" },
        { id: 7, sentence: "They _______ from Australia.", correct_answer: "are" },
        { id: 8, sentence: "Akiko is from _______ .", correct_answer: "Japan" },
        { id: 9, sentence: "I _______ a student from Ha Noi.", correct_answer: "am" },
        { id: 10, sentence: "Is she _______ Malaysia?", correct_answer: "from" }
      ]
    }
  },
  {
    unit_id: 2,
    unit_title: "Time and Daily Routines",
    sentence_unscramble: [
      { id: 1, words: ["time", "What", "it?", "is"], correct_answer: "What time is it?" },
      { id: 2, words: ["it", "Seven", "o'clock.", "is"], correct_answer: "It is Seven o'clock." },
      { id: 3, words: ["get", "I", "at", "up", "6 o'clock."], correct_answer: "I get up at 6 o'clock." },
      { id: 4, words: ["time", "do", "What", "you", "go", "bed?", "to"], correct_answer: "What time do you go to bed?" },
      { id: 5, words: ["She", "breakfast", "at", "eats", "6:30."], correct_answer: "She eats breakfast at 6:30." },
      { id: 6, words: ["goes", "My", "father", "to", "at", "work", "7:00."], correct_answer: "My father goes to work at 7:00." },
      { id: 7, words: ["home", "I", "go", "4:30.", "at"], correct_answer: "I go home at 4:30." },
      { id: 8, words: ["do", "What", "time", "have", "you", "lunch?"], correct_answer: "What time do you have lunch?" },
      { id: 9, words: ["goes", "She", "to", "bed", "at", "10 o'clock."], correct_answer: "She goes to bed at 10 o'clock." },
      { id: 10, words: ["watching", "He", "TV", "is", "now."], correct_answer: "He is watching TV now." }
    ],
    fill_in_blanks: {
      word_bank: ["time", "o'clock", "get", "breakfast", "bed", "goes", "up", "at", "What", "lunch"],
      questions: [
        { id: 1, sentence: "What _______ is it?", correct_answer: "time" },
        { id: 2, sentence: "It is six _______.", correct_answer: "o'clock" },
        { id: 3, sentence: "I _______ up at 6:00 in the morning.", correct_answer: "get" },
        { id: 4, sentence: "What time do you eat _______?", correct_answer: "breakfast" },
        { id: 5, sentence: "She _______ to school at 7 o'clock.", correct_answer: "goes" },
        { id: 6, sentence: "I go to _______ at 10 p.m.", correct_answer: "bed" },
        { id: 7, sentence: "He has _______ at 12 o'clock.", correct_answer: "lunch" },
        { id: 8, sentence: "My brother gets _______ early every day.", correct_answer: "up" },
        { id: 9, sentence: "_______ time does she go home?", correct_answer: "What" },
        { id: 10, sentence: "We have dinner _______ 7 p.m.", correct_answer: "at" }
      ]
    }
  },
  {
    unit_id: 3,
    unit_title: "My Week",
    sentence_unscramble: [
      { id: 1, words: ["day", "What", "is", "today?", "it"], correct_answer: "What day is it today?" },
      { id: 2, words: ["Monday.", "It", "is", "today"], correct_answer: "It is Monday today." },
      { id: 3, words: ["do", "What", "you", "on", "do", "Sundays?"], correct_answer: "What do you do on Sundays?" },
      { id: 4, words: ["go", "I", "to", "school", "on", "Mondays."], correct_answer: "I go to school on Mondays." },
      { id: 5, words: ["She", "plays", "football", "on", "Saturdays."], correct_answer: "She plays football on Saturdays." },
      { id: 6, words: ["Don't", "go", "to", "school", "on", "Sundays.", "I"], correct_answer: "I Don't go to school on Sundays." },
      { id: 7, words: ["My", "listens", "brother", "to", "music."], correct_answer: "My brother listens to music." },
      { id: 8, words: ["do", "What", "does", "she", "on", "Tuesdays?"], correct_answer: "What does she do on Tuesdays?" },
      { id: 9, words: ["English", "We", "study", "on", "Wednesdays."], correct_answer: "We study English on Wednesdays." },
      { id: 10, words: ["help", "I", "my", "parents", "at", "home."], correct_answer: "I help my parents at home." }
    ],
    fill_in_blanks: {
      word_bank: ["day", "today", "Monday", "on", "do", "plays", "help", "school", "listen", "Sunday"],
      questions: [
        { id: 1, sentence: "What _______ is it today?", correct_answer: "day" },
        { id: 2, sentence: "It is _______ today.", correct_answer: "Monday" },
        { id: 3, sentence: "What do you do _______ Saturdays?", correct_answer: "on" },
        { id: 4, sentence: "I go to _______ from Monday to Friday.", correct_answer: "school" },
        { id: 5, sentence: "She _______ badminton on Sunday.", correct_answer: "plays" },
        { id: 6, sentence: "I _______ to music in my free time.", correct_answer: "listen" },
        { id: 7, sentence: "What does he _______ on Thursdays?", correct_answer: "do" },
        { id: 8, sentence: "I _______ my parents with the housework.", correct_answer: "help" },
        { id: 9, sentence: "We don't go to school on _______.", correct_answer: "Sunday" },
        { id: 10, sentence: "It is Friday _______.", correct_answer: "today" }
      ]
    }
  },
  {
    unit_id: 4,
    unit_title: "My Birthday",
    sentence_unscramble: [
      { id: 1, words: ["is", "birthday?", "When", "your"], correct_answer: "When is your birthday?" },
      { id: 2, words: ["in", "May.", "My", "birthday", "is"], correct_answer: "My birthday is in May." },
      { id: 3, words: ["is", "the", "Today", "first", "of", "October."], correct_answer: "Today is the first of October." },
      { id: 4, words: ["month", "What", "is", "it?"], correct_answer: "What month is it?" },
      { id: 5, words: ["birthday", "Her", "is", "on", "the", "fifth", "of", "July."], correct_answer: "Her birthday is on the fifth of July." },
      { id: 6, words: ["birthday", "When", "is", "his?"], correct_answer: "When is his birthday?" },
      { id: 7, words: ["party", "Have", "a", "big", "birthday."], correct_answer: "Have a big birthday party." },
      { id: 8, words: ["cake", "I", "want", "a", "birthday."], correct_answer: "I want a birthday cake." },
      { id: 9, words: ["gifts", "She", "gets", "many", "on", "her", "birthday."], correct_answer: "She gets many gifts on her birthday." },
      { id: 10, words: ["is", "It", "December", "today."], correct_answer: "It is December today." }
    ],
    fill_in_blanks: {
      word_bank: ["When", "birthday", "in", "on", "month", "first", "May", "cake", "party", "presents"],
      questions: [
        { id: 1, sentence: "_______ is your birthday?", correct_answer: "When" },
        { id: 2, sentence: "My birthday is _______ June.", correct_answer: "in" },
        { id: 3, sentence: "Her birthday is _______ the 12th of August.", correct_answer: "on" },
        { id: 4, sentence: "What _______ is it? - It's November.", correct_answer: "month" },
        { id: 5, sentence: "Today is the _______ day of the month.", correct_answer: "first" },
        { id: 6, sentence: "We have a great birthday _______ .", correct_answer: "party" },
        { id: 7, sentence: "She blows out the candles on the _______.", correct_answer: "cake" },
        { id: 8, sentence: "I get a lot of _______ from my friends.", correct_answer: "presents" },
        { id: 9, sentence: "My mother's birthday is in _______.", correct_answer: "May" },
        { id: 10, sentence: "Happy _______ to you!", correct_answer: "birthday" }
      ]
    }
  },
  {
    unit_id: 5,
    unit_title: "Our Things",
    sentence_unscramble: [
      { id: 1, words: ["your", "Is", "pencil case?", "this"], correct_answer: "Is this your pencil case?" },
      { id: 2, words: ["books.", "these", "my", "Are"], correct_answer: "Are these my books?" },
      { id: 3, words: ["Whose", "pencil", "is", "this?"], correct_answer: "Whose pencil is this?" },
      { id: 4, words: ["is", "my", "This", "new", "school bag."], correct_answer: "This is my new school bag." },
      { id: 5, words: ["are", "Her", "pens", "blue."], correct_answer: "Her pens are blue." },
      { id: 6, words: ["your", "Put", "away", "toys."], correct_answer: "Put away your toys." },
      { id: 7, words: ["desk.", "The", "book", "is", "on", "the"], correct_answer: "The book is on the desk." },
      { id: 8, words: ["these", "Whose", "hats?", "are"], correct_answer: "Whose hats are these?" },
      { id: 9, words: ["ruler", "My", "is", "short."], correct_answer: "My ruler is short." },
      { id: 10, words: ["have", "I", "three", "erasers."], correct_answer: "I have three erasers." }
    ],
    fill_in_blanks: {
      word_bank: ["is", "are", "this", "these", "Whose", "my", "your", "bag", "pencils", "on"],
      questions: [
        { id: 1, sentence: "Is _______ your pen?", correct_answer: "this" },
        { id: 2, sentence: "_______ books are very nice.", correct_answer: "These" },
        { id: 3, sentence: "_______ ruler is this? - It's mine.", correct_answer: "Whose" },
        { id: 4, sentence: "This _______ my new hat.", correct_answer: "is" },
        { id: 5, sentence: "These _______ my colored pencils.", correct_answer: "are" },
        { id: 6, sentence: "The notebook is _______ the table.", correct_answer: "on" },
        { id: 7, sentence: "I carry my books in my school _______.", correct_answer: "bag" },
        { id: 8, sentence: "She has five _______.", correct_answer: "pencils" },
        { id: 9, sentence: "Show me _______ eraser, please.", correct_answer: "your" },
        { id: 10, sentence: "_______ is my desk.", correct_answer: "This" }
      ]
    }
  },
  {
    unit_id: 6,
    unit_title: "Our School Facilities",
    sentence_unscramble: [
      { id: 1, words: ["school", "is", "my", "This."], correct_answer: "This is my school." },
      { id: 2, words: ["classroom", "Is", "computer", "your", "this?"], correct_answer: "Is this your computer classroom?" },
      { id: 3, words: ["library", "is", "big", "The", "school."], correct_answer: "The school library is big." },
      { id: 4, words: ["have", "two", "We", "rooms", "computer."], correct_answer: "We have two computer rooms." },
      { id: 5, words: ["is", "Where", "art", "the", "room?"], correct_answer: "Where is the art room?" },
      { id: 6, words: ["ground", "floor", "It", "is", "the", "on."], correct_answer: "It is on the ground floor." },
      { id: 7, words: ["music", "like", "Do", "you", "room", "the?"], correct_answer: "Do you like the music room?" },
      { id: 8, words: ["is", "my", "That", "playground", "school."], correct_answer: "That is my school playground." },
      { id: 9, words: ["clean", "large", "Our", "gym", "and", "is."], correct_answer: "Our gym is large and clean." },
      { id: 10, words: ["school", "Go", "straight", "to", "the", "garden."], correct_answer: "Go straight to the school garden." }
    ],
    fill_in_blanks: {
      word_bank: ["library", "computer", "art", "floor", "on", "large", "facilities", "ground", "music", "classroom"],
      questions: [
        { id: 1, sentence: "The _______ room has many computers for students.", correct_answer: "computer" },
        { id: 2, sentence: "We read books in the school _______.", correct_answer: "library" },
        { id: 3, sentence: "My class is on the first _______.", correct_answer: "floor" },
        { id: 4, sentence: "Is there an _______ room in your school?", correct_answer: "art" },
        { id: 5, sentence: "Our playground is very _______ and green.", correct_answer: "large" },
        { id: 6, sentence: "The school gym is _______ the left.", correct_answer: "on" },
        { id: 7, sentence: "We sing songs in the _______ room.", correct_answer: "music" },
        { id: 8, sentence: "Look at that new _______ over there.", correct_answer: "classroom" },
        { id: 9, sentence: "Is your school on the _______ floor?", correct_answer: "ground" },
        { id: 10, sentence: "My school has great modern _______.", correct_answer: "facilities" }
      ]
    }
  },
  {
    unit_id: 7,
    unit_title: "Our Timetable",
    sentence_unscramble: [
      { id: 1, words: ["subjects", "do", "What", "have", "today", "you?"], correct_answer: "What subjects do you have today?" },
      { id: 2, words: ["I", "English", "Maths", "have", "and", "today."], correct_answer: "I have English and Maths today." },
      { id: 3, words: ["do", "When", "Art", "you", "have?"], correct_answer: "When do you have Art?" },
      { id: 4, words: ["I", "on", "have", "Mondays", "Music."], correct_answer: "I have Music on Mondays." },
      { id: 5, words: ["favorite", "What", "is", "subject", "your?"], correct_answer: "What is your favorite subject?" },
      { id: 6, words: ["my", "Science", "favorite", "is", "subject."], correct_answer: "Science is my favorite subject." },
      { id: 7, words: ["English", "Do", "today", "have", "you?"], correct_answer: "Do you have English today?" },
      { id: 8, words: ["have", "We", "Vietnamese", "days", "every."], correct_answer: "We have Vietnamese every day." },
      { id: 9, words: ["timetable", "Look", "at", "your", "school."], correct_answer: "Look at your school timetable." },
      { id: 10, words: ["PE", "have", "I", "Fridays", "on."], correct_answer: "I have PE on Fridays." }
    ],
    fill_in_blanks: {
      word_bank: ["timetable", "subject", "Mondays", "today", "have", "Science", "favorite", "when", "Maths", "English"],
      questions: [
        { id: 1, sentence: "What subjects do you have _______?", correct_answer: "today" },
        { id: 2, sentence: "My favorite _______ is English.", correct_answer: "subject" },
        { id: 3, sentence: "I have Art on _______ and Wednesdays.", correct_answer: "Mondays" },
        { id: 4, sentence: "I like numbers, so I like _______.", correct_answer: "Maths" },
        { id: 5, sentence: "_______ do you have Physical Education (PE)?", correct_answer: "When" },
        { id: 6, sentence: "We learn about animals and plants in _______.", correct_answer: "Science" },
        { id: 7, sentence: "Do you _______ IT on Tuesdays?", correct_answer: "have" },
        { id: 8, sentence: "I can speak _______ with my teacher.", correct_answer: "English" },
        { id: 9, sentence: "Please check your school _______ for tomorrow.", correct_answer: "timetable" },
        { id: 10, sentence: "Music is my _______ subject because I like singing.", correct_answer: "favorite" }
      ]
    }
  },
  {
    unit_id: 8,
    unit_title: "My Favorite Subjects",
    sentence_unscramble: [
      { id: 1, words: ["subject", "why", "like", "do", "you", "this?"], correct_answer: "Why do you like this subject?" },
      { id: 2, words: ["because", "I", "like", "it", "I", "singing", "love."], correct_answer: "I like it because I love singing." },
      { id: 3, words: ["is", "her", "favorite", "What", "subject?"], correct_answer: "What is her favorite subject?" },
      { id: 4, words: ["IT", "likes", "because", "he", "computers", "likes."], correct_answer: "He likes IT because he likes computers." },
      { id: 5, words: ["subject", "History", "my", "is", "favorite."], correct_answer: "History is my favorite subject." },
      { id: 6, words: ["you", "Do", "Art", "like", "drawing", "because", "you", "like?"], correct_answer: "Do you like Art because you like drawing?" },
      { id: 7, words: ["teacher", "My", "English", "is", "friendly", "very."], correct_answer: "My English teacher is very friendly." },
      { id: 8, words: ["subject", "is", "Geography", "interesting", "an."], correct_answer: "Geography is an interesting subject." },
      { id: 9, words: ["why", "sentence", "Complete", "the", "to", "explain."], correct_answer: "Complete the sentence to explain why." },
      { id: 10, words: ["study", "We", "together", "subjects", "different."], correct_answer: "We study different subjects together." }
    ],
    fill_in_blanks: {
      word_bank: ["why", "because", "draw", "subject", "computer", "sports", "numbers", "learns", "interesting", "singing"],
      questions: [
        { id: 1, sentence: "Why do you like Music? – _______ I like singing.", correct_answer: "because" },
        { id: 2, sentence: "He likes Art because he wants to _______ pictures.", correct_answer: "draw" },
        { id: 3, sentence: "Maths helps me work with _______.", correct_answer: "numbers" },
        { id: 4, sentence: "What is his favorite _______?", correct_answer: "subject" },
        { id: 5, sentence: "_______ do you like IT?", correct_answer: "why" },
        { id: 6, sentence: "PE is great for students who love _______.", correct_answer: "sports" },
        { id: 7, sentence: "She _______ English every day.", correct_answer: "learns" },
        { id: 8, sentence: "Geography is a very _______ subject.", correct_answer: "interesting" },
        { id: 9, sentence: "I use a _______ during my IT lessons.", correct_answer: "computer" },
        { id: 10, sentence: "Mary loves Music because of her love for _______.", correct_answer: "singing" }
      ]
    }
  },
  {
    unit_id: 9,
    unit_title: "Our Sports Day",
    sentence_unscramble: [
      { id: 1, words: ["sports", "When", "your", "day", "is?"], correct_answer: "When is your sports day?" },
      { id: 2, words: ["It", "in", "is", "November."], correct_answer: "It is in November." },
      { id: 3, words: ["sports", "Are", "ready", "for", "day", "you?"], correct_answer: "Are you ready for sports day?" },
      { id: 4, words: ["taking", "I", "am", "part", "in", "running."], correct_answer: "I am taking part in running." },
      { id: 5, words: ["playing", "He", "basketball", "likes."], correct_answer: "He likes playing basketball." },
      { id: 6, words: ["football", "They", "are", "playing", "ground", "on", "the."], correct_answer: "They are playing football on the ground." },
      { id: 7, words: ["Sports", "day", "is", "May", "in."], correct_answer: "Sports day is in May." },
      { id: 8, words: ["sport", "favorite", "What", "your", "is?"], correct_answer: "What is your favorite sport?" },
      { id: 9, words: ["badminton", "playing", "She", "is", "gym", "the", "in."], correct_answer: "She is playing badminton in the gym." },
      { id: 10, words: ["matches", "exciting", "The", "sports", "are."], correct_answer: "The sports matches are exciting." }
    ],
    fill_in_blanks: {
      word_bank: ["Sports", "November", "playing", "ready", "taking", "match", "event", "badminton", "ground", "win"],
      questions: [
        { id: 1, sentence: "Our _______ Day is in October.", correct_answer: "Sports" },
        { id: 2, sentence: "My brother is _______ table tennis now.", correct_answer: "playing" },
        { id: 3, sentence: "Are you _______ part in the competition?", correct_answer: "taking" },
        { id: 4, sentence: "Teachers and students are _______ for Sports Day.", correct_answer: "ready" },
        { id: 5, sentence: "We play football on the school _______.", correct_answer: "ground" },
        { id: 6, sentence: "My favorite game is _______.", correct_answer: "badminton" },
        { id: 7, sentence: "When is Sports Day? – It is in _______.", correct_answer: "November" },
        { id: 8, sentence: "Who will _______ the running race?", correct_answer: "win" },
        { id: 9, sentence: "That football _______ is really exciting!", correct_answer: "match" },
        { id: 10, sentence: "Sports Day is an important school _______.", correct_answer: "event" }
      ]
    }
  },
  {
    unit_id: 10,
    unit_title: "Our Summer Holidays",
    sentence_unscramble: [
      { id: 1, words: ["were", "Where", "last", "you", "summer?"], correct_answer: "Where were you last summer?" },
      { id: 2, words: ["I", "in", "was", "Ha Long Bay."], correct_answer: "I was in Ha Long Bay." },
      { id: 3, words: ["did", "What", "do", "you", "there?"], correct_answer: "What did you do there?" },
      { id: 4, words: ["took", "A", "boat", "trip", "I."], correct_answer: "I took a boat trip." },
      { id: 5, words: ["seaside", "She", "was", "at", "the."], correct_answer: "She was at the seaside." },
      { id: 6, words: ["they", "Did", "go", "to", "countryside", "the?"], correct_answer: "Did they go to the countryside?" },
      { id: 7, words: ["went", "We", "to", "my", "hometown."], correct_answer: "We went to my hometown." },
      { id: 8, words: ["sandcastles", "built", "They", "on", "beach", "the."], correct_answer: "They built sandcastles on the beach." },
      { id: 9, words: ["food", "delicious", "We", "seafood", "ate."], correct_answer: "We ate delicious seafood." },
      { id: 10, words: ["summer", "Great", "was", "my", "holiday."], correct_answer: "My summer holiday was great." }
    ],
    fill_in_blanks: {
      word_bank: ["summer", "was", "beach", "trip", "swam", "built", "holiday", "visited", "seafood", "countryside"],
      questions: [
        { id: 1, sentence: "Where were you last _______?", correct_answer: "summer" },
        { id: 2, sentence: "I _______ in Phu Quoc Island.", correct_answer: "was" },
        { id: 3, sentence: "My family went to the _______ last weekend.", correct_answer: "beach" },
        { id: 4, sentence: "We took a boat _______ around the bay.", correct_answer: "trip" },
        { id: 5, sentence: "They _______ in the sea yesterday morning.", correct_answer: "swam" },
        { id: 6, sentence: "The children _______ a big sandcastle on the beach.", correct_answer: "built" },
        { id: 7, sentence: "I _______ my grandparents in the countryside.", correct_answer: "visited" },
        { id: 8, sentence: "We ate fresh _______ at the seaside.", correct_answer: "seafood" },
        { id: 9, sentence: "Did you enjoy your summer _______?", correct_answer: "holiday" },
        { id: 10, sentence: "Life in the _______ is quiet and peaceful.", correct_answer: "countryside" }
      ]
    }
  },
  {
    unit_id: 11,
    unit_title: "My Home Town",
    sentence_unscramble: [
      { id: 1, words: ["is", "Where", "your", "home", "town?"], correct_answer: "Where is your home town?" },
      { id: 2, words: ["It", "in", "North", "Vietnam", "is", "of."], correct_answer: "It is in North of Vietnam." },
      { id: 3, words: ["like", "What", "is", "your", "village?"], correct_answer: "What is your village like?" },
      { id: 4, words: ["small", "It", "quiet", "and", "is."], correct_answer: "It is small and quiet." },
      { id: 5, words: ["big", "city", "Is", "a", "it?"], correct_answer: "Is it a big city?" },
      { id: 6, words: ["live", "I", "in", "busy", "a", "town."], correct_answer: "I live in a busy town." },
      { id: 7, words: ["beautiful", "My", "hometown", "is", "very."], correct_answer: "My hometown is very beautiful." },
      { id: 8, words: ["tall", "modern", "There", "are", "buildings", "many."], correct_answer: "There are many tall modern buildings." },
      { id: 9, words: ["place", "Do", "you", "like", "your", "living?"], correct_answer: "Do you like your living place?" },
      { id: 10, words: ["town", "People", "in", "my", "friendly", "are."], correct_answer: "People in my town are friendly." }
    ],
    fill_in_blanks: {
      word_bank: ["town", "North", "quiet", "crowded", "friendly", "buildings", "village", "live", "beautiful", "mountains"],
      questions: [
        { id: 1, sentence: "Where is your home _______?", correct_answer: "town" },
        { id: 2, sentence: "My home town is in the _______ of Viet Nam.", correct_answer: "North" },
        { id: 3, sentence: "Is your village small or _______?", correct_answer: "crowded" },
        { id: 4, sentence: "It is a peaceful and _______ place.", correct_answer: "quiet" },
        { id: 5, sentence: "There are high _______ in the big city.", correct_answer: "buildings" },
        { id: 6, sentence: "People in my town are very _______.", correct_answer: "friendly" },
        { id: 7, sentence: "I _______ in a small village near the sea.", correct_answer: "live" },
        { id: 8, sentence: "Hanoi is a _______ and busy city.", correct_answer: "beautiful" },
        { id: 9, sentence: "The scenery in my hometown is _______.", correct_answer: "beautiful" },
        { id: 10, sentence: "There are many green _______ around my village.", correct_answer: "mountains" }
      ]
    }
  },
  {
    unit_id: 12,
    unit_title: "Jobs",
    sentence_unscramble: [
      { id: 1, words: ["does", "What", "father", "your", "do?"], correct_answer: "What does your father do?" },
      { id: 2, words: ["He", "a", "is", "doctor."], correct_answer: "He is a doctor." },
      { id: 3, words: ["does", "Where", "she", "work?"], correct_answer: "Where does she work?" },
      { id: 4, words: ["She", "works", "hospital", "in", "a."], correct_answer: "She works in a hospital." },
      { id: 5, words: ["mother", "Is", "a", "teacher", "your?"], correct_answer: "Is your mother a teacher?" },
      { id: 6, words: ["a", "My", "uncle", "is", "driver", "bus."], correct_answer: "My uncle is a bus driver." },
      { id: 7, words: ["work", "They", "on", "a", "farm."], correct_answer: "They work on a farm." },
      { id: 8, words: ["want", "What", "to", "be", "you", "do?"], correct_answer: "What do you want to be?" },
      { id: 9, words: ["be", "I", "a", "want", "to", "pilot."], correct_answer: "I want to be a pilot." },
      { id: 10, words: ["primary", "She", "teaches", "at", "a", "school."], correct_answer: "She teaches at a primary school." }
    ],
    fill_in_blanks: {
      word_bank: ["doctor", "hospital", "teacher", "works", "farmer", "driver", "pilot", "nurse", "job", "school"],
      questions: [
        { id: 1, sentence: "What is your mother's _______?", correct_answer: "job" },
        { id: 2, sentence: "My father is a _______. He works in a hospital.", correct_answer: "doctor" },
        { id: 3, sentence: "A _______ works on a farm.", correct_answer: "farmer" },
        { id: 4, sentence: "She is an English _______ at a primary school.", correct_answer: "teacher" },
        { id: 5, sentence: "Where does a bus _______ work?", correct_answer: "driver" },
        { id: 6, sentence: "My sister _______ in a big office.", correct_answer: "works" },
        { id: 7, sentence: "A _______ helps sick people in the hospital.", correct_answer: "nurse" },
        { id: 8, sentence: "He wants to fly planes, so he wants to be a _______.", correct_answer: "pilot" },
        { id: 9, sentence: "My mother works at a local primary _______.", correct_answer: "school" },
        { id: 10, sentence: "Doctors work in a big _______.", correct_answer: "hospital" }
      ]
    }
  },
  {
    unit_id: 13,
    unit_title: "Appearance",
    sentence_unscramble: [
      { id: 1, words: ["does", "look", "What", "he", "like?"], correct_answer: "What does he look like?" },
      { id: 2, words: ["He", "tall", "slim", "is", "and."], correct_answer: "He is tall and slim." },
      { id: 3, words: ["short", "Has", "hair", "she", "got?"], correct_answer: "Has she got short hair?" },
      { id: 4, words: ["hair", "She", "dark", "long", "has."], correct_answer: "She has long dark hair." },
      { id: 5, words: ["brother", "Your", "is", "short", "tall", "or?"], correct_answer: "Is your brother tall or short?" },
      { id: 6, words: ["big", "brown", "eyes", "He", "has."], correct_answer: "He has big brown eyes." },
      { id: 7, words: ["looks", "She", "friendly", "very."], correct_answer: "She looks very friendly." },
      { id: 8, words: ["grandfather", "Old", "my", "is."], correct_answer: "My grandfather is old." },
      { id: 9, words: ["face", "She", "a", "round", "has."], correct_answer: "She has a round face." },
      { id: 10, words: ["young", "beautiful", "and", "My", "sister", "is."], correct_answer: "My sister is young and beautiful." }
    ],
    fill_in_blanks: {
      word_bank: ["look", "tall", "slim", "hair", "eyes", "short", "round", "young", "beautiful", "dark"],
      questions: [
        { id: 1, sentence: "What does your brother _______ like?", correct_answer: "look" },
        { id: 2, sentence: "He is _______ and plays basketball well.", correct_answer: "tall" },
        { id: 3, sentence: "My mother has long brown _______.", correct_answer: "hair" },
        { id: 4, sentence: "She has a _______ face and big eyes.", correct_answer: "round" },
        { id: 5, sentence: "Is your teacher young or _______?", correct_answer: "short" },
        { id: 6, sentence: "She is very _______ and elegant.", correct_answer: "beautiful" },
        { id: 7, sentence: "He has short _______ hair.", correct_answer: "dark" },
        { id: 8, sentence: "My sister has blue _______.", correct_answer: "eyes" },
        { id: 9, sentence: "He is not fat, he is _______.", correct_answer: "slim" },
        { id: 10, sentence: "My grandfather is old, but my brother is _______.", correct_answer: "young" }
      ]
    }
  },
  {
    unit_id: 14,
    unit_title: "Daily Activities",
    sentence_unscramble: [
      { id: 1, words: ["time", "What", "do", "get", "up", "you?"], correct_answer: "What time do you get up?" },
      { id: 2, words: ["I", "at", "6 o'clock", "get", "up."], correct_answer: "I get up at 6 o'clock." },
      { id: 3, words: ["What", "time", "breakfast", "does", "he", "have?"], correct_answer: "What time does he have breakfast?" },
      { id: 4, words: ["He", "has", "at", "6:30", "breakfast."], correct_answer: "He has breakfast at 6:30." },
      { id: 5, words: ["do", "go", "When", "to", "bed", "you?"], correct_answer: "When do you go to bed?" },
      { id: 6, words: ["I", "home", "go", "at", "4:30", "p.m."], correct_answer: "I go home at 4:30 p.m." },
      { id: 7, words: ["does", "She", "her", "homework", "evening", "in", "the."], correct_answer: "She does her homework in the evening." },
      { id: 8, words: ["TV", "They", "watch", "after", "dinner."], correct_answer: "They watch TV after dinner." },
      { id: 9, words: ["teeth", "my", "I", "brush", "every", "morning."], correct_answer: "I brush my teeth every morning." },
      { id: 10, words: ["daily", "What", "your", "routine", "is?"], correct_answer: "What is your daily routine?" }
    ],
    fill_in_blanks: {
      word_bank: ["time", "get", "breakfast", "bed", "homework", "brush", "shower", "home", "watch", "o'clock"],
      questions: [
        { id: 1, sentence: "What _______ do you wake up?", correct_answer: "time" },
        { id: 2, sentence: "I _______ up at six in the morning.", correct_answer: "get" },
        { id: 3, sentence: "We have _______ at 6:45 a.m.", correct_answer: "breakfast" },
        { id: 4, sentence: "I _______ my teeth after meals.", correct_answer: "brush" },
        { id: 5, sentence: "She takes a _______ before going to bed.", correct_answer: "shower" },
        { id: 6, sentence: "He does his _______ at 8:00 p.m.", correct_answer: "homework" },
        { id: 7, sentence: "What time do you go to _______?", correct_answer: "bed" },
        { id: 8, sentence: "My father comes _______ at 5:00 p.m.", correct_answer: "home" },
        { id: 9, sentence: "They _______ TV in the living room.", correct_answer: "watch" },
        { id: 10, sentence: "It is seven _______ now.", correct_answer: "o'clock" }
      ]
    }
  },
  {
    unit_id: 15,
    unit_title: "At the Shopping Mall",
    sentence_unscramble: [
      { id: 1, words: ["much", "How", "is", "T-shirt", "this?"], correct_answer: "How much is this T-shirt?" },
      { id: 2, words: ["It", "100,000", "is", "dong."], correct_answer: "It is 100,000 dong." },
      { id: 3, words: ["are", "How", "these", "shoes", "much?"], correct_answer: "How much are these shoes?" },
      { id: 4, words: ["They", "200,000", "are", "dong."], correct_answer: "They are 200,000 dong." },
      { id: 5, words: ["want", "I", "buy", "to", "a", "hat."], correct_answer: "I want to buy a hat." },
      { id: 6, words: ["can", "How", "I", "help", "you?"], correct_answer: "How can I help you?" },
      { id: 7, words: ["pair", "of", "trousers", "I", "need", "a."], correct_answer: "I need a pair of trousers." },
      { id: 8, words: ["color", "What", "do", "like", "you?"], correct_answer: "What color do you like?" },
      { id: 9, words: ["shopping", "Let's", "go", "to", "the", "mall."], correct_answer: "Let's go to the shopping mall." },
      { id: 10, words: ["expensive", "Is", "shirt", "this?"], correct_answer: "Is this shirt expensive?" }
    ],
    fill_in_blanks: {
      word_bank: ["much", "buy", "shoes", "dong", "shopping", "clothes", "expensive", "cheap", "pair", "dress"],
      questions: [
        { id: 1, sentence: "How _______ is this red skirt?", correct_answer: "much" },
        { id: 2, sentence: "I want to _______ a new jacket.", correct_answer: "buy" },
        { id: 3, sentence: "These _______ are very comfortable.", correct_answer: "shoes" },
        { id: 4, sentence: "The hat costs 50,000 _______.", correct_answer: "dong" },
        { id: 5, sentence: "They are buying _______ at the store.", correct_answer: "clothes" },
        { id: 6, sentence: "That computer is too _______ for me.", correct_answer: "expensive" },
        { id: 7, sentence: "This pen is only 5,000 dong; it is _______.", correct_answer: "cheap" },
        { id: 8, sentence: "I need a _______ of socks.", correct_answer: "pair" },
        { id: 9, sentence: "Let's go to the _______ center today.", correct_answer: "shopping" },
        { id: 10, sentence: "She is wearing a yellow _______.", correct_answer: "dress" }
      ]
    }
  },
  {
    unit_id: 16,
    unit_title: "At the Food Stall",
    sentence_unscramble: [
      { id: 1, words: ["would", "What", "like", "to", "eat", "you?"], correct_answer: "What would you like to eat?" },
      { id: 2, words: ["I", "like", "noodles", "some", "would."], correct_answer: "I would like some noodles." },
      { id: 3, words: ["What", "to", "drink", "you", "would", "like?"], correct_answer: "What would you like to drink?" },
      { id: 4, words: ["I", "orange", "juice", "would", "like", "some."], correct_answer: "I would like some orange juice." },
      { id: 5, words: ["favorite", "What", "food", "your", "is?"], correct_answer: "What is your favorite food?" },
      { id: 6, words: ["My", "food", "chicken", "favorite", "is."], correct_answer: "My favorite food is chicken." },
      { id: 7, words: ["drink", "Milk", "my", "favorite", "is."], correct_answer: "Milk is my favorite drink." },
      { id: 8, words: ["any", "Is", "there", "water", "table", "on", "the?"], correct_answer: "Is there any water on the table?" },
      { id: 9, words: ["some", "Have", "bread", "breakfast", "for."], correct_answer: "Have some bread for breakfast." },
      { id: 10, words: ["stall", "Food", "is", "near", "my", "school."], correct_answer: "Food stall is near my school." }
    ],
    fill_in_blanks: {
      word_bank: ["would", "like", "food", "drink", "noodles", "lemonade", "chicken", "hungry", "thirsty", "menu"],
      questions: [
        { id: 1, sentence: "What _______ you like to eat?", correct_answer: "would" },
        { id: 2, sentence: "I am _______, I want some rice.", correct_answer: "hungry" },
        { id: 3, sentence: "My favorite _______ is beef soup.", correct_answer: "food" },
        { id: 4, sentence: "I am _______, can I have some water?", correct_answer: "thirsty" },
        { id: 5, sentence: "Would you like a glass of _______?", correct_answer: "lemonade" },
        { id: 6, sentence: "Fried _______ is very delicious.", correct_answer: "chicken" },
        { id: 7, sentence: "What is your favorite _______? – Milk tea.", correct_answer: "drink" },
        { id: 8, sentence: "I'd _______ a bowl of noodles, please.", correct_answer: "like" },
        { id: 9, sentence: "Look at the food _______ to choose.", correct_answer: "menu" },
        { id: 10, sentence: "My mother cooks tasty _______ for lunch.", correct_answer: "noodles" }
      ]
    }
  },
  {
    unit_id: 17,
    unit_title: "Health Problems",
    sentence_unscramble: [
      { id: 1, words: ["matter", "What's", "with", "the", "you?"], correct_answer: "What's the matter with you?" },
      { id: 2, words: ["I", "a", "have", "headache."], correct_answer: "I have a headache." },
      { id: 3, words: ["doctor", "You", "see", "a", "should."], correct_answer: "You should see a doctor." },
      { id: 4, words: ["should", "not", "cold", "water", "drink", "You."], correct_answer: "You should not drink cold water." },
      { id: 5, words: ["has", "She", "a", "fever", "high."], correct_answer: "She has a high fever." },
      { id: 6, words: ["rest", "Stay", "in", "bed", "and."], correct_answer: "Stay in bed and rest." },
      { id: 7, words: ["toothache", "He", "a", "bad", "has."], correct_answer: "He has a bad toothache." },
      { id: 8, words: ["sweets", "Don't", "eat", "too", "many."], correct_answer: "Don't eat too many sweets." },
      { id: 9, words: ["throat", "I", "have", "a", "sore."], correct_answer: "I have a sore throat." },
      { id: 10, words: ["healthy", "Eat", "keep", "fruit", "to."], correct_answer: "Eat fruit to keep healthy." }
    ],
    fill_in_blanks: {
      word_bank: ["matter", "headache", "toothache", "doctor", "should", "rest", "throat", "fever", "sweets", "medicine"],
      questions: [
        { id: 1, sentence: "What's the _______ with him?", correct_answer: "matter" },
        { id: 2, sentence: "I have a bad _______; my head hurts.", correct_answer: "headache" },
        { id: 3, sentence: "You should go to see the _______.", correct_answer: "doctor" },
        { id: 4, sentence: "He has a _______, so he cannot eat hot food.", correct_answer: "toothache" },
        { id: 5, sentence: "She has a high _______ and needs to stay in bed.", correct_answer: "fever" },
        { id: 6, sentence: "You _______ wash your hands before eating.", correct_answer: "should" },
        { id: 7, sentence: "Don't eat too many _______; it's bad for your teeth.", correct_answer: "sweets" },
        { id: 8, sentence: "I have a sore _______, I can't speak well.", correct_answer: "throat" },
        { id: 9, sentence: "Take some _______ and have a good rest.", correct_answer: "medicine" },
        { id: 10, sentence: "Get some _______ when you are tired.", correct_answer: "rest" }
      ]
    }
  },
  {
    unit_id: 18,
    unit_title: "At the Pharmacy",
    sentence_unscramble: [
      { id: 1, words: ["pharmacy", "Where", "nearest", "is", "the?"], correct_answer: "Where is the nearest pharmacy?" },
      { id: 2, words: ["want", "I", "to", "buy", "medicine", "some."], correct_answer: "I want to buy some medicine." },
      { id: 3, words: ["take", "You", "this", "medicine", "should."], correct_answer: "You should take this medicine." },
      { id: 4, words: ["how", "I", "can", "take", "this?"], correct_answer: "How can I take this?" },
      { id: 5, words: ["Three", "a", "times", "day."], correct_answer: "Three times a day." },
      { id: 6, words: ["pharmacist", "The", "helpful", "is", "very."], correct_answer: "The pharmacist is very helpful." },
      { id: 7, words: ["vitamin", "I", "need", "C", "some."], correct_answer: "I need some vitamin C." },
      { id: 8, words: ["pharmacy", "Next", "to", "the", "bakery", "is."], correct_answer: "The pharmacy is next to the bakery." },
      { id: 9, words: ["take", "Remember", "your", "pills", "to."], correct_answer: "Remember to take your pills." },
      { id: 10, words: ["feel", "I", "better", "now."], correct_answer: "I feel better now." }
    ],
    fill_in_blanks: {
      word_bank: ["pharmacy", "medicine", "pharmacist", "take", "times", "buy", "better", "pills", "help", "near"],
      questions: [
        { id: 1, sentence: "I need to go to the _______ to get some drugs.", correct_answer: "pharmacy" },
        { id: 2, sentence: "The _______ tells me how to use the medicine.", correct_answer: "pharmacist" },
        { id: 3, sentence: "Take this _______ after meals.", correct_answer: "medicine" },
        { id: 4, sentence: "How many _______ a day should I take this?", correct_answer: "times" },
        { id: 5, sentence: "Take two _______ every morning.", correct_answer: "pills" },
        { id: 6, sentence: "Where can I _______ some painkiller?", correct_answer: "buy" },
        { id: 7, sentence: "I hope you will feel _______ soon.", correct_answer: "better" },
        { id: 8, sentence: "Is the pharmacy _______ your house?", correct_answer: "near" },
        { id: 9, sentence: "Can you _______ me find a pharmacy?", correct_answer: "help" },
        { id: 10, sentence: "You should _______ rest and drink warm water.", correct_answer: "take" }
      ]
    }
  },
  {
    unit_id: 19,
    unit_title: "Animal World",
    sentence_unscramble: [
      { id: 1, words: ["animals", "What", "do", "want", "to", "see", "you?"], correct_answer: "What animals do you want to see?" },
      { id: 2, words: ["I", "to", "see", "monkeys", "want."], correct_answer: "I want to see monkeys." },
      { id: 3, words: ["why", "do", "like", "you", "elephants?"], correct_answer: "Why do you like elephants?" },
      { id: 4, words: ["Because", "friendly", "are", "they."], correct_answer: "Because they are friendly." },
      { id: 5, words: ["tiger", "The", "fast", "very", "runs."], correct_answer: "The tiger runs very fast." },
      { id: 6, words: ["bear", "big", "black", "is", "The."], correct_answer: "The bear is big and black." },
      { id: 7, words: ["giraffes", "tall", "Have", "necks", "long."], correct_answer: "Giraffes have long necks." },
      { id: 8, words: ["scary", "Lions", "are", "animal."], correct_answer: "Lions are scary animal." },
      { id: 9, words: ["love", "I", "watching", "peacocks."], correct_answer: "I love watching peacocks." },
      { id: 10, words: ["zoo", "Let's", "go", "to", "the", "today."], correct_answer: "Let's go to the zoo today." }
    ],
    fill_in_blanks: {
      word_bank: ["animals", "monkeys", "tigers", "elephants", "because", "tall", "scary", "zoo", "peacocks", "funny"],
      questions: [
        { id: 1, sentence: "What _______ do you like most at the zoo?", correct_answer: "animals" },
        { id: 2, sentence: "I like _______ because they can swing through trees.", correct_answer: "monkeys" },
        { id: 3, sentence: "Giraffes are very _______ and have long necks.", correct_answer: "tall" },
        { id: 4, sentence: "I don't like _______ because they are scary.", correct_answer: "tigers" },
        { id: 5, sentence: "_______ feathers are colorful and beautiful.", correct_answer: "Peacocks" },
        { id: 6, sentence: "Why do you like _______? – Because they have long trunks.", correct_answer: "elephants" },
        { id: 7, sentence: "Monkeys are very _______ and smart.", correct_answer: "funny" },
        { id: 8, sentence: "Lions look very _______ when they roar.", correct_answer: "scary" },
        { id: 9, sentence: "Let's visit the city _______ on Sunday.", correct_answer: "zoo" },
        { id: 10, sentence: "I like dogs _______ they are faithful.", correct_answer: "because" }
      ]
    }
  },
  {
    unit_id: 20,
    unit_title: "At Summer Camp",
    sentence_unscramble: [
      { id: 1, words: ["doing", "What", "are", "you", "at", "camp?"], correct_answer: "What are you doing at camp?" },
      { id: 2, words: ["We", "singing", "campfires", "songs", "around", "are."], correct_answer: "We are singing songs around campfires." },
      { id: 3, words: ["tent", "He", "building", "a", "is."], correct_answer: "He is building a tent." },
      { id: 4, words: ["summer", "camp", "is", "fun", "Very."], correct_answer: "Summer camp is very fun." },
      { id: 5, words: ["games", "playing", "Children", "are", "outdoor."], correct_answer: "Children are playing outdoor games." },
      { id: 6, words: ["tell", "Let's", "stories", "tonight", "ghost."], correct_answer: "Let's tell ghost stories tonight." },
      { id: 7, words: ["dancing", "They", "are", "together."], correct_answer: "They are dancing together." },
      { id: 8, words: ["campfire", "Light", "the", "carefully."], correct_answer: "Light the campfire carefully." },
      { id: 9, words: ["friends", "Making", "new", "at", "camp."], correct_answer: "Making new friends at camp." },
      { id: 10, words: ["activity", "What", "favorite", "camp", "is", "your?"], correct_answer: "What is your favorite camp activity?" }
    ],
    fill_in_blanks: {
      word_bank: ["camp", "tent", "campfire", "singing", "games", "stories", "summer", "activities", "outdoor", "dancing"],
      questions: [
        { id: 1, sentence: "We spend our _______ holiday at a scout camp.", correct_answer: "summer" },
        { id: 2, sentence: "The boys are building a big _______ on the grass.", correct_answer: "tent" },
        { id: 3, sentence: "Sitting around the _______ at night is exciting.", correct_answer: "campfire" },
        { id: 4, sentence: "She is _______ her favorite English song.", correct_answer: "singing" },
        { id: 5, sentence: "We play many _______ games like tug-of-war.", correct_answer: "outdoor" },
        { id: 6, sentence: "The teacher is telling funny _______ to the kids.", correct_answer: "stories" },
        { id: 7, sentence: "They are _______ around the fire.", correct_answer: "dancing" },
        { id: 8, sentence: "What camp _______ do you like best?", correct_answer: "activities" },
        { id: 9, sentence: "It is great to join a _______ with new friends.", correct_answer: "camp" },
        { id: 10, sentence: "We love playing _______ in the forest.", correct_answer: "games" }
      ]
    }
  }
];

export function getUnitExtraExercises(unitNumber: number): UnitExercisesData | undefined {
  return EXTRA_EXERCISES_DATA.find((e) => e.unit_id === unitNumber);
}
