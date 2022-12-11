## 提交之前  
**不能上传超过100MB的大文件！**  
### 初始化.gitignore  
配置.gitignore忽略不需要上传的文件  
```
# .gitignore模板
# frontend
frontend/node_modules

# backend
backend/backend/__pycache__/*.pyc
backend/backend/data/__pycache__/*.pyc
backend/backend/data/migrations/__pycache__/*.pyc

backend/data/dataFile/xgboost/XG_model2.json
```  

### 修改.gitignore  
.gitignore在第一次commit时生效，建议直接配置好，如果中途修改，先清空文件追踪  
`git rm -r --cached`    
之后正常提交代码即可  

## 提交  
**提交前建议查看本地与远程的差别**  
### 1. 文件追踪  
`git add .`  

### 2. 将文件从工作区添加到暂存区  
`git commit -m "修改描述"`

### 3. 上传至github
`git push origin master`  
master是分支名，有可能是main

## 远程同步  
`git pull orgin master`  

## 信息查看  
### 本地修改情况
`git status`     

### 远程与本地的差异  
`git diff`  

### 版本日志  
`git log`  
输入q退出  

## 代理软件配置  
```
# 端口号需查看自己的vpn，我的是7890
# 配置socks5代理
git config --global http.proxy socks5 127.0.0.1:7890
git config --global https.proxy socks5 127.0.0.1:7890

# 配置http代理
git config --global http.proxy 127.0.0.1:7890
git config --global https.proxy 127.0.0.1:7890
```  

## 不小心上传了大文件  
### 仅commit一次  
push失败之后没有进行其他操作，直接将对应的大文件从暂存区删除  
```
# 删除某个大文件
git rm --cached backend/data/big_file.json
# 删除某文件夹  
git rm -r --cached backend/data/big_file_folder/
```  
之后正常push到远端  
注意，这只是从暂存区删除，容易重蹈覆辙，记得及时更新.gitignore  

### commit多次  
push失败之后又commit多次, 导致本地领先远端多个版本  
使用git status查看状态:  
`Your branch is ahead of 'origin/master' by X commits.  `

此时要将每个版本的大文件都删除  
`git filter-branch --force --index-filter "git rm --cached --ignore-unmatch backend/data/big_file.json" --prune-empty  --tag-name-filter cat -- --all`  

之后正常push到远端