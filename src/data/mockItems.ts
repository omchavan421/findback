import { Item } from '../types/item';

export const INITIAL_MOCK_ITEMS: Item[] = [
  {
    id: 'item-1',
    title: 'Student ID Card - Samantha Hayes',
    type: 'found',
    category: 'ID Card',
    description: 'Found a blue university student identification card near the 2nd floor printer station. Has magnetic strip and student barcode intact.',
    location: 'Central Library, 2nd Floor Printing Area',
    building: 'Central Library',
    date: '2026-03-27',
    time: '11:15 AM',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    reportId: 'FND-2026-8491',
    identifyingDetails: 'ID number ending in ...4921, major listed as Biomedical Engineering. Holographic campus seal present.',
    contactPreference: 'campus_desk',
    contactValue: 'desk.library@campus.edu',
    reporterName: 'Campus Library Staff',
    reporterRole: 'staff',
    storageLocation: 'Library Circulation & Info Desk (Level 1)',
    timeline: [
      {
        id: 't-1',
        date: '2026-03-27',
        time: '11:15 AM',
        title: 'Item Found & Turned In',
        description: 'Found by student helper beside printer queue #4.',
        actor: 'Library Student Assistant'
      },
      {
        id: 't-2',
        date: '2026-03-27',
        time: '11:30 AM',
        title: 'Logged in FINDBack System',
        description: 'Secured at circulation counter in lost document bin.',
        actor: 'Circulation Manager'
      }
    ],
    createdAt: '2026-03-27T05:45:00Z'
  },
  {
    id: 'item-2',
    title: 'Apple MacBook Pro 14" Space Gray',
    type: 'lost',
    category: 'Electronics',
    description: 'Forgot my MacBook inside a charcoal Tomtoc sleeve on the wooden desk in Lecture Hall 101 after CS301 Algorithms lecture.',
    location: 'Science Complex, Lecture Hall 101',
    building: 'Science Complex',
    date: '2026-03-26',
    time: '04:15 PM',
    status: 'open',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    reportId: 'LST-2026-3024',
    identifyingDetails: 'Has a small GitHub Octocat sticker and a National Parks sticker on the bottom left lid corner. M2 Pro chip.',
    contactPreference: 'email',
    contactValue: 'alex.chen@student.campus.edu',
    reporterName: 'Alex Chen',
    reporterRole: 'student',
    timeline: [
      {
        id: 't-3',
        date: '2026-03-26',
        time: '04:15 PM',
        title: 'Item Noticed Missing',
        description: 'Realized laptop was left behind when arriving at dining hall.',
        actor: 'Alex Chen'
      },
      {
        id: 't-4',
        date: '2026-03-26',
        time: '05:00 PM',
        title: 'Report Filed',
        description: 'Lost report submitted on FINDBack platform with serial verification.',
        actor: 'Alex Chen'
      }
    ],
    createdAt: '2026-03-26T11:30:00Z'
  },
  {
    id: 'item-3',
    title: 'Toyota Key Fob with Red Carabiner',
    type: 'found',
    category: 'Keys',
    description: 'Black Toyota electronic key fob attached to a worn crimson carabiner with three small silver brass house keys.',
    location: 'Campus Recreation Center, Court 2 Bleachers',
    building: 'Recreation Center',
    date: '2026-03-27',
    time: '09:00 AM',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
    reportId: 'FND-2026-7819',
    identifyingDetails: 'One key has a green rubber identifier ring, and there is a mini gym barcode tag attached.',
    contactPreference: 'campus_desk',
    contactValue: 'frontdesk.rec@campus.edu',
    reporterName: 'Marcus Vance',
    reporterRole: 'staff',
    storageLocation: 'West Rec Center Reception Lockbox',
    timeline: [
      {
        id: 't-5',
        date: '2026-03-27',
        time: '09:00 AM',
        title: 'Turned into Front Desk',
        description: 'Spotted under row 3 bleachers following morning intramural basketball.',
        actor: 'Marcus Vance'
      }
    ],
    createdAt: '2026-03-27T03:30:00Z'
  },
  {
    id: 'item-4',
    title: 'Brown Leather Bi-Fold Wallet',
    type: 'lost',
    category: 'Wallet',
    description: 'Lost vintage Fossil brown leather bi-fold wallet during lunchtime. Contains driver license and campus dining card.',
    location: 'Student Union Cafeteria, Booth #8',
    building: 'Student Union',
    date: '2026-03-26',
    time: '01:20 PM',
    status: 'open',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    reportId: 'LST-2026-9041',
    identifyingDetails: 'Initials "D.R." lightly embossed on the lower inside flap. Has a metro transit pass in side pouch.',
    contactPreference: 'phone',
    contactValue: '(555) 349-8102',
    reporterName: 'David Ramirez',
    reporterRole: 'student',
    timeline: [
      {
        id: 't-6',
        date: '2026-03-26',
        time: '01:20 PM',
        title: 'Last Seen at Cafeteria',
        description: 'Paid for meal and placed near tray return area.',
        actor: 'David Ramirez'
      },
      {
        id: 't-7',
        date: '2026-03-26',
        time: '02:00 PM',
        title: 'Card Cancellation Requested',
        description: 'Campus debit cards temporarily frozen pending recovery.',
        actor: 'David Ramirez'
      }
    ],
    createdAt: '2026-03-26T08:30:00Z'
  },
  {
    id: 'item-5',
    title: 'Sony WH-1000XM4 Noise Canceling Headphones',
    type: 'found',
    category: 'Electronics',
    description: 'Found black wireless over-ear Sony headphones resting on a quiet study carrel table.',
    location: 'Engineering Hall B, 3rd Floor Quiet Zone',
    building: 'Engineering Hall',
    date: '2026-03-25',
    time: '06:45 PM',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    reportId: 'FND-2026-1182',
    identifyingDetails: 'Comes in original black zippered case with an aux cord and airplane adapter. Battery was at 60%.',
    contactPreference: 'campus_desk',
    contactValue: 'eng.lostfound@campus.edu',
    reporterName: 'Prof. Miller',
    reporterRole: 'faculty',
    storageLocation: 'Engineering Department Dean Office - Room 310',
    timeline: [
      {
        id: 't-8',
        date: '2026-03-25',
        time: '06:45 PM',
        title: 'Found by Faculty Member',
        description: 'Secured after evening lab inspection.',
        actor: 'Prof. Miller'
      }
    ],
    createdAt: '2026-03-25T13:15:00Z'
  },
  {
    id: 'item-6',
    title: 'Hydro Flask 32oz Wide Mouth (Olive Green)',
    type: 'found',
    category: 'Water Bottle',
    description: 'Found insulated metal olive green water bottle with flex straw lid. Slightly dented bottom rim.',
    location: 'Humanities Quad, Wooden Bench facing Fountain',
    building: 'Humanities Quad',
    date: '2026-03-26',
    time: '03:10 PM',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    reportId: 'FND-2026-5591',
    identifyingDetails: 'Covered with 4 stickers: Yosemite National Park, NASA Meatball logo, "Stay Hydrated", and a coffee bean.',
    contactPreference: 'email',
    contactValue: 'elena.s@campus.edu',
    reporterName: 'Elena Rostova',
    reporterRole: 'student',
    storageLocation: 'Student Union Help Information Counter',
    timeline: [
      {
        id: 't-9',
        date: '2026-03-26',
        time: '03:10 PM',
        title: 'Recovered from Bench',
        description: 'Picked up before rain began in afternoon.',
        actor: 'Elena Rostova'
      }
    ],
    createdAt: '2026-03-26T09:40:00Z'
  },
  {
    id: 'item-7',
    title: 'The North Face Recon Backpack (Navy Blue)',
    type: 'lost',
    category: 'Bag',
    description: 'Navy blue commuter backpack with black mesh side pockets. Contains chemistry notes and TI-84 calculator.',
    location: 'Chemistry Annex, Room 204 Laboratory',
    building: 'Chemistry Annex',
    date: '2026-03-25',
    time: '12:45 PM',
    status: 'open',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    reportId: 'LST-2026-4402',
    identifyingDetails: 'Front bungee cord has a mini silver flashlight clipped on. Inside zipper has a spiral notebook with "CHM 221 - Jordan".',
    contactPreference: 'email',
    contactValue: 'jordan.kim@student.campus.edu',
    reporterName: 'Jordan Kim',
    reporterRole: 'student',
    timeline: [
      {
        id: 't-10',
        date: '2026-03-25',
        time: '12:45 PM',
        title: 'Left in Lab Locker Bench',
        description: 'Left behind in a hurry to catch campus shuttle.',
        actor: 'Jordan Kim'
      }
    ],
    createdAt: '2026-03-25T07:15:00Z'
  },
  {
    id: 'item-8',
    title: 'AirPods Pro (2nd Gen) with Spigen Case',
    type: 'lost',
    category: 'Electronics',
    description: 'Lost white AirPods Pro in rugged black textured Spigen protective case with carabiner ring.',
    location: 'Campus North Bus Stop Shelter',
    building: 'North Transit Center',
    date: '2026-03-27',
    time: '08:20 AM',
    status: 'open',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    reportId: 'LST-2026-6623',
    identifyingDetails: 'Case name in Bluetooth settings is "Maya\'s Pods". Small scuff mark on top right hinge.',
    contactPreference: 'phone',
    contactValue: '(555) 789-2341',
    reporterName: 'Maya Patel',
    reporterRole: 'student',
    timeline: [
      {
        id: 't-11',
        date: '2026-03-27',
        time: '08:20 AM',
        title: 'Dropped Near Bus Bay 3',
        description: 'Fell out of jacket pocket while boarding line 12.',
        actor: 'Maya Patel'
      }
    ],
    createdAt: '2026-03-27T02:50:00Z'
  },
  {
    id: 'item-9',
    title: 'Calculus: Early Transcendentals (9th Edition)',
    type: 'found',
    category: 'Books',
    description: 'Hardcover textbook found on round study table near the 4th floor math reference section.',
    location: 'Science & Math Library, Level 4',
    building: 'Central Library',
    date: '2026-03-24',
    time: '05:30 PM',
    status: 'claimed',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    reportId: 'FND-2026-9281',
    identifyingDetails: 'Chapter 7 bookmark made of yellow cardstock with homework problem numbers written in blue ink.',
    contactPreference: 'campus_desk',
    contactValue: 'desk.library@campus.edu',
    reporterName: 'Campus Security',
    reporterRole: 'staff',
    storageLocation: 'Library Front Desk Holding',
    timeline: [
      {
        id: 't-12',
        date: '2026-03-24',
        time: '05:30 PM',
        title: 'Book Logged',
        description: 'Secured during closing sweep.',
        actor: 'Security Staff'
      },
      {
        id: 't-13',
        date: '2026-03-25',
        time: '02:10 PM',
        title: 'Claimed by Owner',
        description: 'Verified with student course enrollment and returned.',
        actor: 'Desk Assistant'
      }
    ],
    createdAt: '2026-03-24T12:00:00Z'
  },
  {
    id: 'item-10',
    title: 'Ray-Ban Aviator Sunglasses (Gold / Green G-15)',
    type: 'found',
    category: 'Accessories',
    description: 'Found gold-rimmed Ray-Ban aviators left on a cafe patio table outside the Campus Starbucks.',
    location: 'Student Plaza, Outside Starbucks Patio',
    building: 'Student Union',
    date: '2026-03-26',
    time: '02:40 PM',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    reportId: 'FND-2026-3398',
    identifyingDetails: 'RB laser etching on left lens, classic black leather carry case with gold snap button.',
    contactPreference: 'campus_desk',
    contactValue: 'union.desk@campus.edu',
    reporterName: 'Barista Tyler',
    reporterRole: 'staff',
    storageLocation: 'Student Union Manager Office',
    timeline: [
      {
        id: 't-14',
        date: '2026-03-26',
        time: '02:40 PM',
        title: 'Turned in by Cafe Patron',
        description: 'Left on table 14 beside outside umbrella.',
        actor: 'Barista Tyler'
      }
    ],
    createdAt: '2026-03-26T09:10:00Z'
  },
  {
    id: 'item-11',
    title: 'Blue Passport & Visa Document Holder',
    type: 'lost',
    category: 'Documents',
    description: 'Navy blue faux-leather RFID document folder containing international student passport and I-20 document.',
    location: 'International Student Affairs, Office Lobby',
    building: 'Administration Building',
    date: '2026-03-27',
    time: '10:00 AM',
    status: 'open',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    reportId: 'LST-2026-7731',
    identifyingDetails: 'Country of origin: South Korea. Contains multiple folded travel insurance receipts inside front pocket.',
    contactPreference: 'email',
    contactValue: 'minjun.lee@campus.edu',
    reporterName: 'Min-Jun Lee',
    reporterRole: 'student',
    timeline: [
      {
        id: 't-15',
        date: '2026-03-27',
        time: '10:00 AM',
        title: 'Reported Missing',
        description: 'Urgent document notice sent to campus security and advisor.',
        actor: 'Min-Jun Lee'
      }
    ],
    createdAt: '2026-03-27T04:30:00Z'
  },
  {
    id: 'item-12',
    title: 'Dorm Room Keycard on Red Lanyard',
    type: 'found',
    category: 'Keys',
    description: 'Campus residence hall RFID contactless access keycard attached to crimson university lanyard.',
    location: 'Oak Hall Residence Courtyard Walkway',
    building: 'Oak Hall Residence',
    date: '2026-03-26',
    time: '11:45 PM',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    reportId: 'FND-2026-6120',
    identifyingDetails: 'Card serial ending in *5839 with small smiley face sticker on rear.',
    contactPreference: 'campus_desk',
    contactValue: 'housing.front@campus.edu',
    reporterName: 'Resident Advisor Kyle',
    reporterRole: 'staff',
    storageLocation: 'Oak Hall RA On-Duty Desk',
    timeline: [
      {
        id: 't-16',
        date: '2026-03-26',
        time: '11:45 PM',
        title: 'Found along courtyard path',
        description: 'Picked up during nightly rounds.',
        actor: 'RA Kyle'
      }
    ],
    createdAt: '2026-03-26T18:20:00Z'
  },
  {
    id: 'item-13',
    title: 'Casio fx-991EX Scientific ClassWiz Calculator',
    type: 'found',
    category: 'Electronics',
    description: 'Black and white dual-power scientific calculator found under seat in Physics Lecture Hall 2.',
    location: 'Physical Sciences Building, Lecture Hall 2',
    building: 'Physical Sciences Building',
    date: '2026-03-25',
    time: '04:00 PM',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
    reportId: 'FND-2026-4490',
    identifyingDetails: 'Hard slider cover has a silver metallic sharpie initials "K.T." on interior side.',
    contactPreference: 'campus_desk',
    contactValue: 'physics.office@campus.edu',
    reporterName: 'Dr. Harrison',
    reporterRole: 'faculty',
    storageLocation: 'Physics Department Main Office (Room 102)',
    timeline: [
      {
        id: 't-17',
        date: '2026-03-25',
        time: '04:00 PM',
        title: 'Logged by Lecturer',
        description: 'Collected at the conclusion of PHYS210 midterm.',
        actor: 'Dr. Harrison'
      }
    ],
    createdAt: '2026-03-25T10:30:00Z'
  },
  {
    id: 'item-14',
    title: 'Nike Club Fleece Pullover Hoodie (Heather Grey - L)',
    type: 'lost',
    category: 'Accessories',
    description: 'Left my grey Nike pullover hoodie draped over the chair back at the 1st floor quiet study area.',
    location: 'West Campus Dining Center, Upper Study Mezzanine',
    building: 'West Campus Dining',
    date: '2026-03-26',
    time: '07:30 PM',
    status: 'open',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    reportId: 'LST-2026-8812',
    identifyingDetails: 'Size Large. White embroidered swoosh on chest. Contains a single peppermint candy in kangaroo pocket.',
    contactPreference: 'email',
    contactValue: 'samuel.b@student.campus.edu',
    reporterName: 'Samuel Brooks',
    reporterRole: 'student',
    timeline: [
      {
        id: 't-18',
        date: '2026-03-26',
        time: '07:30 PM',
        title: 'Item Left at Mezzanine',
        description: 'Noticed missing when returning to dorm at 10 PM.',
        actor: 'Samuel Brooks'
      }
    ],
    createdAt: '2026-03-26T14:00:00Z'
  },
  {
    id: 'item-15',
    title: 'Spiral Bound Organic Chemistry Lab Notebook',
    type: 'lost',
    category: 'Documents',
    description: 'Black carbon-copy carbonless chemistry laboratory notebook with green grid cover and experiment records 1 through 8.',
    location: 'Life Sciences Hall, Lab 304',
    building: 'Life Sciences Hall',
    date: '2026-03-27',
    time: '01:10 PM',
    status: 'open',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    reportId: 'LST-2026-5219',
    identifyingDetails: 'Student name "Rachel Green, Sec 04" written on the top white label. Crucial for upcoming lab exam!',
    contactPreference: 'phone',
    contactValue: '(555) 412-9908',
    reporterName: 'Rachel Green',
    reporterRole: 'student',
    timeline: [
      {
        id: 't-19',
        date: '2026-03-27',
        time: '01:10 PM',
        title: 'Report Submitted',
        description: 'Left on the reagent shelf by fume hood 3.',
        actor: 'Rachel Green'
      }
    ],
    createdAt: '2026-03-27T07:45:00Z'
  },
  {
    id: 'item-16',
    title: 'Black Compact Windproof Travel Umbrella',
    type: 'found',
    category: 'Other',
    description: 'Automatic push-button black umbrella with rubberized ergonomic handle found in the umbrella stand at entrance.',
    location: 'Business School Atrium, Main Entrance Umbrella Bin',
    building: 'Business School',
    date: '2026-03-24',
    time: '10:15 AM',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&w=800&q=80',
    reportId: 'FND-2026-3004',
    identifyingDetails: 'Brand is Repel Umbrella. Has a small yellow wrist loop strap.',
    contactPreference: 'campus_desk',
    contactValue: 'business.desk@campus.edu',
    reporterName: 'Atrium Concierge',
    reporterRole: 'staff',
    storageLocation: 'Business Hall Information Desk',
    timeline: [
      {
        id: 't-20',
        date: '2026-03-24',
        time: '10:15 AM',
        title: 'Found in Entry Stand',
        description: 'Placed into lost & found bin after heavy morning thunderstorm.',
        actor: 'Atrium Staff'
      }
    ],
    createdAt: '2026-03-24T04:45:00Z'
  }
];

export const CAMPUS_LOCATIONS = [
  'All Campus Locations',
  'Central Library',
  'Science Complex',
  'Engineering Hall',
  'Student Union',
  'Recreation Center',
  'Chemistry Annex',
  'Administration Building',
  'Physical Sciences Building',
  'Oak Hall Residence',
  'Business School',
  'Life Sciences Hall',
  'North Transit Center'
];

export const CATEGORIES: Item['category'][] = [
  'ID Card',
  'Wallet',
  'Keys',
  'Electronics',
  'Books',
  'Documents',
  'Accessories',
  'Water Bottle',
  'Bag',
  'Other'
];
