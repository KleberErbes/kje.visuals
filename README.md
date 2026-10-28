# KJE VISUALS

Portfólio de filmes de drone de Kléber Erbes, com abertura em vídeo, galeria por categoria, animações ao rolar e links para [@kje.visuals](https://www.instagram.com/kje.visuals/).

O site usa HTML, CSS e JavaScript puro. Não precisa instalar dependências nem executar um build. As imagens e os vídeos usados no site estão incluídos na pasta `assets`.

## Subir no GitHub pelo navegador

1. Extraia o arquivo ZIP no seu computador.
2. No GitHub, crie um repositório chamado `kje-visuals`. Para usar o GitHub Pages no plano gratuito, escolha um repositório público.
3. No repositório, clique em **Add file → Upload files**. Em um repositório vazio, use a opção **uploading an existing file**.
4. Arraste o **conteúdo de dentro da pasta `kje-visuals`**, incluindo a pasta `assets`, para a área de envio. O arquivo `index.html` deve ficar na raiz do repositório, ao lado de `styles.css`, `app.js` e `README.md`.
5. Confirme o envio pelo botão de commit exibido na página.

Envie os arquivos extraídos, e não apenas o ZIP. Todos os vídeos desta versão ficam abaixo do limite de 25 MiB por arquivo para envio pelo navegador.

## Publicar com GitHub Pages

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **Deploy from a branch**.
3. Selecione a branch **main** e a pasta **/ (root)**.
4. Clique em **Save**.
5. Aguarde a publicação. A própria tela de Pages mostrará o endereço do site.

O endereço normalmente segue o formato `https://SEU-USUARIO.github.io/kje-visuals/`. Essa publicação é independente da versão hospedada no ChatGPT e não exige login no ChatGPT para acessar o portfólio.

O arquivo `.nojekyll` já está incluído para servir o projeto como site estático. Se seu sistema ocultar arquivos que começam com ponto, você ainda pode enviar os arquivos visíveis; este projeto também é compatível com a publicação padrão do Pages.

## Arquivos do projeto

| Arquivo ou pasta | Função |
| --- | --- |
| `index.html` | Conteúdo, textos, navegação, galeria e player |
| `styles.css` | Cores, fontes, layout responsivo e animações |
| `app.js` | Filtros, reprodução dos vídeos e navegação do player |
| `assets/` | Sete vídeos MP4, capas WebP, imagem da seção sobre e favicon |
| `.nojekyll` | Publicação estática pelo GitHub Pages |
| `.gitignore` | Evita incluir arquivos temporários do computador |

Os sete MP4 correspondem aos seis filmes completos e a um trecho de 12 segundos para a abertura. São as versões otimizadas utilizadas no site. Os arquivos originais enviados na conversa não fazem parte deste pacote.

## Abrir no computador

Abra `index.html` no navegador. Não há dependências externas para a galeria e os vídeos.

Como alternativa, se você tiver Python instalado, abra um terminal dentro desta pasta e execute:

```bash
python3 -m http.server 8000
```

No Windows, o comando pode ser `py -m http.server 8000`. Depois acesse `http://localhost:8000`. Para encerrar o servidor, use `Ctrl+C` no terminal.

## Alterar o conteúdo

- **Textos e apresentação:** edite `index.html`.
- **Instagram:** procure `https://www.instagram.com/kje.visuals/` e `@kje.visuals` em `index.html`.
- **Cores:** altere as variáveis no começo de `styles.css`.
- **Vídeo de abertura:** substitua `assets/hero.mp4`. O site o reproduz em loop e sem som; o controle no rodapé da abertura permite pausar.
- **Filmes existentes:** substitua o MP4 e a capa WebP correspondentes, mantendo os mesmos nomes. Para alterar título e categoria, atualize o cartão em `index.html` e o registro correspondente na lista `films` de `app.js`.
- **Novos filmes:** adicione os arquivos em `assets`, um cartão na galeria de `index.html` e um item na lista `films` de `app.js`. Mantenha o mesmo identificador entre `data-film`, `id` e o nome dos arquivos. Atualize também os números dos filtros, a contagem inicial e o total do player, atualmente `06`.
- **Prévia ao compartilhar links:** depois de publicar, você pode adicionar ao `<head>` de `index.html` a tag `og:image` com a URL pública completa da capa `assets/entre-montanhas.webp`.

## Filmes incluídos

| Nome no site | MP4 e capa WebP |
| --- | --- |
| Entre montanhas | `entre-montanhas` |
| Em movimento | `em-movimento` |
| À beira-mar | `a-beira-mar` |
| Além do horizonte | `alem-do-horizonte` |
| Encontro na pista | `encontro-na-pista` |
| Ritmos da cidade | `ritmos-da-cidade` |

Os caminhos dos arquivos são relativos para funcionar tanto na raiz de um domínio quanto em uma pasta de projeto do GitHub Pages.

## Referências

- [Configurar a publicação no GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Enviar arquivos a um repositório](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)

Instruções verificadas na documentação do GitHub em 28 de outubro de 2026.
