com = {
	alertDiv: 'fl-alert',
	error: 'error',
	warning: 'warning',
	info: 'info',
	genderType: {"女":true, "男":false, "true": "女", "false": "男"},
	isOrNotType: {"是":true, "否":false, "true": "是", "false": "否"},
	deptType: {"designRegion": "设计大区", "businessRegion": "业务大区", "designDept": "设计部", "businessDept": "业务部", "materialDept": "主材部", "engineeringDept": "工程部", "qualityDept": "质检部", "supervisionDept": "监理部", "dutyDept": "职能部", "adminDept": "行政部", "financeDept": "财务部"},
	currentTime: function() {
		var date = new Date();
		var str = "";
		str += date.getFullYear() + '-';
		str += date.getMonth() + 1 + '-';
		str += date.getDate() + " ";
		str += date.getHours() + ':';
		str += date.getMinutes() + ':';
		str += date.getSeconds();
		return str;
	}, resizeContainer: function(){
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
		if(!params.loginTime || (params.loginTime + config.timeout * 60 * 1000) < $ct.getTime()){
			isF5 = true;
			window.location.href = '/';
		}else{
			params.loginTime = $ct.getTime();
		}
		
		var server = "";
		if(url.server){
			server = config.communion;
		}else{
			server = config.server;
		}
		
		if(config.demo){
			
			if(!url.demo){
				com.showAlert(com.warning, "Demo状态不能完成此操作");
				return;
			}
			
			url = 'result/' + url.url.split('.')[0] + '.json';
		}else{
			url = server + url.url;
			opts["authentication"] = params.authentication;
		}
		
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
						com.showAlert(com.info, "操作成功");
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
						com.showAlert(com.error, res.errorMsg);
						dfd.reject(res);
						return res;
					}
				}
			}, error: function(msg) {
				com.showAlert(com.error, msg);
				if(failCallback){
					failCallback(msg);
				}
			}
		});
		
		return dfd.promise();
	},

	adaptDataArray: function(obj,callback){
		var result = [];
		if (obj != undefined){
			for(var i = 0; i < obj.length; i++){
				var node = callback(obj[i], i);
				result.push(node);
			}
		}

		return result;
	}, cleanItems: function(items){
		for(var i in items){
			if(typeof items[i] != 'object') continue;
			if(items[i][0].type == 'checkbox'){
				items[i].prop("checked", false).trigger("change");
				continue;
			}else if(items[i][0].type=='select-one'){
				if(items[i][0].options[0] != undefined)
					items[i][0].options[0].selected = true;
			}else{
				items[i].val("");
			}
		}
	},
	validator: {
		required: {
			type: "v_required", 
			errorMsg: "内容不能为空", 
			func: function(obj){
				if(obj.val() == null || obj.val() == undefined)
					return true;
				if(toString.apply(obj.val()) === '[object Array]')
					return obj.val().toString().trim().length == 0 ? true : false;
				return obj.val().trim().length == 0 ? true : false;
			}
		}, number: {
			type: "v_number", 
			regex: /^[0-9]*$/, 
			errorMsg: "请输入数字."
		}, float: {
			type: "v_float", 
			regex: /^(((\d)+(\.)?(\d)*)|(\d)*)$/, 
			errorMsg: "请输入浮点数."
		}, name: {
			type: "v_name", 
			regex: /^[\w\u4e00-\u9fa5-.@&!, \/()%\[\]（）*，;。；！、：:?？><]*$/, 
			errorMsg: "内容可以由汉字, 字母, 数字,基本标点符号,'-','>','<','_', '.', '@'组成."
		}, nameen:{
			type: "v_name_en", 
			regex: /^[\w-_]*$/, 
			errorMsg: "内容可以由字母, 数字, '-', '_'组成."
		}, email:{
			type: "v_email", 
			regex: /^(([a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)|(\s)*)$/, 
			errorMsg: "内容可以由字母, 数字, '-', '_', '.', '@'组成.(如:muzh@163.com)"
		}, dateTime:{
			type: "v_dateTime",
			regex: /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))(\s(20|21|22|23|[0-1]?\d):[0-5]?\d(:[0-5]?\d)?)?$/,
			errorMsg: "请输入正确格式的日期.(YYYY-MM-DD hh:mm:ss)"
		}, date:{
			type: "v_date",
			regex: /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))(\s(20|21|22|23|[0-1]?\d):[0-5]?\d(:[0-5]?\d)?)?$/,
			errorMsg: "请输入正确格式的日期.(YYYY-MM-DD)"
		}, time:{
			type: "v_time",
			regex: /^(([01][0-9])|(2[0-3])):[0-5][0-9]:[0-5][0-9]$/,
			errorMsg: "请输入正确格式的时间.(hh:mm:ss)"
		}, phone: {
			type: "v_phone",
			regex: /^((1[3|4|5|7|8][0-9]{9})*)$/,
			errorMsg: "请输入正确的手机格式 (如:13619181918)."
		}, phones: {
			type: "v_phones",
			regex: /^(1[3|4|5|7|8][0-9]{9})((#1[3|4|5|7|8][0-9]{9})){0,4}$/,
			errorMsg: "请输入正确的手机格式 (如:13619181918).如果为多条电话请用#号分隔"
		}, phones2: {
			type: "v_phones2",
			regex: /^((1[3|4|5|7|8][0-9]{9})|(0[0-9]{10}))((#((1[3|4|5|7|8][0-9]{9})|(0[0-9]{10})))){0,4}$/,
			errorMsg: "请输入正确的手机号或固定电话 (如:13619181918#02425601918).如果为多条号码请用#号分隔"
		}, identity: {
			type: "v_identity",
			regex: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
			errorMsg: "请输入正确的身份证号码."
		}, price: {
			type: "v_price",
			regex: /^[0-9]+(\.[0-9]{1,2})?$/,
			errorMsg: "请输入正确的金额格式."
		}
	},
	validate: function(scopeID){
		this.clearValidator(scopeID);
		
		var _scopeID = scopeID == undefined ? "" : "#" + scopeID;
		var _count = 0;
		$.each(this.validator, function(k, v){
			$(_scopeID + " ." + v.type + ":visible").each(function(i, obj){
				$this = $(obj);
				if(!$this.prop("disabled")){
					$obj = $this;
					if($this.data("for")){
						$obj = $("#"+$this.data("for"));
					}
					if(v.func){
						if(v.func($obj)){
							com.showTips($this, v.errorMsg);
							_count++;
						}
						return true;
					}
					if(!($obj.val() == null || $obj.val() == undefined)){
						v.regex.lastIndex = 0;
						if(!((v.regex).test($obj.val().trim()))){
							com.showTips($this, v.errorMsg);
							_count++;
						}
					}
				}
			});
		});
		return _count == 0 ? false : true;
	},
	clearValidator: function(id, _isTip){
		isTip = _isTip || false;
		var count = 0;
		
		if(id != undefined && id != ""){
			id = id.indexOf("#") == 0 ? id : "#" + id;
		}else{
			id = "";
		}
		var popover = isTip == true ? "[data-toggle='popover']" : " [data-toggle='popover']";
		
		$.each($(id + popover), function(k, v){
			if($(this).data("tip") && !isTip){
				return true;
			}
			if($(this).data("addBorderWidth")){
				$(this).css("border-width", "0px");
			}
			if($(this).data("addBorderStyle")){
				$(this).css("border-style", "none");
			}
			$(this).css("border-color", "#b5b5b5");
				$(this).popover("destroy");
		});	
		
		return count;
	},
	showTips: function($obj, msg, isTip){
		if($obj.css("border-width") == "0px"){
			$obj.css("border-width", "1px");
			$obj.data("addBorderWidth", true);
		}
		
		if($obj.css("border-style") == "none"){
			$obj.css("border-style", "solid");
			$obj.data("addBorderStyle", true);
		}
		
		$obj.css("border-color", "red");
		$obj.popover('destroy').popover({content:msg}).popover('show');
		
		if(isTip){
			$obj.data("tip", isTip);
		}
	},
	showAlert: function(type, contents){
		
		var outtime = 1000;
		var gritterTypeClass = "gritter-info";
		var gritterLightClass = "gritter-light";
		
		if($.alert[type] == undefined){
			console.log("提示类型只能为<error>, <warning> 和 <info>");
		}
		
		if(type == com.error){
			gritterTypeClass = "gritter-error";
			gritterLightClass = "";
			outtime = 5000;
		}else if(type == com.warning){
			gritterTypeClass = "gritter-warning";
			gritterLightClass = "";
			outtime = 3000;
		}
		
		$.gritter.add({
			title: $.alert[type],
			text: contents,
			class_name: gritterTypeClass + ' gritter-center ' + gritterLightClass,
			time: outtime,
		});
	},
	showInfo: function(title, contents){
		$.gritter.removeAll();
		
		setTimeout(function(){
			$.gritter.add({
				title: title,
				text: contents,
				class_name: 'gritter-info',
				time: 5000,
			});
		}, 500)
	},
	switchPage: function(url, data, callback){
		$("#fl-container").load(url, data, function(response, status, xhr){
			callback && callback(response, status, xhr);
		});
	},
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
	initChosen: function(id, url, name, post, result, key, value){
		
		var $e = $('#' + id);
		
		$e.chosen({
			allow_single_deselect : true
		});
		
		var $i = $('#' + id + '_chosen input');
		var $c = $('#' + id + '_chosen');
		
		$i.bind("input", function() {
			var $pinyin = $(this).val();
			
			if ($(this).val() != "") {
				
				var $p = {}; $p[name] = $pinyin;
				
				core.post(url, $.extend({}, $p, post), function(res) {
					
					var html = '<option value="">&nbsp;</option>';
					
					if (res[result] != null){
						var kv = res[result];
						var length = kv.length;
						
						for(var i=0;i<length;i++){
							var  _ = kv[i];
							html+= '<option value="' +  _[key] + '">' +  _[value] + '</option>';
						}
					}
					
					$e.html(html).trigger("chosen:updated");
				});
			}
		});
		
		$c.css("width", "200px");
		
		return $e;
	},
	updateChosen: function(id, key, value){
		return $("#" + id).html($('<option></option>').attr('value', key).text(value)).trigger("chosen:updated");
	},
	showImg: function($e, url, width, height, alt, defaultUrl, type){
		
		var $media = type ? config.dmedia : config.media;
		
		var imgUrl = url ? $media + api.common.showImg.url + '?imgBasePath=' + url + '&divFlag=1&width=' + width + '&height=' + height + '&timestamp='+ new Date().getTime() :  defaultUrl ;
		
		$e.attr("src", imgUrl).attr("alt", alt).error(function(){
		    $(this).hide();
		});
		
		return $media + api.common.showImg.url + '?imgBasePath=' + url;
	}, downloadFile: function($e, url, name){
		$e.attr('href', config.media + api.common.downloadFile.url + "?downloadFilePath=" + url + "&fileName=" + name).attr('target', '_blank');
	}
};

Array.prototype.formatArrayMapToStr = function(k, v){
	var str = "";
	for(var i in this){
		var _i = this[i];
		if(typeof _i === "object" && _i != null){
			str += _i[k] + ":" + _i[v] + ";";
		}
	}
	return str;
};

Array.prototype.contains = function(v){
	for(var i in this){
		if(this[i] === v){
			return this[i];
		}
	}
	return undefined;
};

$.extend($, {
    jsonToString: function(jsonObj) {
        var THIS = this;
        switch (typeof (jsonObj)) {
	        case 'string':
	            return '"' + jsonObj.replace(/(["\\])/g, '\\$1') + '"';
	        case 'array':
	            return '[' + jsonObj.map(THIS.jsonToString).join(',') + ']';
	        case 'object':
	            if (jsonObj instanceof Array) {
	                var strArr = [];
	                var len = jsonObj.length;
	                for(var i=0;i<len;i++){
	                    strArr.push(THIS.jsonToString(jsonObj[i]));
	                }
	                return '[' + strArr.join(',') + ']';
	            }else if(jsonObj == null) {
	                return 'null';
	            }else{
	                var string = [];
	                for(var property in jsonObj){
	                    string.push(THIS.jsonToString(property) + ':' + THIS.jsonToString(jsonObj[property]));
	                }
	                return '{' + string.join(',') + '}';
	            }
	        case 'number':
	            return jsonObj;
	        case 'false':
	            return jsonObj;
        }
    }
});

(function($){
	
	$.extend(true, $.jgrid, com.jgrid);
	$.alert = {
		error: "错误",
		warning: '警告',
		info: '成功'
	};
	
	$.fn.statement = function(title, detail){
		return this.each(function(){
			$(this).empty().append("<div class='page-header'><h1>"+title+"<small><i class='icon-double-angle-right'></i> "+detail+"</small></h1></div>");
		});
	};
	
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
	$.fn.switchBtn = function(c){
		return this.each(function(){
			$this = $(this);
			_c = c || "";
			
			if(this.type != "checkbox"){
				return;
			}
			
			$this.addClass('ace ace-switch ace-switch-5').after("<span class='lbl "+_c+"'></span>");
		});
	};
	
	bootbox.setDefaults({
		locale: "zh_CN",
		show: true,
		backdrop: true,
		closeButton: true,
		animate: true,
		className: "my-modal"
	});
})(jQuery);
