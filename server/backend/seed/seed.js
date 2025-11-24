// seed.js
import 'dotenv/config';
import mongoose from 'mongoose';

import Contact from '../models/Contact.js';
import Project from '../models/Project.js';
import Education from '../models/Qualification.js'; // or Education.js if you renamed
import User from '../models/User.js';

const run = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ [seed] No MONGODB_URI found. Check your .env file.');
    process.exit(1);
  }

  await mongoose.connect(uri, { dbName: 'Portfolio' });
  console.log('✅ [seed] Connected to MongoDB:', mongoose.connection.name);

  // clear all
  await Promise.all([
    Contact.deleteMany({}),
    Project.deleteMany({}),
    Education.deleteMany({}),
    User.deleteMany({})
  ]);
  console.log('🧹 [seed] Collections cleared');

  // insert sample data
  await Contact.insertMany([
    { firstname: 'Emily', lastname: 'Cevik', email: 'emily@example.com' },
    { firstname: 'Suha', lastname: 'Oudeh', email: 'suha@example.com' }
  ]);
  console.log('➕ [seed] Contacts: 2');

  await Project.insertMany([
    {
      title: 'CVK Website',
      firstname: 'Emily',
      lastname: 'Cevik',
      email: 'emily@example.com',
      completion: new Date('2025-06-30'),
      description: 'A modern portfolio and business site'
    },
    {
      title: 'Online Appointment Booking',
      firstname: 'Team',
      lastname: 'A2',
      email: 'team@example.com',
      completion: new Date('2026-01-15'),
      description: 'Clinic booking platform (PIPEDA-aware)'
    }
  ]);
  console.log('➕ [seed] Projects: 2');

  await Education.insertMany([
    {
      title: 'Software Engineering Technology',
      firstname: 'Emily',
      lastname: 'Cevik',
      email: 'emily@example.com',
      completion: new Date('2026-04-30'),
      description: 'Centennial College diploma'
    }
  ]);
  console.log('➕ [seed] Educations: 1');

  await User.create({
    name: 'Emily',
    email: 'emily@example.com',
    password: 'password123'
  });
  console.log('🔐 [seed] Users: 1');

  await mongoose.disconnect();
  console.log('✅ [seed] Done. Disconnected.');
};

// ✅ call the function
run().catch(err => {
  console.error('❌ [seed] Error:', err);
  process.exit(1);
});
