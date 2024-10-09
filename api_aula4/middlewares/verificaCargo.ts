import { Request, Response, NextFunction } from 'express'
import supabaseClient from '../supabaseClient';
import supabaseService from '../supabaseService';


interface CustomRequest extends Request {
  userLogadoId?: number; 
  userLogadoNome?: string;
  userLogadoCargo?: string;
}


export function verificaCargo(requiredRoles: string) {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        try {
            
             const userCargo = req.userLogadoCargo;

             if (!userCargo) {
                return res.status(400).json({error: "Erro ao carregar cargo do usuário"})
             }

            // Se o cargo do usuário não estiver nas permissões exigidas
            if (!requiredRoles.includes(userCargo)) {
                res.locals.supabase = supabaseClient
                return res.status(403).json({ error: 'Acesso negado: permissão insuficiente (sem cargo)' });
            } else {
                res.locals.supabase = supabaseService
            }

            next(); // Se o cargo estiver permitido, chama o próximo middleware
        } catch (error) {
            res.status(401).json({ error: "Token inválido" });
        }
    };
}