<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Cài đặt Onyou Office

[trang phát hành (Releases)](https://github.com/dodamworks/onyouoffice/releases/latest)

## Chọn tệp cho máy của bạn

| Nền tảng                               | Yêu cầu                                | Tệp                                |
| -------------------------------------- | -------------------------------------- | ---------------------------------- |
| **Windows**                            | Windows 10 trở lên, Intel/AMD 64-bit   | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (beta)**, Apple Silicon          | macOS 12 trở lên, chip M1 hoặc mới hơn | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (beta)**, Intel                  | macOS 12 trở lên, bộ xử lý Intel       | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (beta)**, bản phân phối bất kỳ | 64-bit (x86_64); glibc ≥ 2.35          | `OnyouOffice-<version>.AppImage`   |
| **Linux (beta)**, họ Ubuntu/Debian     | 64-bit (x86_64); glibc ≥ 2.35          | `onyouoffice_<version>_amd64.deb`  |
| **Linux (beta)**, Fedora/RHEL/openSUSE | 64-bit (x86_64); glibc ≥ 2.35          | `onyouoffice-<version>.x86_64.rpm` |

## Trên Windows

1. Tải `OnyouOffice-Setup-<version>.exe` về từ trang phát hành.
2. Chạy tệp đó. Trình cài đặt chưa được ký mã, nên trước tiên Windows có thể hiện một cửa sổ màu xanh "Windows đã bảo vệ PC của bạn". Chọn **Thông tin thêm**, rồi chọn **Vẫn chạy**. Câu chữ cụ thể tùy vào phiên bản Windows của bạn.
3. Làm theo trình cài đặt cho đến hết.

Nó đưa Onyou Office vào menu Start và đăng ký `.docx`, `.xlsx`, `.pptx`, `.pdf` cùng các định dạng tương tự, để nhấp đúp vào một tệp là mở được tệp đó.

Vì trình cài đặt chưa được ký, bạn chỉ nên chạy tệp đã tải về từ trang phát hành nói trên.

## Khi Windows chặn việc tải xuống hoặc cài đặt

### Edge báo tệp "isn't commonly downloaded"

Microsoft Defender SmartScreen cảnh báo như vậy với tệp mà nó chưa thấy nhiều người tải về. Hướng dẫn của Microsoft để giữ tệp như sau:

1. Mở danh sách tải xuống của Edge (**Ctrl+J**), nhấn **…** cạnh tệp rồi chọn **Keep**.
2. Trong cửa sổ hiện ra, nhấn **Show more**, rồi nhấn **Keep anyway**. Tệp sẽ được giữ trong thư mục Tải xuống của bạn.

Cửa sổ đó còn có một nút để báo cáo tệp là an toàn. Nút này chỉ mở trang báo cáo của Microsoft (`feedback.smartscreen.microsoft.com`) và không giữ tệp. Hãy đóng trang đó và nhấn **Show more** trong cửa sổ.

Nếu cửa sổ không có **Show more** hoặc không có **Keep anyway**:

- Trên PC do trường học hoặc công ty quản lý, quản trị viên có thể tắt khả năng bỏ qua các cảnh báo này (một chính sách của Edge). Khi đó không ai trên PC đó giữ được tệp; hãy nhờ quản trị viên cài đặt hoặc cho phép tệp.
- Tải từ trang phát hành bằng một trình duyệt khác cũng cho bạn đúng tệp đó.

### Cửa sổ "Windows đã bảo vệ PC của bạn" xuất hiện

Microsoft Defender SmartScreen hiện cửa sổ này lần đầu tiên nó thấy một trình cài đặt chưa được ký. Nhấn **Thông tin thêm** rồi nút **Vẫn chạy** sẽ xuất hiện. Trên PC do trường học hoặc công ty quản lý, một thiết lập của quản trị viên có thể ẩn nút đó; hãy hỏi quản trị viên.

## Trên Mac (beta)

Bạn cần macOS 12 (Monterey) trở lên. Bản Mac không có chữ ký nhà phát triển của Apple, nên lần đầu mở, macOS báo rằng không thể xác minh ứng dụng không chứa phần mềm độc hại và không mở nó. Bạn cho phép một lần, như dưới đây.

1. Mở tệp dmg và kéo `Onyou Office.app` vào thư mục **Ứng dụng**.
2. Mở Onyou Office từ thư mục Ứng dụng. Khi cảnh báo xuất hiện, nhấn **Xong**.
3. Mở **Cài đặt hệ thống ▸ Quyền riêng tư & Bảo mật**. Gần cuối trang, cạnh dòng cho biết Onyou Office đã bị chặn, nhấn **Vẫn mở** rồi nhập mật khẩu Mac của bạn. Nút này hiện trong khoảng một giờ sau khi bạn thử mở ứng dụng.
4. Trong cửa sổ hiện ra lần nữa, nhấn **Mở**. Từ đó trở đi ứng dụng mở mà không có cảnh báo.

Trên macOS 12, vị trí đó là **Tùy chọn hệ thống ▸ Bảo mật & Quyền riêng tư ▸ Cài đặt chung**, và nút ở đó là **Vẫn mở**.

Nếu macOS báo ứng dụng không được hỗ trợ trên máy Mac này, hãy kiểm tra hai điều:

- Máy Mac Intel không chạy được tệp dành cho Apple Silicon (`-arm64.dmg`). Hãy xem mục "Bộ xử lý" trong **Giới thiệu về máy Mac này**, xóa ứng dụng đã cài và cài tệp `-x64.dmg` thay vào.
- macOS 11 trở về trước không chạy được Onyou Office. **Giới thiệu về máy Mac này** cũng cho biết phiên bản macOS.

Ngoài ra trên Mac:

- Các thẻ kết nối AI không có nút cài đặt. Hãy theo liên kết hướng dẫn cài đặt chính thức trên thẻ để cài Claude Code hoặc Codex. Ứng dụng Claude cho máy tính không phải là Claude Code, nên vẫn phải cài Claude Code riêng dù đã có ứng dụng máy tính.
- Việc đăng nhập hoàn tất trong trình duyệt. Nếu trình duyệt yêu cầu bạn dán một mã, hãy tự chạy `claude auth login` hoặc `codex login` trong Terminal. Xem [Kết nối gói đăng ký](help://subscription).

## Trên Linux (beta)

- **AppImage**: cho tệp quyền thực thi (`chmod +x OnyouOffice-<version>.AppImage`) rồi chạy tệp đó. Không có bước cài đặt.
- **deb**: cài bằng `sudo apt install ./onyouoffice_<version>_amd64.deb`.
- **rpm**: cài bằng `sudo dnf install ./onyouoffice-<version>.x86_64.rpm`. Trên openSUSE, dùng `sudo zypper install ./onyouoffice-<version>.x86_64.rpm`.

Gói deb và rpm cài vào `/opt/Onyou Office` và liên kết lệnh terminal `/usr/bin/onyouoffice`. Giống như trên Mac, các thẻ kết nối AI không có nút cài đặt, và khi việc đăng nhập yêu cầu một mã, bạn tự chạy `claude auth login` hoặc `codex login` trong terminal.

## Cập nhật

[trang phát hành (Releases)](https://github.com/dodamworks/onyouoffice/releases/latest)

## Bản dựng bạn đang chạy

**Cài đặt ▸ Giới thiệu** là nơi ứng dụng báo bạn đang có phiên bản nào, đang theo kênh nào và dự án nằm ở đâu. Ở đó cũng ghi tên dự án nguồn mở mà ứng dụng này dựa trên.

## Dòng lệnh đi kèm luôn

Mọi bản cài đặt đều kèm lệnh `onyouoffice` nói chuyện với đúng những engine mà cửa sổ dùng, nên cả hai không bao giờ bất đồng về một tệp. `onyouoffice install-cli` đưa nó vào `PATH` của bạn. Xem [Dòng lệnh và tác nhân](help://cli) để biết nó làm được gì.
