# Como Adicionar um Novo Líder de Campanha (100% Automático)

Agora o carregamento de novas colinhas é **100% automático**.  
Você **não precisa mexer em nenhum código TypeScript nem importar arquivos manualmente**.

Basta adicionar um arquivo `.json` dentro da pasta `/data/campaigns/`. O sistema reconhece e ativa a nova rota imediatamente!

---

## 1. Passo Único: Criar o arquivo JSON

Crie um arquivo dentro de `/data/campaigns/` com o nome da colinha (ex: `coladacarla.json`).

### Exemplo completo: `coladacarla.json`
```json
{
  "slug": "coladacarla",
  "title": "A Cola da Carla",
  "slogan": "Por Uma Cidade Melhor",
  "badge": "Liderança Feminina",
  "description": "Consulte os números de voto da Carla para levar no dia da eleição.",
  "colors": {
    "primary": "#8b5cf6",
    "primaryHover": "#7c3aed",
    "lightBg": "#f5f3ff",
    "border": "#ddd6fe"
  },
  "showPresident": false,
  "footerNote": "A cola da Carla • Por Uma Cidade Melhor",
  "candidates": [
    {
      "id": "deputado-federal",
      "role": "Deputada Federal",
      "roleShort": "Dep. Federal",
      "order": 1,
      "digits": 4,
      "number": "1010",
      "name": "Carla Silva",
      "party": "REPUBLICANOS",
      "badge": "Destaque Principal ★ A Força da Mudança",
      "isMainHighlight": true
    },
    {
      "id": "deputado-estadual",
      "role": "Deputado Estadual",
      "roleShort": "Dep. Estadual",
      "order": 2,
      "digits": 5,
      "number": "10123",
      "name": "Carlos Souza",
      "party": "REPUBLICANOS"
    },
    {
      "id": "senador-1",
      "role": "Senador (1ª Vaga)",
      "roleShort": "Senador 1",
      "order": 3,
      "digits": 3,
      "number": "100",
      "name": "Senador 1",
      "party": "REPUBLICANOS"
    },
    {
      "id": "senador-2",
      "role": "Senador (2ª Vaga)",
      "roleShort": "Senador 2",
      "order": 4,
      "digits": 3,
      "number": "200",
      "name": "Senador 2",
      "party": "REPUBLICANOS"
    },
    {
      "id": "governador",
      "role": "Governador",
      "roleShort": "Governador",
      "order": 5,
      "digits": 2,
      "number": "10",
      "name": "Candidato a Governador",
      "party": "REPUBLICANOS"
    }
  ]
}
```

---

## 2. Acesso Imediato

Assim que o arquivo `coladacarla.json` é colocado na pasta:
- A rota `https://coladagil.netlify.app/coladacarla` já abre a colinha da Carla com suas cores e candidatos.
- O atalho amigável `https://coladagil.netlify.app/carla` também funciona automaticamente.

## 3. Privacidade e Exclusividade Total
- **Sem menus de outros líderes**: Cada página exibe apenas a colinha daquele líder. Ninguém sabe que outros líderes existem.
- **URLs desconhecidas**: Se alguém acessar uma URL não cadastrada, o sistema abre uma colinha limpa e personalizada para a pessoa criar a sua própria colinha e imprimir, salvando no seu próprio navegador (`LocalStorage`).
- **A Cola da Gil**: O link principal `https://coladagil.netlify.app/` continua sendo A Cola da Gil Tavares.
