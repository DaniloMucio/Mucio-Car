const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Deletar usuários existentes
    await prisma.user.deleteMany();
    
    // Criar novo usuário admin
    const hashedPassword = await hash('danilomc', 12);
    
    const user = await prisma.user.create({
      data: {
        name: 'Danilo',
        email: 'danilo@muciocar.com.br',
        password: hashedPassword,
        role: 'admin',
      },
    });
    
    console.log('Usuário admin criado com sucesso:', user.email);
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 