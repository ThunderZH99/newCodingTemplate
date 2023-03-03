## 目录
/ 根目录  
/home  
~ 当前用户目录(相当于/home/用户名/)

## 文件查看  
ls -h 或 lh 查看文件信息
ls -l 或 ll 查看文件权限


## 文件操作
mv file.txt file2.txt 重命名  
mv file.txt ../folder 将file.txt移动至../folder  
  
source 重新执行修改的文件  

bash 执行.sh文件

## 权限
sudo 以管理员身份执行
chmod +w file.txt 添加权限，w写r读x可执行
chmod -w file.txt 减少权限

## vim
i 输入  
esc 退出编辑模式  
:wq 保存并退出vim  

## 安装/卸载软件
apt install XXX  apt适用于Ubuntu
apt uninstall XXX  

## clash
./clash -d .  开启代理
