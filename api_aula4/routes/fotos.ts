import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import multer from 'multer';
// import { decode } from "base64-arraybuffer";




// middleware login verificar token
import { verificaAutenticacao } from "../middlewares/verificaAutenticacao";
import { verificaCargo } from "../middlewares/verificaCargo";



const prisma = new PrismaClient()
const router = Router()


// uploadMiddleware.js
// Define o local temporário para salvar os arquivos antes de enviá-los ao Supabase
const storage = multer.memoryStorage(); // Armazenar na memória temporariamente
const upload = multer({ storage });



// router.post('/upload',   upload.single('file'), async (req, res) => {
//   const file = req.file;

//   if (!req.file) {
//       return res.status(400).json({ error: 'Nenhum arquivo enviado' });
//     }
//   if (!file) {
//     return res.status(400).json({ error: 'Nenhum arquivo enviado' });
//   }
  
//   const fileBase64 = decode(file?.buffer.toString("base64"));
  
//   // const token = req.headers['authorization'];

//   // if (!token) {
//   //   return res.status(401).json({ error: 'Não autenticado!' });
//   // }

  

//   // Envia o arquivo para o Supabase Storage
//   // const { data, error } = await supabase.storage
//   //   .from('Fotos') // Substitua pelo nome do seu bucket
//   //   .upload(file.originalname, fileBase64, {
//   //     contentType: "image/jpg",
//   //     upsert: true, // Caso o arquivo já exista, substitua-o
//   //     headers: {
//   //       Authorization: `Bearer ${token}`
//   //     }
//   //   });
//     const { originalname } = req.file;

//     const token = req.headers['authorization'] as string
//     const refresh = req.headers['refresh'] as string
//   // Tenta setar a sessão
//     const { data: sessionData } = await supabase.auth.setSession({
//       access_token: token,
//       refresh_token: refresh,
//     });

//       console.log("Sessão autenticada:", sessionData);
      
//       // Agora tenta obter a sessão para verificar se está persistindo
//       const teste2 = await supabase.auth.getSession();
//       console.log("Sessão atual:", teste2.data.session);

//       if (teste2.data.session) {
//         console.log("Email do usuário:", teste2.data.session.user.email);
//       } else {
//         console.log("A sessão ainda está vazia");
//       }
    

    
//     const { data, error } = await supabase
//       .storage
//       .from('Fotos')
//       .upload(`public/${originalname}.jpg`, fileBase64, {
//         contentType: 'image/png',
        
//       })

//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }

//   const publicUrl = supabase.storage
//     .from('Fotos')
//     .getPublicUrl(`uploads/${file.originalname}`);

//   res.status(200).json({
//     message: 'Upload realizado com sucesso!',
//     url: publicUrl.data.publicUrl,
//   });
// });
router.post('/upload', verificaAutenticacao, verificaCargo("ADMIN"), upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  


  // if (!token) {
  //   return res.status(401).json({ error: 'Token não encontrado no cabeçalho' });
  // }

  try {
    const supabase = res.locals.supabase

    // Faz o upload do arquivo usando a sessão autenticada
    const { originalname, buffer } = req.file;

    const { data, error } = await supabase
      .storage
      .from('Fotos') // Substitua pelo nome do seu bucket
      .upload(`public/${originalname}.jpg`, buffer, {
        contentType: 'image/jpg', // Verifique o tipo correto do arquivo
        upsert: true, // Substitua o arquivo se já existir
      });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Obtém a URL pública do arquivo recém enviado
    const publicUrl = supabase.storage
      .from('Fotos')
      .getPublicUrl(`public/${originalname}.jpg`);

    res.status(200).json({
      message: 'Upload realizado com sucesso!',
      url: publicUrl.data.publicUrl,
    });
  } catch (err) {
    console.error('Erro no upload:', err);
    return res.status(500).json({ error: 'Erro interno ao fazer upload do arquivo' });
  }
});







export default router