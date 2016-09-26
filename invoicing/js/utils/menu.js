/**
 * Created by Administrator on 2015/12/23.
 */

var Menu = (function(){
    var menu;
    var levels = {
        level1:{},
        level2:{},
        level3:{}
    };

    var setMenu = function(data){
        menu = data;
    };

    var getMenu = function(){
        return menu;
    };

    var getlevels = function(){
        var listrs = {
            li1:'<li><span class="selected"></span><a href="javascript:void(0);"></a></li>',
            li2:'<li><a href="javascript:void(0);"></a></li>',
            li3:'<li><a href="javascript:void(0);"></a></li>'
        };
        if(!menu || !menu.length){
            return;
        }
        $.each(menu,function(i,val){
            var level,mid,url,name;
            var $li;

            level = val.level;
            mid = val.mid;
            url = val.moduleUrl;
            name = val.moduleName;
            $li = $(listrs["li"+level]);
            $li.find("a").html(name);
            if(url){
                $li.find("a").attr("href",url).addClass("ajaxify");
            }else{
                if(level==1){
                    $li.find("a").attr("data-toggle","dropdown").addClass("dropdown-toggle").append('<span class="arrow"></span>');
                    $li.append('<ul class="dropdown-menu"></ul>');
                }
                if(level==2){
                    $li.find("a").addClass("dropdown-submenu").append('<span class="arrow"></span>');
                    $li.append('<ul class="dropdown-menu"></ul>');
                }
            }
            val["$li"] = $li;
            levels["level"+level][mid] = val;
        });
    };

    var drawMenu = function(){
        var level1,level2,level3;

        level1 = levels["level1"];
        level2 = levels["level2"];
        level3 = levels["level3"];

        if(!jQuery.isEmptyObject(level3)){
            $.each(level3,function(key,val){
                var fatherModule;
                var $li,$parentLi;
                fatherModule = val.fatherModule;
                if(fatherModule && !jQuery.isEmptyObject(fatherModule)){
                    $li =  val["$li"];
                    $parentLi = level2[fatherModule.mid]["$li"];
                    $parentLi.find("ul").append($li);
                }
            });
        }
        if(!jQuery.isEmptyObject(level2)){
            $.each(level2,function(key,val){
                var fatherModule;
                var $li,$parentLi;
                fatherModule = val.fatherModule;
                if(fatherModule && !jQuery.isEmptyObject(fatherModule)){
                    $li =  val["$li"];
                    $parentLi = level1[fatherModule.mid]["$li"];
                    $parentLi.find("ul").append($li);
                }
            });
        }
        if(!jQuery.isEmptyObject(level1)){
            $.each(level1,function(key,val){
                var $li;
                $li =  val["$li"];
                $li.appendTo("#menu");
            });
        }

    };

    return {
        init: function(menu){
            //getlevels();
            var menua;
            setMenu(menu);
            getlevels();
            drawMenu();
        }
    };
})();

