
$(function(){

    /**
     * 回调函数必须提供 init(tableId, result.list)方法
     * tableId ，用来显示的div的id
     * result.list 列表的json数组
     * */
    var displayFunc  = (function(){

        var renderList = function(tableId,listData){
            var $tableWrap = $('#' + tableId);

            if(listData && listData.length){

                var $ulTitle = createTableTitle();
                var $ulData = $('<ul></ul>').addClass('flex-table');
                $tableWrap.append($ulTitle).append($ulData);

                $.each(listData,function(i, v){
                    var $liLine = creatLine(i, v, i == listData.length - 1);

                    $liLine.appendTo($ulTitle);
                });
            }
        };


        var createTableTitle = function(){

            var $ulTitle = $('<ul></ul>').addClass('flex-table');
            var $liTitle = $('<li></li>').addClass('line table-title');

            var $indexWrap = $('<div></div>').addClass('line-wrap order').html($('<div></div>').addClass('cell index'));
            var $contentWrap = $('<div></div>').addClass('line-wrap  content col13');

            var titleName = '订单编号,楼盘地址,客户名,余额,设计部,设计师,业务部,业务员,面积,合同报价,量房时间,签单时间,状态';

            $.each(titleName.split(','), function (i, v) {
                var $cell = $('<div></div>').addClass('cell').html(v);
                $cell.appendTo($contentWrap);
            });

            var $optionWrap = $('<div></div>').addClass('line-wrap action').html($('<div>操作</div>').addClass('cell option'));

            $liTitle.append($indexWrap)
                .append($contentWrap)
                .append($optionWrap)
                .appendTo($ulTitle);

            return $ulTitle;
        };

        var creatLine = function(i, v, lastFlag){




            var $liLine = $('<li></li>').addClass('line');

            var $indexWrap = $('<div></div>').addClass('line-wrap order').html($('<div></div>').addClass('cell index').html(i + 1));
            var $contentWrap = $('<div></div>').addClass('line-wrap  content col13');

            var propertyArr = [
                v.orderId,
                v.village.cityProper.cityProperName + v.village.villageName + " " + v.houseNumber,
                v.customer.customerName,
                v.customer.balance,
                v.designDepartment,
                v.designer,
                v.businessDepartment,
                v.salesman,
                v.houseArea,
                v.orderTotalPrice,
                v.createTime,
                v.contractTime,
                v.status,
            ];


            $.each(propertyArr, function (i, v) {
                var $cell = $('<div></div>').addClass('cell').html(v);
                $cell.appendTo($contentWrap);
            });

            var $optionWrap = $('<div></div>').addClass('line-wrap action');
            var $cellOption = $('<div></div>').addClass('cell option');

            var $btnGroup = $('<div></div>').addClass('btn-group');
            var $btn = $('<button></button>').addClass('btn blue dropdown-toggle').attr('data-toggle','dropdown').append('操作').append('<i class="icon-angle-down"></i>');
            var $btnUl = $('<ul></ul>').addClass('dropdown-menu').addClass(lastFlag ? 'bottom-up' : '');


            var $btnView = $('<li></li>').append($('<a></a>').html('查看')) ;
            var $btnReturnVisit = $('<li></li>').append($('<a></a>').html('回访')) ;
            var $btnLine = $('<li></li>').append($('<a></a>').html('放线')) ;
            var $btnQuotation = $('<li></li>').append($('<a></a>').html('报价')) ;
            var $btnContract = $('<li></li>').append($('<a></a>').html('合同')) ;

            $btnUl
                .append($btnView)
                .append($btnReturnVisit)
                .append($btnLine)
                .append($btnQuotation)
                .append($btnContract);

            $btnGroup
                .append($btn)
                .append($btnUl)
                .appendTo($cellOption);

            $cellOption.appendTo($optionWrap);

            $liLine.append($indexWrap)
                .append($contentWrap)
                .append($optionWrap);


            return $liLine;

        };

        return {
            init : function(tableId,listData){
                $('#' + tableId).html(null);
                renderList(tableId,listData);

            },
            drawLine : function(v){
                return creatLine(v);
            }
        }
    })();


    var _condArr = ['orderId', 'village', 'houseNumber', 'houseArea', 'customerPhone', 'designer','designerRegionId'];

    var quotationVersionSeacher = new Searcher();

    quotationVersionSeacher.init( _condArr, "condList", api.decoration.pageDecorationOrderForDesigner, function(data){
        displayFunc.init('resultList', data);
    }, "pagenation", "quotationVersionPostData", null, false, null, function(){

        var $adda = $('<a></a>').addClass('btn mini pull-left').attr('name', 'addQuotationVersion').css('margin-top', '7px');
        var $addi = $('<i></i>').addClass('icon-plus bigger-110').appendTo($adda);
        var $addspan = $('<span></span>').text('添加').appendTo($adda);

        return [$adda];
    },'resultList');

});
