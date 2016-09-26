/**
 * Created by Administrator on 2015/12/10.
 */
var FilterRules = function(){//定义全项目的查询条件
    var filter_rules = {  //text  autofill
        createUser:{
            txt:"制单人", // 在第一个select里面显示的文字
            type:"autofill", // html类型
            name:"a.ou", // 对应向后台发送时候的filter[0].field
            op:["="], // 查询条件
            validate:{ // 校验规则
                "required":true,
            },

            url:"queryUserForNameByDuty.do", // 获取供选择的值
            postParam: {"duty":"财务"},
            result: "autoFillKeyValue",
            key:"key", // 对应向后台发送的filter[0].data
            value:"value" // 供选择的显示值,
        },
        postUser:{
            txt:"过账人",
            type:"autofill",
            name:"a.pu",
            op:["="],
            validate:{
                "required":true,
            },

            url:"queryUserForNameByDuty.do",
            postParam: {"duty":"财务"},
            result: "autoFillKeyValue",
            key:"key",
            value:"value"
        },
        createTime:{
            txt:"创建时间",
            type:"timerange",
            name:"a.ct",
            op:["="],
            validate:{
                "required":true,
            },
        },
        postTime:{
            txt:"过账时间",
            type:"timerange",
            name:"a.pt",
            op:["="],
            validate:{
                "required":true,
            },
        },
        period:{
            txt:"期间",
            type:"text",
            name:"a.p",
            op:["=","like"],
            validate:{
                "required":true,
                "isAllDigit":true
            }
        },
        orderId:{
            txt:"订单号",
            type:"text",
            name:"c.oi",
            op:["=","like"],
            validate:{
                "required":true,
                "isAllDigit":true
            }
        },
        msoNo:{
            txt:"主材号",
            type:"text",
            name:"c.mn",
            op:["=","like"],
            validate:{
                "required":true,
                "isAllDigit":true
            }
        },
        designRegion:{
            txt:"设计分区",
            type:"select",
            name:"c.dr",
            op:["="],
            validate:{
                "required":true
            },

            url:"queryDepartment.do",
            postParam:{"dept.type": "设计大区"},
            result: "deptList",
            key:"did",
            value:"deptName"
        },
        designDepartment:{
            txt:"设计部门",
            type:"select",
            name:"c.dd",
            op:["="],
            validate:{
                "required":true
            },

            url:"queryDepartment.do",
            postParam:{"dept.type": "设计部"},
            result: "deptList",
            key:"did",
            value:"deptName"
        },
        designer:{
            txt:"设计师",
            type:"autofill",
            name:"c.du",
            op:["="],
            validate:{
                "required":true,
            },

            url:"queryUserForNameByDuty.do",
            postParam: {"duty":"设计师"},
            result: "autoFillKeyValue",
            key:"key",
            value:"value"
        },
        businessRegion:{
            txt:"业务分区",
            type:"select",
            name:"c.br",
            op:["="],
            validate:{
                "required":true
            },

            url:"queryDepartment.do",
            postParam:{"dept.type": "业务大区"},
            result: "deptList",
            key:"did",
            value:"deptName"
        },
        businessDepartment:{
            txt:"设计部门",
            type:"select",
            name:"c.bd",
            op:["="],
            validate:{
                "required":true
            },

            url:"queryDepartment.do",
            postParam:{"dept.type": "业务部"},
            result: "deptList",
            key:"did",
            value:"deptName"
        },
        salesman:{
            txt:"业务员",
            type:"autofill",
            name:"c.su",
            op:["="],
            validate:{
                "required":true,
            },

            url:"queryUserForNameByDuty.do",
            postParam: {"duty":"业务"},
            result: "autoFillKeyValue",
            key:"key",
            value:"value"
        },
        supervisDepartment:{
            txt:"工程部",
            type:"select",
            name:"c.sd",
            op:["="],
            validate:{
                "required":true
            },

            url:"queryDepartment.do",
            postParam:{"dept.type": "工程部"},
            result: "deptList",
            key:"did",
            value:"deptName"
        },
        supervisor:{
            txt:"监理",
            type:"autofill",
            name:"c.vu",
            op:["="],
            validate:{
                "required":true,
            },

            url:"queryUserForNameByDuty.do",
            postParam: {"duty":"监理"},
            result: "autoFillKeyValue",
            key:"key",
            value:"value"
        },
        workDepartment:{
            txt:"工部",
            type:"select",
            name:"c.wd",
            op:["="],
            validate:{
                "required":true
            },

            url:"queryDepartment.do",
            postParam:{"dept.type": "工程部"},
            result: "deptList",
            key:"did",
            value:"deptName"
        },
        worker:{
            txt:"工人",
            type:"autofill",
            name:"c.wu",
            op:["="],
            validate:{
                "required":true,
            },

            url:"queryUserForNameByDeptType.do",
            postParam:  {"deptType":"工程"},
            result: "autoFillKeyValue",
            key:"key",
            value:"value"
        },
        officeDepartment:{
            txt:"职能部",
            type:"select",
            name:"c.od",
            op:["="],
            validate:{
                "required":true
            },

            url:"queryDepartment.do",
            postParam:{"dept.type": "职能"},
            result: "deptList",
            key:"did",
            value:"deptName"
        },
        officer:{
            txt:"工人",
            type:"autofill",
            name:"c.ou",
            op:["="],
            validate:{
                "required":true,
            },

            url:"queryUserForNameByDeptType.do",
            postParam:  {"deptType":"职能"},
            result: "autoFillKeyValue",
            key:"key",
            value:"value"
        },
        materialDepartment:{
            txt:"职能部",
            type:"select",
            name:"c.md",
            op:["="],
            validate:{
                "required":true
            },

            url:"queryDepartment.do",
            postParam:{"dept.type": "主材"},
            result: "deptList",
            key:"did",
            value:"deptName"
        },
        materialer:{
            txt:"职员",
            type:"autofill",
            name:"c.mu",
            op:["="],
            validate:{
                "required":true,
            },

            url:"queryUserForNameByDeptType.do",
            postParam:  {"deptType":"主材"},
            result: "autoFillKeyValue",
            key:"key",
            value:"value"
        },
    };
    return {
        init: function(){
            return filter_rules;
        },
        getfilterRules:function(arg){
            var myrules = {};
            $.each(arg,function(i,value){
                myrules[value] = filter_rules[value];
            });
            return myrules;
        }
    }
}();