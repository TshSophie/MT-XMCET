<?php

return [
    'app_id'=>'wx09dbd04785c5028a',
    'app_secret'=>'17d7b8e206889c7dec8e08827a90cd77',
    'login_url'=>"https://api.weixin.qq.com/sns/jscode2session?".
        "appid=%s&secret=%s&js_code=%s&grant_type=authorization_code",
    // token超时设置
    'token_expire_in' => 60 * 60 * 3
];