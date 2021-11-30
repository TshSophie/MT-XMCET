<?php
 
namespace App\Exports\System;
 
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Events\AfterSheet;
class SysUserExport implements FromArray, WithHeadings,WithEvents, WithStrictNullComparison, ShouldAutoSize
{
    protected $list;
 
    public function __construct(array $list)
    {
        $data = [];
        for($i = 0; $i < count($list); $i++) {
            $item = $list[$i];
            $data[] = [
                $item['id'],
                $item['user_name'],
                $item['nick_name'],
                $item['dept']['dept_name'],
                $item['attributes'],
                $item['phonenumber'],
                $item['status'] == '1' ? '停用' : '正常',
                $item['create_time'],
            ];
        }
        $this->list = $data;
    }
 
    public function array(): array
    {
        // TODO: Implement array() method.
        return $this->list;
    }

    public function headings(): array
    {
        return ['用户编号','用户名称','用户昵称','部门','属性','手机号码','状态','创建时间'];
    }

    /**
     * 注册事件
     * @return array
     */
    public function registerEvents(): array
    {
        $sheetEventFunc = function(AfterSheet $event){
            //设置作者
            // $event->writer->setCreator('sophie'); //writer属性现在好像有点问题。。。
            //设置列宽
            $event->sheet->getDelegate()->getColumnDimension('A')->setWidth(80);
            $event->sheet->getDelegate()->getColumnDimension('E')->setWidth(250);
            //设置区域单元格垂直居中
            $event->sheet->getDelegate()->getStyle('A1:Z1265')->getAlignment()->setVertical('center');
            //设置区域单元格水平居中
            $event->sheet->getDelegate()->getStyle('A1:Z1265')->getAlignment()->setHorizontal('center');
            //设置区域单元格字体、颜色、背景等，其他设置请查看 applyFromArray 方法，提供了注释
            $event->sheet->getDelegate()->getStyle('A1:H1')->applyFromArray([
                'font' => [
                    'name' => 'Arial',
                    'bold' => true,
                    'italic' => false,
                    'strikethrough' => false,
                    'color' => [
                        'rgb' => 'FFFFFF'
                    ]
                ],
                'fill' => [
                    'fillType' => 'linear', //线性填充，类似渐变
                    'rotation' => 45, //渐变角度
                    'startColor' => [
                        'rgb' => '54AE54' //初始颜色
                    ],
                    //结束颜色，如果需要单一背景色，请和初始颜色保持一致
                    'endColor' => [
                        'argb' => '54AE54'
                    ]
                ]
            ]);
            // 合并单元格　
            // $event->sheet->getDelegate()->mergeCells('A1:B1');  
        };

        return [
            AfterSheet::class => $sheetEventFunc
        ];
    } 


 
}
