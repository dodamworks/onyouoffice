<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>Bộ ứng dụng văn phòng cùng tác nhân AI, dành cho bạn.</strong></p>

<p align="center">
  <a href="../../../LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-2456FF" alt="License: Apache-2.0"></a>
  <a href="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml"><img src="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI on main"></a>
  <a href="https://github.com/dodamworks/onyouoffice/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/onyouoffice?style=flat&amp;label=GitHub%20stars&amp;color=2456FF" alt="GitHub stars"></a>
</p>

Mở tài liệu, mô tả điều muốn thay đổi rồi tiếp tục trong cùng cửa sổ. Onyou Office kết hợp trình soạn thảo tài liệu và tác nhân AI trên máy tính. Dùng AI để viết nháp, chỉnh sửa hoặc tự biên tập. Ứng dụng miễn phí, mã nguồn mở; AI là tùy chọn.

<details>
<summary>Chọn ngôn ngữ · 21 ngôn ngữ</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · **Tiếng Việt** · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## Mọi tài liệu trong một không gian

- Chỉnh sửa sơ đồ draw.io và nhập tệp Visio (.vsdx) thành sơ đồ mới ngay trên máy tính.
- Tạo và chỉnh sửa văn bản, bảng tính, bản trình chiếu và Hangul (HWP/HWPX). Cũng hỗ trợ PDF, Markdown, HTML, sơ đồ tư duy và EPUB. Khả năng chỉnh sửa và chuyển đổi tùy định dạng.
- Yêu cầu trợ lý AI sửa tài liệu, hỏi về tài liệu đã chọn trong Knowledge Vault và tập hợp chỉ dẫn, bộ nhớ, tệp cùng hội thoại theo dự án.
- 21 ngôn ngữ giao diện, chủ đề sáng/tối và cỡ chữ trò chuyện AI có thể điều chỉnh. Onyou Office cải tiến hướng dẫn ban đầu, trang chủ, bảng AI, dự án và Knowledge Vault, với thương hiệu cùng đường dẫn cài đặt và dữ liệu riêng.

## Bắt đầu

Tải bộ cài từ [Releases](https://github.com/dodamworks/onyouoffice/releases/latest): Windows x64, macOS (Apple Silicon và Intel, beta) và Linux x64 (beta). Hiện cần cập nhật thủ công. Để dựng từ mã nguồn, cần Node.js 24, npm, Rust (`cargo`) và công cụ dựng gốc của nền tảng.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

Mở tệp hoặc tạo tài liệu từ trang chủ. Để dùng AI, chọn kết nối trong **Cài đặt → AI**, rồi nhập yêu cầu vào trợ lý của tài liệu.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## AI, chi phí và dữ liệu

Chỉnh sửa không cần tài khoản AI. Gói thuê bao, phí API và giới hạn tuân theo nhà cung cấp. Codex, Claude, đăng nhập ChatGPT trực tiếp, OpenRouter, Gemini, khóa API và AI cục bộ có yêu cầu và mức sẵn có khác nhau. Nội dung liên quan, tệp đính kèm và hội thoại được gửi đến nhà cung cấp đã chọn. Bản phát triển và bản cài dùng thư mục dữ liệu riêng.

[Privacy](../../../PRIVACY.md)

Đã xác minh câu hỏi và hội thoại tiếp nối trong Knowledge Vault qua chương trình Codex chính thức. Đăng nhập ChatGPT trực tiếp còn lỗi đồng ý của nhà cung cấp. Không bảo đảm hiển thị giống hệt hay tương thích hoàn toàn với ứng dụng khác.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## Hỗ trợ và đóng góp

Hoan nghênh báo lỗi, đề xuất, bản dịch và mã. Dùng ví dụ tổng hợp; không đăng tài liệu cá nhân, khóa hay thông tin tài khoản. Câu hỏi khác: **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## Giấy phép và nguồn gốc

Onyou Office là nhánh độc lập của IeumOffice, dựa trên GenOffice. Công cụ tài liệu và nhiều chức năng đến từ các dự án này, rhwp và cộng tác viên nguồn mở. Chúng tôi giữ thông tin nguồn gốc, ghi nhận tác giả và không nhận mọi chức năng kế thừa là tự phát triển. Mã dùng Apache-2.0; thành phần bên thứ ba giữ điều khoản riêng. Quyền nhãn hiệu tách biệt. Không tuyên bố liên kết hay được các dự án gốc hoặc nhà cung cấp bảo trợ.

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
