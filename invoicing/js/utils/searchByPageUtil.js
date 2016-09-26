/**
 * Created by Administrator on 2015/12/12.
 */

var SearchByPage = {
    filterSubject:$("#condform select[name='cond-item']"), // 查询项目的html元素
    filterMath:$("#condform input[name='cond-math']"), // 匹配条件的html元素
    filterValue:$("#condform input[name='cond-value']"), // 匹配值的html元素
    filterLogic:$("#condform select[name='cond-logic']"),//组合类型的html元素
    condtionList:$(".cond-block .view ul"),//放条件列表的ul
    lastType:"text",//保存匹配值的类型
    lastsubjectName:"",//保存查询项目的name
    filterRules:{},
    tempSetUp:{//临时保存的查询条件
        filterParams:{},
        filterParamsNum: 0 ,
    },

    requestParams:{//向后台发送请求的参数
        "paging.page": 0,
        "paging.rows": 5,
        "paging.totalPage": 0,
        "paging.totalRecords": 0,
        condition:""
    },
    
    tbody: null,

    tempKey:"", // 保存创建select时作为option的value的字段
    tempVal:"", // 保存创建select时option显示的字段
    firstValidate:true,//保存同一个表表单是不是调用多次表单校验方法，因为如果是需要调用validate插件的rules删除和添加方法，这里留一个大写的
    createValueSelect:function(result){
        var data = result[this.result];
        var i;
        if(!data.length){
            return;
        }
        for(i in data){
            this.filterValue.append('<option value="'+data[i][this.tempKey]+'">'+data[i][this.tempVal]+'</option>');
        }
    },//第三个是select的时候向select中添加ajax获取到的值
    init:function(arg, $tbody){//filterRules，初始化筛选项目
    	
    	this.tbody = $($tbody);
    	
        var $filterSubject = this.filterSubject;
        var filterRules = FilterRules.getfilterRules(arg);
        this.filterRules = filterRules;
        var that = this;//将accountItemList赋值给"that"变量
        $.each(filterRules,function(key,val){
            $filterSubject.append("<option value='"+key+"'>"+val.txt+"</option>");
        });

        $filterSubject.change(function(){
            var _this = $(this);
            var subjectName = _this.val();
            if(subjectName){
                that.createMathDom(subjectName);
                that.createValueDom(subjectName);
                that.filterLogic.attr("disabled",false);
            }
        });

        $(".add .add-btn").click(function(){
            var _this = $(this);
            var subjectName = that.filterSubject.val();
            var canAdd = that.checkConditions(subjectName);
            canAdd && that.addCondition();
        });

        $(document).on("click",".cond-block .view .icon-remove",function(){
            that.removeCondition($(this));
        })

        $(".page-block .cond-label").click(function(){
            var _this = $(this);
            $(".cond-block").toggleClass("hide");
        });

        $(".cond-block .close-label").click(function(){
            $(this).parents(".cond-block").addClass("hide");
        });
    },
    createMathDom:function(subjectName){//根据第一个select的选中值（比如orderId）来创建匹配条件
        if(this.lastsubjectName == subjectName){return;}
        var filterRules = this.filterRules;
        var filterMathArg = filterRules[subjectName].op;
        var mathWrap = this.filterMath.parents("dd");

        var filterMathVal;//匹配条件的显示值
        var filterMathTxt;//匹配条件的实际值

        var i;//有多个匹配条件的时候

        if(filterMathArg.length === 1){
            filterMathVal = filterMathArg[0];
            filterMathTxt = filterMathVal === "=" ? "等于" : filterMathVal === "like" ? "包含" :"";

            if(this.filterMath.is("select")){
                this.filterMath.remove();
                $('<input type="text" name="cond-math-txt" disabled="disabled">').val(filterMathTxt).appendTo(mathWrap);
                this.filterMath = $('<input type="hidden" name="cond-math">').val(filterMathVal).appendTo(mathWrap);
            }else{
                this.filterMath.is(":disabled") && this.filterMath.attr("disabled",false);
                this.filterMath.val(filterMathVal);
                this.filterMath.prev("input").val(filterMathTxt);
            }

        }else{

            if(this.filterMath.is("select")){
                this.filterMath.find("option:not(:first-child)").remove();
            }else{
                mathWrap.find("input").remove();
                this.filterMath = $('<select name="cond-math"></select>').append('<option value="">请选择</option>').appendTo(mathWrap);
            }
            for(i in filterMathArg){
                filterMathVal = filterMathArg[i];
                filterMathTxt = filterMathVal === "=" ? "等于" : filterMathVal === "like" ? "包含" :"";
                this.filterMath.append('<option value="'+ filterMathVal +'">'+filterMathTxt+'</option>');
            }
        }
    },
    createValueDom: function(subjectName){//根据第一个select的选中值（比如orderId）来创建匹配值
        if(this.lastsubjectName == subjectName){return;}//如果上一个选中的和这一次选中的一样就不做处理，如果选的不一样下面会判断是不是相同类型

        var filterRules = this.filterRules;
        var filterTypeTxt = filterRules[subjectName].type;
        var valueWrap = this.filterValue.parents("dd");
        
        var filterRule = filterRules[subjectName];

        var filterUrl = filterRule.url;
        var filterKey = filterRule.key;
        var filterValue = filterRule.value;
        var filterPostParam = filterRule.postParam;
        var filterResult = filterRule.result;

        var trueValueDom;//存放匹配值的显示值的页面元素

        if( filterTypeTxt !== this.lastType ){//与上一次类型不一样，移除上一次的页面标签，创建新的页面标签

            if(this.filterValue.parent().is("div.input-prepend")){
                valueWrap.find("div.input-prepend").remove();
            }else{
                this.filterValue.remove();
                valueWrap.find("input").remove();
            }

            if(filterTypeTxt=="text"){
                this.filterValue = $('<input type="text" name="cond-value" >').val("").appendTo(valueWrap);
            }
            if(filterTypeTxt=="timerange"){
                this.filterValue = $('<input type="text" name="cond-value" class="m-wrap date-range pull-right">');
                valueWrap.append();
                $('<div class="input-prepend"></div>')
                    .css("overflow","hidden")
                    .append('<span class="add-on pull-left"><i class="icon-calendar"></i></span>')
                    .append(this.filterValue)
                    .appendTo(valueWrap);
                this.filterValue.daterangepicker({
                    format: 'YYYY-MM-DD',
                    separator: ' to ',
                    minDate: '2012-01-01',
                    maxDate: '2018-12-27',
                    startDate: moment(),
                    endDate: moment()
                },function(start, end, label){});
            }
            
            if(filterTypeTxt=="autofill"){

                trueValueDom = $('<input type="text" data-provide="typeahead" name="cond-value-txt">').appendTo(valueWrap);
                this.filterValue = $('<input type="hidden" id="autofillval" name="cond-value">').appendTo(valueWrap);
                trueValueDom.typeahead({
                    url: filterUrl,
                    list: [],
                    postData: filterPostParam,
                    targetId:"autofillval",
                    source: function (query, process) {
                        var options = $.extend({pinyinName: query}, this.options.postData);
                        core.post(this.options.url, options, $.proxy(this.options.callback, this));
                    },
                    sorter:function(items){//结果排序
                        return items;
                    },
                    matcher: function (item) {//结果匹配
                        return true;
                    },
                    callback: function(data){
//					    this.options.list = data.search;

                        this.options.list = data[filterResult];
                        this.flprocess({data:this.options.list,"val":filterKey,"txt":filterValue});
                    },
                    updater: function(item) {
                        return item;
                    }
                });
            }
            
            if(filterTypeTxt == "select"){
                this.tempKey = filterKey;
                this.tempVal = filterValue;
                this.result = filterResult;
                this.filterValue = $('<select name="cond-value"></select>').append('<option value="">请选择</option>').appendTo(valueWrap);
                core.post(filterUrl, filterPostParam, $.proxy(this.createValueSelect, this));
            }

            this.lastType = filterTypeTxt;

        }else{
            if(filterTypeTxt == "text"){
                this.filterValue.is(":disabled") && this.filterValue.attr("disabled",false);
            }
        }

        this.lastsubjectName = subjectName;
    },
    checkConditions: function(subjectName){//添加一个查询条件的时候校验查询条件是否规范  TODO

        var myrules = subjectName ? this.filterRules[subjectName].validate : null;
        myrules = myrules ? $.extend(true,{},{required:true},myrules): {required:true};
        if(!this.firstValidate){
            this.filterValue.rules("remove");
            this.filterValue.rules("add", myrules);
        } else{
            this.firstValidate = false;
        }

        return core.validate("#condform",{
            rules:{
                "cond-item":{required:true},
                "cond-math":{required:true},
                "cond-value": myrules,
                "cond-logic":{required:true}
            },
            errorPlacement: function (error, element) {
                if(error.html()){
                    if(element.is(":hidden")){
                        layer.tips(error.html(), element.prev() , { tips: [1, '#0FA6D8'],offset: 'rb', time: 3000,tipsMore:true});
                    }else{
                        layer.tips(error.html(), element , { tips: [1, '#0FA6D8'],offset: 'rb', time: 3000,tipsMore:true});
                    }
                }
            },
        });
    },
    addCondition : function(){//添加查询条件操作
        var _subject = this.filterSubject.val();
        var _math = this.filterMath.val();
        var _value = this.filterValue.val();
        var _logic = this.filterLogic.val();

        var _subjectTxt = this.filterSubject.find("option:selected").text();
        var filterTypeTxt = this.filterRules[_subject].type;
        var _name = this.filterRules[_subject].name;
        
        console.log(_name);

        var _valueTxt;
        var num = this.tempSetUp.filterParamsNum += 1;
        var $li = $('<li></li>').attr("data-num",num).append('<i class="icon-remove"></i>');


        if(filterTypeTxt=="text"){
            _valueTxt = this.filterValue.val();
        }
        if(filterTypeTxt=="timerange"){
            _value = _value.split("to");
        }
        if(filterTypeTxt=="autofill"){
            _valueTxt = this.filterValue.prevAll("input[name='cond-value-txt']").val();
        }
        if(filterTypeTxt=="select"){
            _valueTxt = this.filterValue.find("option:selected").text();
        }

        if(this.condtionList.find("li").length>0){
            this.condtionList.append('<i class="icon-cond '+_logic+'">'+_logic+'</i>');
        }else{
            _logic = ""
        }
        if(filterTypeTxt != "timerange"){
            $li.append('<span>'+_subjectTxt +' '+_math+' '+_valueTxt+'</span>');
            this.tempSetUp.filterParams[num+''] = _logic +" "+ _name + " " + _math + " '" + (_math==="like"? '%' + _value + '%' : _value) + "'";
        }else{
            $li.append('<span>'+ _value[0] + '<= ' +_subjectTxt + ' <='+ _value[1] +'</span>');
            this.tempSetUp.filterParams[num+''] = _logic + " " + _name + ">='" + _value[0].trim() + " 00:00:00' and " + _name + "<='"+ _value[1].trim() + " 23:59:59'";
        }

        $li.appendTo(this.condtionList);
    },
    removeCondition:function($closeBtn){//删除查询条件操作
        var $li = $closeBtn.parent();
        var key = $li.attr("data-num");
        if($li.index(".cond-block .view li")==0){
            $li.next(".icon-cond").remove();
        }else{
            $li.prev(".icon-cond").remove();
        }
        $li.remove();
        delete this.tempSetUp.filterParams[key];
    },
    getTableData:function(url, callBack, pageFlag){//向后台发送分页请求

        var that = this;

        var rows = parseInt($(".page-block select").val());
        var i;

        var params = that.requestParams;
        
        if(jQuery.isEmptyObject(that.tempSetUp.filterParams)){
            core.showAlert("warning","请添加搜索条件");
            return false;
        }
        
        if(pageFlag){
            params["paging.page"] = 1;
            
            that.tbody.html("");
        }else{
            params["paging.page"] += 1;
            
            if(params["paging.page"] > this.requestParams["paging.totalPage"]){
            	core.showAlert("warning","数据已加载完成");
                return false;
            }
        }

        params["paging.rows"] = rows;
        
        that.requestParams.condition = "";
        
        for(i in that.tempSetUp.filterParams){
            that.requestParams.condition += that.tempSetUp.filterParams[i]+" ";
        }
        that.requestParams.condition = (/^and.*/).test(that.requestParams.condition)?that.requestParams.condition.substr(4):that.requestParams.condition;
        that.requestParams.condition = (/^or.*/).test(that.requestParams.condition)?that.requestParams.condition.substr(3):that.requestParams.condition;

        core.post(url, params, $.proxy(function(data){
            //页脚分页信息修改

            var page = parseInt(data.paging.page),
                rows = parseInt(data.paging.rows),
                totalRecords = parseInt(data.paging.totalRecords);
            	totalPage = parseInt(data.paging.totalPage);

            this.requestParams["paging.rows"] = rows;
            this.requestParams["paging.page"] = page;
            this.requestParams["paging.totalPage"] = totalPage;
            this.requestParams["paging.totalRecords"] = totalRecords;
            
            $('.page-block strong.total').html(totalRecords);
            //$('.page-block strong.now').html((page * rows + 1) + "-" + ((page + 1) * rows));

            //画页面
            if(callBack){
                callBack(data.paging);
            }
        },that));
    },
    initTableData: function(url, callBack){
    	
    	var that = this;
    	
    	$(".cond-block .add .search").click(function(){
    		that.tbody.html("");
    		
    		that.getTableData(url, callBack, true);
    	});
    	
    	$("#getpage").click(function(){
    		that.getTableData(url, callBack, false);
    	});
    }
};