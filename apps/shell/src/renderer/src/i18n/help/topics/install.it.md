<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Installare Onyou Office

[pagina Releases](https://github.com/dodamworks/onyouoffice/releases/latest)

## Scegli il file giusto per il tuo computer

| Piattaforma                               | Requisiti                                    | File                               |
| ----------------------------------------- | -------------------------------------------- | ---------------------------------- |
| **Windows**                               | Windows 10 o successivo, Intel/AMD a 64 bit  | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (beta)**, Apple Silicon             | macOS 12 o successivo, chip M1 o più recente | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (beta)**, Intel                     | macOS 12 o successivo, processore Intel      | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (beta)**, qualsiasi distribuzione | 64 bit (x86_64); glibc ≥ 2.35                | `OnyouOffice-<version>.AppImage`   |
| **Linux (beta)**, famiglia Ubuntu/Debian  | 64 bit (x86_64); glibc ≥ 2.35                | `onyouoffice_<version>_amd64.deb`  |
| **Linux (beta)**, Fedora/RHEL/openSUSE    | 64 bit (x86_64); glibc ≥ 2.35                | `onyouoffice-<version>.x86_64.rpm` |

## Su Windows

1. Scarica `OnyouOffice-Setup-<version>.exe` dalla pagina Releases.
2. Eseguilo. Il programma di installazione non ha una firma digitale, quindi Windows può mostrare prima una finestra blu «PC protetto da Windows». Scegli **Ulteriori informazioni**, poi **Esegui comunque**. Il testo esatto dipende dalla tua versione di Windows.
3. Segui il programma di installazione fino alla fine.

Inserisce Onyou Office nel menu Start e registra `.docx`, `.xlsx`, `.pptx`, `.pdf` e simili, così un doppio clic su un file lo apre.

Poiché il programma di installazione non è firmato, esegui solo quello che hai scaricato dalla pagina Releases indicata sopra.

## Quando Windows blocca il download o l'installazione

### Edge dice che il file «non viene scaricato comunemente»

Microsoft Defender SmartScreen avvisa così per un file che non ha visto scaricare da molte persone. La guida di Microsoft per mantenere il file è questa:

1. Apri l'elenco dei download di Edge (**Ctrl+J**), premi **…** accanto al file e scegli **Mantieni**.
2. Nella finestra che si apre, premi **Mostra altro**, poi **Mantieni comunque**. Il file resta nella cartella Download.

Quella finestra ha anche un pulsante che segnala il file come sicuro. Apre soltanto la pagina di segnalazione di Microsoft (`feedback.smartscreen.microsoft.com`) e non mantiene il file. Chiudi quella pagina e premi invece **Mostra altro** nella finestra.

Se la finestra non ha **Mostra altro** o non ha **Mantieni comunque**:

- Su un PC gestito da una scuola o da un'azienda, l'amministratore può impedire di ignorare questi avvisi (un criterio di Edge). In quel caso nessuno su quel PC può mantenere il file; chiedi all'amministratore di installarlo o di consentirlo.
- Scaricando dalla pagina Releases con un altro browser ottieni lo stesso file.

### Compare una finestra «PC protetto da Windows»

Microsoft Defender SmartScreen mostra questa finestra la prima volta che vede un programma di installazione non firmato. Premi **Ulteriori informazioni** e compare un pulsante **Esegui comunque**. Su un PC gestito da una scuola o da un'azienda, un'impostazione dell'amministratore può nascondere quel pulsante; chiedi all'amministratore.

## Su un Mac (beta)

Serve macOS 12 (Monterey) o successivo. La versione per Mac non ha una firma da sviluppatore Apple, quindi la prima volta che la apri macOS dice che non può verificare che l'app sia priva di malware e non la apre. Consentila una sola volta, come indicato sotto.

1. Apri il dmg e trascina `Onyou Office.app` nella cartella **Applicazioni**.
2. Apri Onyou Office dalla cartella Applicazioni. Quando compare l'avviso, premi **Fine**.
3. Apri **Impostazioni di Sistema ▸ Privacy e sicurezza**. Verso il fondo, accanto alla riga che dice che Onyou Office è stato bloccato, premi **Apri comunque** e inserisci la password del Mac. Il pulsante compare per circa un'ora dopo che hai provato ad aprire l'app.
4. Nella finestra che compare di nuovo, premi **Apri**. Da quel momento si apre senza avvisi.

Su macOS 12 il percorso è **Preferenze di Sistema ▸ Sicurezza e Privacy ▸ Generali**, e lì il pulsante è **Apri comunque**.

Se macOS dice che l'app non è supportata su questo Mac, controlla due cose:

- Un Mac Intel non può eseguire il file per Apple Silicon (`-arm64.dmg`). Controlla «Processore» in **Informazioni su questo Mac**, elimina l'app che hai installato e installa invece il file `-x64.dmg`.
- macOS 11 o precedente non può eseguire Onyou Office. **Informazioni su questo Mac** mostra anche la versione di macOS.

Sempre su un Mac:

- Le schede di connessione IA non hanno un pulsante di installazione. Segui il link alla guida ufficiale di installazione sulla scheda per installare Claude Code o Codex. L'app desktop di Claude non è Claude Code, quindi Claude Code va installato anche se l'app desktop è già presente.
- L'accesso si completa nel browser. Se il browser ti chiede di incollare un codice, esegui tu stesso `claude auth login` o `codex login` nel Terminale. Vedi [Connessione con abbonamento](help://subscription).

## Su Linux (beta)

- **AppImage**: rendilo eseguibile (`chmod +x OnyouOffice-<version>.AppImage`) e avvia il file. Non ci sono passaggi di installazione.
- **deb**: installa con `sudo apt install ./onyouoffice_<version>_amd64.deb`.
- **rpm**: installa con `sudo dnf install ./onyouoffice-<version>.x86_64.rpm`. Su openSUSE usa `sudo zypper install ./onyouoffice-<version>.x86_64.rpm`.

I pacchetti deb e rpm si installano in `/opt/Onyou Office` e collegano il comando da terminale `/usr/bin/onyouoffice`. Come su un Mac, le schede di connessione IA non hanno un pulsante di installazione e, quando un accesso chiede un codice, esegui tu stesso `claude auth login` o `codex login` in un terminale.

## Aggiornamenti

[pagina Releases](https://github.com/dodamworks/onyouoffice/releases/latest)

## La build che stai eseguendo

**Impostazioni ▸ Informazioni** è dove l'app riporta la versione che hai, il canale che segue e dove vive il progetto. Indica anche il progetto open source su cui si basa questa app.

## La riga di comando è inclusa

Ogni installazione include il comando `onyouoffice`, che comunica con gli stessi motori della finestra, così i due non si contraddicono mai su un file. `onyouoffice install-cli` lo mette sul tuo `PATH`. Vedi [Riga di comando e agenti](help://cli) per scoprire cosa può fare.
