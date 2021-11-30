## 开发模式
- 安装类库、包

在项目根目录下执行命令：
```shell
composer install
```

- 设置应用的`APP_KEY`

在项目根目录下执行命令：
```
php artisan key：generate
```

- 修改配置文件

修改项目根目录下的.env文件（没有就复制一份.env.example并改名为.env），以下项根据你的实际情况进行设置
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=admin
DB_USERNAME=root
DB_PASSWORD=123456
```

- 映射公共磁盘文件夹

在项目根目录下执行命令：
```shell
php artisan storage:link
```

- 开发模式下运行项目

在项目根目录下执行命令：
```shell
php artisan serve
```

## 部署到nginx服务器
修改nginx.conf文件
```
# 配置要代理的服务器信息    
    server{
    	# 要监听的端口
    	listen	80;
    	# 域名
    	server_name www.domain.com;

    	location / {
            # 填写项目文件位置
            root   D:/www/admin/public;
            index  index.html index.htm index.php;
            if (-f $request_filename/index.html){
                   rewrite (.*) $1/index.html break;
            }
            if (!-e $request_filename) {
                    rewrite  ^(.*)$  /index.php?s=/$1  last;
             }
    	}
        # 解析php
        location ~ \.php$ {
            # 填写项目文件位置
            root   D:/www/admin/public;
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;#$document_root是root的值
            include        fastcgi_params;
        }
    }
```