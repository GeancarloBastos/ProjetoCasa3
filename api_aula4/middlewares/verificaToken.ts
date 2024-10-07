import supabase from '../supabaseClient';
import { Request, Response, NextFunction } from 'express'



const authenticateUser = async (req: Request | any, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'] // Extrai o token do header Authorization
  const refresh = req.headers['refresh'] as string // Se estiver usando um refresh token, adicione aqui também

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

    // Setando a sessão/autenticação do Supabase com o token do usuário
    const { data: sessionData, error: authError } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: refresh || '' // Se não houver refresh token, passe uma string vazia
    });

    if (authError) {
      return res.status(500).json({ error: 'Falha ao autenticar a sessão com o Supabase' });
    }

    console.log("Sessão autenticada:", sessionData);

//   req.user = data.user;
//   req.session = data
 

  console.log('User Role:', sessionData.user?.role);
 
  next(); // Chama o próximo middleware ou rota
};




export default authenticateUser;