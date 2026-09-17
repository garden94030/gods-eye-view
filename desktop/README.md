# macOS 啟動器

`macos-app/` 是一個可雙擊的 macOS App bundle。它會：

1. 使用 Homebrew 的 Node 26 啟動本專案的 Vite 開發伺服器。
2. 綁定在本機 `127.0.0.1:4173`。
3. 伺服器就緒後，以預設瀏覽器開啟 God's Eye View。
4. App 會留在背景維持伺服器；結束 App 時伺服器也會停止。

介面預設顯示臺灣繁體中文；主畫面右上角的語言按鍵會在「繁體中文」與「English」兩種純語言介面間切換，不會同時陳列兩種文字。

App bundle 必須與專案根目錄維持相鄰位置；目前已放在專案根目錄的 `God's Eye View.app`。
若要暫時查看上游英文介面，可在網址後加上 `?lang=en`。
