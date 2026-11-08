<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Instalación de Onyou Office

[página de versiones](https://github.com/dodamworks/onyouoffice/releases/latest)

## Elija el archivo para su equipo

| Plataforma                               | Requisitos                                   | Archivo                            |
| ---------------------------------------- | -------------------------------------------- | ---------------------------------- |
| **Windows**                              | Windows 10 o posterior, Intel/AMD de 64 bits | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (beta)**, Apple Silicon            | macOS 12 o posterior, chip M1 o más reciente | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (beta)**, Intel                    | macOS 12 o posterior, procesador Intel       | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (beta)**, cualquier distribución | 64 bits (x86_64); glibc ≥ 2.35               | `OnyouOffice-<version>.AppImage`   |
| **Linux (beta)**, familia Ubuntu/Debian  | 64 bits (x86_64); glibc ≥ 2.35               | `onyouoffice_<version>_amd64.deb`  |
| **Linux (beta)**, Fedora/RHEL/openSUSE   | 64 bits (x86_64); glibc ≥ 2.35               | `onyouoffice-<version>.x86_64.rpm` |

## En Windows

1. Descargue `OnyouOffice-Setup-<version>.exe` desde la página de versiones.
2. Ejecútelo. El instalador no está firmado digitalmente, así que Windows puede mostrar primero una ventana azul «Windows protegió su PC». Elija **Más información** y después **Ejecutar de todas formas**. El texto exacto depende de su versión de Windows.
3. Siga el instalador hasta el final.

Coloca Onyou Office en el menú Inicio y registra `.docx`, `.xlsx`, `.pptx`, `.pdf` y formatos similares como aplicaciones predeterminadas, de modo que al hacer doble clic en un archivo este se abra en Onyou Office.

Como el instalador no está firmado, ejecute solo uno que haya descargado de la página de versiones indicada arriba.

## Cuando Windows bloquea la descarga o la instalación

### Edge dice que el archivo «no se descarga habitualmente»

Microsoft Defender SmartScreen avisa así de un archivo que no ha visto descargar a mucha gente. La guía de Microsoft para conservar el archivo es esta:

1. Abra la lista de descargas de Edge (**Ctrl+J**), pulse **…** junto al archivo y elija **Conservar**.
2. En la ventana que se abre, pulse **Mostrar más** y después **Conservar de todos modos**. El archivo se queda en su carpeta Descargas.

Esa ventana también tiene un botón que informa de que el archivo es seguro. Solo abre la página de informes de Microsoft (`feedback.smartscreen.microsoft.com`) y no conserva el archivo. Cierre esa página y pulse **Mostrar más** en la ventana.

Si la ventana no tiene **Mostrar más** o no tiene **Conservar de todos modos**:

- En un PC que administra un centro educativo o una empresa, el administrador puede impedir que se omitan estas advertencias (una directiva de Edge). Entonces nadie en ese PC puede conservar el archivo; pida al administrador que lo instale o que lo permita.
- Si descarga desde la página de versiones con otro navegador, obtiene el mismo archivo.

### Aparece una ventana «Windows protegió su PC»

Microsoft Defender SmartScreen muestra esta ventana la primera vez que ve un instalador sin firmar. Pulse **Más información** y aparece un botón **Ejecutar de todas formas**. En un PC que administra un centro educativo o una empresa, una configuración del administrador puede ocultar ese botón; consulte al administrador.

## En un Mac (beta)

Necesita macOS 12 (Monterey) o posterior. La versión para Mac no tiene firma de desarrollador de Apple, así que la primera vez que la abre macOS dice que no puede verificar que la aplicación no contenga malware y no la abre. Permítala una sola vez, como se indica a continuación.

1. Abra el dmg y arrastre `Onyou Office.app` a la carpeta **Aplicaciones**.
2. Abra Onyou Office desde la carpeta Aplicaciones. Cuando aparezca la advertencia, pulse **Listo**.
3. Abra **Ajustes del Sistema ▸ Privacidad y seguridad**. Hacia el final, junto a la línea que dice que Onyou Office se bloqueó, pulse **Abrir igualmente** e introduzca la contraseña de su Mac. El botón aparece durante aproximadamente una hora después de intentar abrir la aplicación.
4. En la ventana que vuelve a aparecer, pulse **Abrir**. A partir de entonces se abre sin advertencia.

En macOS 12 el lugar es **Preferencias del Sistema ▸ Seguridad y privacidad ▸ General**, y allí el botón es **Abrir igualmente**.

Si macOS dice que la aplicación no es compatible con este Mac, compruebe dos cosas:

- Un Mac con Intel no puede ejecutar el archivo para Apple Silicon (`-arm64.dmg`). Mire «Procesador» en **Acerca de este Mac**, elimine la aplicación que instaló e instale en su lugar el archivo `-x64.dmg`.
- macOS 11 o anterior no puede ejecutar Onyou Office. **Acerca de este Mac** también muestra la versión de macOS.

También en un Mac:

- Las tarjetas de conexión de IA no tienen botón de instalación. Siga el enlace a la guía oficial de instalación que aparece en la tarjeta para instalar Claude Code o Codex.
- El inicio de sesión termina en el navegador. Si el navegador le pide pegar un código, ejecute usted mismo `claude auth login` o `codex login` en Terminal. Vea [Conexión por suscripción](help://subscription).

## En Linux (beta)

- **AppImage**: hágalo ejecutable (`chmod +x OnyouOffice-<version>.AppImage`) y ejecute el archivo. No hay paso de instalación.
- **deb**: instálelo con `sudo apt install ./onyouoffice_<version>_amd64.deb`.
- **rpm**: instálelo con `sudo dnf install ./onyouoffice-<version>.x86_64.rpm`. En openSUSE, use `sudo zypper install ./onyouoffice-<version>.x86_64.rpm`.

Los paquetes deb y rpm se instalan en `/opt/Onyou Office` y enlazan el comando de terminal `/usr/bin/onyouoffice`. Igual que en un Mac, las tarjetas de conexión de IA no tienen botón de instalación y, cuando un inicio de sesión pide un código, usted mismo ejecuta `claude auth login` o `codex login` en una terminal.

## Actualizaciones

[página de versiones](https://github.com/dodamworks/onyouoffice/releases/latest)

## La compilación que está ejecutando

**Configuración ▸ Acerca de** es donde la aplicación informa de la versión que tiene, del canal que sigue y de dónde vive el proyecto. También nombra el proyecto de código abierto en el que se basa esta aplicación.

## La línea de comandos viene incluida

Cada instalación trae un comando `onyouoffice` que habla con los mismos motores que la ventana, de modo que ambos nunca discrepan sobre un archivo. `onyouoffice install-cli` lo pone en su `PATH`. Vea [Línea de comandos y agentes](help://cli) para saber qué puede hacer.
