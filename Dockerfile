# ---- 构建阶段：干净 slim 底座 + curl 装 mise；工具链版本只认根 mise.toml ----
FROM debian:13-slim AS build

# mise 自身版本在此钉死——自举工具无法由 mise.toml 管，这是本文件唯一允许钉的版本
ENV MISE_VERSION=v2026.6.0
ENV MISE_DATA_DIR=/mise MISE_CONFIG_DIR=/mise MISE_CACHE_DIR=/mise/cache \
    MISE_INSTALL_PATH=/usr/local/bin/mise PATH=/mise/shims:$PATH
# 关掉 mise run 跑 task 前的「自动装全部 [tools]」，保证本镜像只装所需工具
ENV MISE_TASK_RUN_AUTO_INSTALL=false

# libatomic1：pnpm 独立二进制运行时依赖，debian-slim 默认不带
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl git ca-certificates libatomic1 \
    && rm -rf /var/lib/apt/lists/* \
    && curl https://mise.run | sh

WORKDIR /app

# 工具链层：mise.toml 极少变动，单独成层
COPY mise.toml ./
RUN mise trust && mise install node pnpm

# 依赖层：只在依赖清单变化时失效，改源码不会重装 node_modules
COPY package.json pnpm-lock.yaml ./
RUN mise run install --frozen

# 源码层：安装/构建命令一律走 mise task，与本地、CI 单一来源
COPY . .
RUN mise run build

# ---- 运行阶段：nginx 只装静态产物，构建工具不进最终镜像 ----
FROM nginx:1.29-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
