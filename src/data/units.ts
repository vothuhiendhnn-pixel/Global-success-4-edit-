import { Unit, SentenceExercise } from '../types';

export const UNITS_DATA: Unit[] = [
  {
    unit: 1,
    topic: "My friends",
    semester: 1,
    words: [
      { w: "America", ipa: "/əˈmerɪkə/", m: "Nước Mỹ", example: "He is from America." },
      { w: "Australia", ipa: "/ɒˈstreɪliə/", m: "Nước Úc", example: "She is from Australia." },
      { w: "Britain", ipa: "/ˈbrɪtn/", m: "Nước Anh", example: "My friend is from Britain." },
      { w: "Japan", ipa: "/dʒəˈpæn/", m: "Nước Nhật Bản", example: "I am from Japan." },
      { w: "Malaysia", ipa: "/məˈleɪʒə/", m: "Nước Ma-lay-xi-a", example: "They are from Malaysia." },
      { w: "Singapore", ipa: "/ˌsɪŋəˈpɔːr/", m: "Nước Xin-ga-po", example: "She lives in Singapore." },
      { w: "Thailand", ipa: "/ˈtaɪlænd/", m: "Nước Thái Lan", example: "We visit Thailand." },
      { w: "Viet Nam", ipa: "/ˌviətˈnæm/", m: "Nước Việt Nam", example: "I am from Viet Nam." }
    ]
  },
  {
    unit: 2,
    topic: "Time and daily routines",
    semester: 1,
    words: [
      { w: "get up", ipa: "/ɡet ʌp/", m: "Thức dậy", example: "I get up at six o'clock." },
      { w: "go to bed", ipa: "/ɡəʊ tə bed/", m: "Đi ngủ", example: "I go to bed at nine o'clock." },
      { w: "go to school", ipa: "/ɡəʊ tə skuːl/", m: "Đi học", example: "We go to school in the morning." },
      { w: "have breakfast", ipa: "/hæv ˈbrekfəst/", m: "Ăn sáng", example: "I have breakfast at seven." },
      { w: "o'clock", ipa: "/əˈklɒk/", m: "Giờ (chính xác)", example: "It is seven o'clock." },
      { w: "fifteen", ipa: "/fɪfˈtiːn/", m: "Mười lăm", example: "It is six fifteen." },
      { w: "thirty", ipa: "/ˈθɜːti/", m: "Ba mươi", example: "It is seven thirty." },
      { w: "forty-five", ipa: "/ˌfɔːti ˈfaɪv/", m: "Bốn mươi lăm", example: "It is eight forty-five." }
    ]
  },
  {
    unit: 3,
    topic: "My week",
    semester: 1,
    words: [
      { w: "Monday", ipa: "/ˈmʌndeɪ/", m: "Thứ Hai", example: "Today is Monday." },
      { w: "Tuesday", ipa: "/ˈtjuːzdeɪ/", m: "Thứ Ba", example: "I go swimming on Tuesday." },
      { w: "Wednesday", ipa: "/ˈwenzdeɪ/", m: "Thứ Tư", example: "We have English on Wednesday." },
      { w: "Thursday", ipa: "/ˈθɜːzdeɪ/", m: "Thứ Năm", example: "Thursday is my favourite day." },
      { w: "Friday", ipa: "/ˈfraɪdeɪ/", m: "Thứ Sáu", example: "I play football on Friday." },
      { w: "Saturday", ipa: "/ˈsætədeɪ/", m: "Thứ Bảy", example: "We go to the park on Saturday." },
      { w: "Sunday", ipa: "/ˈsʌndeɪ/", m: "Chủ nhật", example: "I stay at home on Sunday." },
      { w: "do housework", ipa: "/duː ˈhaʊswɜːk/", m: "Làm việc nhà", example: "I help my mum do housework." },
      { w: "listen to music", ipa: "/ˈlɪsn tə ˈmjuːzɪk/", m: "Nghe nhạc", example: "I like to listen to music." },
      { w: "study at school", ipa: "/ˈstʌdi æt skuːl/", m: "Học ở trường", example: "I study at school every day." }
    ]
  },
  {
    unit: 4,
    topic: "My birthday party",
    semester: 1,
    words: [
      { w: "chips", ipa: "/tʃɪps/", m: "Khoai tây chiên", example: "I love eating chips." },
      { w: "grapes", ipa: "/ɡreɪps/", m: "Quả nho", example: "These grapes are sweet." },
      { w: "jam", ipa: "/dʒæm/", m: "Mứt", example: "I put jam on my bread." },
      { w: "juice", ipa: "/dʒuːs/", m: "Nước ép", example: "Would you like some orange juice?" },
      { w: "lemonade", ipa: "/ˌleməˈneɪd/", m: "Nước chanh", example: "Lemonade is refreshing." },
      { w: "water", ipa: "/ˈwɔːtər/", m: "Nước", example: "Drink plenty of water." },
      { w: "birthday", ipa: "/ˈbɜːθdeɪ/", m: "Sinh nhật", example: "Happy birthday to you!" }
    ]
  },
  {
    unit: 5,
    topic: "Things we can do",
    semester: 1,
    words: [
      { w: "cook", ipa: "/kʊk/", m: "Nấu ăn", example: "My mother can cook delicious food." },
      { w: "draw", ipa: "/drɔː/", m: "Vẽ", example: "I can draw a picture." },
      { w: "play the guitar", ipa: "/pleɪ ðə ɡɪˈtɑːr/", m: "Chơi đàn ghi-ta", example: "He can play the guitar." },
      { w: "play the piano", ipa: "/pleɪ ðə piˈænəʊ/", m: "Chơi đàn pi-a-nô", example: "She plays the piano well." },
      { w: "ride a bike", ipa: "/raɪd ə baɪk/", m: "Đi xe đạp", example: "I ride a bike to school." },
      { w: "ride a horse", ipa: "/raɪd ə hɔːs/", m: "Cưỡi ngựa", example: "Can you ride a horse?" },
      { w: "roller skate", ipa: "/ˈrəʊlə skeɪt/", m: "Trượt pa-tanh", example: "We like to roller skate." },
      { w: "swim", ipa: "/swɪm/", m: "Bơi", example: "I can swim in the pool." }
    ]
  },
  {
    unit: 6,
    topic: "Our school facilities",
    semester: 1,
    words: [
      { w: "building", ipa: "/ˈbɪldɪŋ/", m: "Tòa nhà", example: "Our school has a big building." },
      { w: "computer room", ipa: "/kəmˈpjuːtə rʊm/", m: "Phòng máy tính", example: "We study IT in the computer room." },
      { w: "garden", ipa: "/ˈɡɑːdn/", m: "Khu vườn", example: "There are beautiful flowers in the garden." },
      { w: "playground", ipa: "/ˈpleɪɡraʊnd/", m: "Sân chơi", example: "We play football in the playground." },
      { w: "city", ipa: "/ˈsɪti/", m: "Thành phố", example: "My school is in the city." },
      { w: "mountains", ipa: "/ˈmaʊntɪnz/", m: "Dãy núi", example: "The school is near the mountains." },
      { w: "village", ipa: "/ˈvɪlɪdʒ/", m: "Ngôi làng", example: "They live in a peaceful village." }
    ]
  },
  {
    unit: 7,
    topic: "Our timetables",
    semester: 1,
    words: [
      { w: "art", ipa: "/ɑːt/", m: "Môn Mỹ thuật", example: "I have Art on Monday." },
      { w: "English", ipa: "/ˈɪŋɡlɪʃ/", m: "Môn Tiếng Anh", example: "English is very fun." },
      { w: "maths", ipa: "/mæθs/", m: "Môn Toán", example: "We have Maths today." },
      { w: "music", ipa: "/ˈmjuːzɪk/", m: "Môn Âm nhạc", example: "We sing songs in Music class." },
      { w: "science", ipa: "/ˈsaɪəns/", m: "Môn Khoa học", example: "I like learning Science." },
      { w: "history and geography", ipa: "/ˈhɪstri ænd dʒiˈɒɡrəfi/", m: "Môn Lịch sử và Địa lý", example: "We learn about nature in history and geography." }
    ]
  },
  {
    unit: 8,
    topic: "My favourite subjects",
    semester: 1,
    words: [
      { w: "IT", ipa: "/ˌaɪ ˈtiː/", m: "Môn Tin học", example: "IT is my favourite subject." },
      { w: "PE", ipa: "/ˌpiː ˈiː/", m: "Môn Thể dục", example: "We play sports in PE." },
      { w: "painter", ipa: "/ˈpeɪntər/", m: "Họa sĩ", example: "I want to be a painter." },
      { w: "teacher", ipa: "/ˈtiːtʃər/", m: "Giáo viên", example: "Ms Hien is a great English teacher." },
      { w: "because", ipa: "/bɪˈkəz/", m: "Bởi vì", example: "I like English because it is interesting." }
    ]
  },
  {
    unit: 9,
    topic: "Our sports day",
    semester: 1,
    words: [
      { w: "sports day", ipa: "/ˈspɔːts deɪ/", m: "Ngày hội thể thao", example: "When is your sports day?" },
      { w: "May", ipa: "/meɪ/", m: "Tháng Năm", example: "Sports day is in May." },
      { w: "June", "ipa": "/dʒuːn/", m: "Tháng Sáu", example: "Our holiday is in June." },
      { w: "July", ipa: "/dʒuˈlaɪ/", m: "Tháng Bảy", example: "We go swimming in July." },
      { w: "August", ipa: "/ɔːˈɡʌst/", m: "Tháng Tám", example: "School starts in August." },
      { w: "October", ipa: "/ɒkˈtəʊbər/", m: "Tháng Mười", example: "My birthday is in October." }
    ]
  },
  {
    unit: 10,
    topic: "Our summer holidays",
    semester: 1,
    words: [
      { w: "beach", ipa: "/biːtʃ/", m: "Bãi biển", example: "We played on the beach." },
      { w: "campsite", ipa: "/ˈkæmpsaɪt/", m: "Khu cắm trại", example: "They stayed at a campsite." },
      { w: "countryside", ipa: "/ˈkʌntrisaɪd/", m: "Vùng quê", example: "I visit my grandparents in the countryside." },
      { w: "food stall", ipa: "/ˈfuːd stɔːl/", m: "Gian hàng thực phẩm", example: "We bought snacks at the food stall." }
    ]
  },
  {
    unit: 11,
    topic: "My home",
    semester: 2,
    words: [
      { w: "big", ipa: "/bɪɡ/", m: "To, lớn", example: "My house is big." },
      { w: "busy", ipa: "/ˈbɪzi/", m: "Bận rộn, nhộn nhịp", example: "The street is very busy." },
      { w: "live", ipa: "/lɪv/", m: "Sống, ở", example: "I live in Ha Noi." },
      { w: "noisy", ipa: "/ˈnɔɪzi/", m: "Ồn ào", example: "The city is noisy." },
      { w: "quiet", ipa: "/ˈkwaɪət/", m: "Yên tĩnh", example: "The village is quiet." }
    ]
  },
  {
    unit: 12,
    topic: "Jobs",
    semester: 2,
    words: [
      { w: "doctor", ipa: "/ˈdɒktər/", m: "Bác sĩ", example: "My dad is a doctor." },
      { w: "farmer", ipa: "/ˈfɑːmər/", m: "Nông dân", example: "The farmer works on a farm." },
      { w: "nurse", ipa: "/nɜːs/", m: "Y sĩ, y tá", example: "My aunt is a nurse." },
      { w: "office worker", ipa: "/ˈɒfɪs wɜːkər/", m: "Nhân viên văn phòng", example: "His father is an office worker." },
      { w: "policeman", ipa: "/pəˈliːsmən/", m: "Cảnh sát", example: "The policeman helps people." },
      { w: "teacher", ipa: "/ˈtiːtʃər/", m: "Giáo viên", example: "She is an English teacher." }
    ]
  },
  {
    unit: 13,
    topic: "Appearance",
    semester: 2,
    words: [
      { w: "short", ipa: "/ʃɔːt/", m: "Thấp, ngắn", example: "He has short hair." },
      { w: "tall", ipa: "/tɔːl/", m: "Cao", example: "My brother is tall." },
      { w: "slim", ipa: "/slɪm/", m: "Mảnh khảnh, thon gọn", example: "She is slim and pretty." },
      { w: "round face", ipa: "/raʊnd feɪs/", m: "Khuôn mặt tròn", example: "The baby has a round face." },
      { w: "big eyes", ipa: "/bɪɡ aɪz/", m: "Đôi mắt to", example: "She has big eyes." }
    ]
  },
  {
    unit: 14,
    topic: "Daily activities",
    semester: 2,
    words: [
      { w: "clean the room", ipa: "/kliːn ðə ruːm/", m: "Lau dọn phòng", example: "I clean the room on Sunday." },
      { w: "wash the dishes", ipa: "/wɒʃ ðə dɪʃɪz/", m: "Rửa bát", example: "I help wash the dishes after dinner." },
      { w: "watch TV", ipa: "/wɒtʃ ˌtiː ˈviː/", m: "Xem ti-vi", example: "We watch TV in the evening." },
      { w: "cook meals", ipa: "/kʊk miːlz/", m: "Nấu ăn", example: "My mother cooks delicious meals." }
    ]
  },
  {
    unit: 15,
    topic: "My family's weekends",
    semester: 2,
    words: [
      { w: "swimming pool", ipa: "/ˈswɪmɪŋ puːl/", m: "Bể bơi", example: "We go to the swimming pool." },
      { w: "do yoga", ipa: "/duː ˈjəʊɡə/", m: "Tập yoga", example: "My mum does yoga every morning." },
      { w: "play tennis", ipa: "/pleɪ ˈtenɪs/", m: "Chơi quần vợt", example: "My dad likes to play tennis." },
      { w: "sports centre", ipa: "/ˈspɔːts sentər/", m: "Trung tâm thể thao", example: "We visit the sports centre." }
    ]
  },
  {
    unit: 16,
    topic: "Weather",
    semester: 2,
    words: [
      { w: "cloudy", ipa: "/ˈklaʊdi/", m: "Nhiều mây", example: "It is cloudy today." },
      { w: "rainy", ipa: "/ˈreɪni/", m: "Có mưa", example: "Take an umbrella, it is rainy." },
      { w: "sunny", ipa: "/ˈsʌni/", m: "Có nắng", example: "It is bright and sunny." },
      { w: "windy", ipa: "/ˈwɪndi/", m: "Nhiều gió", example: "The weather is windy." },
      { w: "water park", ipa: "/ˈwɔːtə pɑːk/", m: "Công viên nước", example: "Let's go to the water park!" }
    ]
  },
  {
    unit: 17,
    topic: "In the city",
    semester: 2,
    words: [
      { w: "bakery", ipa: "/ˈbeɪkəri/", m: "Tiệm bánh", example: "I buy bread at the bakery." },
      { w: "bookshop", ipa: "/ˈbʊkʃɒp/", m: "Hiệu sách", example: "We buy comic books at the bookshop." },
      { w: "pharmacy", ipa: "/ˈfɑːməsi/", m: "Hiệu thuốc", example: "My mum buys medicine at the pharmacy." },
      { w: "supermarket", ipa: "/ˈsuːpəmɑːkɪt/", m: "Siêu thị", example: "We go shopping at the supermarket." }
    ]
  },
  {
    unit: 18,
    topic: "At the shopping centre",
    semester: 2,
    words: [
      { w: "T-shirt", ipa: "/ˈtiː ʃɜːt/", m: "Áo phông", example: "I want to buy a blue T-shirt." },
      { w: "skirt", ipa: "/skɜːt/", m: "Chân váy", example: "She is wearing a red skirt." },
      { w: "shoes", ipa: "/ʃuːz/", m: "Giày", example: "These shoes are new." },
      { w: "trousers", ipa: "/ˈtraʊzəz/", m: "Quần dài", example: "He wears black trousers." },
      { w: "buy", ipa: "/baɪ/", m: "Mua", example: "I want to buy a new hat." }
    ]
  },
  {
    unit: 19,
    topic: "The animal world",
    semester: 2,
    words: [
      { w: "elephant", ipa: "/ˈelɪfənt/", m: "Con voi", example: "The elephant is very big." },
      { w: "monkey", ipa: "/ˈmʌŋki/", m: "Con khỉ", example: "The monkey is swinging." },
      { w: "tiger", ipa: "/ˈtaɪɡər/", m: "Con hổ", example: "The tiger is fast." },
      { w: "zebra", ipa: "/ˈzebrə/", m: "Con ngựa vằn", example: "The zebra has black and white stripes." },
      { w: "crocodile", ipa: "/ˈkrɒkədaɪl/", m: "Con cá sấu", example: "The crocodile is in the river." }
    ]
  },
  {
    unit: 20,
    topic: "At summer camp",
    semester: 2,
    words: [
      { w: "camp", ipa: "/kæmp/", m: "Cắm trại", example: "We are at the summer camp." },
      { w: "sing songs", ipa: "/sɪŋ sɒŋz/", m: "Hát các bài hát", example: "We sing songs around the campfire." },
      { w: "dance", ipa: "/dɑːns/", m: "Nhảy múa", example: "They like to dance together." },
      { w: "play games", ipa: "/pleɪ ɡeɪmz/", m: "Chơi trò chơi", example: "We play fun games in the evening." },
      { w: "tell stories", ipa: "/tel ˈstɔːriz/", m: "Kể chuyện", example: "Our teacher tells exciting stories." }
    ]
  }
];

export const SENTENCE_EXERCISES: SentenceExercise[] = [
  {
    id: "s1",
    unit: 1,
    vietnamese: "Tớ đến từ Việt Nam.",
    englishTokens: ["I", "am", "from", "Viet Nam."],
    scrambledTokens: ["from", "I", "Viet Nam.", "am"]
  },
  {
    id: "s2",
    unit: 1,
    vietnamese: "Cậu ấy đến từ nước Mỹ.",
    englishTokens: ["He", "is", "from", "America."],
    scrambledTokens: ["America.", "He", "from", "is"]
  },
  {
    id: "s3",
    unit: 2,
    vietnamese: "Tớ thức dậy lúc 6 giờ.",
    englishTokens: ["I", "get up", "at", "six", "o'clock."],
    scrambledTokens: ["at", "get up", "six", "I", "o'clock."]
  },
  {
    id: "s4",
    unit: 2,
    vietnamese: "Mấy giờ bạn đi học?",
    englishTokens: ["What", "time", "do", "you", "go to school?"],
    scrambledTokens: ["do", "What", "go to school?", "you", "time"]
  },
  {
    id: "s5",
    unit: 3,
    vietnamese: "Hôm nay là Thứ Hai.",
    englishTokens: ["Today", "is", "Monday."],
    scrambledTokens: ["Monday.", "is", "Today"]
  },
  {
    id: "s6",
    unit: 4,
    vietnamese: "Bạn có muốn uống chút nước chanh không?",
    englishTokens: ["Would", "you", "like", "some", "lemonade?"],
    scrambledTokens: ["like", "Would", "lemonade?", "some", "you"]
  },
  {
    id: "s7",
    unit: 5,
    vietnamese: "Tớ có thể bơi và trượt pa-tanh.",
    englishTokens: ["I", "can", "swim", "and", "roller skate."],
    scrambledTokens: ["roller skate.", "can", "I", "and", "swim"]
  },
  {
    id: "s8",
    unit: 7,
    vietnamese: "Tớ có môn Tiếng Anh vào Thứ Tư.",
    englishTokens: ["I", "have", "English", "on", "Wednesday."],
    scrambledTokens: ["on", "English", "have", "Wednesday.", "I"]
  },
  {
    id: "s9",
    unit: 8,
    vietnamese: "Môn học yêu thích của tớ là Tin học.",
    englishTokens: ["IT", "is", "my", "favourite", "subject."],
    scrambledTokens: ["favourite", "IT", "subject.", "my", "is"]
  },
  {
    id: "s10",
    unit: 12,
    vietnamese: "Bố tớ là một bác sĩ.",
    englishTokens: ["My", "father", "is", "a", "doctor."],
    scrambledTokens: ["is", "doctor.", "My", "a", "father"]
  },
  {
    id: "s11",
    unit: 16,
    vietnamese: "Thời tiết hôm nay thế nào?",
    englishTokens: ["What", "is", "the", "weather", "like", "today?"],
    scrambledTokens: ["weather", "What", "today?", "like", "is", "the"]
  },
  {
    id: "s12",
    unit: 19,
    vietnamese: "Con voi rất to lớn.",
    englishTokens: ["The", "elephant", "is", "very", "big."],
    scrambledTokens: ["very", "The", "big.", "elephant", "is"]
  }
];

export const AVATARS = [
  { id: "student_boy_1", emoji: "👦", name: "Bạn Nam 1", color: "bg-blue-100 border-blue-400" },
  { id: "student_girl_1", emoji: "👧", name: "Bạn Nữ 1", color: "bg-pink-100 border-pink-400" },
  { id: "student_boy_2", emoji: "🧑‍🎓", name: "Học sinh Chăm chỉ", color: "bg-green-100 border-green-400" },
  { id: "student_star", emoji: "⭐", name: "Ngôi sao may mắn", color: "bg-amber-100 border-amber-400" },
  { id: "student_cat", emoji: "🐱", name: "Mèo Thông Thái", color: "bg-purple-100 border-purple-400" },
  { id: "student_bear", emoji: "🐻", name: "Gấu Năng Động", color: "bg-orange-100 border-orange-400" }
];

export const DAILY_TASKS_TEMPLATE = [
  {
    id: "task_5words",
    title: "Học 5 từ mới hôm nay",
    desc: "Mở thẻ Flashcard và ôn lại 5 từ vựng bất kỳ.",
    rewardStars: 10,
    actionType: "flashcard" as const,
    targetCount: 5
  },
  {
    id: "task_pronounce3",
    title: "Luyện phát âm 3 từ vựng",
    desc: "Sử dụng tính năng AI Voice Practice để phát âm chuẩn 3 từ.",
    rewardStars: 15,
    actionType: "pronounce" as const,
    targetCount: 3
  },
  {
    id: "task_quiz1",
    title: "Hoàn thành 1 bài tập",
    desc: "Đạt ít nhất 80% điểm trong bất kỳ bài tập luyện tập nào.",
    rewardStars: 20,
    actionType: "quiz" as const,
    targetCount: 1
  }
];
