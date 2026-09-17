# God's Eye View：Intel Portal 分頁交接包

此資料夾是給另一個 agent 整合至 `intel-portal.garden94030.workers.dev` 的靜態分頁交接包。

## 內容

- `dist/`：由目前專案 `npm run build` 產生的 Vite 靜態產物。
- `manifest.json`：語言、入口與整合邊界的機器可讀資訊。

## 目前行為

- 原始碼維持英文；繁體中文是執行期外掛，不改寫上游英文文案。
- 未帶語言參數時，介面預設為臺灣繁體中文 `zh-Hant-TW`。
- 主畫面右上角提供單一按鍵：繁中模式顯示 `切換至英文介面`，英文模式顯示 `Switch to Traditional Chinese`。
- `?lang=en` 直接啟用純英文模式；切換會保留目前 URL/hash 並重新載入，避免殘留上一種語言的動態節點。
- HTML 標示 `translate="no"`，避免 Safari／翻譯擴充功能再疊加第二層雙語文字。
- 太空任務的「重播升空」按鍵會在使用者點擊手勢中啟動 Web Audio 合成音效，包含倒數、升空提示與持續引擎聲；暫停、繼續及取消會同步控制音效。
- 供應商名稱、專有名詞、座標格式、單位及技術縮寫（例如 CelesTrak、USGS、MGRS、GSD、NIIRS、AIS）依資料來源保留原樣；這不是中英對照 UI。
- 手機窄螢幕（`max-width: 720px`）採觸控優先布局：上方相機控制與語言切換分離、左右控制欄各自限制高度並可獨立捲動、底部語音／位置／預設控制列改為全寬安全區布局。
- 手機主要操作按鈕至少保留約 44px 觸控尺寸；底部控制列與 Cesium attribution 以 safe-area inset 留出間距，避免被瀏海或瀏覽器底部工具列遮擋。

## 建議整合方式

另一個 agent 可將 `dist/` 納入 portal 的 public asset namespace，並將下列路由之一指向 `dist/index.html`：

- `/gods-eye-view`
- `/apps/gods-eye-view`

若使用 Cloudflare Worker，需同時處理 Vite 產物中的 `/assets/*` 靜態檔案路由與 SPA fallback；不能只掛單一 HTML 檔案。

## 尚需由 portal agent 核定的邊界

這個交接包只包含前端靜態產物，不代表公開站點已部署或所有資料來源已可由 portal 使用。專案原本的即時資料與地圖服務仍可能需要：

- Worker 端 API proxy、CORS 與 rate limit 設計。
- Cesium／Google Maps 等供應商金鑰的來源限制與秘密注入；不得把伺服器金鑰寫入 public asset。
- 公開頁面所需的認證、快取、錯誤回應及第三方服務授權審查。

因此，另一個 agent 應分開驗收「靜態分頁讀回」與「即時資料來源可用性」，不可用 `wrangler deploy --dry-run` 或單一 HTTP 200 代替端到端完成證據。

## 建議驗收

1. 靜態檔案路徑、`index.html`、`assets/` 與 SPA fallback 均可讀回。
2. 預設頁面顯示純繁中，按鈕可切換至 `?lang=en` 純英文。
3. 重新載入後不出現中英重疊文字。
4. portal 的 API／金鑰／CORS／rate limit 另以正式測試驗收。
5. 以 390×844 與 375×812 讀回手機版：確認語言切換不與相機按鈕碰撞、側欄內容可捲動、底部語音控制完整可見且 attribution 未被控制列蓋住。

## 2026-09-17 手機閱讀與互動修補

- 修改 `src/ui/styles/responsive.css`：增加窄螢幕側欄的獨立 scroll lane、內容高度上限、觸控尺寸與 safe-area 間距。
- 修改 `src/ui/styles/first-run.css`：手機首次啟動卡片改用左右安全邊距、動態高度與底部安全區，不再以固定中心平移造成窄螢幕溢出。
- 修改 `style.css`：補上最後 cascade 的手機覆寫，確保 compact command dock 不會覆蓋全寬底部控制列與語言按鈕尺寸。
- 驗證：`npm run build` 成功、`npm run check:boundaries` 成功、繁中／Panel Rails 16 項 targeted tests 全數通過；本機 Puppeteer 390×844 讀回確認主要控制區矩形均落在 viewport 內。
- 尚未部署 `intel-portal`；Portal 仍需另行驗收靜態資產路徑、SPA fallback、API proxy、CORS、rate limit 與 provider key。

本包未替 portal 執行部署、Git push 或公開站點變更。
