export default function Footer() {
  return (
    <footer className="bg-colorc3 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 flex flex-col md:flex-row md:flex-wrap justify-between items-center">
        <div className="mb-4 md:mb-0  text-center md:text-left flex flex-col items-center md:items-start">
          <div className="flex items-center mb-0 ">
            <img src="./logoCFundo.png" className="h-24 mr-4" alt="Logo"/>
            <div>
              <h2 className="text-2xl font-bold">Casa 3</h2>
              <h3 className="text-lg">Ambientes Personalizados</h3>
              <p className="text-gray-400">Você sonha, nós realizamos.</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-6 mr-20 sm:flex items-center md:mr-0 md:me-0">
          <a href="" className="hover:text-colorc3verde hover:underline">Home</a>
          <a href="detalhes" className="hover:text-colorc3verde hover:underline">Sobre</a>
          <a href="catalogo" className="hover:text-colorc3verde hover:underline">Catálogo</a>
          <a href="contato" className="hover:text-colorc3verde hover:underline">Contato</a>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-10 md:mr-0">
          {/* Instagram */}
          <a href="https://www.instagram.com/casa3.ambientespersonalizados/?hl=pt-br" className="hover:text-gray-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.41a4.92 4.92 0 011.77 1.03 4.92 4.92 0 011.03 1.77c.17.46.356 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.41 2.43a4.92 4.92 0 01-1.03 1.77 4.92 4.92 0 01-1.77 1.03c-.46.17-1.26.356-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.41a4.92 4.92 0 01-1.77-1.03 4.92 4.92 0 01-1.03-1.77c-.17-.46-.356-1.26-.41-2.43-.058-1.266-.07-1.65-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.97.41-2.43a4.92 4.92 0 011.03-1.77 4.92 4.92 0 011.77-1.03c.46-.17 1.26-.356 2.43-.41 1.266-.058 1.65-.07 4.85-.07m0-2.16c-3.26 0-3.667.012-4.947.07-1.28.058-2.16.24-2.92.51a7.07 7.07 0 00-2.56 1.68 7.07 7.07 0 00-1.68 2.56c-.27.76-.452 1.64-.51 2.92-.058 1.28-.07 1.687-.07 4.947s.012 3.667.07 4.947c.058 1.28.24 2.16.51 2.92a7.07 7.07 0 001.68 2.56 7.07 7.07 0 002.56 1.68c.76.27 1.64.452 2.92.51 1.28.058 1.687.07 4.947.07s3.667-.012 4.947-.07c1.28-.058 2.16-.24 2.92-.51a7.07 7.07 0 002.56-1.68 7.07 7.07 0 001.68-2.56c.27-.76.452-1.64.51-2.92.058-1.28.07-1.687.07-4.947s-.012-3.667-.07-4.947c-.058-1.28-.24-2.16-.51-2.92a7.07 7.07 0 00-1.68-2.56 7.07 7.07 0 00-2.56-1.68c-.76-.27-1.64-.452-2.92-.51-1.28-.058-1.687-.07-4.947-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
            </svg>
          </a>
          {/* Facebook */}
          <a href="https://www.facebook.com/profile.php?id=100090031067776" className="hover:text-gray-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.125v-3.622h3.125v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.324-.593 1.324-1.324v-21.35c0-.732-.594-1.325-1.325-1.325z" />
            </svg>
          </a>
          {/* WhatsApp */}
          <a href="#" className="hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M16.57 14.09c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.44-.46-.61-.46-.16 0-.34-.02-.52-.02-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.34.98 2.63 1.12 2.81.14.18 1.93 2.94 4.68 4.12.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />
              <circle cx="12" cy="12" r="9.96" />
            </svg>
          </a>
          {/* GitHub */}
          <a href="https://github.com/GeancarloBastos" className="hover:text-gray-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.86 8.15 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 012.5-.34c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A9.96 9.96 0 0022 12c0-5.5-4.46-9.96-9.96-9.96z" />
            </svg>
          </a>
        </div>
      <div className="text-center text-gray-400 mt-4 md:text-right md:mr-4">  
        <p>&copy; 2024 Todos os direitos reservados CGL.</p>  
        <p>Geancarlo Bastos. (Front-end)</p>  
        <p>Leonardo Bonato. (Banco de dados)</p>  
        <p>Cauã Stocker Saraiva. (Back-end)</p>  
      </div>  
      </div>
    </footer>
  );
}