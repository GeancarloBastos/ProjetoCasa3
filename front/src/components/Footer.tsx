export default function Footer() {  
  return (  
    <footer className="bg-zinc-900 text-white py-16">  
      <div className="container mx-auto px-6">  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">  
          {/* Coluna 1 - Logo e Descrição */}  
          <div className="flex flex-col items-center lg:items-start">  
            <div className="flex items-center gap-4 mb-6">  
              <img  
                src="./logoc3SFundo.png"  
                className="h-16 w-auto"  
                alt="Casa 3 Logo"  
              />  
              <div>  
                <h2 className="text-2xl font-medium tracking-tight">Casa 3</h2>  
                <p className="text-zinc-400">Ambientes Personalizados</p>  
              </div>  
            </div>  
            <p className="text-zinc-400 text-center lg:text-left text-sm">  
              Transformando seus sonhos em ambientes únicos e personalizados,  
              criados especialmente para você.  
            </p>  
          </div>  

          {/* Coluna 2 - Navegação */}  
          <nav className="flex flex-col items-center lg:items-center">  
            <h3 className="text-lg font-semibold mb-2">Navegação</h3>  
            <div className="flex flex-col items-center gap-4">  
              {[  
                ['Home', '/'],  
                ['Sobre', '/detalhes'],  
                ['Catálogo', '/catalogo'],  
                ['Contato', '/contato']  
              ].map(([title, url]) => (  
                <a  
                  key={title}  
                  href={url}  
                  className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm"  
                >  
                  {title}  
                </a>  
              ))}  
            </div>  
          </nav>  

          {/* Coluna 3 - Conexão e Equipe */}  
          <div className="flex flex-col items-center lg:items-end gap-8">  
            <div className="flex flex-col items-center lg:items-end gap-4">  
              <h3 className="text-lg font-semibold">Conecte-se conosco</h3>  
              <div className="flex gap-6">  
                <a  
                  href="https://www.instagram.com/casa3.ambientespersonalizados/?hl=pt-br"  
                  className="text-zinc-400 hover:text-white transform hover:scale-110 transition-all duration-200"  
                  target="_blank"  
                  rel="noopener noreferrer"  
                >  
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">  
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />  
                  </svg>  
                </a>  
                <a  
                  href="https://www.facebook.com/profile.php?id=100090031067776"  
                  className="text-zinc-400 hover:text-white transform hover:scale-110 transition-all duration-200"  
                  target="_blank"  
                  rel="noopener noreferrer"  
                >  
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">  
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />  
                  </svg>  
                </a>  
                <a  
                  href="https://github.com/GeancarloBastos"  
                  className="text-zinc-400 hover:text-white transform hover:scale-110 transition-all duration-200"  
                  target="_blank"  
                  rel="noopener noreferrer"  
                >  
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">  
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />  
                  </svg>  
                </a>  
                <a   
                  href="#"   
                  className="text-zinc-400 hover:text-white transform hover:scale-110 transition-all duration-200"  
                  target="_blank"  
                  rel="noopener noreferrer"  
                >  
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">  
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />  
                  </svg>  
                </a>  
              </div>  
            </div>  

            <div>  
              <h3 className="text-lg font-semibold mb-4 text-center lg:text-right">Nossa Equipe</h3>  
              <div className="text-zinc-400 text-sm space-y-2 flex flex-col items-center lg:items-end">  
                <p>Geancarlo Bastos <span className="text-zinc-500">(Front-end)</span></p>  
                <p>Leonardo Bonato <span className="text-zinc-500">(PO)</span></p>  
                <p>Cauã Stocker Saraiva <span className="text-zinc-500">(Back-end)</span></p>  
              </div>  
            </div>  
          </div>  
        </div>  

        <div className="mt-16 pt-8 border-t border-white">  
          <p className="text-zinc-300 text-sm text-center">  
            &copy; {new Date().getFullYear()} CGL. Todos os direitos reservados.  
          </p>  
        </div>  
      </div>  
    </footer>  
  );  
}