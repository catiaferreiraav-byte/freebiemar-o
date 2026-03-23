[README.md](https://github.com/user-attachments/files/26179658/README.md)
# Mapa de IA — CatIA (Cloudflare Pages)

## Estrutura

```
mapa-ia-cloudflare/
├── index.html
├── functions/
│   └── subscribe.js   ← Cloudflare Pages Function (substitui Netlify Function)
└── README.md
```

## Deploy no Cloudflare Pages

### 1. Adiciona os ficheiros ao repositório GitHub
- Cria um repositório novo (ex: `mapa-ia`)
- Adiciona os 3 ficheiros: `index.html`, `functions/subscribe.js`, `README.md`

### 2. No Cloudflare
- Vai a **Pages** > **Create a project** > **Connect to Git**
- Liga ao repositório GitHub
- Build settings:
  - Framework preset: **None**
  - Build command: *(deixa vazio)*
  - Build output directory: *(deixa vazio ou coloca `/`)*
- Clica **Save and Deploy**

### 3. Variáveis de ambiente
Após o primeiro deploy:
- Vai a **Settings** > **Environment variables**
- Adiciona em **Production**:

| Nome | Valor |
|---|---|
| `MAILERLITE_API_KEY` | A tua API key do MailerLite |
| `MAILERLITE_GROUP_ID` | O ID do grupo do MailerLite |

- Vai a **Deployments** > **Retry deployment** para aplicar as variáveis

### 4. Domínio personalizado (opcional)
- Settings > Custom domains > adiciona o teu domínio

## Diferença em relação ao Netlify
A função está em `functions/subscribe.js` em vez de `netlify/functions/subscribe.js`.
O endpoint chamado pelo frontend é `/functions/subscribe`.
