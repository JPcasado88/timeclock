import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from '../models/User.model'
import { Employee } from '../models/Employee.model'

dotenv.config()

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    
    // Create admin user
    const adminExists = await User.findOne({ role: 'admin' })
    if (!adminExists) {
      await User.create({
        username: 'admin',
        email: 'admin@timeclock.com',
        password: 'admin123',
        role: 'admin',
      })
      console.log('✅ Admin user created')
    }
    
    // Create scanner user
    const scannerExists = await User.findOne({ role: 'scanner' })
    if (!scannerExists) {
      await User.create({
        username: 'scanner',
        email: 'scanner@timeclock.com',
        password: 'scanner123',
        role: 'scanner',
      })
      console.log('✅ Scanner user created')
    }
    
    // Create sample employees
    const employeeCount = await Employee.countDocuments()
    if (employeeCount === 0) {
      const sampleEmployees = [
        {
          employeeId: 'EMP001',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@company.com',
          department: 'Engineering',
          position: 'Software Developer',
          hourlyRate: 35.00,
        },
        {
          employeeId: 'EMP002',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@company.com',
          department: 'Design',
          position: 'UI/UX Designer',
          hourlyRate: 30.00,
        },
        {
          employeeId: 'EMP003',
          firstName: 'Mike',
          lastName: 'Johnson',
          email: 'mike.johnson@company.com',
          department: 'Marketing',
          position: 'Marketing Manager',
          hourlyRate: 40.00,
        },
      ]
      
      await Employee.insertMany(sampleEmployees)
      console.log('✅ Sample employees created')
    }

    console.log('✅ Database seeded successfully')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase() 