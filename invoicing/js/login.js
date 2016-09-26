var Login = function () {

	/*登录表单校验*/
	var loginValidate = function(){
		$("#loginForm .alert-error").hide();
		var validator = core.validate("#loginForm",{
			//一些校验规则
			messages: {
				username: {
					required: "请填写用户名."
				},
				password: {
					required: "请填写密码."
				},
				varifycode:{
					required: "请填写验证码."
				}
			},
			success: function (label) {
				label.closest('.control-group').removeClass('error');
				label.remove();
			},
			errorPlacement: function (error, element) {
				error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
			}
		});
		return validator;
	};

	/*登录表单提交*/
	var loginSubmit = function(){

		var userId = $('input[name="username"]',"#loginForm").val();
		var password = $('input[name="password"]',"#loginForm").val();
		var verifyCode = $('input[name="varifycode"]',"#loginForm").val();
		
		var options = {
			"userId":userId,
			"password":password,
			"verifyCode":verifyCode
		}
		
		core.post("doLogin.do", options, function(){
			core.flMsg("登录成功",function(){
				window.location.href = "index.html";
			});
		}, function(msg){
			$("#loginForm .alert-error span").text(msg);
			$("#loginForm .alert-error").show();
			$("#verifyCode").attr("src","verifyCode.do?timestamp="+ new Date().getTime());
		});
	};

    return {
        init: function () {

			//登录按钮
			$("#loginBtn").click(function(){
				var validator = false;
				validator = loginValidate();
				if(validator){
					loginSubmit();
				}
			});

			//回车登录
	        $('.login-form input').keypress(function (e) {
				var validator = false;
	            if (e.which == 13) {
					validator = loginValidate();
	                if(validator){
						loginSubmit();
					}
	                return false;
	            }
	        });
        }
    };

}();