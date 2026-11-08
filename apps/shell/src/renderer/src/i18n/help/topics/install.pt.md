<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Instalar o Onyou Office

[página de lançamentos](https://github.com/dodamworks/onyouoffice/releases/latest)

## Escolher o ficheiro para a sua máquina

| Plataforma                              | Requisitos                                     | Ficheiro                           |
| --------------------------------------- | ---------------------------------------------- | ---------------------------------- |
| **Windows**                             | Windows 10 ou posterior, Intel/AMD de 64 bits  | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (beta)**, Apple Silicon           | macOS 12 ou posterior, chip M1 ou mais recente | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (beta)**, Intel                   | macOS 12 ou posterior, processador Intel       | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (beta)**, qualquer distribuição | 64 bits (x86_64); glibc ≥ 2.35                 | `OnyouOffice-<version>.AppImage`   |
| **Linux (beta)**, família Ubuntu/Debian | 64 bits (x86_64); glibc ≥ 2.35                 | `onyouoffice_<version>_amd64.deb`  |
| **Linux (beta)**, Fedora/RHEL/openSUSE  | 64 bits (x86_64); glibc ≥ 2.35                 | `onyouoffice-<version>.x86_64.rpm` |

## No Windows

1. Transfira `OnyouOffice-Setup-<version>.exe` a partir da página de lançamentos.
2. Execute-o. O instalador não tem assinatura digital, por isso o Windows pode mostrar primeiro uma janela azul «O Windows protegeu o seu PC». Escolha **Mais informações** e depois **Executar mesmo assim**. O texto exato depende da sua versão do Windows.
3. Siga o instalador até ao fim.

Ele coloca o Onyou Office no menu Iniciar e regista `.docx`, `.xlsx`, `.pptx`, `.pdf` e afins, para que um clique duplo num ficheiro o abra.

Como o instalador não está assinado, execute apenas um que tenha transferido da página de lançamentos indicada acima.

## Quando o Windows bloqueia a transferência ou a instalação

### O Edge diz que o ficheiro «não é normalmente transferido»

O Microsoft Defender SmartScreen avisa desta forma sobre um ficheiro que ainda não viu muitas pessoas transferir. O guia da Microsoft para manter o ficheiro é o seguinte:

1. Abra a lista de transferências do Edge (**Ctrl+J**), clique em **…** junto ao ficheiro e escolha **Manter**.
2. Na janela que se abre, clique em **Mostrar mais** e depois em **Manter mesmo assim**. O ficheiro fica na sua pasta Transferências.

Essa janela também tem um botão que comunica que o ficheiro é seguro. Esse botão só abre a página de denúncias da Microsoft (`feedback.smartscreen.microsoft.com`) e não mantém o ficheiro. Feche essa página e clique antes em **Mostrar mais** na janela.

Se a janela não tiver **Mostrar mais** ou não tiver **Manter mesmo assim**:

- Num PC gerido por uma escola ou empresa, o administrador pode desativar a possibilidade de ignorar estes avisos (uma política do Edge). Nesse caso ninguém nesse PC consegue manter o ficheiro; peça ao administrador que o instale ou que o permita.
- Transferir a partir da página de lançamentos noutro navegador dá-lhe o mesmo ficheiro.

### Aparece a janela «O Windows protegeu o seu PC»

O Microsoft Defender SmartScreen mostra esta janela na primeira vez que vê um instalador sem assinatura. Clique em **Mais informações** e aparece o botão **Executar mesmo assim**. Num PC gerido por uma escola ou empresa, uma definição do administrador pode ocultar esse botão; fale com o administrador.

## Num Mac (beta)

Precisa do macOS 12 (Monterey) ou posterior. A versão para Mac não tem assinatura de programador da Apple, por isso, na primeira vez que a abre, o macOS diz que não consegue verificar se a aplicação está livre de software malicioso e não a abre. Permita-a uma só vez, como abaixo.

1. Abra o dmg e arraste `Onyou Office.app` para a pasta **Aplicações**.
2. Abra o Onyou Office a partir da pasta Aplicações. Quando aparecer o aviso, clique em **Concluído**.
3. Abra **Definições do Sistema ▸ Privacidade e segurança**. Perto do fim, junto à linha que diz que o Onyou Office foi bloqueado, clique em **Abrir mesmo assim** e introduza a palavra-passe do Mac. O botão aparece durante cerca de uma hora depois de ter tentado abrir a aplicação.
4. Na janela que aparece de novo, clique em **Abrir**. A partir daí abre sem aviso.

No macOS 12 o local é **Preferências do Sistema ▸ Segurança e privacidade ▸ Geral**, e o botão aí é **Abrir mesmo assim**.

Se o macOS disser que a aplicação não é suportada neste Mac, verifique duas coisas:

- Um Mac Intel não consegue executar o ficheiro para Apple Silicon (`-arm64.dmg`). Veja «Processador» em **Acerca deste Mac**, apague a aplicação que instalou e instale antes o ficheiro `-x64.dmg`.
- O macOS 11 ou anterior não consegue executar o Onyou Office. **Acerca deste Mac** também mostra a versão do macOS.

Ainda num Mac:

- Os cartões de ligação da IA não têm botão de instalação. Siga a ligação para o guia oficial de instalação no cartão para instalar o Claude Code ou o Codex.
- O início de sessão termina no navegador. Se o navegador pedir para colar um código, execute você mesmo `claude auth login` ou `codex login` no Terminal. Consulte [Conexão por assinatura](help://subscription).

## No Linux (beta)

- **AppImage**: torne-o executável (`chmod +x OnyouOffice-<version>.AppImage`) e execute o ficheiro. Não há passo de instalação.
- **deb**: instale com `sudo apt install ./onyouoffice_<version>_amd64.deb`.
- **rpm**: instale com `sudo dnf install ./onyouoffice-<version>.x86_64.rpm`. No openSUSE, use `sudo zypper install ./onyouoffice-<version>.x86_64.rpm`.

Os pacotes deb e rpm instalam-se em `/opt/Onyou Office` e ligam o comando de terminal `/usr/bin/onyouoffice`. Tal como num Mac, os cartões de ligação da IA não têm botão de instalação e, quando um início de sessão pede um código, é você que executa `claude auth login` ou `codex login` num terminal.

## Atualizações

[página de lançamentos](https://github.com/dodamworks/onyouoffice/releases/latest)

## A versão que está a executar

**Configurações ▸ Sobre** é onde a aplicação comunica a versão que tem, o canal que segue e onde vive o projeto. Também indica o projeto de código aberto em que esta aplicação se baseia.

## A linha de comandos vem de brinde

Todas as instalações incluem um comando `onyouoffice` que fala com os mesmos motores que a janela usa, por isso os dois nunca discordam sobre um ficheiro. `onyouoffice install-cli` coloca-o no seu `PATH`. Consulte [Linha de comandos e agentes](help://cli) para saber o que ele sabe fazer.
