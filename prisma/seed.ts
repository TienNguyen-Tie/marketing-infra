import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';
import bcrypt from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash('changeme123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@vinacapital.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@vinacapital.com',
      password,
      role: 'ADMIN',
    },
  });
  console.log('Seeded admin user: admin@vinacapital.com / changeme123');
}

main().catch(console.error).finally(() => prisma.$disconnect());
