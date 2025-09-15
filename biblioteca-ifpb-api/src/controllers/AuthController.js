const jwt = require('jsonwebtoken');
const AuthServices = require('../services/AuthServices.js');
const authServices = new AuthServices();
exports.authServices = authServices;

class AuthController {
    static async login(req, res) {
       const { email, password } = req.body;

       try {
           //Validação dos campos obrigatórios
           if (!email || !password) {
               return res.status(400).json({
                   error: 'Email e senha são obrigatórios!'
               });
           }

           const usuario = await authServices.login(email, password);
           const token = jwt.sign(
               { id: usuario.id, email: usuario.email },
               process.env.JWT_SECRET || 'fallback_secret',
               { expiresIn: '24h' } // Token expira em 24 horas
           );
           return res.status(200).json({
               message: 'Login realizado com sucesso',
               usuario,
               token: token
           });
       } catch (error) {
           if (error.message === 'Usuário não encontrado' ||
               error.message === 'Senha incorreta'
           ) {
               return res.status(401).json({ error: 'Credenciais inválidas'});
           }

           return res.status(500).json({ error: error.message});
       }
   }

    static async resetPassword(req, res) {
        const { email, newPassword } = req.body;
        
        try {
            const user = await authServices.buscaPorEmail(email);
            if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
            };
            
            // Atualiza a senha (o hook beforeUpdate fará o hash)
            user.password = newPassword;
            await user.save();
            
            return res.status(200).json({ message: 'Senha resetada com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }  

}

module.exports = AuthController;