# 📝 待办事项清单应用

 

一个基于 Node.js 的轻量级待办事项管理应用，支持完整的增删改查功能。

## 🌟 核心功能

- **任务管理**  
  ✓ 添加新任务  
  ✓ 标记完成状态  
  ✓ 编辑任务内容  
  ✓ 删除任务  
- **数据持久化**  
  ✓ 自动保存到本地 JSON 文件  


## 🛠️ 技术栈

| 前端        | 后端         |
|------------|-------------|
| HTML5      | Node.js     |
| CSS3       | Express     |
| JavaScript | lowdb       |

## 🚀 快速开始

### 前置要求
- Node.js ≥ 14.x
- npm ≥ 6.x

### 安装步骤
```bash
# 1. 克隆仓库
git clone https://github.com/yourname/todo-app.git

# 2. 进入项目目录
cd todo-app/server

# 3. 安装依赖
npm install

# 4. 启动服务
node server.js
```

访问应用：http://localhost:3000

## 📂 项目结构
```
todo-app/
├── server/           # 后端代码
│   ├── server.js     # 服务端主逻辑
│   └── db.json       # 数据库文件(自动生成)
└── public/           # 前端资源
    ├── index.html    # 主页面
    ├── style.css     # 样式表
    └── script.js     # 交互逻辑
```

## 🔧 使用指南

### 添加任务
1. 在输入框填写任务内容
2. 点击「添加」按钮或按回车键

### 管理任务
- ✔️ 点击复选框标记完成  
- 🗑️ 点击「删除」按钮移除任务  
- ✏️ 双击任务文本可编辑 (示例功能，需自行实现)



