<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Onyou Office इंस्टॉल करना

[Releases पेज](https://github.com/dodamworks/onyouoffice/releases/latest)

## अपने मशीन के लिए फ़ाइल चुनें

| प्लेटफ़ॉर्म                             | आवश्यकताएँ                          | फ़ाइल                              |
| --------------------------------------- | ----------------------------------- | ---------------------------------- |
| **Windows**                             | Windows 10 या नया, 64-बिट Intel/AMD | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (बीटा)**, Apple Silicon           | macOS 12 या नया, M1 या नई चिप       | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (बीटा)**, Intel                   | macOS 12 या नया, Intel प्रोसेसर     | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (बीटा)**, कोई भी डिस्ट्रीब्यूशन | 64-बिट (x86_64); glibc ≥ 2.35       | `OnyouOffice-<version>.AppImage`   |
| **Linux (बीटा)**, Ubuntu/Debian परिवार  | 64-बिट (x86_64); glibc ≥ 2.35       | `onyouoffice_<version>_amd64.deb`  |
| **Linux (बीटा)**, Fedora/RHEL/openSUSE  | 64-बिट (x86_64); glibc ≥ 2.35       | `onyouoffice-<version>.x86_64.rpm` |

## Windows पर

1. Releases पेज से `OnyouOffice-Setup-<version>.exe` डाउनलोड करें।
2. उसे चलाएँ। इंस्टॉलर कोड-साइन नहीं किया गया है, इसलिए Windows पहले नीली "Windows protected your PC" विंडो दिखा सकता है। **More info** चुनें, फिर **Run anyway**। सटीक शब्द आपके Windows संस्करण पर निर्भर करते हैं।
3. इंस्टॉलर के निर्देशों का अंत तक पालन करें।

यह Onyou Office को Start मेन्यू में रखता है और `.docx`, `.xlsx`, `.pptx`, `.pdf` तथा इन्हीं जैसे प्रकार पंजीकृत कर देता है, ताकि किसी फ़ाइल पर डबल-क्लिक उसे खोल दे।

चूँकि इंस्टॉलर साइन नहीं किया गया है, केवल वही इंस्टॉलर चलाएँ जो आपने ऊपर बताए Releases पेज से डाउनलोड किया हो।

## जब Windows डाउनलोड या इंस्टॉल रोक दे

### Edge कहता है कि फ़ाइल "आमतौर पर डाउनलोड नहीं की जाती"

Microsoft Defender SmartScreen ऐसी फ़ाइल के बारे में इसी तरह चेतावनी देता है जिसे उसने ज़्यादा लोगों को डाउनलोड करते नहीं देखा। फ़ाइल रखने के लिए Microsoft का मार्गदर्शन यह है:

1. Edge की डाउनलोड सूची खोलें (**Ctrl+J**), फ़ाइल के बगल में **…** दबाएँ और **Keep** चुनें।
2. जो विंडो खुले, उसमें **Show more** दबाएँ, फिर **Keep anyway**। फ़ाइल आपके Downloads फ़ोल्डर में बनी रहती है।

उस विंडो में एक ऐसा बटन भी है जो फ़ाइल को सुरक्षित बताकर रिपोर्ट करता है। वह केवल Microsoft का रिपोर्ट पेज (`feedback.smartscreen.microsoft.com`) खोलता है और फ़ाइल नहीं रखता। उस पेज को बंद करें और इसके बजाय विंडो में **Show more** दबाएँ।

अगर विंडो में **Show more** या **Keep anyway** नहीं है:

- जिस PC का प्रबंधन कोई स्कूल या कंपनी करती है, उस पर व्यवस्थापक इन चेतावनियों को छोड़ने का विकल्प बंद कर सकता है (Edge नीति)। तब उस PC पर कोई भी फ़ाइल नहीं रख सकता; व्यवस्थापक से इसे इंस्टॉल करने या अनुमति देने के लिए कहें।
- किसी दूसरे ब्राउज़र में Releases पेज से डाउनलोड करने पर भी वही फ़ाइल मिलती है।

### "Windows protected your PC" विंडो दिखती है

Microsoft Defender SmartScreen यह विंडो तब दिखाता है जब वह पहली बार कोई बिना साइन किया इंस्टॉलर देखता है। **More info** दबाएँ और **Run anyway** बटन दिखाई देगा। जिस PC का प्रबंधन कोई स्कूल या कंपनी करती है, उस पर व्यवस्थापक की कोई सेटिंग यह बटन छिपा सकती है; व्यवस्थापक से पूछें।

## Mac पर (बीटा)

आपको macOS 12 (Monterey) या नया चाहिए। Mac बिल्ड पर Apple डेवलपर का हस्ताक्षर नहीं है, इसलिए पहली बार खोलने पर macOS कहता है कि वह सत्यापित नहीं कर सकता कि ऐप में मैलवेयर नहीं है, और उसे नहीं खोलता। नीचे बताए अनुसार एक बार अनुमति दें।

1. dmg खोलें और `Onyou Office.app` को **Applications** फ़ोल्डर में खींच दें।
2. Applications फ़ोल्डर से Onyou Office खोलें। चेतावनी दिखे तो **Done** दबाएँ।
3. **System Settings ▸ Privacy & Security** खोलें। नीचे की ओर, Onyou Office के रोके जाने वाली पंक्ति के बगल में **Open Anyway** दबाएँ और अपना Mac पासवर्ड डालें। ऐप खोलने की कोशिश के बाद लगभग एक घंटे तक यह बटन दिखता है।
4. जो विंडो फिर दिखे, उसमें **Open** दबाएँ। इसके बाद वह बिना चेतावनी के खुलता है।

macOS 12 पर यह जगह **System Preferences ▸ Security & Privacy ▸ General** है, और वहाँ बटन **Open Anyway** है।

अगर macOS कहे कि ऐप इस Mac पर समर्थित नहीं है, तो दो बातें जाँचें:

- Intel Mac पर Apple Silicon फ़ाइल (`-arm64.dmg`) नहीं चलती। **About This Mac** में "Processor" देखें, इंस्टॉल किया गया ऐप हटाएँ, और उसकी जगह `-x64.dmg` फ़ाइल इंस्टॉल करें।
- macOS 11 या उससे पुराने संस्करण पर Onyou Office नहीं चलता। **About This Mac** में macOS संस्करण भी दिखता है।

Mac पर यह भी:

- AI कनेक्शन कार्डों में इंस्टॉल बटन नहीं है। Claude Code या Codex इंस्टॉल करने के लिए कार्ड पर दिए आधिकारिक इंस्टॉल गाइड के लिंक का पालन करें।
- साइन-इन ब्राउज़र में पूरा होता है। अगर ब्राउज़र कोई कोड चिपकाने को कहे, तो Terminal में खुद `claude auth login` या `codex login` चलाएँ। देखें [सदस्यता कनेक्शन](help://subscription)।

## Linux पर (बीटा)

- **AppImage**: उसे एक्ज़ीक्यूटेबल बनाएँ (`chmod +x OnyouOffice-<version>.AppImage`) और फ़ाइल चलाएँ। इंस्टॉल का कोई चरण नहीं है।
- **deb**: `sudo apt install ./onyouoffice_<version>_amd64.deb` से इंस्टॉल करें।
- **rpm**: `sudo dnf install ./onyouoffice-<version>.x86_64.rpm` से इंस्टॉल करें। openSUSE पर `sudo zypper install ./onyouoffice-<version>.x86_64.rpm` का उपयोग करें।

deb और rpm पैकेज `/opt/Onyou Office` में इंस्टॉल होते हैं और टर्मिनल कमांड `/usr/bin/onyouoffice` को जोड़ देते हैं। Mac की तरह, AI कनेक्शन कार्डों में इंस्टॉल बटन नहीं है, और जब साइन-इन कोई कोड माँगे तो आप टर्मिनल में खुद `claude auth login` या `codex login` चलाते हैं।

## अपडेट

[Releases पेज](https://github.com/dodamworks/onyouoffice/releases/latest)

## जिस बिल्ड को आप चला रहे हैं

**सेटिंग्स ▸ जानकारी** वही जगह है जहाँ ऐप बताता है कि आपके पास कौन-सा संस्करण है, वह कौन-सा चैनल अपनाता है और प्रोजेक्ट कहाँ रहता है। यहाँ उस ओपन-सोर्स प्रोजेक्ट का नाम भी लिखा है जिस पर यह ऐप आधारित है।

## कमांड लाइन भी साथ आती है

हर इंस्टॉल में `onyouoffice` कमांड रहती है जो उसी इंजनों से बात करती है जिन्हें विंडो इस्तेमाल करती है, इसलिए दोनों किसी फ़ाइल पर कभी असहमत नहीं होतीं। `onyouoffice install-cli` इसे आपके `PATH` में रख देती है। यह क्या कर सकती है, इसके लिए [कमांड लाइन और एजेंट](help://cli) देखें।
