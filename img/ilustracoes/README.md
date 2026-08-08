# Ilustrações

Ilustrações em estilo HQ retrô para uso em páginas e posts do blog.

Cada imagem tem 4 larguras (480, 768, 1200, 1600) em WebP e JPEG.
Proporção 16:9 aproximada — a altura é `largura / 1.792` (ex.: 1200×670).

Padrão do arquivo: `img/ilustracoes/<slug>-<largura>.<webp|jpg>`

## Como usar

```html
<picture>
  <source
    type="image/webp"
    srcset="/img/ilustracoes/como-funciona-seo-480.webp 480w, /img/ilustracoes/como-funciona-seo-768.webp 768w, /img/ilustracoes/como-funciona-seo-1200.webp 1200w, /img/ilustracoes/como-funciona-seo-1600.webp 1600w"
    sizes="(min-width: 900px) 860px, 100vw">
  <img
    src="/img/ilustracoes/como-funciona-seo-768.jpg"
    srcset="/img/ilustracoes/como-funciona-seo-480.jpg 480w, /img/ilustracoes/como-funciona-seo-768.jpg 768w, /img/ilustracoes/como-funciona-seo-1200.jpg 1200w, /img/ilustracoes/como-funciona-seo-1600.jpg 1600w"
    sizes="(min-width: 900px) 860px, 100vw"
    width="1200" height="670"
    loading="lazy" decoding="async"
    alt="...">
</picture>
```

Trocar `loading="lazy"` por `fetchpriority="high"` quando a imagem for o LCP da página.

## Acervo

### como-funciona-seo

`https://omarcelomenezes.com/img/ilustracoes/como-funciona-seo-1200.webp`

Alt: `Tirinha em três quadros explicando como o SEO funciona: o cliente busca "vidraçaria em Florianópolis" no Google, encontra a Vidraçaria Sul no primeiro resultado e clica no botão de WhatsApp do site.`

Uso sugerido: explicação didática de como o SEO gera clientes.

### empresa-nao-aparece-no-google

`https://omarcelomenezes.com/img/ilustracoes/empresa-nao-aparece-no-google-1200.webp`

Alt: `Empresário preocupado diante do computador com a tela "Nenhum resultado encontrado" e o balão "Por que minha empresa não aparece no Google?".`

Uso sugerido: abertura de conteúdo sobre falta de visibilidade e diagnóstico.

### chama-o-marcelo-da-pmturbo

`https://omarcelomenezes.com/img/ilustracoes/chama-o-marcelo-da-pmturbo-1200.webp`

Alt: `Gestor de agência em sala cheia de gráficos de campanha aponta para o monitor e diz "Preciso falar com o Marcelo da PMTurbo pra captar leads pro meu cliente".`

Uso sugerido: página de parceiros e SEO white label para agências.

### vou-referenciar-o-marcelo

`https://omarcelomenezes.com/img/ilustracoes/vou-referenciar-o-marcelo-1200.webp`

Alt: `Gestora com placa de mesa "Marta Costa" faz sinal de positivo e diz "Vou referenciar o Marcelo porque ele é nota 10!", cercada de gráficos de vendas.`

Uso sugerido: indicações e programa de parceria.

### obrigada-marcelo

`https://omarcelomenezes.com/img/ilustracoes/obrigada-marcelo-1200.webp`

Alt: `Grupo de clientes comemorando e abraçando o consultor, com os balões "Obrigada, Marcelo!" e "Marcelo!".`

Uso sugerido: prova social, depoimentos e resultados.
