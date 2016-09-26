/**
 * Created by Administrator on 2015/11/18.
 */


var Index = function () {

    return {

        //main function to initiate the module
        init: function () {

            App.addResponsiveHandler(function () {
                Index.initCalendar();
            });
        },


        //初始化首次登录的弹层提示
        initIntro: function () {
            if ($.cookie('intro_show')) {
                return;
            }

            $.cookie('intro_show', 1);

            setTimeout(function () {
                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: '欢迎使用财务系统!',
                    // (string | mandatory) the text inside the notification
                    text: '这是一些文字提示!',
                    // (string | optional) the image to display on the left
                    image: './assets/image/tips.jpg',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                // You can have it return a unique id, this can be used to manually remove it later using
                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 12000);
            }, 2000);

            setTimeout(function () {
                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: '这是第二个提示',
                    // (string | mandatory) the text inside the notification
                    text: '这是第二个提示!',
                    // (string | optional) the image to display on the left
                    image: './assets/image/avatar1.jpg',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                // You can have it return a unique id, this can be used to manually remove it later using
                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 13000);
            }, 8000);

            setTimeout(function () {

                $('#styler').pulsate({
                    color: "#bb3319",
                    repeat: 10
                });

                $.extend($.gritter.options, {
                    position: 'top-left'
                });

                var unique_id = $.gritter.add({
                    position: 'top-left',
                    // (string | mandatory) the heading of the notification
                    title: '第三个弹窗!',
                    // (string | mandatory) the text inside the notification
                    text: '第三个弹窗',
                    // (string | optional) the image to display on the left
                    image1: './assets/img/avatar1.png',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                $.extend($.gritter.options, {
                    position: 'top-right'
                });

                // You can have it return a unique id, this can be used to manually remove it later using
                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 15000);

            }, 23000);

            setTimeout(function () {

                $.extend($.gritter.options, {
                    position: 'top-left'
                });

                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: '第四个',
                    // (string | mandatory) the text inside the notification
                    text: '通知提示.',
                    // (string | optional) the image to display on the left
                    image1: './assets/img/image1.jpg',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 4000);

                $.extend($.gritter.options, {
                    position: 'top-right'
                });

                var number = $('#header_notification_bar .badge').text();
                number = parseInt(number);
                number = number + 3;
                $('#header_notification_bar .badge').text(number);
                $('#header_notification_bar').pulsate({
                    color: "#66bce6",
                    repeat: 5
                });

            }, 40000);

            setTimeout(function () {

                $.extend($.gritter.options, {
                    position: 'top-left'
                });

                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: '第五个',
                    // (string | mandatory) the text inside the notification
                    text: '这是消息提示.',
                    // (string | optional) the image to display on the left
                    image1: './assets/image/avatar1.jpg',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                $.extend($.gritter.options, {
                    position: 'top-right'
                });

                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 4000);

                var number = $('#header_inbox_bar .badge').text();
                number = parseInt(number);
                number = number + 2;
                $('#header_inbox_bar .badge').text(number);
                $('#header_inbox_bar').pulsate({
                    color: "#dd5131",
                    repeat: 5
                });

            }, 60000);
        }

    };

}();

$("#logoutBtn").click(function(){
    core.post("logout.do", {}, function(res){
    	window.location.href = "login.html";
    }, function(res){
    	window.location.href = "login.html";
    }, false);
    
});
