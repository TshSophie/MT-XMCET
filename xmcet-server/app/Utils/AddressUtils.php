<?php

namespace App\Utils;

class AddressUtils
{
    private static $IP_URL = "http://whois.pconline.com.cn/ipJson.jsp?";

    static public function getRealAddressByIP(string $ip)
    {
      // 内网不查询
      if (self::internalIp($ip)) {
        return "内网IP";
      }
      // 查询
      $url = file_get_contents(self::$IP_URL . "ip=" . $ip . "&json=true");
      $data = json_decode($url,true);
      if($data) {
        return $data['addr'];
      } else {
        return 'XX XX';
      }
    }

    public static function internalIp(string $ip) {
        if("127.0.0.1" == $ip) {
            return true;
        }
        $ip = ip2long($ip);
        $net_a = ip2long('10.255.255.255') >> 24; //A类网预留ip的网络地址
        $net_b = ip2long('172.31.255.255') >> 20; //B类网预留ip的网络地址
        $net_c = ip2long('192.168.255.255') >> 16; //C类网预留ip的网络地址    
        return $ip >> 24 === $net_a || $ip >> 20 === $net_b || $ip >> 16 === $net_c;
    }

}