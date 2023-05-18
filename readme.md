# 弹弹乐

曾风靡一时的弹幕互动游戏，内置的皮肤有：

- "default" 四色大战
- "fiveColor", 五色大战
- "threeKingDom", 三国大战
- "jiangHu", 江湖传说
- "redAlert", 红色警戒
- "minecraft", 我的世界 带贴图
- "war3", 魔兽争霸 带贴图、兵种
- "sevenKingDom7", 七国争霸
- "warOfFiveDynasties", 五朝之争

以上都可以按空格自定义颜色、名称等

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
