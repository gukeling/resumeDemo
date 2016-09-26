/**
 * Created by Administrator on 2015/12/10.
 */

var AuxiliaryRules = function(){//定义全项目的查询条件
    var account_rules = {
        "2270006002":["orderId", "orderAddress", "supervisorDept", "supervisor", "designRegion", "designDept", "designer"],
        "5130001001":["orderId", "orderAddress", "supervisorDept", "supervisor"],
        "5130001002":["orderId", "orderAddress", "supervisorDept", "supervisor", "workDept", "worker"],
        "5130001003":["orderId", "orderAddress", "supervisorDept", "supervisor", "brand"],
        "5130002001":["orderId", "orderAddress", "mosNo", "brand", "designRegion", "designDept", "designer", "supervisor", "brand"],
        "5130002002":["orderId", "orderAddress", "mosNo", "brand", "designRegion", "designDept", "designer", "supervisor", "brand"],
    };
    var auxiliary_rules = {

        orderId:{
            txt:"订单编号",
            type:"text",
            name:"account.assistant.orderId",
            validate:{//校验规则
                "required":true,
                "isAllDigit":true
            }
        },
        orderAddress:{
            txt:"订单地址",
            type:"text",
            name:"account.assistant.orderAddr",
            validate:{
                "required":true
            }
        },
        designRegion:{
            txt:"设计分区",//在第一个select里面显示的文字
            type:"select",//html类型
            name:"account.assistant.designRegion.did",//对应向后台发送时候的filter[0].field
            vname:"account.assistant.designRegion.deptName",//对应向后台发送时候的filter[0].field
            validate:{//校验规则
                "required":true
            },

            url:"queryDepartment.do",//获取供选择的值
            postParam:{"dept.type": "设计大区"},
            result: "deptList",
            key:"did",//对应向后台发送的filter[0].data
            value:"deptName"//供选择的显示值
        },
        designDept:{
            txt:"设计部门",
            type:"select",
            name:"account.assistant.designDepartment.did",
            vname:"account.assistant.designDepartment.deptName",
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
            name:"account.assistant.designer.uid",
            vname:"account.assistant.designer.userName",
            validate:{
                "required":true
            },

            url:"queryUserForNameByDuty.do", // 获取供选择的值
            postParam: {"duty":"设计师"},
            result: "autoFillKeyValue",
            key:"key",
            value:"value"
        },
        sellerRegion:{
            txt:"市场分区",
            type:"select",
            name:"account.assistant.businessRegion.did",
            vname:"account.assistant.businessRegion.deptName",
            validate:{
                "required":true
            },

            url:"queryDepartment.do",
            postParam:{"dept.type": "业务大区"},
            result: "deptList",
            key:"did",
            value:"deptName"
        },
        sellerDept:{
            txt:"市场部",
            type:"select",
            name:"account.assistant.businessDepartment.did",
            vname:"account.assistant.businessDepartment.deptName",
            validate:{
                "required":true
            },

            url:"queryDepartment.do",
            postParam:{"dept.type": "业务部"},
            result: "deptList",
            key:"did",
            value:"deptName"
        },
        seller:{
            txt:"业务员",
            type:"autofill",
            name:"account.assistant.salesman.uid",
            vname:"account.assistant.salesman.userName",
            validate:{
                "required":true
            },

            url:"queryUserForNameByDuty.do", // 获取供选择的值
            postParam: {"duty":"业务"},
            result: "autoFillKeyValue",
            key:"key",
            value:"value"
        },
        supervisorDept:{
            txt:"工程部",
            type:"select",
            name:"account.assistant.supervisDepartment.did",
            vname:"account.assistant.supervisDepartment.deptName",
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
            name:"account.assistant.supervisor.uid",
            vname:"account.assistant.supervisor.userName",
            validate:{
                "required":true
            },

            url:"queryUserForNameByDuty.do", // 获取供选择的值
            postParam: {"duty":"监理"},
            result: "autoFillKeyValue",
            key:"key",
            value:"value"
        },
        workDept:{
            txt:"工程部",
            type:"select",
            name:"account.assistant.workDepartment.did",
            vname:"account.assistant.workDepartment.deptName",
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
            name:"account.assistant.worker.uid",
            vname:"account.assistant.worker.userName",
            validate:{
                "required":true
            },

            url:"queryUserForNameByDeptType.do", // 获取供选择的值
            postParam: {"deptType":"工程"},
            result: "autoFillKeyValue",
            key:"key",
            value:"value"
        },
        officeDept:{
            txt:"职能部",
            type:"select",
            name:"account.assistant.officeDepartment.did",
            vname:"account.assistant.officeDepartment.deptName",
            validate:{
                "required":true
            },

            url:"queryDepartment.do",
            postParam:{"dept.type": "职能部"},
            result: "deptList",
            key:"did",
            value:"deptName"
        },
        officer:{
            txt:"职员",//在第一个select里面显示的文字
            type:"autofill",//html类型
            name:"account.assistant.officer.uid",//对应向后台发送时候的filter[0].field
            vname:"account.assistant.officer.userName",
            validate:{//校验规则
                "required":true
            },

            url:"queryUserForNameByDeptType.do", // 获取供选择的值
            postParam: {"deptType":"职能"},
            result: "autoFillKeyValue",
            key:"key",
            value:"value"
        },
        materialDept:{
            txt:"主材部",
            type:"select",
            name:"account.assistant.materialDepartment.did",
            vname:"account.assistant.materialDepartment.deptName",
            validate:{
                "required":true
            },

            url:"queryDepartment.do",
            postParam:{"dept.type": "主材部"},
            result: "deptList",
            key:"did",
            value:"deptName"
        },
        materialer:{
            txt:"职员",//在第一个select里面显示的文字
            type:"autofill",//html类型
            name:"account.assistant.materialer.uid",//对应向后台发送时候的filter[0].field
            vname:"account.assistant.materialer.userName",
            validate:{//校验规则
                "required":true
            },

            url:"queryUserForNameByDeptType.do", // 获取供选择的值
            postParam: {"deptType":"主材"},
            result: "autoFillKeyValue",
            key:"key",
            value:"value"
        },
        msoNo:{
            txt:"主材号",
            type:"text",
            name:"account.assistant.msoNo",
            validate:{
                "required":true,
                "isAllDigit":true
            }
        },
        brand:{
            txt:"供应商",
            type:"autofill",
            name:"account.assistant.brandName",
            vname:"account.assistant.brandName",
            validate:{
                "required":true
            },

            url:"queryBrandForPinYinName.do",
            postParam: {},
            result: "autoFillKeyValue",
            key:"value",
            value:"value"
        }
    };
    return {
        init: function(){
            return auxiliary_rules;
        },
        getAuxiliaryRules:function(auxiliary){
            return auxiliary_rules[auxiliary];
        },
        getAuxiliarys: function(account){
            return account_rules[account];
        }
    }
}();