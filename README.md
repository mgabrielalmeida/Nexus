# Nexus

Aplicativo mobile pessoal para finanças, tarefas e hábitos.

O setup inicial está concluído: dependências, configurações, scripts, navegação
mínima e estrutura de pastas estão preparados. As funcionalidades do aplicativo
ainda não começaram a ser desenvolvidas.

## Documentação

- [Arquitetura e decisões técnicas](docs/arquitetura.md)

## Direção do produto

- dados locais e privados por padrão;
- três áreas iniciais: Finanças, Tarefas e Hábitos;
- navegação principal por barra de abas;
- estrutura simples, preparada para crescer sem antecipar complexidade;
- Android e iOS a partir da mesma base de código.

## Comandos

```bash
npm start
npm run android
npm run ios
npm run lint
npm run typecheck
npm test
npm run format:check
```

## Estrutura

- `src/app`: rotas e layouts do Expo Router;
- `src/features`: módulos de Finanças, Tarefas e Hábitos;
- `src/db`: acesso ao SQLite e futuras migrações;
- `src/platform`: integrações com APIs nativas;
- `src/shared`: componentes e utilitários realmente compartilhados.

As rotas atuais são apenas uma casca de navegação e não contêm interface ou
regras de negócio.
