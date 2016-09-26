
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
                $.each(listData,function(i, v){
                    var $liLine = creatLine(v);

                    $liLine.appendTo($tableWrap);
                });
            }
        };

        var creatLine = function(v){

            var $divLine = $('<div></div>').addClass('search-classic clearfix');
            var $h4 = $('<h4></h4>').append($('<a href="javascript:void(0)"></a>').html(' ' + v.orderId));

            var $ulProperty = $('<ul></ul>').addClass('fl-inline-list clearfix');

            var $divBtnWrap = $('<div></div>');

            var $btnView = $('<a></a>').addClass('btn mini red').html('查看');
            var $btnReturnVisit = $('<a></a>').addClass('btn mini green').html('回访');
            var $btnLine = $('<a></a>').addClass('btn mini blue').html('放线');
            var $btnQuotation = $('<a></a>').addClass('btn mini black').html('报价');
            var $btnContract = $('<a></a>').addClass('btn mini purple').html('合同');

            var propertyArr = [
                ["楼盘地址:", v.village.cityProper.cityProperName + v.village.villageName + " " + v.houseNumber, "grey"],
                ["客户名:", v.customer.customerName, "color-grey"],
                ["余额:", v.customer.balance, "color-blue"],
                ["设计部:", v.designDepartment, "color-grey"],
                ["设计师:", v.designer, "color-grey"],
                ["业务部:", v.businessDepartment, "color-grey"],
                ["业务员:", v.salesman, "color-grey"],
                ["面积:", v.houseArea, "color-blue"],
                ["合同报价:", v.orderTotalPrice, "color-grey"],
                ["量房时间:", v.createTime, "color-grey"],
                ["签单时间:", v.contractTime, "color-grey"],
                ["状态:", v.status, "red"]
            ];


            $.each(propertyArr, function (index,value) {
                var $liProperty = $('<li></li>');
                $('<strong></strong>').html(value[0]).appendTo($liProperty);
                $('<b></b>').html(value[1]).addClass(value[2]).appendTo($liProperty);
                $liProperty.appendTo($ulProperty);

            });

            $divBtnWrap
                .append($btnView)
                .append($btnReturnVisit)
                .append($btnLine)
                .append($btnQuotation)
                .append($btnContract);

            $divLine
                .append($h4)
                .append($ulProperty)
                .append($divBtnWrap);

            return $divLine;
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
