# Unix(Linux、MacOS)文件权限体系
```
// bin: rwxr-xr-x
// package.json: rw-r--r--
```

### 如何查看
- 一般三个字符为一组
```
//rwxr-xr-x 
// rwx r-x r-x 
```
- 每个字母的意思
```
// r: 访问
// w: 编辑
// x: 执行
```

- 每组对应不同的角色
```
// u｜g｜o
// u：当前登陆用户
// g：当前登陆用户所在分组
// o：其他用户
```
- 文件权限操作
```
// 访问（阅读）该文件
$ vim package.json

// 删除当前用户对该文件的访问权限
$ chmod -r package.json

// 增加当前用户对该文件的访问权限
$ chmod +r package.json
```
