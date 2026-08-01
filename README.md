# omarcelomenezes.com

Site pessoal de **Marcelo Menezes** — consultoria de SEO, GEO e AEO.

HTML5 + CSS + JavaScript puro. Sem framework, sem build, sem dependências.

## Estrutura

```
.
├── index.html      # página única, todas as seções
├── css/style.css   # tokens de tema, layout, componentes
├── js/main.js      # tema, menu, reveal, contadores, acordeão
└── README.md
```

## Rodar localmente

```bash
python3 -m http.server 8080
# http://localhost:8080
```

Qualquer servidor estático serve — não há etapa de build.

## Recursos

- Tema claro/escuro com persistência em `localStorage` e fallback para a preferência do sistema
- Navegação mobile e link ativo por seção (`IntersectionObserver`)
- Animações de entrada, contadores e rotator no hero
- Respeita `prefers-reduced-motion`
- SEO: meta tags, Open Graph, canonical e JSON-LD (`Person`)
- Acessibilidade: skip link, `aria-expanded`, foco visível, HTML semântico

## Deploy

Conteúdo estático — publique a raiz do repositório em GitHub Pages, Netlify,
Vercel ou Cloudflare Pages sem configuração adicional.
