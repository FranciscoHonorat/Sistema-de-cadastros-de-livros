// scripts/fixPasswords.js
const { User } = require('../src/database/models');
const bcrypt = require('bcryptjs');

async function hashExistingPasswords() {
  try {
    // Buscar todos os usuários (incluindo a senha)
    const users = await User.unscoped().findAll();
    
    for (const user of users) {
      // Verificar se a senha já está hasheada
      if (!user.password.startsWith('$2a$')) {
        console.log(`Hashando senha do usuário: ${user.email}`);
        
        // Hash da senha
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        
        // Salvar no banco (o hook beforeUpdate não será executado)
        await User.unscoped().update(
          { password: user.password },
          { where: { id: user.id } }
        );
      }
    }
    
    console.log('Senhas hasheadas com sucesso!');
  } catch (error) {
    console.error('Erro ao hash senhas:', error);
  }
}

hashExistingPasswords();