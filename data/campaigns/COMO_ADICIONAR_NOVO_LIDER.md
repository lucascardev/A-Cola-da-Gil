# Como Adicionar um Novo Líder de Campanha

Cada líder de campanha possui sua própria configuração individual em um arquivo JSON na pasta `/data/campaigns/`.

## Estrutura do Arquivo JSON

Basta criar um arquivo com o nome da rota desejada, por exemplo: `coladacarla.json`

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
      "name": "Governador 10",
      "party": "REPUBLICANOS"
    },
    {
      "id": "presidente",
      "role": "Presidente da República",
      "roleShort": "Presidente",
      "order": 6,
      "digits": 2,
      "number": "10",
      "name": "Presidente 10",
      "party": "REPUBLICANOS"
    }
  ]
}
```

### Explicação dos Campos:
- `slug`: Identificador da URL (ex: `coladacarla` gera `https://minhacola2026.netlify.app/coladacarla`)
- `title`: O título principal exibido na colinha e no cabeçalho.
- `slogan`: O slogan da campanha do líder.
- `colors`:
  - `primary`: Cor principal em hexadecimal (ex: `#ff28b4`, `#2563eb`, `#8b5cf6`).
  - `primaryHover`: Cor ao passar o mouse ou focar.
  - `lightBg`: Fundo suave dos cartões de destaque.
  - `border`: Cor da borda suave.
- `showPresident`: `true` ou `false`. Se for `false`, o cargo de Presidente não aparece na lista nem na impressão. Se for `true`, o Presidente é exibido com seus 2 dígitos.
- `candidates`: Lista com os números e nomes oficiais.
