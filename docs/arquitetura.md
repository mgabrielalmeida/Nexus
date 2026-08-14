# Arquitetura do Nexus

**Status:** decisões iniciais aceitas

**Data:** 13 de agosto de 2026

**Escopo deste documento:** arquitetura e stack; nenhuma dependência deve ser
instalada nesta etapa.

## 1. Resumo executivo

O Nexus será um aplicativo mobile local-first feito com React Native, Expo e
TypeScript. Os dados serão persistidos em SQLite no próprio aparelho. A
navegação terá três abas principais — Finanças, Tarefas e Hábitos — e cada aba
terá sua própria pilha de telas.

A aplicação será um **monólito modular organizado por funcionalidade**. Isso
significa um único projeto e um único banco, mas com o código de cada área
separado. Não haverá backend, conta de usuário, sincronização em nuvem, ORM,
Redux ou biblioteca de UI no início.

Essa escolha privilegia aprendizado, manutenção e velocidade de entrega. A
principal consequência é que, até existir backup, os dados ficarão vinculados a
um único aparelho.

## 2. Objetivos arquiteturais

1. Manter o projeto compreensível para uma pessoa com pouca experiência em
   desenvolvimento mobile.
2. Funcionar sem internet e não depender de um servidor.
3. Separar as três funcionalidades sem criar múltiplos aplicativos ou pacotes.
4. Permitir novas telas e novos módulos sem reorganizar todo o projeto.
5. Tratar corretamente valores monetários, datas, recorrências e lembretes.
6. Adicionar complexidade somente quando um requisito real a justificar.

## 3. Não objetivos iniciais

- versão web ou desktop;
- múltiplos usuários ou perfis;
- login e autenticação remota;
- sincronização entre aparelhos;
- integração bancária ou Open Finance;
- integração com calendários externos;
- notificações push enviadas por servidor;
- colaboração e compartilhamento de tarefas;
- arquitetura de microserviços, monorepo ou pacotes internos;
- design system ou biblioteca de componentes genérica antes de haver repetição.

O calendário citado no escopo inicial será uma visualização **interna** das
tarefas. Integração com Google Calendar, Outlook ou calendário nativo é uma
possível evolução, não parte da primeira versão.

## 4. Stack escolhida

| Área | Escolha | Motivo |
| --- | --- | --- |
| Plataforma | React Native com Expo | Uma base para Android e iOS e menor necessidade de configuração nativa manual. |
| Linguagem | TypeScript em modo `strict` | Detecta inconsistências cedo e documenta os formatos de dados. |
| Navegação | Expo Router | Rotas baseadas em arquivos, abas e pilhas com uma convenção fácil de expandir. |
| Interface | Componentes nativos do React Native, `StyleSheet` e tokens locais | Evita assumir o custo e as convenções de uma biblioteca de UI. |
| Persistência | `expo-sqlite` | Os dados são relacionais, precisam de consultas por período e devem sobreviver a reinícios. |
| Acesso a dados | SQL parametrizado e repositórios pequenos por funcionalidade | Evita um ORM no início sem espalhar SQL pelas telas. |
| Estado | Estado local do React e Context apenas para estado realmente global | SQLite permanece como fonte de verdade; Redux/Zustand não são necessários inicialmente. |
| Notificações | Notificações locais com `expo-notifications` | Lembretes funcionam sem backend ou serviço de push. |
| Datas | APIs nativas e, quando as regras de recorrência forem implementadas, `date-fns` | Mantém as operações explícitas sem uma abstração pesada. |
| Testes | Jest com `jest-expo` e React Native Testing Library | Caminho suportado pelo ecossistema Expo para regras e componentes. |
| Qualidade | ESLint da configuração Expo e Prettier | Pouca configuração e estilo consistente. |
| Gerenciador de pacotes | npm | Já acompanha o Node.js e é suficiente para um único aplicativo. |
| Build | Expo Go no começo; development build/EAS Build quando necessário | Começa simples e permite APIs nativas que exijam um binário próprio depois. |

Não será fixada uma versão do Expo antes da criação do aplicativo. Quando a
implementação for autorizada, deve-se escolher a versão estável suportada pelo
template oficial naquele momento, registrar essa versão no `package.json` e
versionar o lockfile. Pacotes Expo devem ter versões compatíveis com esse SDK.

### Dependências deliberadamente adiadas

- **ORM (Drizzle ou semelhante):** SQL e migrações próprias são suficientes
  enquanto o esquema é pequeno. Reavaliar se as consultas ou migrações se
  tornarem difíceis de manter.
- **Redux, Zustand ou TanStack Query:** não há estado remoto nem fluxos globais
  complexos que os justifiquem.
- **Biblioteca de formulários:** usar estado controlado e validadores simples
  primeiro; reavaliar após existirem formulários grandes ou repetitivos.
- **Biblioteca de gráficos:** as primeiras visualizações de hábitos podem ser
  grades e barras feitas com componentes nativos. Adicionar uma biblioteca
  somente para gráficos que realmente exijam uma.
- **Biblioteca de UI:** criar poucos componentes compartilhados, extraídos a
  partir de uso real, em vez de montar um design system antecipadamente.

## 5. Navegação

A barra inferior terá inicialmente exatamente três destinos:

1. **Finanças**
2. **Tarefas**
3. **Hábitos**

Cada destino será uma pasta de rotas com sua própria pilha. Listas, detalhes e
formulários pertencentes a uma área continuam dentro da aba correspondente.
Configurações e telas que não pertencem a uma aba serão abertas pela pilha raiz,
possivelmente como modal.

Não haverá uma aba “Mais” vazia nem uma dashboard inicial sem requisito. Se no
futuro houver mais destinos de primeiro nível do que cabe confortavelmente na
barra, a navegação será reavaliada naquele momento.

Estrutura de rotas planejada:

```text
src/app/
  _layout.tsx                 # pilha raiz e inicialização
  (tabs)/
    _layout.tsx               # barra de abas
    finances/
      _layout.tsx             # pilha de Finanças
      index.tsx
      transaction/[id].tsx
    tasks/
      _layout.tsx             # pilha de Tarefas
      index.tsx
      task/[id].tsx
    habits/
      _layout.tsx             # pilha de Hábitos
      index.tsx
      habit/[id].tsx
  settings.tsx
```

Os nomes exatos das rotas de formulário serão definidos junto com a UX. A
decisão importante é manter somente arquivos de rota dentro de `src/app`.

## 6. Organização do código

```text
src/
  app/                        # rotas e layouts; pouco código de negócio
  db/
    client.ts
    migrations/
  features/
    finances/
      components/
      finance.repository.ts
      finance.rules.ts
      finance.types.ts
    tasks/
      components/
      task.repository.ts
      task.rules.ts
      task.types.ts
    habits/
      components/
      habit.repository.ts
      habit.rules.ts
      habit.types.ts
  platform/
    notifications.ts          # adaptação da API nativa
  shared/
    components/               # somente componentes usados por mais de uma área
    dates/
    money/
    theme/
```

Regras de dependência:

- uma rota pode usar um módulo de `features`;
- um módulo pode usar `db`, `platform` e `shared`;
- uma funcionalidade não acessa diretamente o repositório de outra;
- componentes de tela não executam SQL;
- regras puras, como cálculo de parcelas e sequências, não importam React nem
  APIs nativas;
- abstrações são extraídas para `shared` somente depois de serem usadas por pelo
  menos duas funcionalidades.

Não serão criadas camadas genéricas de `entities`, `use-cases`, `services` e
`controllers` para cada operação. Um arquivo de regra ou serviço só será criado
quando houver lógica além de ler/gravar dados.

## 7. Persistência e modelo de dados

SQLite será a fonte de verdade. A interface pode manter estado temporário de
formulário e filtros, mas dados persistentes não serão duplicados em uma store
global.

O banco terá migrações incrementais versionadas e transacionais. Na abertura do
aplicativo, migrações pendentes serão executadas antes de mostrar as telas. As
chaves primárias poderão ser inteiros locais, pois a primeira versão não terá
sincronização distribuída.

### Finanças

Modelo inicial conceitual:

- `categories`: categorias de receita e despesa;
- `transactions`: receitas e despesas planejadas ou realizadas;
- `finance_recurrences`: regras que originam lançamentos recorrentes;
- `installment_plans`: metadados de uma compra ou pagamento parcelado.

Decisões de domínio:

- valores serão armazenados como **inteiros na menor unidade da moeda**
  (centavos, para BRL), nunca como ponto flutuante;
- o valor será sempre positivo e o campo `type` distinguirá receita de despesa;
- a primeira versão trabalhará com uma moeda configurada para o aplicativo e
  não fará conversão cambial;
- um lançamento terá estado explícito, como `planned` ou `completed`;
- parcelas serão materializadas de uma vez, ligadas a um plano e numeradas de
  `1` até `N`;
- uma recorrência usará campos explícitos de frequência e intervalo, não uma
  linguagem genérica como RRULE;
- ocorrências recorrentes serão materializadas em uma janela móvel limitada,
  com uma restrição única que impeça duplicação;
- ao editar uma recorrência ou parcelamento, lançamentos já concluídos nunca
  serão alterados automaticamente; a mudança se aplica às ocorrências futuras.

O tamanho exato da janela de materialização será decidido com as telas de
planejamento. Doze meses é o ponto inicial sugerido para despesas mensais, mas
isso é uma constante de produto, não uma limitação do esquema.

### Tarefas

Modelo inicial conceitual:

- `tasks`: título, notas, estado, prioridade opcional e data/hora;
- `task_reminders`: instante do lembrete e identificador retornado pelo sistema
  operacional.

Tarefas poderão ser de dia inteiro ou possuir horário. Datas de calendário serão
armazenadas como `YYYY-MM-DD`; instantes serão armazenados em UTC, acompanhados
do fuso IANA que lhes deu origem quando isso for relevante. Essa separação evita
que uma tarefa “de segunda-feira” mude de dia por conversões de fuso.

Recorrência de tarefas não será generalizada junto com recorrência financeira na
primeira versão. Se ela entrar no escopo, poderá reutilizar funções de data, mas
terá regras e tabelas próprias para não acoplar domínios diferentes.

### Hábitos

Modelo inicial conceitual:

- `habits`: definição do hábito, ordem, cor e estado ativo/arquivado;
- `habit_checkins`: associação entre hábito e data local concluída.

Haverá no máximo um check-in por hábito e data. Constância atual, maior sequência
e percentuais de conclusão serão calculados a partir dos check-ins, não salvos
como contadores. Isso evita dados derivados inconsistentes.

A primeira versão prioriza hábitos diários. Frequências semanais ou metas do tipo
“3 vezes por semana” só devem ser adicionadas após existir esse requisito.

## 8. Notificações e lembretes

Os lembretes serão notificações locais. O banco guarda a intenção do usuário; o
agendamento no sistema operacional é um efeito que pode ser reconstruído.

Fluxo previsto:

1. salvar a tarefa e o lembrete no banco;
2. solicitar permissão apenas quando o usuário criar o primeiro lembrete;
3. agendar a notificação local;
4. guardar o identificador nativo no registro do lembrete;
5. cancelar e reagendar quando data, conclusão ou exclusão mudar;
6. ao iniciar ou retomar o app, reconciliar lembretes futuros para reparar
   agendamentos ausentes.

Não haverá serviço remoto de push. A exatidão final depende das políticas de
bateria e permissões do sistema operacional; isso deve aparecer de forma honesta
na experiência do usuário. Permissões especiais de alarme no Android só serão
pedidas se os testes mostrarem que são necessárias para o comportamento
prometido.

O mesmo adaptador poderá atender lembretes de hábitos ou finanças no futuro, sem
misturar suas regras de domínio.

## 9. Privacidade, segurança e backup

Na primeira arquitetura:

- não existe conta, servidor, telemetria, anúncio ou envio de dados para
  terceiros;
- o banco fica no sandbox do aplicativo, protegido pelas garantias normais do
  sistema operacional;
- a base SQLite **não deve ser considerada criptografada pelo aplicativo**;
- `SecureStore`, quando adicionado, será usado apenas para segredos e valores
  pequenos, nunca como banco principal;
- bloqueio opcional por biometria pode ser implementado com a API nativa, mas
  bloquear a interface não substitui criptografia do banco.

Essa é uma troca consciente em favor da simplicidade. Antes de usar o aplicativo
como única fonte de dados reais, deve existir exportação e restauração manual. O
arquivo exportado contém informação sensível; uma primeira versão deve alertar o
usuário e nunca enviá-lo automaticamente. Criptografia completa com SQLCipher e
uma estratégia segura de chaves será reavaliada se o modelo de risco a exigir,
pois isso implica development builds e maior complexidade operacional.

Desinstalar o aplicativo ou perder o aparelho poderá apagar os dados enquanto
não houver backup. Essa limitação não deve ficar implícita.

## 10. Estratégia de testes

Os testes se concentrarão onde erros têm maior custo:

- cálculo em centavos, somas e agrupamentos financeiros;
- datas de vencimento, finais de mês, parcelas e recorrências;
- cálculo de sequência e taxa de conclusão de hábitos;
- migrações do banco e restrições contra duplicidade;
- reagendamento e cancelamento de lembretes;
- componentes críticos e fluxos de navegação principais.

Regras puras terão testes unitários. Repositórios terão testes contra um banco
SQLite isolado. Componentes terão testes orientados ao comportamento, sem usar
snapshots como principal garantia. Testes ponta a ponta podem ser adicionados
para poucos fluxos essenciais quando a aplicação já estiver utilizável.

## 11. Ordem sugerida de implementação

1. Criar o projeto Expo/TypeScript, configurar as três abas, tema mínimo e banco.
2. Implementar Finanças com lançamentos simples antes de recorrências e parcelas.
3. Implementar Tarefas e calendário interno antes de habilitar notificações.
4. Implementar Hábitos e check-ins antes de visualizações avançadas.
5. Adicionar recorrências, parcelas e reconciliação de lembretes com testes de
   regras de data.
6. Implementar exportação/restauração antes de depender do app para dados reais.
7. Reavaliar biometria, criptografia e sincronização apenas com requisitos claros.

Essa ordem reduz o risco: cada módulo começa pelo fluxo básico e recebe suas
partes mais sensíveis depois que a persistência já está comprovada.

## 12. Registro das decisões

| ID | Decisão | Estado | Consequência principal |
| --- | --- | --- | --- |
| DEC-001 | Expo + React Native + TypeScript | Aceita | Uma base para Android/iOS e menos configuração nativa. |
| DEC-002 | Expo Router e três abas de primeiro nível | Aceita | Novas telas entram por convenção de arquivos; novos módulos principais exigem reavaliar espaço na barra. |
| DEC-003 | Monólito modular por funcionalidade | Aceita | Separação suficiente sem monorepo ou camadas cerimoniais. |
| DEC-004 | Local-first, sem backend | Aceita | Funciona offline e reduz operação; não há sincronização nem recuperação remota. |
| DEC-005 | SQLite como fonte de verdade | Aceita | Consultas relacionais e por período; exige migrações e backup. |
| DEC-006 | SQL parametrizado sem ORM inicialmente | Aceita | Menos ferramentas; os repositórios devem impedir SQL espalhado pela UI. |
| DEC-007 | Estado local do React, sem store global externa | Aceita | Menos conceitos e nenhuma duplicação permanente do banco em memória. |
| DEC-008 | Notificações locais, sem push remoto | Aceita | Lembretes independem de servidor, mas seguem limitações do sistema operacional. |
| DEC-009 | Valores monetários em unidades inteiras | Aceita | Elimina erros de arredondamento de ponto flutuante. |
| DEC-010 | Sem criptografia do banco na primeira etapa | Aceita com ressalva | Mantém Expo Go e setup simples; requer transparência, backup e futura revisão de risco. |

Uma decisão deve ser revisada quando surgir um requisito que invalide sua razão,
não apenas porque existe uma alternativa mais sofisticada.

## 13. Referências oficiais

- [Expo: introdução ao Expo Router](https://docs.expo.dev/router/introduction/)
- [Expo Router: conceitos de rotas por arquivos](https://docs.expo.dev/router/basics/core-concepts/)
- [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [Arquitetura local-first com Expo](https://docs.expo.dev/guides/local-first/)
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [Armazenamento de dados no Expo](https://docs.expo.dev/develop/user-interface/store-data/)
- [TypeScript com Expo](https://docs.expo.dev/guides/typescript/)
- [Testes unitários com Jest no Expo](https://docs.expo.dev/develop/unit-testing/)
- [ESLint e Prettier com Expo](https://docs.expo.dev/guides/using-eslint/)
