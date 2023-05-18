# 弹弹乐

## 快速开始

```bash
pnpm install
pnpm dev
```

## 注意事项

### 权限管理

编辑 `src\paid\index.ts` 新增直播间授权

### Bilibili 官方接口

为 `window.bilibiliCode` 赋值即可开启官方接口

### 代理

如果使用的野生 ws 接口的话，修改 `api\proxy\ajax.ts` 的相关配置即可设置获取头像的代理，不然如果人太多就会被 啊 B 暂时 ban 掉
