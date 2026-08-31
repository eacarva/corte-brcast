# Corte BrCAST

Interpretação de antibiograma segundo o BrCAST, para o LEPAC.

Digite os valores de CIM e o sistema devolve a interpretação colorida — *Sensível, dose padrão* · *Sensível, aumentando exposição* · *Resistente* — pronta para copiar no laudo. 27 microrganismos em 10 painéis, com tabelas separadas para urina e outros materiais — 420 linhas de antimicrobiano ao todo.

**É um único arquivo HTML.** Sem servidor, sem instalação, sem banco de dados. Abre com duplo clique e funciona.

> Feito para a **Dra. Andressa Sulamita Siqueira Menezes de Brito**, biomédica —
> que faz esse trabalho todo dia no LEPAC, e cuja rotina ensinou o que este
> sistema precisava ser.

---

## Para quem vai usar no dia a dia

1. Abra o `Corte-BrCAST.html`
2. Escolha o microrganismo na lista à esquerda e o material no alto
3. Digite os CIM — `Enter` pula para o próximo campo, `Shift+Enter` volta
4. **Copiar tabela** leva a tabela formatada para colar no outro sistema

O campo aceita `≤0,25`, `>8`, `16/2` ou só o número. Digitar `<=` ou `>=` vira `≤` / `≥` sozinho.

A coluna **Corte aplicado** mostra qual regra decidiu cada linha — ela não vai junto quando você copia.

**Colar / importar** preenche vários resultados de uma vez, colados do outro sistema.

### Colar o resultado do equipamento

O botão **Colar / importar** aceita o relatório do equipamento colado direto:
abrir o PDF, selecionar tudo, copiar, colar. Não é preciso limpar cabeçalho
nem recortar a tabela.

A **interpretação que vem no relatório é descartada** — quem interpreta é o
corte do laboratório. Só o valor de CIM é aproveitado.

O nome do antimicrobiano casa mesmo escrito diferente: separador da combinação
(`piperacilina-tazobactam` = `Piperacilina/Tazobactam`), ordem dos componentes
(`sulfametoxazol-trimetoprima` = `Trimetoprima/Sulfametoxazol`), terminação
`-a`/`-o` (`ciprofloxacina` = `ciprofloxacino`) e sinônimos (`clavulanato` =
`ácido clavulânico`).

O que **não** casa sozinho é a via: o equipamento manda `Cefuroxima` sem dizer
se é oral ou intravenosa, e os cortes são diferentes. Essas linhas caem na
prévia para escolha, e a escolha fica gravada — na importação seguinte já
casam sozinhas.

Nada entra sem a prévia, e o que entra fica marcado como **não conferido**.

### Tirar um antimicrobiano do laudo

Em alguns casos o antimicrobiano não deve ser mostrado. No fim de cada linha
há um **olho**: aberto, o antimicrobiano sai no laudo; cortado, fica de fora do
que é copiado. Um clique alterna.

O olho fica apagado até o mouse passar pela linha. Sumindo de vez, ninguém
descobriria que existe; aceso o tempo todo, disputaria atenção com o
resultado. Já o olho cortado fica sempre nítido.

A linha **continua na tela**, riscada e apagada, mas com o valor e a
interpretação à vista. Esconder da tela deixaria a própria pessoa sem saber o
que tirou.

Enquanto houver alguma fora, um aviso fica no topo com o botão **Incluir todos
de volta**, e o resumo ganha a contagem. Ao copiar, a mensagem diz quantas
ficaram de fora.

A escolha vale **só para a amostra atual**: *Nova amostra* e *Limpar tudo*
devolvem todas. Guardar entre pacientes seria pior que o problema — um
antimicrobiano sumiria do laudo para sempre porque alguém esqueceu de
reativar, e falta de linha ninguém percebe.

### Observações padrão

68 textos de laudo (Bac 1 a Bac 71), com busca por código ou conteúdo. Clicar copia.

### O que fica no seu computador

Os CIM digitados, as marcas de *não conferido* e o histórico ficam **no navegador daquela máquina**. Não são compartilhados, não saem dali, e sincronizar não apaga amostra em andamento.

**Nenhum dado de paciente sai do computador.** O programa não envia nada para lugar nenhum.

---

## Para quem administra os cortes

Os valores de corte vêm de **uma planilha do Google**, para que todos os computadores interpretem igual. Sem isso, cada máquina teria sua cópia e elas divergiriam em silêncio — a mesma cepa interpretada de dois jeitos, sem ninguém perceber.

### Montar a planilha

1. Na tela **Fonte dos cortes**, clique em **Gerar CSV para o Drive**
2. Suba o arquivo no Drive e abra com **Google Planilhas**
3. Selecione as colunas `sensivel_dose_padrao`, `aumentando_exposicao` e `resistente` e use **Formatar ▸ Número ▸ Texto simples**
4. **Compartilhar ▸ Acesso geral ▸ Qualquer pessoa com o link ▸ Leitor**
5. Copie o endereço da barra do navegador e cole na tela **Fonte dos cortes**

> **O passo 3 não pode ser pulado.** A coluna do meio mistura números (`4`, `0,5`) com texto (`≤8`, `2 a 4`). Se ela não for marcada como texto, o Google decide que a coluna é numérica e **deixa de enviar todo valor escrito com texto** — 94 cortes que não chegariam. O programa detecta e recusa a sincronização nesse caso, em vez de perder corte calado.

> **"Qualquer pessoa com o link" libera a planilha inteira**, não só a aba dos cortes. Valores de corte e nomes de antimicrobiano são informação técnica pública do BrCAST e podem ficar assim. Dado de paciente, não — se houver qualquer aba com resultado de amostra, faça uma planilha separada.

### Colunas

| Coluna | Para que serve |
|---|---|
| `organismo_id` | Liga a linha ao microrganismo. **Nunca alterar** — vale proteger a coluna |
| `ordem` | Posição da linha na tabela do laudo |
| `tipo` | `cim`, `triagem` ou `titulo` |
| `antimicrobiano` | Nome que aparece no laudo |
| `sensivel_dose_padrao` | Corte S. Ex.: `≤8` |
| `aumentando_exposicao` | Faixa intermediária. Ex.: `2 a 4` ou `4` |
| `resistente` | Corte R. Ex.: `>8` |
| `painel` · `organismo` | Só para leitura humana |
| `versao` *(opcional)* | Edição do BrCAST — ex.: `BrCAST 2024`. Basta **uma célula** preenchida, em qualquer linha. Aparece na barra lateral |

### Depois de configurado

- O programa lê a planilha **toda vez que abre**
- Editou um corte? Quem já estava com o arquivo aberto clica em **Sincronizar agora**
- Enquanto houver planilha configurada, a tela **Valores de referência** fica **somente leitura** — editar ali recriaria a divergência que a planilha existe para eliminar
- **Sem internet**, o programa usa a última cópia boa e mostra a data no topo

### Quando algo não bate

O programa **recusa a sincronização inteira** e diz a linha e o motivo. Nunca aplica pela metade: um microrganismo que perde antibióticos em silêncio é pior que uma sincronização que falha visivelmente.

| Mensagem | O que fazer |
|---|---|
| "Não consegui abrir a planilha" | Compartilhamento não está em *Qualquer pessoa com o link*. Teste numa janela anônima |
| "a coluna … está como número" | Formate as colunas de corte como **Texto simples** e sincronize de novo. Os valores não se perderam — só não estavam sendo enviados |
| "tudo numa coluna só" | O CSV entrou sem separador. `Dados ▸ Dividir texto em colunas`, vírgula |
| "microrganismo desconhecido" | Alguém editou `organismo_id`. A mensagem diz a linha |
| "Faltam colunas" | O link aponta para a aba errada, ou a primeira linha não é o cabeçalho |

---

## Distribuir para os computadores

Cada PC precisa do arquivo e do link colado uma vez.

**Numa pasta de rede** é mais prático: uma cópia só do `Corte-BrCAST.html`, um atalho na área de trabalho de cada máquina. Versão nova = trocar um arquivo.

> Não adianta pôr o **CSV** na pasta de rede. Por segurança, o navegador proíbe uma página aberta do disco de ler outros arquivos — a mesma regra que impede um anexo de e-mail de varrer o seu computador. Os cortes precisam vir da planilha, que é acesso à internet e autorizado pelo servidor do Google.

### Aviso de versão nova

Cada máquina tem a sua cópia, e uma cópia velha não avisa que é velha. Por
isso, ao abrir, o programa pergunta uma vez ao site se existe versão mais
nova publicada. Se existir, acende um aviso âmbar no rodapé da barra
lateral, com link para baixar. Sem internet, nenhum aviso aparece — e é o
comportamento certo, porque o programa continua inteiro.

Ele **só pergunta**. Não baixa nada, não se reescreve e não muda nenhum
corte: o que decide laudo é apenas o que está dentro do arquivo que você
tem na mão.

A tela **Sobre o programa**, na barra lateral, traz o endereço para baixar a
versão nova, a autoria e o aviso de uso. Existe por causa do arquivo solto:
ele viaja por pendrive e mensagem e chega em máquina onde ninguém sabe de onde
veio. O pé da barra mostra o endereço o tempo todo; o resto fica nessa tela,
fora do caminho de quem está laudando.

A versão instalada fica no pé da barra lateral, em cinza claro. É por ali que
se confere se a atualização entrou — sem ela, o aviso some ao ser clicado e
ninguém sabe dizer se algo aconteceu.

**Ao publicar uma versão nova**, subir o mesmo número nos três lugares:

| | |
|---|---|
| `Corte-BrCAST.html` | a constante `VERSAO_APP` |
| `version.json` | o campo `versao` |
| `sw.js` | a constante `VERSAO` |

Os dois primeiros comandam o aviso: se um ficar para trás, ele mente — ou some
quando devia aparecer, ou aparece para sempre em quem já está atualizado. O
terceiro comanda a troca nas máquinas instaladas: o navegador só percebe que
há versão nova porque o `sw.js` mudou de conteúdo. Sem mexer nele, quem
instalou continua na versão antiga.

Correções só na página de entrada (`index.html`) aparecem sem precisar de
número novo: ela é buscada da rede a cada visita, com o cache apenas como
reserva para quando não há rede. O programa é o contrário — vem do disco,
para abrir instantâneo e sem internet —, e por isso depende do número.

### Instalar como programa (recomendado nas máquinas fixas)

O Chrome instala a página como programa: vira ícone na área de trabalho,
abre em janela própria, funciona sem internet igual ao arquivo — e **troca de
versão sozinho**. O ícone vem do `manifest.webmanifest`; ninguém precisa criar
atalho nem escolher figura.

1. Abrir <https://eacarva.github.io/corte-brcast/>
2. Clicar no ícone de instalar na barra de endereço (ou **menu ⋮ ▸ Transmitir,
   salvar e compartilhar ▸ Instalar página como app**)
3. Confirmar em **Instalar**

Precisa de internet **uma vez**, só para instalar. Depois disso a máquina tem
tudo em disco.

Logo depois de instalar, o Chrome abre a janela do programa na página em que a
pessoa estava — a de download. Não deu errado, e essa página se desvia sozinha
para o programa. Nas aberturas seguintes, pelo ícone, já entra direto.

Se o Chrome do laboratório for gerenciado pela TI, o administrador consegue
instalar em todas as máquinas de uma vez por política, sem ninguém clicar em
nada — vale perguntar.

O botão de instalar só aparece quando a instalação é mesmo possível. Ele **não**
aparece em janela anônima (o Chrome não instala nada ali), no Firefox do
computador (não instala programas assim), nem quando o app já está instalado.
Testar em anônima dá um falso negativo — foi o primeiro engano ao verificar isto.

Se nenhum caminho funcionar, o arquivo solto continua sendo a saída, e é
exatamente para isso que ele existe.

**Ícone apagado por engano** não desinstala nada: o programa continua na
máquina, só o atalho se perdeu. Para trazer de volta, em `chrome://apps`,
botão direito em Corte BrCAST ▸ **Criar atalhos…**. A página de entrada
mostra esse caminho sozinha quando percebe que o app já está instalado.

### Atalho com ícone (para o arquivo solto)

1. Deixe o `corte-brcast.ico` junto do programa
2. Botão direito na área de trabalho → **Novo ▸ Atalho** → aponte para o `Corte-BrCAST.html`
3. Botão direito no atalho → **Propriedades ▸ Alterar ícone ▸ Procurar** → escolha o `.ico`

---

## Arquivos

| | |
|---|---|
| `Corte-BrCAST.html` | O programa. É só isto que precisa ser distribuído |
| `version.json` | Última versão publicada. É o que o programa consulta para avisar |
| `sw.js` | Faz a instalação funcionar offline e trocar de versão sozinha |
| `manifest.webmanifest` | Nome, cores e ícones do programa instalado |
| `icon-*.png` | Ícones do programa instalado, gerados do `.svg` |
| `index.html` | Página de entrada em eacarva.github.io/corte-brcast |
| `corte-brcast.ico` | Ícone para o atalho do Windows, 7 tamanhos |
| `corte-brcast.svg` | Fonte do ícone, para editar |

## Nota técnica

Sem dependências, sem build, sem back-end. A única requisição de rede é a leitura da planilha, feita por `<script>` no endpoint `gviz` do Google — não por `fetch`, porque um arquivo aberto do disco tem origem `null` e o Google só devolve cabeçalho CORS quando existe uma origem para espelhar. Medido: `fetch` do disco é bloqueado, `<script>` passa. É o que permite o arquivo funcionar com duplo clique, sem servidor.

---

## Autoria

Feito para a **Dra. Andressa Sulamita Siqueira Menezes de Brito**, biomédica no
LEPAC. O sistema existe por causa do trabalho dela, e foi a rotina dela que
definiu o que ele precisava fazer.

**Elisson Andrade de Carvalho** — concepção e direção do projeto: definiu o que o
sistema deveria fazer, reuniu os dados de referência, conduziu as decisões de
arquitetura e testou cada versão contra a rotina real do laboratório.

Implementação em par com Claude (Anthropic).

Licença MIT — veja [LICENSE](LICENSE).

### Aviso

Ferramenta de apoio à interpretação. A conferência e a responsabilidade pelo
resultado liberado são do profissional responsável.
