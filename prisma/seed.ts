const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.savedComparisonItem.deleteMany()
  await prisma.savedComparison.deleteMany()
  await prisma.savedCollege.deleteMany()
  await prisma.review.deleteMany()
  await prisma.placement.deleteMany()
  await prisma.course.deleteMany()
  await prisma.college.deleteMany()

  const defaultImages = [
    "https://images.unsplash.com/photo-1541339907198-e08756bf0e4e?w=800&q=80",
    "https://images.unsplash.com/photo-1562774053716-65f018d024f8?w=800&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
    "https://images.unsplash.com/photo-1606761568499-6d2451b08f66?w=800&q=80",
    "https://images.unsplash.com/photo-1525926572898-aa9b0222f6fa?w=800&q=80",
    "https://images.unsplash.com/photo-1564981797816-1f438e9e2eaa?w=800&q=80",
    "https://images.unsplash.com/photo-1523580494863-6f30b532ce39?w=800&q=80",
    "https://images.unsplash.com/photo-1519452286708-3e4776b7db0a?w=800&q=80"
  ];

  const getRandomImages = (count) => {
    const shuffled = [...defaultImages].sort(() => 0.5 - Math.random());
    return JSON.stringify(shuffled.slice(0, count));
  };

  // Create Colleges
  const collegesData = [
    {
      name: "Indian Institute of Technology Bombay",
      location: "Mumbai, Maharashtra",
      fees: 250000,
      rating: 4.9,
      overview: "IIT Bombay is a globally recognized engineering and research institution.",
      images: getRandomImages(3),
      courses: {
        create: [
          { name: "B.Tech Computer Science", duration: "4 Years", type: "Full Time" },
          { name: "B.Tech Electrical Engineering", duration: "4 Years", type: "Full Time" }
        ]
      },
      placements: {
        create: [
          { medianPackage: 2000000, highestPackage: 15000000, recruiters: "Google, Microsoft, Optiver" }
        ]
      },
      reviews: {
        create: [
          { author: "Amit S.", rating: 5, text: "Excellent faculty and incredible campus life." }
        ]
      }
    },
    {
      name: "Delhi Technological University",
      location: "New Delhi, Delhi",
      fees: 166000,
      rating: 4.5,
      overview: "DTU is one of the premier engineering institutions in Delhi, known for strong placements.",
      images: getRandomImages(3),
      courses: {
        create: [
          { name: "B.Tech Software Engineering", duration: "4 Years", type: "Full Time" },
          { name: "B.Tech Mechanical Engineering", duration: "4 Years", type: "Full Time" }
        ]
      },
      placements: {
        create: [
          { medianPackage: 1200000, highestPackage: 8200000, recruiters: "Amazon, Atlassian, Apple" }
        ]
      },
      reviews: {
        create: [
          { author: "Priya R.", rating: 4.5, text: "Great exposure, huge batch size but unmatched tech culture." }
        ]
      }
    },
    {
      name: "Birla Institute of Technology and Science",
      location: "Pilani, Rajasthan",
      fees: 550000,
      rating: 4.8,
      overview: "BITS Pilani is a top-tier private engineering college known for its zero-attendance policy and entrepreneurial culture.",
      images: getRandomImages(3),
      courses: {
        create: [
          { name: "B.E. Computer Science", duration: "4 Years", type: "Full Time" },
          { name: "B.E. Electronics", duration: "4 Years", type: "Full Time" }
        ]
      },
      placements: {
        create: [
          { medianPackage: 1800000, highestPackage: 6000000, recruiters: "Uber, Rubrik, Nutanix" }
        ]
      },
      reviews: {
        create: [
          { author: "Rahul V.", rating: 4.8, text: "The startup culture is insane." }
        ]
      }
    },
    {
      name: "National Institute of Technology Trichy",
      location: "Tiruchirappalli, Tamil Nadu",
      fees: 140000,
      rating: 4.7,
      overview: "NIT Trichy is the top-ranked NIT in India, offering stellar education and placements.",
      images: getRandomImages(3),
      courses: {
        create: [
          { name: "B.Tech Computer Science", duration: "4 Years", type: "Full Time" }
        ]
      },
      placements: {
        create: [
          { medianPackage: 1500000, highestPackage: 5000000, recruiters: "Oracle, Cisco, Goldman Sachs" }
        ]
      },
      reviews: {
        create: [
          { author: "Karthik K.", rating: 4.6, text: "Excellent ROI and brand value." }
        ]
      }
    },
    {
      name: "Vellore Institute of Technology",
      location: "Vellore, Tamil Nadu",
      fees: 300000,
      rating: 4.2,
      overview: "VIT Vellore is known for its massive infrastructure and diverse student community.",
      images: getRandomImages(3),
      courses: {
        create: [
          { name: "B.Tech Computer Science", duration: "4 Years", type: "Full Time" }
        ]
      },
      placements: {
        create: [
          { medianPackage: 800000, highestPackage: 10000000, recruiters: "TCS, Wipro, Microsoft" }
        ]
      },
      reviews: {
        create: [
          { author: "Sneha M.", rating: 4.0, text: "Good placements but highly crowded." }
        ]
      }
    },
    {
      name: "Indian Institute of Technology Delhi",
      location: "New Delhi, Delhi",
      fees: 230000,
      rating: 4.9,
      overview: "IIT Delhi is a prestigious institute known for its rigorous academic programs and vibrant student life.",
      images: getRandomImages(3),
      courses: {
        create: [
          { name: "B.Tech Computer Science", duration: "4 Years", type: "Full Time" }
        ]
      },
      placements: {
        create: [
          { medianPackage: 1900000, highestPackage: 12000000, recruiters: "Microsoft, Intel, Goldman Sachs" }
        ]
      },
      reviews: {
        create: [
          { author: "Neha P.", rating: 4.9, text: "Top notch facilities and peer group." }
        ]
      }
    },
    {
      name: "Jadavpur University",
      location: "Kolkata, West Bengal",
      fees: 25000,
      rating: 4.6,
      overview: "Jadavpur University offers some of the highest ROI in the country with minimal fees and excellent placements.",
      images: getRandomImages(3),
      courses: {
        create: [
          { name: "B.E. Computer Science and Engineering", duration: "4 Years", type: "Full Time" }
        ]
      },
      placements: {
        create: [
          { medianPackage: 1400000, highestPackage: 6500000, recruiters: "Google, Amazon, DE Shaw" }
        ]
      },
      reviews: {
        create: [
          { author: "Sourav D.", rating: 4.7, text: "Unbelievable ROI and great campus culture." }
        ]
      }
    },
    {
      name: "Manipal Institute of Technology",
      location: "Manipal, Karnataka",
      fees: 400000,
      rating: 4.3,
      overview: "MIT Manipal is a leading private engineering college with modern infrastructure and global alumni.",
      images: getRandomImages(3),
      courses: {
        create: [
          { name: "B.Tech Computer and Communication", duration: "4 Years", type: "Full Time" }
        ]
      },
      placements: {
        create: [
          { medianPackage: 850000, highestPackage: 4500000, recruiters: "Microsoft, Cisco, BlackRock" }
        ]
      },
      reviews: {
        create: [
          { author: "Vikram K.", rating: 4.4, text: "Amazing college life and good opportunities if you work hard." }
        ]
      }
    },
    {
      name: "College of Engineering Pune",
      location: "Pune, Maharashtra",
      fees: 120000,
      rating: 4.5,
      overview: "COEP is one of the oldest engineering colleges in Asia with a strong legacy and alumni network.",
      images: getRandomImages(3),
      courses: {
        create: [
          { name: "B.Tech Mechanical Engineering", duration: "4 Years", type: "Full Time" }
        ]
      },
      placements: {
        create: [
          { medianPackage: 950000, highestPackage: 4000000, recruiters: "Tata Motors, Bajaj, L&T" }
        ]
      },
      reviews: {
        create: [
          { author: "Anjali T.", rating: 4.5, text: "Historic campus with strong core engineering placements." }
        ]
      }
    },
    {
      name: "International Institute of Information Technology",
      location: "Hyderabad, Telangana",
      fees: 350000,
      rating: 4.9,
      overview: "IIIT Hyderabad is synonymous with coding culture in India and boasts some of the highest placement stats.",
      images: getRandomImages(3),
      courses: {
        create: [
          { name: "B.Tech Computer Science and Engineering", duration: "4 Years", type: "Full Time" }
        ]
      },
      placements: {
        create: [
          { medianPackage: 3000000, highestPackage: 8000000, recruiters: "Apple, Google, Tower Research" }
        ]
      },
      reviews: {
        create: [
          { author: "Rohan J.", rating: 4.8, text: "Coding culture is unparalleled here." }
        ]
      }
    }
  ]

  for (const college of collegesData) {
    await prisma.college.create({
      data: college
    })
  }

  console.log("Database seeded successfully with 10 colleges and images!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
