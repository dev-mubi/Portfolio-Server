const { Admin, Project, Service, Skill, Achievement } = require('../models');
const { testConnection, syncDatabase } = require('../config/database');
require('dotenv').config();

// Hardcoded data to avoid import issues with React/Images
const projects = [
  {
    title: "Zayeeka",
    category: "MERN Stack Development",
    description: "A smart cafeteria management platform built for campus dining with secure authentication and email verification.",
    image: "https://zayeeka.vercel.app/static/media/image1.296da779701126b1803c.png",
    technologies: ["React", "Node.js", "MongoDB", "Express", "SMTP", "bcrypt", "Validator.js"],
    features: ["Secure Login & Authentication", "Password Hashing", "SMTP Email Verification", "Role-based Access", "Institutional Email Sign-ups"],
    githubUrl: "https://github.com/dev-mubi/Zayeeeka",
    liveUrl: "https://zayeeka.vercel.app/"
  },
  {
    title: "ChaiCoffee",
    category: "Mobile Development",
    description: "Cross-platform coffee-ordering app with modern UI and secure authentication.",
    image: "/chai.png", // Placeholder for local image
    technologies: ["React Native", "Expo", "Node.js", "Express", "MongoDB", "bcrypt", "Validator.js"],
    features: ["Mobile UI", "Secure Authentication", "Scrollable Menu Cards", "Responsive Layouts", "Coffee-themed Design"],
    githubUrl: "",
    liveUrl: "https://www.linkedin.com/posts/mubashirshahzaib_chaicoffee-auth-system-not-just-it-works-activity-7361435240709386240-AWcQ"
  },
  {
    title: "CookBook",
    category: "Frontend Development",
    description: "A simple static recipe website built as my first Web Technologies project using HTML, CSS, and Bootstrap.",
    image: "https://mellifluous-licorice-9d3e2f.netlify.app/logo+title.png",
    technologies: ["HTML", "CSS", "Bootstrap"],
    features: ["Static multi-page catalog", "Responsiveness with Bootstrap", "Clean beginner-friendly layout"],
    githubUrl: "",
    liveUrl: "https://mellifluous-licorice-9d3e2f.netlify.app/"
  },
  {
    title: "CTMS",
    category: "Java Development",
    description: "A desktop application built in Java Swing with file-based storage to digitalize the campus transport system at COMSATS Abbottabad.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/COMSATS_new_logo.jpg/500px-COMSATS_new_logo.jpg",
    technologies: ["Java", "Swing", "OOP", "File-based Storage"],
    features: ["Swing-based GUI", "File-based data storage", "Route & bus management", "Student registration", "Bus pass printing", "Fee Record management"],
    githubUrl: "https://github.com/dev-mubi/PROJECT---CLASS---FILE---ACCESS",
    liveUrl: "https://www.linkedin.com/posts/mubashirshahzaib_i-have-developed-a-transport-management-system-activity-7289930703629135872-SvE_"
  }
];

const services = [
  {
    title: "Full Stack Web Development",
    icon: "Code",
    description: "Build modern web apps using the MERN stack with clean architecture.",
    features: ["React.js (SPA)", "Node.js & Express", "MongoDB + SQL (basics)", "RESTful APIs", "Deployment"],
    price: "Open to internships & project-based work",
    duration: "Mode: Remote-first • Flexible hours"
  },
  {
    title: "Authentication & Authorization Systems",
    icon: "Lock",
    description: "Secure auth flows and access control for web/mobile backends.",
    features: ["Hashed passwords (bcrypt)", "Email verification (SMTP)", "Sessions / JWT (as needed)", "Role-Based Access Control (RBAC)", "Validation, CORS & env setup"],
    price: "Integrations, refactors, or audits",
    duration: "Mode: Security-focused • Backend-first"
  }
];

const skills = [
  { name: "JavaScript (ES6+)", level: 78, category: "Language" },
  { name: "React.js", level: 88, category: "Frontend" },
  { name: "Node.js", level: 87, category: "Backend" },
  { name: "Express.js", level: 85, category: "Backend" },
  { name: "MongoDB (Mongoose)", level: 84, category: "Database" },
  { name: "Java", level: 76, category: "Language" },
  { name: "HTML5/CSS3", level: 82, category: "Frontend" },
  { name: "Git & GitHub", level: 83, category: "Tools" }
];

const achievements = [
  { title: "Google Data Analytics", description: "Professional Certificate (In Progress)", icon: "Award" },
  { title: "CCNA Certification", description: "Cisco Certified Network Associate", icon: "Award" },
  { title: "Google Prompting Essentials", description: "AI & Prompt Engineering Certificate", icon: "Award" },
  { title: "Campus Honor Roll", description: "Comsats University Abbottabad", icon: "Award" }
];

const migrateData = async () => {
  try {
    console.log('🔄 Starting data migration...\n');

    // Connect to database
    await testConnection();
    await syncDatabase();

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminExists = await Admin.findOne({ where: { email: process.env.ADMIN_EMAIL } });
    
    if (!adminExists) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
        password: process.env.ADMIN_PASSWORD || 'admin123'
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Migrate Projects
    console.log('\n📁 Migrating projects...');
    for (const project of projects) {
      await Project.findOrCreate({
        where: { title: project.title },
        defaults: project
      });
    }
    console.log(`✅ Migrated ${projects.length} projects`);

    // Migrate Services
    console.log('\n💼 Migrating services...');
    for (const service of services) {
      await Service.findOrCreate({
        where: { title: service.title },
        defaults: service
      });
    }
    console.log(`✅ Migrated ${services.length} services`);

    // Migrate Skills
    console.log('\n🎯 Migrating skills...');
    for (const skill of skills) {
      await Skill.findOrCreate({
        where: { name: skill.name },
        defaults: skill
      });
    }
    console.log(`✅ Migrated ${skills.length} skills`);

    // Migrate Achievements
    console.log('\n🏆 Migrating achievements...');
    for (const achievement of achievements) {
      await Achievement.findOrCreate({
        where: { title: achievement.title },
        defaults: achievement
      });
    }
    console.log(`✅ Migrated ${achievements.length} achievements`);

    console.log('\n✨ Migration completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateData();
