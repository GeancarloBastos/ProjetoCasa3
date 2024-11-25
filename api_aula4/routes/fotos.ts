import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import multer from "multer";
// import { decode } from "base64-arraybuffer";

// middleware login verificar token
import { verificaAutenticacao } from "../middlewares/verificaAutenticacao";

import supabaseClient from "../supabaseClient";


const router = Router();

// uploadMiddleware.js

const storage = multer.memoryStorage();
const upload = multer({ storage });

declare global {
  namespace Express {
    interface Request {
      userLogadoId?: number;
      userLogadoNome?: string;
      // userLogadoCargo?: string;
    }
  }
}

router.post(
  "/upload",
  verificaAutenticacao,
  upload.single("file"),
  async (req, res) => {
    const file = req.file;
    const userId = req.userLogadoId;

    if (!file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    try {
      const supabase = supabaseClient;

      // Faz o upload do arquivo usando a sessão autenticada
      const { originalname, buffer } = req.file;
      const filePath = `plantas/${userId}/${Date.now()}-${originalname}`; // Caminho do arquivo no Supabase

      // Gera URL pré-assinado para upload
      const { data: urlAssinado, error: urlAssinadoError } =
        await supabase.storage
          .from("Fotos")
          .createSignedUploadUrl(filePath); 

      if (urlAssinadoError) {
        return res
          .status(500)
          .json({ message: "Failed to generate upload URL", urlAssinadoError });
      }

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("Fotos") 
        .uploadToSignedUrl(filePath, urlAssinado.token, buffer, {
          contentType: "image/jpg", 
          upsert: true, // Substitua o arquivo se já existir
        });

      if (uploadError) {
        return res.status(500).json({ error: uploadError.message });
      }

      // Obtém a URL pública do arquivo recém enviado
      const publicUrl = supabase.storage.from("Fotos").getPublicUrl(filePath);

      res.status(200).json({
        message: "Upload realizado com sucesso!",
        url: publicUrl.data.publicUrl,
      });
    } catch (err) {
      console.error("Erro no upload:", err);
      return res
        .status(500)
        .json({ error: "Erro interno ao fazer upload do arquivo" });
    }
  }
);

// router.post("/generate-upload-url", verificaAutenticacao, async (req, res) => {
//   const userId = req.userLogadoId; // ID do usuário autenticado
//   const fileName = req.body.fileName; // Nome do arquivo fornecido pelo cliente
//   const filePath = `plantas/${userId}/${Date.now()}-${fileName}`; // Caminho do arquivo no Supabase

//   // Gera URL pré-assinado para upload
//   const { data, error } = await supabaseClient.storage
//     .from("your-bucket")
//     .createSignedUploadUrl(filePath); // URL válido por 60 segundos

//   if (error) {
//     return res
//       .status(500)
//       .json({ message: "Failed to generate upload URL", error });
//   }

//   res.json({
//     uploadUrl: data.signedURL, // URL que o frontend usará para o upload
//     filePath, // O caminho onde a imagem será armazenada
//   });
// });

export default router;
