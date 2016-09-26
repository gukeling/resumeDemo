
var core = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    proofRules : [
        {
            name:"isGtZeroTwoDecimal",
            codex:/^(0|[1-9]\d*)(\.\d{1,2})?$/,
            msg:"请输入大于0的两位小数"
        },
        {
            name:"isAllDigit",
            codex:/^[0-9]*$/,
            msg:"只能输入数字"
        },
        {
            name:"isAllLetter",
            codex:/^[A-Za-z]*$/,
            msg:"只能输入字母"
        }
    ],

    dateramgepickerdefault: {
        format: 'YYYY/MM/DD',
        separator:'-',
        locale: {
            applyLabel: '确定',
            cancelLabel: '取消',
            fromLabel: '从',
            toLabel: '到',
            daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
    },

    currentTime: function() {
        var str = "";
        var date = new Date();

        str += date.getFullYear() + '-';
        str += date.getMonth() + 1 + '-';
        str += date.getDate() + " ";
        str += date.getHours() + ':';
        str += date.getMinutes() + ':';
        str += date.getSeconds();

        return str;
    },
    post: function(url, options, callback, failCallback, asyncFlag) {
        var dfd = $.Deferred();
        var opts = $.extend({}, options || {});
        var optAsync = true;
        if(asyncFlag == undefined || asyncFlag == true){
            optAsync = true;
        }else{
            optAsync = false;
        }

        var $ct = new Date();

        /*if(!params.loginTime || (params.loginTime + config.timeout * 60 * 1000) < $ct.getTime()){
            isF5 = true;
            window.location.href = '/';
        }else{
            params.loginTime = $ct.getTime();
        }*/

        /*var server = "";
        if(url.server){
            server = config.communion;
        }else{
            server = config.server;
        }*/

        /*if(config.demo){

            if(!url.demo){
                com.showAlert(com.warning, "Demo状态不能完成此操作");
                return;
            }

            url = 'result/' + url.url.split('.')[0] + '.json';
        }else{
            url = server + url.url;
            opts["authentication"] = params.authentication;
        }*/

        url = 'ds/' + url.url;

        $.ajax({
            url: url,
            data: opts,
            type: "post",
            dataType: "json",
            async: optAsync, //设为false就是同步请求
            success: function(res) {
                if(res == null){
                    return;
                }

                if(res.errorCode == 0) {
                    if(callback){
                        callback(res);
                    }else{
                        core.showAlert(core.info, "操作成功");
                        dfd.resolve(res);
                        return res;
                    }
                }else if(res.errorCode == 110005){
                    isF5 = true;
                    //api.common.logout.url + "?timestamp="+new Date().getTime();
                    window.location.href = '/';
                }else{
                    if(failCallback){
                        failCallback(res);
                    }else{
                        core.showAlert(core.error, res.errorMsg);
                        dfd.reject(res);
                        return res;
                    }
                }
            }, error: function(msg) {
                core.showAlert(core.error, msg);
                if(failCallback){
                    failCallback(msg);
                }
            }
        });

        return dfd.promise();
    },
    showAlert: function(type, contents){

        var outtime = 1000;
        var gritterTypeClass = "gritter-info";
        var gritterLightClass = "gritter-light";

        if(type == core.error){
            gritterTypeClass = "gritter-error";
            gritterLightClass = "";
            outtime = 5000;
        }else if(type == core.warning){
            gritterTypeClass = "gritter-warning";
            gritterLightClass = "";
            outtime = 3000;
        }

        $.extend($.gritter.options, {
            position: 'center'
        });
        $.gritter.add({
            title: "",
            text: contents,
            class_name: gritterTypeClass + ' gritter-center ' + gritterLightClass,
            time: outtime,
        });

    },
    createRules:function(){
        var proofRules = this.proofRules;
        for (var i in proofRules){
            this.addValidatorMethod(proofRules[i].name, proofRules[i].codex, proofRules[i].msg);
        }
    },
    addValidatorMethod:function(name, expression, message){
        jQuery.validator.addMethod(name, function(value, element) {
            var value = value.trim();

            return this.optional(element) || (expression.test(value));
        }, message);
    },
    validate : function(form,myoption){

        var rules = {};//校验规则
        var $form = $(form);//表单
        var error = $('.alert-error', $form);

        var arr = $('input , select , textarea',$form);//校验项目数组

        var options = {
            errorElement: 'span',
            errorClass: 'help-inline',
            //focusInvalid: false,
            focusCleanup:true,
            onfocusout:false,
            onclick: false,
            rules: {},
            //messages: messages,
            errorPlacement: function (error, element) {
                if("radio"==element.attr("type")){
                    error.appendTo(element.parents("div.controls"));
                }else{
                    error.insertAfter(element); // for other inputs, just perform default behavoir
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit
                //error.show();
            },

            highlight: function (element) { // hightlight error inputs
                $(element).closest('.help-inline').removeClass('ok'); // display OK icon
                $(element).closest('.control-group').removeClass('success').addClass('error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change dony by hightlight
                $(element).closest('.control-group').removeClass('error'); // set error class to the control group
            },

            success: function (label,element) {
                if(element.name=='accountType'){
                    label.remove();
                }else{
                    label.addClass('valid').addClass('help-inline ok') // mark the current input as valid and display OK icon
                        .closest('.control-group').removeClass('error').addClass('success'); // set success class to the control group
                }
            }
        };

        if(arr.length){//遍历校验项目数组取得校验规则
            arr.each(function(){

                var name = $(this).attr("name");
                var line = $(this).metadata({"type": "attr","name": "rules"  });

                !jQuery.isEmptyObject(line) && (rules[name]= line);

            });
        }
        options.rules = rules;
        myoption && (options = $.extend(true,{},options,myoption));
        return ($form).validate(options).form();
    },
    clearForm: function(formId){
        var $form = $("#"+formId);
        var error = $('.alert-error', $form);
        var success = $('.alert-success', $form);
        $('.control-group').removeClass("success").removeClass("error");
        $(".ok").remove();
        $(".help-inline").remove();
        success.hide();
        error.hide();
        $("span.checked",$form).removeClass("checked");
        $("tr.edit-on").removeClass("edit-on");
        $form.removeClass("edit-item");
        $(".extra-wrap .control-group:not(.hide)").remove();//去掉辅助项
        $('input[type="hidden"]',$form).val('');
        document.getElementById(formId).reset();
    },
    flMsg:function(msg,callback){
        if(callback){
            layer.msg(msg,{time:3000},callback);
        }else{
            layer.msg(msg,{time:3000});
        }
    }
};

$(function(){
    core.createRules();
});


(function($){

    $.fn.bindData = function(d, k, v, all, cb, o){
        if(this[0] != undefined && this[0].nodeName.toLowerCase() == "select" && d != undefined){
            this.empty();

            var optionHTML = "";

            if(all){
                optionHTML = "<option value=''>全部</option>";
            }

            for(var i=0;i<d.length;i++) {
                if(typeof d[i] == 'object'){
                    if(k == undefined || v == undefined || k == "" || v == ""){
                        console.log("该控件无法绑定列表数据");
                        return this;
                    }
                    var _o = o ? "other='" + d[i][o] + "'" : "";
                    optionHTML = optionHTML + "<option value='" + d[i][k] + "'" + _o + ">" + d[i][v] + "</option>";
                }else{
                    optionHTML = optionHTML + "<option value='" + d[i] + "' multikey='multikey'>" + d[i] + "</option>";
                }
            }

            $(optionHTML).appendTo(this);

            if(cb){
                cb();
            }
        }else{
            console.log("该控件无法绑定列表数据");
        }
        return this;
    };
})(jQuery);