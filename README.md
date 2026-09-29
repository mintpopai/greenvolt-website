# greenvolt-website

GreenVolt Connect Service 官网（Vue 3 + Vite 单页站点，另含独立的 `/legal` 法务页）。

## 本地开发

工具链与命令统一走 mise：

```bash
mise run install   # 安装依赖
mise run run       # 启动开发服务器 → http://localhost:6230
mise run preview   # 预览构建产物   → http://localhost:6231（先 mise run build）
mise run build     # 类型检查 + 生产构建到 dist/
mise run lint      # 类型检查
```

## 本地端口

本项目占用本机端口段 **6230–6239**：

| 端口 | 用途 |
|---|---|
| 6230 | Vite 开发服务器 |
| 6231 | Vite 本地预览（`vite preview`） |
| 6232–6239 | 预留 |

端口在 `vite.config.ts` 里写死并开启 `strictPort`：**端口被占用时报错退出，不允许自动换端口**。遇到冲突先用 `lsof -nP -iTCP:<端口> -sTCP:LISTEN` 找出占用进程再处理。

部署用的容器端口与 compose 宿主端口见 `docker-compose.yml`，与本地端口无关。

## 发版

```bash
mise run release "更新说明"   # patch+1，打 tag 推送，由 tag 触发 Release 工作流
```
